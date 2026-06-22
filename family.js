// ==================== FAMILY & REAL-TIME SYSTEM ====================

function __fmEscapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function __fmSanitizeName(name) {
  const s = String(name || '').trim();
  return s.length > 50 ? s.slice(0, 50).trim() : s;
}

class FamilyManager {
  constructor() {
    this.familyId = null;
    this.members = [];
    this.requests = [];
    this.messages = [];
    this.notifications = [];
    this.parentCode = null;
    this.currentUserId = null;
    this.heartbeatInterval = null;
    this.syncChannel = null;
    
    // Initialize BroadcastChannel for multi-tab sync
    try {
      this.syncChannel = new BroadcastChannel('family-sync');
      this.syncChannel.onmessage = (e) => this.handleSyncMessage(e.data);
    } catch(err) {}
  }

  // Initialize with user ID
  init(userId) {
    this.currentUserId = userId;
    this.loadFamily();
    this.startHeartbeat();
    this.markOnline();
    this.loadNotifications();
  }

  // ==================== FAMILY MANAGEMENT ====================
  createFamily(parentName) {
    this.familyId = 'fam-' + Date.now();
    this.parentCode = this.generateCode(6);
    const cleanName = __fmSanitizeName(parentName) || 'والد';
    const parent = {
      id: 'parent-' + Date.now(),
      name: cleanName,
      role: 'parent',
      gems: 0,
      xp: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      isOnline: true,
      lastSeen: new Date().toISOString()
    };
    this.members = [parent];
    this.saveFamily();
    return { familyId: this.familyId, parentCode: this.parentCode, parent };
  }

  joinFamily(childName, code) {
    if (code.length !== 6) return { error: 'كود العائلة يجب أن يكون 6 أحرف' };
    const cleanName = __fmSanitizeName(childName) || 'طفل';
    const child = {
      id: 'child-' + Date.now(),
      name: cleanName,
      role: 'child',
      gems: 0,
      xp: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      isOnline: true,
      lastSeen: new Date().toISOString(),
      parentId: null
    };
    this.members.push(child);
    this.currentUserId = child.id;
    this.saveFamily();
    
    // Notify parent
    this.addNotification('family', 'عضو جديد انضم', __fmEscapeHtml(cleanName) + ' انضم إلى العائلة');
    
    return { success: true, child };
  }

  // ==================== ONLINE STATUS ====================
  markOnline() {
    if (!this.currentUserId) return;
    const member = this.members.find(m => m.id === this.currentUserId);
    if (member) {
      member.isOnline = true;
      member.lastSeen = new Date().toISOString();
      this.saveFamily();
      this.broadcastSync({ type: 'online', userId: this.currentUserId });
    }
  }

  markOffline() {
    if (!this.currentUserId) return;
    const member = this.members.find(m => m.id === this.currentUserId);
    if (member) {
      member.isOnline = false;
      member.lastSeen = new Date().toISOString();
      this.saveFamily();
      this.broadcastSync({ type: 'offline', userId: this.currentUserId });
    }
  }

  startHeartbeat() {
    // Send heartbeat every 30 seconds
    this.heartbeatInterval = setInterval(() => {
      this.markOnline();
    }, 30000);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  getOnlineMembers() {
    const now = Date.now();
    return this.members.filter(m => {
      if (m.isOnline) return true;
      // Consider online if last seen within 2 minutes
      const lastSeen = new Date(m.lastSeen).getTime();
      return (now - lastSeen) < 120000;
    });
  }

  getMemberStatus(memberId) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) return 'unknown';
    
    const now = Date.now();
    const lastSeen = new Date(member.lastSeen).getTime();
    
    if (member.isOnline && (now - lastSeen) < 60000) return 'online';
    if ((now - lastSeen) < 120000) return 'away';
    return 'offline';
  }

  // ==================== REAL-TIME SYNC ====================
  broadcastSync(data) {
    if (this.syncChannel) {
      this.syncChannel.postMessage(data);
    }
    // Also store in localStorage for cross-tab sync using a single rotating key
    try {
      localStorage.setItem('family-sync-latest', JSON.stringify({ ts: Date.now(), data }));
    } catch (e) {
      // localStorage may be full or disabled
    }
  }

  handleSyncMessage(data) {
    switch(data.type) {
      case 'online':
      case 'offline':
        const member = this.members.find(m => m.id === data.userId);
        if (member) {
          member.isOnline = data.type === 'online';
          member.lastSeen = new Date().toISOString();
          this.saveFamily();
        }
        break;
      case 'message':
        this.messages.push(data.message);
        this.addNotification('message', 'رسالة جديدة', __fmEscapeHtml(data.message.content), data.message.from);
        break;
      case 'request':
        this.requests.push(data.request);
        this.addNotification('request', 'طلب جديد', __fmEscapeHtml(data.request.type + ' - ' + (data.request.amount || '')), data.request.childId);
        break;
    }
  }

  // ==================== MESSAGING ====================
  sendMessage(fromId, toId, content) {
    const fromMember = this.members.find(m => m.id === fromId);
    const message = {
      id: 'msg-' + Date.now(),
      from: fromId,
      fromName: fromMember?.name || 'Unknown',
      to: toId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    this.messages.push(message);
    this.saveFamily();
    
    // Broadcast to other tabs
    this.broadcastSync({ type: 'message', message });
    
    // Add notification for recipient
    this.addNotification('message', 'رسالة من ' + __fmEscapeHtml(fromMember?.name || 'Unknown'), __fmEscapeHtml(content), fromId);
    
    return message;
  }

  getMessages(userId1, userId2) {
    return this.messages.filter(m => 
      (m.from === userId1 && m.to === userId2) ||
      (m.from === userId2 && m.to === userId1)
    );
  }

  getUnreadMessages(userId) {
    return this.messages.filter(m => m.to === userId && !m.read);
  }

  markMessagesAsRead(fromId, toId) {
    this.messages.forEach(m => {
      if (m.from === fromId && m.to === toId) {
        m.read = true;
      }
    });
    this.saveFamily();
  }

  // ==================== REQUESTS ====================
  sendRequest(childId, type, amount, message) {
    const child = this.members.find(m => m.id === childId);
    const request = {
      id: 'req-' + Date.now(),
      childId,
      childName: child?.name || 'Unknown',
      type,
      amount,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.requests.push(request);
    this.saveFamily();
    
    // Broadcast request
    this.broadcastSync({ type: 'request', request });
    
    // Notify parent
    this.addNotification('request', 'طلب من ' + __fmEscapeHtml(child?.name || 'Unknown'), __fmEscapeHtml(type + (amount ? ': ' + amount + ' 💎' : '')), childId);
    
    return request;
  }

  approveRequest(requestId) {
    const request = this.requests.find(r => r.id === requestId);
    if (request) {
      request.status = 'approved';
      request.approvedAt = new Date().toISOString();
      this.saveFamily();
      
      // Notify child
      this.addNotification('approved', 'تمت الموافقة', 'تمت الموافقة على طلبك: ' + request.type, request.childId);
      
      return { success: true };
    }
    return { error: 'not found' };
  }

  rejectRequest(requestId) {
    const request = this.requests.find(r => r.id === requestId);
    if (request) {
      request.status = 'rejected';
      request.rejectedAt = new Date().toISOString();
      this.saveFamily();
      
      // Notify child
      this.addNotification('rejected', 'تم الرفض', 'تم رفض طلبك: ' + request.type, request.childId);
      
      return { success: true };
    }
    return { error: 'not found' };
  }

  getPendingRequests() {
    return this.requests.filter(r => r.status === 'pending');
  }

  // ==================== NOTIFICATIONS ====================
  addNotification(type, title, message, targetUserId) {
    const notification = {
      id: 'notif-' + Date.now(),
      type,
      title,
      message,
      targetUserId,
      createdAt: new Date().toISOString(),
      read: false
    };
    this.notifications.push(notification);
    this.saveFamily();
    
    // Show browser notification if permitted
    this.showBrowserNotification(title, message);
    
    return notification;
  }

  showBrowserNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: 'icons/icon-192.png' });
      } catch(e) {}
    }
  }

  getNotifications(userId) {
    return this.notifications.filter(n => !n.targetUserId || n.targetUserId === userId);
  }

  getUnreadNotifications(userId) {
    return this.notifications.filter(n => (!n.targetUserId || n.targetUserId === userId) && !n.read);
  }

  markNotificationsAsRead(userId) {
    this.notifications.forEach(n => {
      if (!n.targetUserId || n.targetUserId === userId) {
        n.read = true;
      }
    });
    this.saveFamily();
  }

  loadNotifications() {
    const saved = localStorage.getItem('family-notifications');
    if (saved) {
      this.notifications = JSON.parse(saved);
    }
  }

  // ==================== MEMBER MANAGEMENT ====================
  getMember(memberId) {
    return this.members.find(m => m.id === memberId);
  }

  getParent() {
    return this.members.find(m => m.role === 'parent');
  }

  getChildren() {
    return this.members.filter(m => m.role === 'child');
  }

  updateMemberStats(memberId, stats) {
    const member = this.members.find(m => m.id === memberId);
    if (member) {
      Object.assign(member, stats);
      this.saveFamily();
    }
  }

  removeMember(memberId) {
    this.members = this.members.filter(m => m.id !== memberId);
    this.saveFamily();
  }

  // ==================== DATA PERSISTENCE ====================
  saveFamily() {
    const data = {
      familyId: this.familyId,
      parentCode: this.parentCode,
      members: this.members,
      requests: this.requests,
      messages: this.messages,
      notifications: this.notifications
    };
    localStorage.setItem('familyData', JSON.stringify(data));
    localStorage.setItem('family-notifications', JSON.stringify(this.notifications));
  }

  loadFamily() {
    const data = localStorage.getItem('familyData');
    if (data) {
      const parsed = JSON.parse(data);
      this.familyId = parsed.familyId;
      this.parentCode = parsed.parentCode;
      this.members = parsed.members || [];
      this.requests = parsed.requests || [];
      this.messages = parsed.messages || [];
    }
  }

  clearAll() {
    this.familyId = null;
    this.members = [];
    this.requests = [];
    this.messages = [];
    this.notifications = [];
    this.parentCode = null;
    localStorage.removeItem('familyData');
    localStorage.removeItem('family-notifications');
  }

  // ==================== UTILITY ====================
  generateCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  getFamilyStats() {
    return {
      totalMembers: this.members.length,
      onlineMembers: this.getOnlineMembers().length,
      totalGems: this.members.reduce((sum, m) => sum + (m.gems || 0), 0),
      totalXp: this.members.reduce((sum, m) => sum + (m.xp || 0), 0),
      pendingRequests: this.getPendingRequests().length
    };
  }
}

// Global instance
const familyManager = new FamilyManager();
