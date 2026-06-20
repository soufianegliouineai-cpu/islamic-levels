// ==================== SUPABASE SERVICE ====================

class SupabaseService {
  constructor() {
    this.url = (typeof window !== 'undefined' && window.SUPABASE_URL);
    this.key = (typeof window !== 'undefined' && window.SUPABASE_KEY);
    this.online = navigator.onLine;
    this.cache = {};

    if (!this.url || !this.key) {
      console.warn('[Supabase] SUPABASE_URL or SUPABASE_KEY not configured. Sync features disabled. Set them via window.SUPABASE_URL / window.SUPABASE_KEY or environment injection.');
    }
    
    // Listen for online/offline
    window.addEventListener('online', () => {
      this.online = true;
      this.syncPendingChanges();
    });
    window.addEventListener('offline', () => {
      this.online = false;
    });
    
    // Listen for auth changes
    this.userId = localStorage.getItem('supabase_user_id');
  }

  // ==================== HTTP HELPERS ====================
  async request(endpoint, options = {}) {
    if (!this.url || !this.key) {
      throw new Error('Supabase URL or key not configured');
    }

    const url = this.url + '/rest/v1/' + endpoint;
    const headers = {
      'apikey': this.key,
      'Authorization': 'Bearer ' + this.key,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation'
    };
    
    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error('API Error: ' + response.status + ' - ' + error);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Supabase request failed:', error);
      throw error;
    }
  }

  // ==================== AUTH ====================
  async signUp(email, password, name) {
    try {
      const userData = await this.request('users', {
        method: 'POST',
        body: {
          email,
          password_hash: this.hashPassword(password),
          name,
          referral_code: this.generateCode(),
          current_member_id: 'user-' + Date.now()
        }
      });
      this.userId = userData[0].id;
      localStorage.setItem('supabase_user_id', this.userId);
      return userData[0];
    } catch (error) {
      // Try to login if email exists
      return await this.signIn(email, password);
    }
  }

  async signIn(email, password) {
    const users = await this.request('users?email=eq.' + email);
    if (users.length === 0) throw new Error('المستخدم غير موجود');
    
    const user = users[0];
    if (user.password_hash !== this.hashPassword(password)) {
      throw new Error('كلمة المرور غير صحيحة');
    }
    
    this.userId = user.id;
    localStorage.setItem('supabase_user_id', this.userId);
    
    // Update last login
    await this.request('users?id=eq.' + this.userId, {
      method: 'PATCH',
      body: { last_login_at: new Date().toISOString(), is_online: true }
    });
    
    return user;
  }

  async signOut() {
    if (this.userId) {
      try {
        await this.request('users?id=eq.' + this.userId, {
          method: 'PATCH',
          body: { is_online: false }
        });
      } catch (e) {}
    }
    this.userId = null;
    localStorage.removeItem('supabase_user_id');
  }

  // ==================== SYNC ====================
  async syncState(state) {
    if (!this.userId) return;
    
    try {
      // Update user stats
      await this.request('users?id=eq.' + this.userId, {
        method: 'PATCH',
        body: {
          total_xp: state.xp || 0,
          total_gems: state.gems,
          total_days: state.totalDays,
          current_streak: state.streak,
          longest_streak: state.longestStreak,
          level: state.level,
          current_member_id: state.currentMemberId,
          is_online: true,
          last_login_at: new Date().toISOString()
        }
      });
      
      // Sync today's progress
      const today = new Date().toISOString().split('T')[0];
      await this.request('daily_progress', {
        method: 'POST',
        body: {
          user_id: this.userId,
          member_id: state.currentMemberId,
          date: today,
          level: state.level,
          completed_tasks: state.todayTasks.length,
          total_tasks: this.getTotalTasks(state.level),
          completion_percentage: this.getCompletionPercent(state),
          gems_earned: this.calculateDailyGems(state),
          xp_earned: this.calculateDailyXP(state),
          prayers_completed: JSON.stringify(Object.keys(state.todayPrayers || {}).filter(k => state.todayPrayers[k])),
          streak: state.streak
        }
      });
    } catch (error) {
      console.warn('Sync failed, caching for later:', error);
      this.cacheSync(state);
    }
  }

  cacheSync(state) {
    const pending = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    pending.push({ state, timestamp: Date.now() });
    localStorage.setItem('pendingSync', JSON.stringify(pending));
  }

  async syncPendingChanges() {
    const pending = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    if (pending.length === 0) return;
    
    for (const item of pending) {
      try {
        await this.syncState(item.state);
      } catch (e) {
        console.warn('Still cannot sync, keeping in cache');
        return;
      }
    }
    localStorage.removeItem('pendingSync');
  }

  // ==================== FAMILY ====================
  async createFamily(familyName, parentData) {
    const parentCode = this.generateCode();
    const family = await this.request('families', {
      method: 'POST',
      body: {
        family_name: familyName,
        parent_code: parentCode,
        total_gems: 0,
        total_xp: 0
      }
    });
    return family[0];
  }

  async joinFamily(familyCode, userData) {
    const families = await this.request('families?parent_code=eq.' + familyCode);
    if (families.length === 0) throw new Error('كود غير صحيح');
    
    const family = families[0];
    const member = await this.request('family_members', {
      method: 'POST',
      body: {
        family_id: family.id,
        user_id: userData.id,
        member_name: userData.name,
        role: 'child'
      }
    });
    
    // Update user family_id
    await this.request('users?id=eq.' + userData.id, {
      method: 'PATCH',
      body: { family_id: family.id, is_parent: false }
    });
    
    return { family, member: member[0] };
  }

  async getFamilyMembers(familyId) {
    return await this.request('family_members?family_id=eq.' + familyId + '&order=name');
  }

  async sendMessage(fromUserId, fromName, toUserId, content, familyId) {
    return await this.request('messages', {
      method: 'POST',
      body: {
        family_id: familyId,
        from_user_id: fromUserId,
        from_name: fromName,
        to_user_id: toUserId,
        content,
        is_read: false
      }
    });
  }

  async getMessages(userId, familyId) {
    return await this.request('messages?or=(from_user_id.eq.' + userId + ',to_user_id.eq.' + userId + ')&family_id=eq.' + familyId + '&order=created_at.asc&limit=100');
  }

  async sendRequest(fromUserId, fromName, toUserId, type, amount, message, familyId) {
    return await this.request('family_requests', {
      method: 'POST',
      body: {
        family_id: familyId,
        from_user_id: fromUserId,
        from_name: fromName,
        to_user_id: toUserId,
        type,
        amount,
        message,
        status: 'pending'
      }
    });
  }

  async getPendingRequests(userId) {
    return await this.request('family_requests?to_user_id=eq.' + userId + '&status=eq.pending&order=created_at.desc');
  }

  async approveRequest(requestId, approverId) {
    return await this.request('family_requests?id=eq.' + requestId, {
      method: 'PATCH',
      body: {
        status: 'approved',
        responded_at: new Date().toISOString(),
        approved_by: approverId
      }
    });
  }

  async rejectRequest(requestId, approverId) {
    return await this.request('family_requests?id=eq.' + requestId, {
      method: 'PATCH',
      body: {
        status: 'rejected',
        responded_at: new Date().toISOString(),
        approved_by: approverId
      }
    });
  }

  // ==================== REAL-TIME ====================
  subscribeToMessages(userId, callback) {
    // Use Supabase Realtime
    const wsUrl = this.url.replace('https://', 'wss://') + '/realtime/v1/websocket?apikey=' + this.key + '&vsn=1.0.0';
    
    // Simple polling fallback for environments without WebSocket support
    let lastCheck = new Date().toISOString();
    
    const interval = setInterval(async () => {
      try {
        const newMessages = await this.request('messages?to_user_id=eq.' + userId + '&created_at=gt.' + lastCheck);
        if (newMessages.length > 0) {
          lastCheck = new Date().toISOString();
          callback(newMessages);
        }
      } catch (e) {}
    }, 5000);
    
    return () => clearInterval(interval);
  }

  updateOnlineStatus(userId, isOnline) {
    if (!this.userId) return Promise.resolve();
    return this.request('users?id=eq.' + userId, {
      method: 'PATCH',
      body: { is_online: isOnline, last_login_at: new Date().toISOString() }
    }).catch(e => {});
  }

  // ==================== GIFT CONVERSION ====================
  async requestGiftConversion(userId, gemsAmount, madAmount) {
    return await this.request('gift_conversions', {
      method: 'POST',
      body: {
        user_id: userId,
        gems_converted: gemsAmount,
        mad_amount: madAmount,
        status: 'pending'
      }
    });
  }

  async getPendingConversions(userId) {
    return await this.request('gift_conversions?user_id=eq.' + userId + '&status=eq.pending&order=created_at.desc');
  }

  async approveConversion(conversionId, approverId) {
    return await this.request('gift_conversions?id=eq.' + conversionId, {
      method: 'PATCH',
      body: {
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: approverId
      }
    });
  }

  // ==================== UTILITY ====================
  generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  hashPassword(password) {
    // Simple hash - in production use bcrypt
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
  }

  getTotalTasks(level) {
    return 20; // Approximate
  }

  getCompletionPercent(state) {
    if (!state.todayTasks.length) return 0;
    return Math.round((state.todayTasks.length / this.getTotalTasks(state.level)) * 100);
  }

  calculateDailyGems(state) {
    const level = (state.level || 1);
    return state.gems || 0;
  }

  calculateDailyXP(state) {
    return state.xp || 0;
  }
}

// Export
if (typeof window !== 'undefined') {
  window.SupabaseService = SupabaseService;
  window.supabaseService = new SupabaseService();
}
