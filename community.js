// ==================== COMMUNITY FEATURES ====================

class CommunityManager {
  constructor() {
    this.users = [];
    this.leaderboard = [];
    this.communityChallenges = [];
    this.friendRequests = [];
  }

  // Get public leaderboard
  getLeaderboard(filter = 'streak') {
    const allUsers = [
      { id: 'demo-1', name: 'أحمد', level: 4, streak: 45, gems: 1240, xp: 3500, totalDays: 120 },
      { id: 'demo-2', name: 'فاطمة', level: 5, streak: 120, gems: 3890, xp: 8500, totalDays: 250 },
      { id: 'demo-3', name: 'يوسف', level: 3, streak: 12, gems: 560, xp: 1200, totalDays: 45 },
      { id: 'demo-4', name: 'عائشة', level: 4, streak: 67, gems: 2100, xp: 4200, totalDays: 150 },
      { id: 'demo-5', name: 'محمد', level: 2, streak: 23, gems: 890, xp: 2100, totalDays: 60 },
      { id: 'demo-6', name: 'خديجة', level: 3, streak: 34, gems: 1100, xp: 2800, totalDays: 80 },
      { id: 'demo-7', name: 'علي', level: 4, streak: 56, gems: 1800, xp: 3900, totalDays: 130 },
      { id: 'demo-8', name: 'زينب', level: 2, streak: 18, gems: 720, xp: 1600, totalDays: 40 },
      { id: 'demo-9', name: 'عمر', level: 3, streak: 42, gems: 1350, xp: 3100, totalDays: 95 },
      { id: 'demo-10', name: 'مريم', level: 4, streak: 89, gems: 2800, xp: 5200, totalDays: 180 }
    ];

    // Add current user
    allUsers.push({
      id: state.user?.id || 'current',
      name: state.user?.name || 'أنت',
      level: state.level || 1,
      streak: state.streak || 0,
      gems: state.gems || 0,
      xp: state.xp || 0,
      totalDays: state.totalDays || 0,
      isCurrentUser: true
    });

    // Sort based on filter
    allUsers.sort((a, b) => {
      if (filter === 'streak') return b.streak - a.streak;
      if (filter === 'gems') return b.gems - a.gems;
      if (filter === 'xp') return b.xp - a.xp;
      if (filter === 'level') return b.level - a.level;
      return b.totalDays - a.totalDays;
    });

    // Add rank
    allUsers.forEach((user, index) => {
      user.rank = index + 1;
      user.medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
    });

    return allUsers;
  }

  // Get user rank
  getUserRank(filter = 'streak') {
    const leaderboard = this.getLeaderboard(filter);
    const userEntry = leaderboard.find(u => u.isCurrentUser);
    return userEntry ? userEntry.rank : leaderboard.length + 1;
  }

  // Send friend request
  sendFriendRequest(userId) {
    this.friendRequests.push({
      from: state.user?.id,
      to: userId,
      status: 'pending',
      timestamp: new Date().toISOString()
    });
    this.save();
  }

  // Accept friend request
  acceptFriendRequest(requestId) {
    const request = this.friendRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'accepted';
      this.save();
    }
  }

  // Get pending requests
  getPendingRequests() {
    return this.friendRequests.filter(r => r.status === 'pending');
  }

  // Get friends list
  getFriends() {
    return this.friendRequests.filter(r => r.status === 'accepted');
  }

  // Get community stats
  getCommunityStats() {
    const leaderboard = this.getLeaderboard();
    return {
      totalUsers: leaderboard.length,
      activeToday: Math.floor(leaderboard.length * 0.6),
      averageStreak: Math.round(leaderboard.reduce((sum, u) => sum + u.streak, 0) / leaderboard.length),
      topStreak: Math.max(...leaderboard.map(u => u.streak)),
      totalGems: leaderboard.reduce((sum, u) => sum + u.gems, 0)
    };
  }

  // Save
  save() {
    localStorage.setItem('communityData', JSON.stringify({
      friendRequests: this.friendRequests
    }));
  }

  // Load
  load() {
    const data = localStorage.getItem('communityData');
    if (data) {
      const parsed = JSON.parse(data);
      this.friendRequests = parsed.friendRequests || [];
    }
  }
}

const communityManager = new CommunityManager();
