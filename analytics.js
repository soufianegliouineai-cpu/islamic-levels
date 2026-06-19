// ==================== ADVANCED ANALYTICS SYSTEM ====================

class AnalyticsEngine {
  constructor(state) {
    this.state = state;
  }

  // Get weekly summary
  getWeeklySummary() {
    const history = this.state.dailyHistory || [];
    const last7Days = history.slice(-7);
    
    return {
      daysCompleted: last7Days.filter(d => d.completed).length,
      totalGems: last7Days.reduce((sum, d) => sum + (d.gems || 0), 0),
      totalXp: last7Days.reduce((sum, d) => sum + (d.xp || 0), 0),
      averageCompletion: last7Days.length ? Math.round(last7Days.reduce((sum, d) => sum + (d.completion || 0), 0) / last7Days.length) : 0,
      bestStreak: Math.max(...last7Days.map(d => d.streak || 0), 0)
    };
  }

  // Get monthly summary
  getMonthlySummary() {
    const history = this.state.dailyHistory || [];
    const last30Days = history.slice(-30);
    
    return {
      daysCompleted: last30Days.filter(d => d.completed).length,
      totalGems: last30Days.reduce((sum, d) => sum + (d.gems || 0), 0),
      totalXp: last30Days.reduce((sum, d) => sum + (d.xp || 0), 0),
      completionRate: last30Days.length ? Math.round((last30Days.filter(d => d.completed).length / last30Days.length) * 100) : 0,
      prayerCompletion: this.getPrayerCompletionRate(),
      quranPages: last30Days.reduce((sum, d) => sum + (d.quranPages || 0), 0),
      adhkarCompleted: last30Days.reduce((sum, d) => sum + (d.adhkarCount || 0), 0)
    };
  }

  // Get prayer completion rate
  getPrayerCompletionRate() {
    const prayerHistory = this.state.prayerHistory || [];
    const last30 = prayerHistory.slice(-30);
    if (last30.length === 0) return 0;
    
    const totalPrayers = last30.length * 5; // 5 prayers per day
    const completedPrayers = last30.reduce((sum, d) => {
      return sum + (d.fajr ? 1 : 0) + (d.dhuhr ? 1 : 0) + (d.asr ? 1 : 0) + (d.maghrib ? 1 : 0) + (d.isha ? 1 : 0);
    }, 0);
    
    return Math.round((completedPrayers / totalPrayers) * 100);
  }

  // Get category breakdown
  getCategoryBreakdown() {
    const today = getToday();
    const todayAdhkar = this.state.todayAdhkar || {};
    
    return {
      prayers: {
        completed: Object.keys(this.state.todayPrayers || {}).length,
        total: 5,
        percentage: Math.round((Object.keys(this.state.todayPrayers || {}).length / 5) * 100)
      },
      adhkar: {
        completed: Object.keys(todayAdhkar).length,
        total: Object.keys(ADHKAR).length,
        percentage: Math.round((Object.keys(todayAdhkar).length / Object.keys(ADHKAR).length) * 100)
      },
      quran: {
        pages: this.state.totalQuran || 0,
        parts: Math.floor((this.state.totalQuran || 0) / 20),
        percentage: Math.round(((this.state.totalQuran || 0) / 604) * 100)
      },
      tasks: {
        completed: this.state.todayTasks.length,
        total: flattenTasks(this.state.level).length,
        percentage: Math.round((this.state.todayTasks.length / flattenTasks(this.state.level).length) * 100)
      }
    };
  }

  // Get level progress
  getLevelProgress() {
    const currentLevel = this.state.level || 1;
    const nextLevel = currentLevel + 1;
    
    if (nextLevel > 5) {
      return { current: 5, next: null, progress: 100, daysRequired: 0, daysCompleted: 0 };
    }
    
    const daysRequired = LEVEL_REQUIREMENTS[nextLevel] || 30;
    const daysCompleted = this.state.totalDays || 0;
    const progress = Math.min(100, Math.round((daysCompleted / daysRequired) * 100));
    
    return {
      current: currentLevel,
      next: nextLevel,
      progress,
      daysRequired,
      daysCompleted,
      remaining: Math.max(0, daysRequired - daysCompleted)
    };
  }

  // Get streak analysis
  getStreakAnalysis() {
    const history = this.state.dailyHistory || [];
    const currentStreak = this.state.streak || 0;
    const longestStreak = this.state.longestStreak || 0;
    
    // Calculate streak consistency
    const last7Days = history.slice(-7);
    const consistency = last7Days.length ? Math.round((last7Days.filter(d => d.completed).length / 7) * 100) : 0;
    
    return {
      currentStreak,
      longestStreak,
      consistency,
      daysCompleted: this.state.totalDays || 0,
      totalDays: 365,
      yearlyProgress: Math.round(((this.state.totalDays || 0) / 365) * 100)
    };
  }

  // Get achievement progress
  getAchievementProgress() {
    const earned = this.state.achievements || [];
    const total = ACHIEVEMENTS.length;
    const percentage = Math.round((earned.length / total) * 100);
    
    return {
      earned: earned.length,
      total,
      percentage,
      nextAchievement: ACHIEVEMENTS.find(a => !earned.includes(a.id))
    };
  }

  // Get time of day analysis
  getTimeOfDayAnalysis() {
    const hour = new Date().getHours();
    let period = 'morning';
    if (hour >= 12 && hour < 17) period = 'afternoon';
    else if (hour >= 17 && hour < 21) period = 'evening';
    else if (hour >= 21) period = 'night';
    
    const suggestions = {
      morning: ['أذكار الصباح', 'صلاة الفجر', 'تلاوة القرآن'],
      afternoon: ['صلاة الظهر', 'أذكار بعد الصلاة', 'قراءة العلم'],
      evening: ['أذكار المساء', 'صلاة المغرب', 'قيام الليل'],
      night: ['أذكار النوم', 'صلاة العشاء', 'قراءة القرآن']
    };
    
    return {
      period,
      periodArabic: { morning: 'صباح', afternoon: 'ظهيرة', evening: 'مساء', night: 'ليل' }[period],
      suggestions: suggestions[period]
    };
  }

  // Get overall score
  getOverallScore() {
    const prayerScore = this.getPrayerCompletionRate() * 0.3;
    const tasksScore = Math.round((this.state.todayTasks.length / Math.max(1, flattenTasks(this.state.level).length)) * 100) * 0.3;
    const streakScore = Math.min(100, (this.state.streak || 0) * 3.33) * 0.2;
    const consistencyScore = this.getStreakAnalysis().consistency * 0.2;
    
    return Math.round(prayerScore + tasksScore + streakScore + consistencyScore);
  }
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function flattenTasks(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return [];
  const tasks = [];
  level.sections.forEach(section => {
    section.tasks.forEach(task => {
      tasks.push(typeof task === 'string' ? task : task.text);
    });
  });
  return tasks;
}
