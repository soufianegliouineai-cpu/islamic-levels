// ==================== ADVANCED FEATURES ====================

// 1. Progress Charts
class ProgressChart {
  static renderWeeklyChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const history = state.dailyHistory || [];
    const last7Days = [];
    const days = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = history.find(h => h.date === dateStr);
      last7Days.push({
        day: days[date.getDay()],
        completion: dayData?.completion || 0,
        gems: dayData?.gems || 0,
        date: dateStr
      });
    }
    
    const maxCompletion = Math.max(...last7Days.map(d => d.completion), 100);
    
    let html = '<div style="display: flex; align-items: flex-end; justify-content: space-around; height: 150px; padding: 10px 0;">';
    last7Days.forEach(d => {
      const height = (d.completion / maxCompletion) * 120;
      html += '<div style="text-align: center; flex: 1;">';
      html += '<div style="font-size: 10px; color: var(--text-muted);">' + d.completion + '%</div>';
      html += '<div style="width: 24px; height: ' + Math.max(4, height) + 'px; background: linear-gradient(180deg, var(--primary), var(--primary-light)); border-radius: 4px; margin: 4px auto;"></div>';
      html += '<div style="font-size: 10px; color: var(--text-muted);">' + d.day + '</div>';
      html += '</div>';
    });
    html += '</div>';
    
    container.innerHTML = html;
  }

  static renderDonutChart(containerId, percentage, color = '#10B981') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    let html = '<svg width="120" height="120" viewBox="0 0 120 120">';
    html += '<circle cx="60" cy="60" r="' + radius + '" fill="none" stroke="#E5E7EB" stroke-width="10"/>';
    html += '<circle cx="60" cy="60" r="' + radius + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 60 60)" stroke-linecap="round"/>';
    html += '<text x="60" y="65" text-anchor="middle" font-size="20" font-weight="bold" fill="' + color + '">' + percentage + '%</text>';
    html += '</svg>';
    
    container.innerHTML = html;
  }
}

// 2. Daily Goals System
class DailyGoalsManager {
  constructor() {
    this.goals = [];
    this.load();
  }

  addGoal(title, target, icon = '🎯') {
    const goal = {
      id: 'goal-' + Date.now(),
      title,
      target,
      current: 0,
      icon,
      createdAt: new Date().toISOString()
    };
    this.goals.push(goal);
    this.save();
    return goal;
  }

  updateProgress(goalId, amount = 1) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.current = Math.min(goal.target, goal.current + amount);
      this.save();
    }
  }

  removeGoal(goalId) {
    this.goals = this.goals.filter(g => g.id !== goalId);
    this.save();
  }

  getGoals() {
    return this.goals;
  }

  getCompletedGoals() {
    return this.goals.filter(g => g.current >= g.target);
  }

  save() {
    localStorage.setItem('dailyGoals', JSON.stringify(this.goals));
  }

  load() {
    const data = localStorage.getItem('dailyGoals');
    if (data) {
      this.goals = JSON.parse(data);
    }
  }
}

const dailyGoalsManager = new DailyGoalsManager();

// 3. Achievement System Enhancement
class AchievementSystem {
  static ACHIEVEMENTS = [
    { id: 'first-day', title: 'أول يوم', desc: 'أكمل يومك الأول', icon: '🌟', gems: 10, xp: 50 },
    { id: 'week-streak', title: 'سلسلة أسبوع', desc: 'أكمل 7 أيام متتالية', icon: '🔥', gems: 50, xp: 200 },
    { id: 'month-streak', title: 'سلسلة شهر', desc: 'أكمل 30 يوم متتالي', icon: '🏆', gems: 200, xp: 1000 },
    { id: 'prayer-master', title: 'سيد الصلوات', desc: 'أدي جميع الصلوات 7 أيام', icon: '🕌', gems: 100, xp: 400 },
    { id: 'quran-hafiz', title: 'حافظ القرآن', desc: 'اقرأ 10 أجزاء', icon: '📖', gems: 150, xp: 500 },
    { id: 'dhikr-champion', title: 'بطل الذكر', desc: 'أكمل 100 ذكر', icon: '📿', gems: 80, xp: 300 },
    { id: 'shopaholic', title: 'المسوق', desc: 'اشترِ 5 منتجات', icon: '🛒', gems: 30, xp: 100 },
    { id: 'family-man', title: 'رجل العائلة', desc: 'أنشئ عائلة', icon: '👨‍👩‍👧', gems: 50, xp: 200 },
    { id: 'generous', title: 'الكريم', desc: 'تصدق 5 مرات', icon: '💰', gems: 100, xp: 400 },
    { id: 'social-butterfly', title: 'الاجتماعي', desc: 'شارك 10 مرات', icon: '🦋', gems: 60, xp: 200 }
  ];

  static checkAchievements(state) {
    const newAchievements = [];
    
    this.ACHIEVEMENTS.forEach(achievement => {
      if (!state.achievements.includes(achievement.id)) {
        let earned = false;
        
        switch (achievement.id) {
          case 'first-day': earned = state.totalDays >= 1; break;
          case 'week-streak': earned = state.streak >= 7; break;
          case 'month-streak': earned = state.streak >= 30; break;
          case 'prayer-master': earned = Object.keys(state.todayPrayers || {}).length === 5; break;
          case 'quran-hafiz': earned = (state.totalQuran || 0) >= 200; break;
          case 'dhikr-champion': earned = (state.totalDhikr || 0) >= 100; break;
          case 'shopaholic': earned = (state.purchasedItems || []).length >= 5; break;
          case 'family-man': earned = state.familyId !== null; break;
          case 'generous': earned = (state.charityTotal || 0) >= 5; break;
          case 'social-butterfly': earned = (state.totalShared || 0) >= 10; break;
        }
        
        if (earned) {
          state.achievements.push(achievement.id);
          state.gems += achievement.gems;
          state.xp = (state.xp || 0) + achievement.xp;
          newAchievements.push(achievement);
        }
      }
    });
    
    return newAchievements;
  }
}

// 4. Streak Freeze Enhancement
class StreakFreezeSystem {
  static FREEZE_COST = 50;
  static MAX_FREEZES = 5;
  
  static canBuyFreeze(state) {
    return state.gems >= this.FREEZE_COST && (state.streakFreezes || 0) < this.MAX_FREEZES;
  }
  
  static buyFreeze(state) {
    if (!this.canBuyFreeze(state)) return false;
    state.gems -= this.FREEZE_COST;
    state.streakFreezes = (state.streakFreezes || 0) + 1;
    saveState();
    return true;
  }
  
  static useFreeze(state) {
    if ((state.streakFreezes || 0) <= 0) return false;
    state.streakFreezes--;
    saveState();
    return true;
  }
}

// 5. Family Challenges
class FamilyChallengeSystem {
  static CHALLENGES = [
    { id: 'family-prayer', title: 'صلاة جماعية', desc: 'أدي جميع الصلوات كعائلة', icon: '🕌', reward: 100 },
    { id: 'family-quran', title: 'قرآن عائلي', desc: 'اقرأ صفحة واحدة يومياً', icon: '📖', reward: 80 },
    { id: 'family-dhikr', title: 'ذكر جماعي', desc: 'أكمل الأذكار معاً', icon: '📿', reward: 60 },
    { id: 'family-charity', title: 'صدقة عائلية', desc: 'تصدقوا معاً', icon: '💰', reward: 150 }
  ];

  static getActiveChallenges(familyId) {
    return this.CHALLENGES.map(c => ({
      ...c,
      progress: this.getProgress(familyId, c.id),
      completed: this.isCompleted(familyId, c.id)
    }));
  }

  static getProgress(familyId, challengeId) {
    const key = 'familyChallenge_' + familyId + '_' + challengeId;
    return parseInt(localStorage.getItem(key) || '0');
  }

  static updateProgress(familyId, challengeId) {
    const key = 'familyChallenge_' + familyId + '_' + challengeId;
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (current + 1).toString());
  }

  static isCompleted(familyId, challengeId) {
    const progress = this.getProgress(familyId, challengeId);
    return progress >= 10;
  }
}

// 6. Donation Tracker
class DonationTracker {
  static DONATION_TYPES = [
    { id: 'water', name: 'مياه', icon: '💧', desc: 'توفير مياه نظيفة' },
    { id: 'food', name: 'طعام', icon: '🍞', desc: 'تغذية المحتاجين' },
    { id: 'education', name: 'تعليم', icon: '📚', desc: 'تعليم الأطفال' },
    { id: 'medical', name: 'صحة', icon: '🏥', desc: 'رعاية صحية' },
    { id: 'shelter', name: 'مأوى', icon: '🏠', desc: 'مأوى للمحتاجين' }
  ];

  static getDonations() {
    return JSON.parse(localStorage.getItem('donations') || '[]');
  }

  static addDonation(type, amount) {
    const donations = this.getDonations();
    donations.push({
      type,
      amount,
      date: new Date().toISOString(),
      gemsSpent: amount
    });
    localStorage.setItem('donations', JSON.stringify(donations));
  }

  static getDonationStats() {
    const donations = this.getDonations();
    return {
      total: donations.length,
      totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
      byType: this.DONATION_TYPES.map(t => ({
        ...t,
        count: donations.filter(d => d.type === t.id).length,
        total: donations.filter(d => d.type === t.id).reduce((sum, d) => sum + d.amount, 0)
      }))
    };
  }
}

// 7. Knowledge Base
class KnowledgeBase {
  static ARTICLES = [
    { id: '1', title: 'فضل صلاة الفجر', category: 'صلاة', icon: '🕌', content: 'صلاة الفجر من أعظم الصلوات...' },
    { id: '2', title: 'آداب تلاوة القرآن', category: 'قرآن', icon: '📖', content: 'من آداب تلاوة القرآن...' },
    { id: '3', title: 'فضل الذكر', category: 'ذكر', icon: '📿', content: 'قال ﷺ: مثل الذي يذكر الله...' },
    { id: '4', title: 'آداب الدعاء', category: 'دعاء', icon: '🤲', content: 'من آداب الدعاء...' },
    { id: '5', title: 'فضل الصدقة', category: 'صدقة', icon: '💰', content: 'قال ﷺ: ما نقصت صدقة من مال...' }
  ];

  static getArticles() {
    return this.ARTICLES;
  }

  static getArticle(id) {
    return this.ARTICLES.find(a => a.id === id);
  }
}

// 8. Progress Share Card Generator
class ProgressCardGenerator {
  static generateShareCard(state) {
    return {
      title: 'رحلتي الإيمانية',
      level: state.level,
      streak: state.streak,
      gems: state.gems,
      totalDays: state.totalDays,
      url: window.location.origin,
      text: '🌟 أنا في المستوى ' + state.level + '! سلسلة ' + state.streak + ' يوم 💎 ' + state.gems + ' جوهرة'
    };
  }

  static shareCard(platform) {
    const card = this.generateShareCard(state);
    const message = encodeURIComponent(card.text + '\n' + card.url);
    
    const urls = {
      whatsapp: 'https://wa.me/?text=' + message,
      twitter: 'https://twitter.com/intent/tweet?text=' + message,
      telegram: 'https://t.me/share/url?url=' + encodeURIComponent(card.url) + '&text=' + message
    };
    
    window.open(urls[platform] || urls.whatsapp, '_blank');
  }
}

// 9. QR Code Generator (simple ASCII)
class QRCodeGenerator {
  static generate(text) {
    // Simple QR code representation using ASCII
    // In production, use a proper QR code library
    return 'QR: ' + text;
  }
}

// 10. Advanced Notifications
class AdvancedNotificationSystem {
  static NOTIFICATION_TYPES = {
    PRAYER: 'prayer',
    ACHIEVEMENT: 'achievement',
    STREAK: 'streak',
    FAMILY: 'family',
    REMINDER: 'reminder'
  };

  static schedulePrayerReminder(prayerTime, minutesBefore = 10) {
    const now = new Date();
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes - minutesBefore, 0, 0);
    
    if (prayerDate <= now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }
    
    const delay = prayerDate - now;
    setTimeout(() => {
      this.showNotification('🕌 حان وقت الصلاة', 'تبقّى ' + minutesBefore + ' دقيقة على الصلاة');
    }, delay);
  }

  static scheduleDailyReminder(hour = 8, minute = 0) {
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);
    
    if (reminderDate <= now) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }
    
    const delay = reminderDate - now;
    setTimeout(() => {
      this.showNotification('☀️ تذكير يومي', 'لا تنسَ مهامك اليومية!');
      this.scheduleDailyReminder(hour, minute); // Schedule next day
    }, delay);
  }

  static showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: 'icons/icon-192.png' });
    }
  }

  static async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
}
