// ==================== DATA ====================
const LEVELS = [
  { id: 1, title: "البداية المشرقة", duration: "30 دقيقة", reward: 10, color: ["#10B981", "#0D9488"], icon: "🌱", sections: [
    { title: "القرآن", tasks: ["تلاوة صفحة", "الاستماع"] }, { title: "الصلاة", tasks: ["الصلوات الخمس", "صلاة الضحى"] },
    { title: "الذكر", tasks: ["أذكار الصباح", "الاستغفار 100", "صلاة على النبي 100"] }, { title: "العلم", tasks: ["حديث نبوي", "قراءة كتاب"] }
  ]},
  { id: 2, title: "المسار المنتظم", duration: "60 دقيقة", reward: 30, color: ["#3B82F6", "#0891B2"], icon: "📚", sections: [
    { title: "القرآن", tasks: ["جزء يومي", "حفظ آيتين", "تدبر"] }, { title: "الصلاة", tasks: ["مع السنن", "الضحى", "الوتر"] },
    { title: "الذكر", tasks: ["أذكار الصباح والمساء", "الاستغفار 200"] }, { title: "العلم", tasks: ["15 دقيقة كتاب", "محاضرة"] }
  ]},
  { id: 3, title: "طالب العلم", duration: "90 دقيقة", reward: 60, color: ["#8B5CF6", "#DB2777"], icon: "🎓", sections: [
    { title: "القرآن", tasks: ["جزء يومي", "حفظ نصف صفحة", "تدبر عميق"] }, { title: "الصلاة", tasks: ["الجماعة", "قيام الليل"] },
    { title: "الذكر", tasks: ["أذكار اليوم", "الاستغفار 300"] }, { title: "العلم", tasks: ["30 دقيقة كتاب", "درس", "تدوين"] }
  ]},
  { id: 4, title: "المجتهد", duration: "2-3 ساعات", reward: 120, color: ["#F97316", "#DC2626"], icon: "⚡", sections: [
    { title: "القرآن", tasks: ["جزأين", "صفحة كاملة", "مراجعة"] }, { title: "الصلاة", tasks: ["تبكير", "الضحى 6", "قيام 4"] },
    { title: "الذكر", tasks: ["أذكار بالإكثار", "الاستغفار 500"] }, { title: "العلم", tasks: ["ساعة كتاب", "درس مع شيخ"] }
  ]},
  { id: 5, title: "الهمة العالية", duration: "3-5 ساعات", reward: 200, color: ["#EF4444", "#E11D48"], icon: "👑", sections: [
    { title: "القرآن", tasks: ["3-5 أجزاء", "صفحتين", "تدبر مفصل"] }, { title: "الصلاة", tasks: ["قيام نصف الليل", "الضحى 8"] },
    { title: "الذكر", tasks: ["أذكار بالإكثار", "الاستغفار 1000"] }, { title: "العلم", tasks: ["ساعتان", "حلقات علم"] }
  ]}
];

const CHALLENGES = [
  { id: 1, title: "قراءة جزء كامل", reward: 50, difficulty: "medium", icon: "📖" },
  { id: 2, title: "حفظ 5 آيات", reward: 100, difficulty: "hard", icon: "✍️" },
  { id: 3, title: "أذكار الصباح", reward: 30, difficulty: "easy", icon: "☀️" },
  { id: 4, title: "قيام الليل", reward: 150, difficulty: "hard", icon: "🌙" },
  { id: 5, title: "الصلاة في وقتها", reward: 40, difficulty: "easy", icon: "🕌" },
  { id: 6, title: "الدعاء للوالدين", reward: 25, difficulty: "easy", icon: "🤲" }
];

const ACHIEVEMENTS = [
  { id: "first-day", title: "أول يوم", icon: "🌟", gems: 10, check: s => s.totalDays >= 1 },
  { id: "streak-3", title: "سلسلة 3", icon: "🔥", gems: 30, check: s => s.streak >= 3 },
  { id: "streak-7", title: "سلسلة أسبوع", icon: "🔥", gems: 100, check: s => s.streak >= 7 },
  { id: "streak-30", title: "سلسلة شهر", icon: "🔥", gems: 500, check: s => s.streak >= 30 },
  { id: "streak-100", title: "سلسلة 100", icon: "💎", gems: 1000, check: s => s.streak >= 100 },
  { id: "level-2", title: "المستوى 2", icon: "📚", gems: 50, check: s => s.level >= 2 },
  { id: "level-3", title: "المستوى 3", icon: "🎓", gems: 100, check: s => s.level >= 3 },
  { id: "level-5", title: "المستوى 5", icon: "👑", gems: 300, check: s => s.level >= 5 },
  { id: "gems-100", title: "100 جوهرة", icon: "💎", gems: 20, check: s => s.gems >= 100 },
  { id: "gems-500", title: "500 جوهرة", icon: "💎", gems: 100, check: s => s.gems >= 500 },
  { id: "gems-1000", title: "1000 جوهرة", icon: "💰", gems: 200, check: s => s.gems >= 1000 },
  { id: "perfect-week", title: "أسبوع كامل", icon: "✅", gems: 150, check: s => s.totalDays >= 7 },
  { id: "perfect-month", title: "شهر كامل", icon: "🏆", gems: 500, check: s => s.totalDays >= 30 },
  { id: "challenge-master", title: "سيد التحديات", icon: "🎯", gems: 200, check: s => s.completedChallenges?.length >= 6 },
  { id: "family-man", title: "العائلة", icon: "👨‍👩‍👧", gems: 100, check: s => s.family !== null },
  { id: "sharer", title: "المشارك", icon: "📤", gems: 50, check: s => s.totalShared >= 5 }
];

const STREAK_FREEZE = { gems: 50 };

// ==================== AUTH STATE ====================
let authState = { isLoggedIn: false, user: null, isGuest: false };
let state = {
  level: 1, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, soundEnabled: true, autoSync: true, family: null,
  referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
  totalPrayers: 0, totalQuran: 0, totalDhikr: 0, totalKnowledge: 0, lastSync: null
};

let currentLeaderboardFilter = 'streak';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('islamic-levels-sync') : null;

// ==================== AUDIO ====================
const sounds = { click: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA=') };
function playSound(name) { if (state.soundEnabled && sounds[name]) { sounds[name].currentTime = 0; sounds[name].play().catch(() => {}); } }

// ==================== AUTH ====================
function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; }

function login() {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  if (!email || !password) { alert('أدخل البريد وكلمة المرور'); return; }
  
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    authState = { isLoggedIn: true, user, isGuest: false };
    localStorage.setItem('islamicAuth', JSON.stringify(authState));
    loadUserData(user.id);
    showApp();
  } else {
    alert('بيانات الدخول غير صحيحة');
  }
}

function register() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  if (!name || !email || !password) { alert('أكمل جميع الحقول'); return; }
  
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  if (users.find(u => u.email === email)) { alert('البريد مسجل مسبقاً'); return; }
  
  const user = { id: Date.now().toString(), name, email, password, createdAt: new Date().toISOString() };
  users.push(user);
  localStorage.setItem('islamicUsers', JSON.stringify(users));
  
  authState = { isLoggedIn: true, user, isGuest: false };
  localStorage.setItem('islamicAuth', JSON.stringify(authState));
  initNewUser(user.id);
  showApp();
}

function guestLogin() {
  authState = { isLoggedIn: true, user: { id: 'guest-' + Date.now(), name: 'ضيف', email: '' }, isGuest: true };
  localStorage.setItem('islamicAuth', JSON.stringify(authState));
  loadUserData(authState.user.id);
  showApp();
}

function logout() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    authState = { isLoggedIn: false, user: null, isGuest: false };
    localStorage.removeItem('islamicAuth');
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('authModal').style.display = 'flex';
  }
}

function initNewUser(userId) {
  state = { ...getDefaultState(), referralCode: generateCode() };
  saveUserData(userId);
}

function getDefaultState() {
  return {
    level: 1, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
    todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
    notifEnabled: false, soundEnabled: true, autoSync: true, family: null,
    referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
    totalPrayers: 0, totalQuran: 0, totalDhikr: 0, totalKnowledge: 0, lastSync: null
  };
}

function loadUserData(userId) {
  const saved = localStorage.getItem(`islamicLevels_${userId}`);
  if (saved) state = { ...getDefaultState(), ...JSON.parse(saved) };
  else state = { ...getDefaultState(), referralCode: generateCode() };
  if (!state.dailyHistory) state.dailyHistory = [];
  if (!state.goals) state.goals = [];
  updateTheme();
}

function saveUserData(userId) {
  if (userId) localStorage.setItem(`islamicLevels_${userId}`, JSON.stringify(state));
  else localStorage.setItem('islamicLevels', JSON.stringify(state));
}

function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code = ''; for (let i = 0; i < 8; i++) code += c.charAt(Math.floor(Math.random() * c.length)); return code; }
function getToday() { return new Date().toISOString().split('T')[0]; }

// ==================== SYNC ====================
function syncToCloud() {
  const userId = authState.user?.id;
  if (!userId || authState.isGuest) { alert('سجّل دخولك للمزامنة'); return; }
  
  saveUserData(userId);
  const syncData = { userId, state, timestamp: new Date().toISOString() };
  localStorage.setItem(`islamicSync_${userId}`, JSON.stringify(syncData));
  state.lastSync = new Date().toISOString();
  saveUserData(userId);
  
  if (syncChannel) syncChannel.postMessage({ type: 'sync', userId });
  alert('✅ تمت المزامنة!');
  renderProfile();
}

function syncFromCloud() {
  const userId = authState.user?.id;
  if (!userId || authState.isGuest) { alert('سجّل دخولك'); return; }
  
  const syncData = localStorage.getItem(`islamicSync_${userId}`);
  if (syncData) {
    const data = JSON.parse(syncData);
    state = { ...getDefaultState(), ...data.state };
    saveUserData(userId);
    alert('✅ تم تحميل البيانات!');
    renderAll();
  } else {
    alert('لا توجد بيانات مُزامنة');
  }
}

function autoSync() {
  if (state.autoSync && authState.user && !authState.isGuest) {
    syncToCloud();
  }
}

// Multi-tab sync
if (syncChannel) {
  syncChannel.onmessage = (e) => {
    if (e.data.type === 'sync' && e.data.userId === authState.user?.id) {
      loadUserData(e.data.userId);
      renderAll();
    }
  };
}

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(name + 'Screen').classList.add('active');
  const navItem = document.querySelector(`[data-screen="${name}"]`);
  if (navItem) navItem.classList.add('active');
  playSound('click');
  
  const renderers = { tracker: renderTracker, dashboard: renderDashboard, family: renderFamily, leaderboard: renderLeaderboard,
    achievements: renderAchievements, challenges: renderChallenges, share: renderShare, shop: renderShop,
    analytics: renderAnalytics, profile: renderProfile, settings: renderSettings };
  if (renderers[name]) renderers[name]();
}

function renderAll() { renderLevels(); updateHeaderGems(); }

function updateHeaderGems() { const el = document.getElementById('headerGems'); if (el) el.textContent = state.gems; }

// ==================== HOME ====================
function renderLevels() {
  document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => `
    <div class="level-card" onclick="selectLevel(${level.id})">
      <div class="level-gradient" style="background: linear-gradient(135deg, ${level.color[0]}, ${level.color[1]});">
        <div class="level-emoji">${level.icon}</div>
        <div class="level-name">${level.title}</div>
        <div class="level-time">⏱️ ${level.duration} — 💎 ${level.reward}</div>
      </div>
    </div>
  `).join('');
}

function selectLevel(levelId) { state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker'); }

// ==================== TRACKER ====================
function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  const today = getToday();
  if (state.lastDate !== today) { state.todayTasks = []; state.lastDate = today; saveState(); }
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  document.getElementById('freezeCount').textContent = state.streakFreezes;
  
  let html = '', taskId = 0;
  level.sections.forEach(section => {
    html += `<div class="task-section"><div class="task-section-title">${section.title}</div>`;
    section.tasks.forEach(task => {
      const done = state.todayTasks.includes(taskId);
      html += `<div class="task-item ${done ? 'completed' : ''}" onclick="toggleTask(${taskId})"><div class="task-checkbox">${done ? '✓' : ''}</div><div class="task-text">${task}</div></div>`;
      taskId++;
    });
    html += `</div>`;
  });
  document.getElementById('tasksContainer').innerHTML = html;
  updateProgress();
}

function toggleTask(taskId) {
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) { state.todayTasks.push(taskId); playSound('click'); } else state.todayTasks.splice(idx, 1);
  saveState(); renderTracker();
}

function updateProgress() {
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const pct = Math.round((state.todayTasks.length / total) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressBar').style.width = pct + '%';
  
  if (pct === 100) {
    state.gems += level.reward;
    document.getElementById('rewardBanner').style.display = 'block';
    document.getElementById('rewardGems').textContent = level.reward;
    state.streak++; state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = getToday();
    state.dailyHistory.push({ date: getToday(), completed: true, gems: level.reward });
    if (state.dailyHistory.length > 30) state.dailyHistory = state.dailyHistory.slice(-30);
    saveState(); checkAchievements(); showConfetti(); updateHeaderGems();
    autoSync();
  }
}

function useStreakFreeze() {
  if (state.streakFreezes > 0 && state.streak > 0) { state.streakFreezes--; state.lastDate = getToday(); saveState(); alert('✅ تم التجميد!'); renderTracker(); }
  else alert('❌ لا توجد تجميدات');
}

function showConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 2 + 's'; c.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(c); setTimeout(() => c.remove(), 4000);
  }
}

// ==================== DASHBOARD ====================
function renderDashboard() {
  document.getElementById('statLevel').textContent = state.level;
  document.getElementById('statGems').textContent = state.gems;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statDays').textContent = state.totalDays;
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  document.getElementById('dashProgress').style.width = Math.round((state.todayTasks.length / total) * 100) + '%';
  renderLeaderboardPreview(); renderWeeklyReport();
}

function renderLeaderboardPreview() {
  const all = getFullLeaderboard();
  document.getElementById('leaderboardPreview').innerHTML = all.slice(0, 5).map((e, i) => `
    <div class="leader-row"><div class="leader-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
    <div class="leader-name">${e.name}${e.isYou ? ' (أنت)' : ''}</div>
    <div class="leader-score" style="color: #F97316;">🔥 ${e.streak}</div></div>`).join('');
}

function renderWeeklyReport() {
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
  const weekHistory = state.dailyHistory.filter(h => h.date >= weekAgo);
  if (weekHistory.length > 0) {
    document.getElementById('weeklyReport').style.display = 'block';
    const days = ['سب', 'أح', 'إث', 'ثل', 'أر', 'خم', 'جم'];
    document.getElementById('weeklyChart').innerHTML = days.map((day, i) => {
      const date = new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0];
      const done = weekHistory.some(h => h.date === date && h.completed);
      return `<div class="chart-bar"><div class="chart-fill" style="height: ${done ? '100' : '20'}%; background: ${done ? 'var(--success)' : 'var(--border)'};"></div><div class="chart-label">${day}</div></div>`;
    }).join('');
  }
}

// ==================== PROFILE ====================
function renderProfile() {
  const user = authState.user;
  if (user) {
    document.getElementById('profileName').textContent = user.name || 'المستخدم';
    document.getElementById('profileEmail').textContent = user.email || 'ضيف';
    document.getElementById('profileAvatar').textContent = user.name?.charAt(0) || '👤';
  }
  document.getElementById('profileLevel').textContent = state.level;
  document.getElementById('profileGems').textContent = state.gems;
  document.getElementById('profileStreak').textContent = state.streak;
  document.getElementById('lastSync').textContent = state.lastSync ? new Date(state.lastSync).toLocaleString('ar') : 'لم تتم';
}

function importData() {
  const input = document.createElement('input'); input.type = 'file'; input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          state = { ...getDefaultState(), ...data };
          saveState(); alert('✅ تم الاستيراد!'); renderAll();
        } catch { alert('❌ ملف غير صالح'); }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

// ==================== FAMILY ====================
function renderFamily() {
  const container = document.getElementById('familyContent');
  if (!state.family) {
    container.innerHTML = `<div class="card" style="text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px;">👨‍👩‍👧</div>
      <div style="font-weight: 800; font-size: 18px;">ابدأ عائلتك</div>
      <button class="btn btn-primary" style="margin-top: 16px;" onclick="createFamily()">➕ إنشاء</button></div>`;
  } else {
    container.innerHTML = `<div class="card" style="background: #ECFDF5; border-color: #34D399;">
      <div style="font-weight: 800;">كود العائلة: <span style="font-size: 24px;">${state.family.code}</span></div></div>
      <div class="card"><div style="font-weight: 800; margin-bottom: 12px;">الأعضاء</div>
        ${state.family.members.map(m => `<div style="display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border);">
          <span>${m.role === 'parent' ? '👨' : '👧'} ${m.name}</span>
          <span>🔥 ${m.streak} 💎 ${m.gems}</span></div>`).join('')}</div>
      <button class="btn btn-primary" style="background: var(--danger);" onclick="leaveFamily()">🚪 مغادرة</button>`;
  }
}

function createFamily() { const n = prompt('اسم العائلة:'); if (n) { state.family = { name: n, code: generateCode(), members: [{ name: 'أنت', role: 'parent', streak: state.streak, gems: state.gems }], rewards: [] }; saveState(); renderFamily(); } }
function leaveFamily() { if (confirm('مغادرة؟')) { state.family = null; saveState(); renderFamily(); } }

// ==================== LEADERBOARD ====================
function getFullLeaderboard() {
  return [
    { name: "أحمد", level: 4, streak: 45, gems: 1240 }, { name: "فاطمة", level: 5, streak: 120, gems: 3890 },
    { name: "يوسف", level: 3, streak: 12, gems: 560 }, { name: "عائشة", level: 4, streak: 67, gems: 2100 },
    { name: "محمد", level: 2, streak: 23, gems: 890 }, { name: 'أنت', level: state.level, streak: state.streak, gems: state.gems, isYou: true }
  ];
}

function filterLeaderboard(f) { currentLeaderboardFilter = f; document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); renderLeaderboard(); }

function renderLeaderboard() {
  const all = getFullLeaderboard().sort((a, b) => currentLeaderboardFilter === 'streak' ? b.streak - a.streak : currentLeaderboardFilter === 'gems' ? b.gems - a.gems : b.level - a.level);
  document.getElementById('leaderboardList').innerHTML = all.map((e, i) => `
    <div class="card" style="padding: 16px; ${e.isYou ? 'border: 2px solid var(--primary);' : ''}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; font-size: 24px; font-weight: 900; text-align: center;">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
        <div style="flex: 1; font-weight: 800;">${e.name}${e.isYou ? ' (أنت)' : ''}</div>
        <div style="font-size: 20px; font-weight: 900; color: ${currentLeaderboardFilter === 'streak' ? '#F97316' : '#F59E0B'};">
          ${currentLeaderboardFilter === 'streak' ? '🔥 ' + e.streak : currentLeaderboardFilter === 'gems' ? '💎 ' + e.gems : '📊 ' + e.level}</div>
      </div></div>`).join('');
}

// ==================== SHARE ====================
function renderShare() { document.getElementById('referralCode').value = state.referralCode || ''; }
function copyReferralCode() { navigator.clipboard.writeText(state.referralCode); alert('تم النسخ!'); }
function shareWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTelegram() { window.open(`https://t.me/share/url?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareNative() { if (navigator.share) { navigator.share({ text: '🌟 كود دعوتي: ' + state.referralCode }); state.totalShared++; state.gems += 10; saveState(); } }

// ==================== ACHIEVEMENTS ====================
function renderAchievements() {
  let earned = 0;
  document.getElementById('achievementsGrid').innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned = state.achievements.includes(ach.id); if (isEarned) earned++;
    return `<div class="achievement-badge ${isEarned ? 'earned' : ''}"><div class="achievement-icon">${ach.icon}</div><div class="achievement-title">${ach.title}</div></div>`;
  }).join('');
  document.getElementById('achEarned').textContent = earned;
}

function checkAchievements() {
  const stats = { level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, completedChallenges: state.completedChallenges, family: state.family, totalShared: state.totalShared };
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(stats)) {
      state.achievements.push(ach.id); state.gems += ach.gems;
      showNotification('🏆 ' + ach.title, '+' + ach.gems + ' جوهرة');
    }
  });
  saveState();
}

// ==================== CHALLENGES ====================
function renderChallenges() {
  document.getElementById('challengesCount').textContent = `${state.completedChallenges.length}/${CHALLENGES.length}`;
  document.getElementById('challengesContainer').innerHTML = CHALLENGES.map(ch => {
    const done = state.completedChallenges.includes(ch.id);
    return `<div class="card" style="border-color: ${done ? 'var(--success)' : 'var(--border)'};">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 36px;">${ch.icon}</span>
        <div style="flex: 1;"><div style="font-weight: 800;">${ch.title}</div>
          <span class="badge badge-${ch.difficulty}">${ch.difficulty === 'easy' ? 'سهل' : ch.difficulty === 'medium' ? 'متوسط' : 'صعب'}</span></div>
        <span style="font-weight: 900; color: #F59E0B;">💎 +${ch.reward}</span></div>
      <button class="btn ${done ? 'btn-success' : 'btn-primary'}" style="margin-top: 12px;" onclick="completeChallenge(${ch.id})" ${done ? 'disabled' : ''}>${done ? '✓' : 'أكمل'}</button></div>`;
  }).join('');
}

function completeChallenge(id) {
  if (!state.completedChallenges.includes(id)) {
    const ch = CHALLENGES.find(c => c.id === id); state.gems += ch.reward; state.completedChallenges.push(id);
    saveState(); renderChallenges(); checkAchievements(); updateHeaderGems();
  }
}

// ==================== SHOP ====================
function renderShop() {
  document.getElementById('shopContent').innerHTML = `
    <div class="card" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: white; text-align: center;">
      <div style="font-size: 36px;">💎</div><div style="font-size: 32px; font-weight: 900;">${state.gems}</div></div>
    <div class="card"><div style="font-weight: 800;">🧊 تجميد السلسلة</div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px;">
        <span style="font-weight: 900; color: #F59E0B;">💎 50</span>
        <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="buyStreakFreeze()">شراء</button></div>
      <div style="text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 8px;">المملوكة: ${state.streakFreezes}</div></div>
    <div class="card"><div style="font-weight: 800;">📊 ترقية المستوى</div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px;">
        <span style="font-weight: 900; color: #F59E0B;">💎 200</span>
        <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="buyLevelUp()" ${state.level >= 5 ? 'disabled' : ''}>ترقية</button></div></div>`;
}

function buyStreakFreeze() { if (state.gems >= 50) { state.gems -= 50; state.streakFreezes++; saveState(); renderShop(); updateHeaderGems(); alert('✅!'); } else alert('❌ جواهر غير كافية'); }
function buyLevelUp() { if (state.gems >= 200 && state.level < 5) { state.gems -= 200; state.level++; saveState(); renderShop(); updateHeaderGems(); alert('🎉 المستوى ' + state.level + '!'); } }

// ==================== ANALYTICS ====================
function renderAnalytics() {
  document.getElementById('totalPrayers').textContent = state.totalPrayers;
  document.getElementById('totalQuran').textContent = state.totalQuran;
  document.getElementById('totalDhikr').textContent = state.totalDhikr;
  document.getElementById('totalKnowledge').textContent = state.totalKnowledge;
  
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
    const dayData = state.dailyHistory.find(h => h.date === date);
    days.push({ date, completed: dayData?.completed });
  }
  document.getElementById('activityChart').innerHTML = days.map(d => `
    <div class="chart-bar"><div class="chart-fill" style="height: ${d.completed ? '100' : '20'}%; background: ${d.completed ? 'var(--primary)' : 'var(--border)'};"></div>
    <div class="chart-label">${new Date(d.date).toLocaleDateString('ar', { weekday: 'short' })}</div></div>`).join('');
  
  document.getElementById('goalsList').innerHTML = state.goals.map((g, i) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border);">
      <div><div style="font-weight: 700;">${g.icon} ${g.title}</div><div style="font-size: 12px; color: var(--text-muted);">${g.current}/${g.target}</div></div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <div class="progress-container" style="width: 60px; height: 6px;"><div class="progress-bar" style="width: ${Math.min(100, (g.current / g.target) * 100)}%;"></div></div>
        <button onclick="deleteGoal(${i})" style="background: none; border: none; cursor: pointer;">🗑️</button></div></div>`).join('');
}

function addGoal() { const t = prompt('اسم الهدف:'); if (t) { const target = parseInt(prompt('الهدف:')); if (target) { state.goals.push({ title: t, target, current: 0, icon: ['📖', '🕌', '💎', '🔥'][Math.floor(Math.random() * 4)] }); saveState(); renderAnalytics(); } } }
function deleteGoal(i) { state.goals.splice(i, 1); saveState(); renderAnalytics(); }

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('autoSyncToggle').classList.toggle('active', state.autoSync);
  document.getElementById('levelSelector').innerHTML = LEVELS.map(l => `
    <button class="btn ${state.level === l.id ? 'btn-primary' : ''}" style="width: auto; padding: 8px 16px;" onclick="selectLevel(${l.id})">${l.icon} ${l.id}</button>`).join('');
}

function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission(); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function toggleAutoSync() { state.autoSync = !state.autoSync; saveState(); }
function showNotification(title, body) { if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: 'icons/icon-192.png' }); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = `backup-${getToday()}.json`; a.click(); }
function resetData() { if (confirm('مسح؟')) { state = getDefaultState(); state.referralCode = generateCode(); saveState(); renderAll(); } }
function saveState() { const userId = authState.user?.id; if (userId && !authState.isGuest) saveUserData(userId); else localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// ==================== PWA ====================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; document.getElementById('installBanner').classList.add('show'); });
function installApp() { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then(c => { if (c.outcome === 'accepted') document.getElementById('installBanner').classList.remove('show'); }); } }
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// ==================== INIT ====================
function showApp() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('welcomeText').textContent = 'مرحباً، ' + (authState.user?.name || 'ضيف') + '!';
  renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  const savedAuth = localStorage.getItem('islamicAuth');
  if (savedAuth) {
    authState = JSON.parse(savedAuth);
    if (authState.isLoggedIn) { loadUserData(authState.user?.id); showApp(); return; }
  }
  document.getElementById('authModal').style.display = 'flex';
});
