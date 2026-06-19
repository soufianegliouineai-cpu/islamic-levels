// ==================== SEASONAL CHALLENGES SYSTEM ====================

const SEASONAL_CHALLENGES = {
  ramadan: {
    id: 'ramadan',
    title: 'تحديات رمضان',
    description: 'تحديات خاصة بشهر رمضان المبارك',
    icon: '🌙',
    color: '#10B981',
    challenges: [
      { id: 'ramadan_fasting', title: 'صيام 30 يوم', description: 'صم كل أيام رمضان', icon: '🌙', target: 30, reward: 500, xp: 2000 },
      { id: 'ramadan_tilawa', title: 'تلاوة القرآن كاملاً', description: 'ختم القرآن مرة على الأقل', icon: '📖', target: 30, reward: 400, xp: 1500 },
      { id: 'ramadan_taraweeh', title: 'صلاة التراويح', description: 'صلاة التراويح كل ليلة', icon: '🕌', target: 30, reward: 300, xp: 1000 },
      { id: 'ramadan_charity', title: 'صدقات يومية', description: 'تصدق كل يوم من رمضان', icon: '💰', target: 30, reward: 200, xp: 800 },
      { id: 'ramadan_laylatul_qadr', title: 'laylatul qadr', description: 'البحث عن ليلة القدر', icon: '⭐', target: 1, reward: 1000, xp: 5000 }
    ]
  },
  dhulHijjah: {
    id: 'dhulHijjah',
    title: 'تحديات ذي الحجة',
    description: 'تحديات في أول 10 أيام من ذي الحجة',
    icon: '🕋',
    color: '#F59E0B',
    challenges: [
      { id: 'dh_fasting', title: 'صيام 9 أيام', description: 'صم يوم عرفة وال أيام', icon: '📅', target: 9, reward: 200, xp: 500 },
      { id: 'dh_takbeer', title: 'تكبير الله', description: 'أكثث من التكبير يوميًا', icon: '📢', target: 30, reward: 100, xp: 300 },
      { id: 'dh_charity', title: 'صدقات كثيرة', description: 'تصدق يوميًا في هذه الأيام', icon: '💰', target: 10, reward: 200, xp: 400 },
      { id: 'dh_dua', title: 'دعاء يوم عرفة', description: 'الإكثار من الدعاء يوم عرفة', icon: '🤲', target: 1, reward: 500, xp: 2000 }
    ]
  },
  muharram: {
    id: 'muharram',
    title: 'تحديات محرم',
    description: 'تحديات في أول 10 أيام من محرم',
    icon: '📅',
    color: '#8B5CF6',
    challenges: [
      { id: 'mh_ashura', title: 'صيام عاشوراء', description: 'صم يوم عاشوراء', icon: '🌙', target: 1, reward: 100, xp: 300 },
      { id: 'mh_dhikr', title: 'ذكر الله', description: 'أكثث من الذكر في هذه الأيام', icon: '📿', target: 10, reward: 150, xp: 400 }
    ]
  },
  weekly: {
    id: 'weekly',
    title: 'تحديات أسبوعية',
    description: 'تحديات جديدة كل أسبوع',
    icon: '📅',
    color: '#3B82F6',
    challenges: [
      { id: 'week_prayers', title: 'إتمام الصلوات', description: 'أدي جميع الصلوات 7 أيام', icon: '🕌', target: 7, reward: 100, xp: 300 },
      { id: 'week_quran', title: 'تلاوة القرآن', description: 'اقرأ صفحة يوميًا لمدة أسبوع', icon: '📖', target: 7, reward: 150, xp: 400 },
      { id: 'week_dhikr', title: 'الأذكار اليومية', description: 'أكمل الأذكار يوميًا لمدة أسبوع', icon: '📿', target: 7, reward: 120, xp: 350 }
    ]
  }
};

class SeasonalChallengeManager {
  constructor() {
    this.activeSeasons = [];
    this.challengeProgress = {};
  }

  // Check which seasons are currently active
  checkActiveSeasons() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    
    this.activeSeasons = [];
    
    // Ramadan (approximate - would need real date calculation)
    if (month === 3 || month === 4) { // March-April (approximate Ramadan)
      this.activeSeasons.push('ramadan');
    }
    
    // Dhul Hijjah (10th month)
    if (month === 6) { // June (approximate Dhul Hijjah)
      this.activeSeasons.push('dhulHijjah');
    }
    
    // Muharram (1st month)
    if (month === 7) { // July (approximate Muharram)
      this.activeSeasons.push('muharram');
    }
    
    // Weekly challenges are always active
    this.activeSeasons.push('weekly');
    
    return this.activeSeasons;
  }

  // Get active challenges
  getActiveChallenges() {
    this.checkActiveSeasons();
    const challenges = [];
    
    this.activeSeasons.forEach(seasonId => {
      const season = SEASONAL_CHALLENGES[seasonId];
      if (season) {
        season.challenges.forEach(challenge => {
          challenges.push({
            ...challenge,
            seasonId: season.id,
            seasonTitle: season.title,
            seasonColor: season.color,
            progress: this.challengeProgress[challenge.id] || 0,
            percentage: Math.round(((this.challengeProgress[challenge.id] || 0) / challenge.target) * 100),
            completed: (this.challengeProgress[challenge.id] || 0) >= challenge.target
          });
        });
      }
    });
    
    return challenges;
  }

  // Update challenge progress
  updateProgress(challengeId, amount = 1) {
    if (!this.challengeProgress[challengeId]) {
      this.challengeProgress[challengeId] = 0;
    }
    this.challengeProgress[challengeId] += amount;
    this.save();
  }

  // Complete challenge
  completeChallenge(challengeId) {
    this.challengeProgress[challengeId] = Infinity;
    this.save();
  }

  // Get progress for a challenge
  getProgress(challengeId) {
    return this.challengeProgress[challengeId] || 0;
  }

  // Check if challenge is completed
  isCompleted(challengeId) {
    const challenge = this.getAllChallenges().find(c => c.id === challengeId);
    if (!challenge) return false;
    return (this.challengeProgress[challengeId] || 0) >= challenge.target;
  }

  // Get all challenges
  getAllChallenges() {
    const all = [];
    Object.values(SEASONAL_CHALLENGES).forEach(season => {
      season.challenges.forEach(ch => {
        all.push({ ...ch, seasonId: season.id, seasonTitle: season.title, seasonColor: season.color });
      });
    });
    return all;
  }

  // Save progress
  save() {
    localStorage.setItem('seasonalProgress', JSON.stringify(this.challengeProgress));
  }

  // Load progress
  load() {
    const data = localStorage.getItem('seasonalProgress');
    if (data) {
      this.challengeProgress = JSON.parse(data);
    }
  }
}

const seasonalManager = new SeasonalChallengeManager();
