// ==================== DATA ====================
const LEVELS = [
  { id: 1, title: "البداية المشرقة", subtitle: "البداية المباركة", duration: "30 دقيقة", reward: 10, color: ["#10B981", "#0D9488"], icon: "🌱", description: "أول خطوة في رحلتك الإيمانية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة صفحة واحدة من القرآن", "الاستماع إلى تلاوة صفحة"] },
      { title: "الصلاة والعبادة", tasks: ["الحفاظ على الصلوات الخمس", "صلاة ركعتي الضحى"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح أو المساء", "الاستغفار 100 مرة", "الصلاة على النبي 100 مرة"] },
      { title: "العلم الشرعي", tasks: ["قراءة حديث نبوي واحد", "قراءة فقرة من كتاب إسلامي"] }
    ] },
  { id: 2, title: "المسار المنتظم", subtitle: "المنتظم الملتزم", duration: "60 دقيقة", reward: 30, color: ["#3B82F6", "#0891B2"], icon: "📚", description: "تطور مستمر في عبادتك",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ آيتين", "تدبر المعاني"] },
      { title: "الصلاة والعبادة", tasks: ["الصلوات الخمس مع السنن", "صلاة الضحى يوميًا", "صلاة الوتر"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح والمساء", "الاستغفار 200 مرة"] },
      { title: "العلم الشرعي", tasks: ["15 دقيقة قراءة كتاب", "محاضرة علمية قصيرة"] }
    ] },
  { id: 3, title: "طالب العلم", subtitle: "طالب العلم المتفاني", duration: "90 دقيقة", reward: 60, color: ["#8B5CF6", "#DB2777"], icon: "🎓", description: "تعمق في طلب العلم الشرعي",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ نصف صفحة", "تدبر عميق"] },
      { title: "الصلاة والعبادة", tasks: ["صلاة الجماعة في المسجد", "قيام الليل ركعتين"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم كاملة", "الاستغفار 300 مرة"] },
      { title: "العلم الشرعي", tasks: ["30 دقيقة كتاب علمي", "درس علمي منتظم", "تدوين الفوائد"] }
    ] },
  { id: 4, title: "المجتهد", subtitle: "المجتهد الداعي", duration: "2-3 ساعات", reward: 120, color: ["#F97316", "#DC2626"], icon: "⚡", description: "همة عالية وعزيمة قوية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزأين يوميًا", "حفظ صفحة كاملة", "مراجعة محفوظ"] },
      { title: "الصلاة والعبادة", tasks: ["تبكير للمسجد", "صلاة الضحى 6 ركعات", "قيام الليل 4 ركعات"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم بالإكثار", "الاستغفار 500 مرة"] },
      { title: "العلم الشرعي", tasks: ["ساعة دراسة كتاب شرعي", "درس مع شيخ"] }
    ] },
  { id: 5, title: "الهمة العالية", subtitle: "القمة والتميز الإيماني", duration: "3-5 ساعات", reward: 200, color: ["#EF4444", "#E11D48"], icon: "👑", description: "القمة والتميز الإيماني",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة 3-5 أجزاء", "حفظ صفحتين", "تدبر مفصل"] },
      { title: "الصلاة والعبادة", tasks: ["قيام الليل نصف الليل", "صلاة الضحى 8 ركعات"] },
      { title: "الذكر والأدعية", tasks: ["أذكار بالإكثار الشديد", "الاستغفار 1000 مرة"] },
      { title: "العلم الشرعي", tasks: ["ساعتان دراسة متعمقة", "حلقات علم مسجدية"] }
    ] }
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
  { id: "streak-100", title: "سلسلة 100 يوم", icon: "💎", gems: 1000, check: s => s.streak >= 100 },
  { id: "level-2", title: "المستوى 2", icon: "📚", gems: 50, check: s => s.level >= 2 },
  { id: "level-3", title: "المستوى 3", icon: "🎓", gems: 100, check: s => s.level >= 3 },
  { id: "level-5", title: "المستوى 5", icon: "👑", gems: 300, check: s => s.level >= 5 },
  { id: "gems-100", title: "100 جوهرة", icon: "💎", gems: 20, check: s => s.gems >= 100 },
  { id: "gems-500", title: "500 جوهرة", icon: "💎", gems: 100, check: s => s.gems >= 500 },
  { id: "gems-1000", title: "1000 جوهرة", icon: "💰", gems: 200, check: s => s.gems >= 1000 },
  { id: "perfect-week", title: "أسبوع كامل", icon: "✅", gems: 150, check: s => s.totalDays >= 7 },
  { id: "perfect-month", title: "شهر كامل", icon: "🏆", gems: 500, check: s => s.totalDays >= 30 },
  { id: "challenge-master", title: "سيد التحديات", icon: "🎯", gems: 200, check: s => s.completedChallenges.length >= 6 },
  { id: "family-man", title: "رجل العائلة", icon: "👨‍👩‍👧", gems: 100, check: s => s.family !== null },
  { id: "sharer", title: "المشارك", icon: "📤", gems: 50, check: s => s.totalShared >= 5 }
];

const STREAK_FREEZE = { name: "تجميد السلسلة", icon: "🧊", gems: 50, description: "يحافظ على سلامتك يوم واحد" };

// ==================== STATE ====================
let state = {
  level: 1, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, family: null, referralCode: null, referredBy: null,
  totalShared: 0, streakFreezes: 0, soundEnabled: true,
  weeklyGoal: 7, totalPrayers: 0, totalQuran: 0, totalDhikr: 0, totalKnowledge: 0,
  dailyHistory: [], goals: [], reminderTime: "08:00", lastReminder: null
};

let currentLeaderboardFilter = 'streak';

// ==================== AUDIO ====================
const sounds = {
  complete: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='),
  levelUp: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='),
  achievement: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='),
  click: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA=')
};

function playSound(name) { if (state.soundEnabled && sounds[name]) { sounds[name].currentTime = 0; sounds[name].play().catch(() => {}); } }

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code = ''; for (let i = 0; i < 8; i++) code += c.charAt(Math.floor(Math.random() * c.length)); return code; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function getWeekAgo() { return new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]; }
function getDayName(date) { return new Date(date).toLocaleDateString('ar', { weekday: 'short' }); }

function loadState() {
  const saved = localStorage.getItem('islamicLevels');
  if (saved) state = { ...state, ...JSON.parse(saved) };
  if (!state.referralCode) state.referralCode = generateCode();
  if (!state.dailyHistory) state.dailyHistory = [];
  if (!state.goals) state.goals = [];
  updateTheme();
}

function saveState() { localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(name + 'Screen').classList.add('active');
  document.querySelector(`[data-screen="${name}"]`).classList.add('active');
  playSound('click');
  if (name === 'tracker') renderTracker();
  if (name === 'dashboard') renderDashboard();
  if (name === 'family') renderFamily();
  if (name === 'leaderboard') renderLeaderboard();
  if (name === 'achievements') renderAchievements();
  if (name === 'challenges') renderChallenges();
  if (name === 'share') renderShare();
  if (name === 'shop') renderShop();
  if (name === 'analytics') renderAnalytics();
  if (name === 'settings') renderSettings();
}

// ==================== HOME ====================
function renderLevels() {
  document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => `
    <div class="level-card" onclick="selectLevel(${level.id})">
      <div class="level-gradient" style="background: linear-gradient(135deg, ${level.color[0]}, ${level.color[1]});">
        <div class="level-emoji">${level.icon}</div>
        <div class="level-name">${level.title}</div>
        <div class="level-sub">${level.subtitle}</div>
        <div class="level-time">⏱️ ${level.duration} — 💎 ${level.reward} جوهرة</div>
      </div>
      <div class="level-desc">${level.description}</div>
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
  if (idx === -1) { state.todayTasks.push(taskId); playSound('complete'); } else state.todayTasks.splice(idx, 1);
  saveState(); renderTracker();
}

function updateProgress() {
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const done = state.todayTasks.length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressBar').style.width = pct + '%';
  
  if (pct === 100) {
    state.gems += level.reward;
    document.getElementById('rewardBanner').style.display = 'block';
    document.getElementById('rewardGems').textContent = level.reward;
    state.streak++; state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = getToday();
    state.dailyHistory.push({ date: getToday(), completed: true, gems: level.reward, level: state.level });
    if (state.dailyHistory.length > 30) state.dailyHistory = state.dailyHistory.slice(-30);
    saveState(); playSound('levelUp'); checkAchievements(); showConfetti();
    scheduleReminder();
  }
}

function useStreakFreeze() {
  if (state.streakFreezes > 0 && state.streak > 0) { state.streakFreezes--; state.lastDate = getToday(); saveState(); alert('✅ تم تجميد السلسلة!'); renderTracker(); }
  else alert('❌ لا تمتلك تجميدات أو لا توجد سلسلة.');
}

// ==================== CONFETTI ====================
function showConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 2 + 's';
    c.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
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
  renderLeaderboardPreview();
  renderWeeklyReport();
}

function renderLeaderboardPreview() {
  const all = getFullLeaderboard();
  document.getElementById('leaderboardPreview').innerHTML = all.slice(0, 5).map((e, i) => `
    <div class="leader-row">
      <div class="leader-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
      <div class="leader-name">${e.name}${e.isYou ? ' (أنت)' : ''}</div>
      <div class="leader-score" style="color: #F97316;">🔥 ${e.streak}</div>
    </div>
  `).join('');
}

function renderWeeklyReport() {
  const weekAgo = getWeekAgo();
  const weekHistory = state.dailyHistory.filter(h => h.date >= weekAgo);
  if (weekHistory.length > 0) {
    document.getElementById('weeklyReport').style.display = 'block';
    document.getElementById('weekCompleted').textContent = weekHistory.filter(h => h.completed).length;
    document.getElementById('weekGems').textContent = weekHistory.reduce((sum, h) => sum + h.gems, 0);
    document.getElementById('weekStreak').textContent = state.longestStreak;
    
    const chart = document.getElementById('weeklyChart');
    const days = ['سب', 'أح', 'إث', 'ثل', 'أر', 'خم', 'جم'];
    chart.innerHTML = days.map((day, i) => {
      const dayDate = new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0];
      const completed = weekHistory.some(h => h.date === dayDate && h.completed);
      return `<div class="chart-bar"><div class="chart-fill" style="height: ${completed ? '100' : '20'}%; background: ${completed ? 'var(--success)' : 'var(--border)'};"></div><div class="chart-label">${day}</div></div>`;
    }).join('');
  }
}

// ==================== ANALYTICS ====================
function renderAnalytics() {
  document.getElementById('totalPrayers').textContent = state.totalPrayers;
  document.getElementById('totalQuran').textContent = state.totalQuran;
  document.getElementById('totalDhikr').textContent = state.totalDhikr;
  document.getElementById('totalKnowledge').textContent = state.totalKnowledge;
  
  // Activity chart
  const chart = document.getElementById('activityChart');
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
    const dayData = state.dailyHistory.find(h => h.date === date);
    days.push({ date, completed: dayData?.completed, gems: dayData?.gems || 0 });
  }
  chart.innerHTML = days.map(d => `
    <div class="chart-bar">
      <div class="chart-fill" style="height: ${d.completed ? '100' : '20'}%; background: ${d.completed ? 'var(--primary)' : 'var(--border)'};"></div>
      <div class="chart-label">${getDayName(d.date)}</div>
    </div>
  `).join('');
  
  // Goals
  const goalsList = document.getElementById('goalsList');
  goalsList.innerHTML = state.goals.map((g, i) => `
    <div class="goal-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border);">
      <div>
        <div style="font-weight: 700;">${g.icon} ${g.title}</div>
        <div style="font-size: 12px; color: var(--text-muted);">الهدف: ${g.target} — الحالي: ${g.current}</div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <div class="progress-container" style="width: 60px; height: 6px;"><div class="progress-bar" style="width: ${Math.min(100, (g.current / g.target) * 100)}%;"></div></div>
        <button onclick="deleteGoal(${i})" style="background: none; border: none; cursor: pointer; font-size: 18px;">🗑️</button>
      </div>
    </div>
  `).join('');
}

function addGoal() {
  const title = prompt('اسم الهدف:');
  if (title) {
    const target = parseInt(prompt('الهدف (رقم):'));
    if (target) {
      const icons = ['📖', '🕌', '💎', '🔥', '⭐', '🎯'];
      state.goals.push({ title, target, current: 0, icon: icons[Math.floor(Math.random() * icons.length)] });
      saveState(); renderAnalytics();
    }
  }
}

function deleteGoal(index) { state.goals.splice(index, 1); saveState(); renderAnalytics(); }

// ==================== FAMILY ====================
function renderFamily() {
  const container = document.getElementById('familyContent');
  if (!state.family) {
    container.innerHTML = `
      <div class="card"><div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">👨‍👩‍👧</div>
        <div style="font-weight: 800; font-size: 18px;">ابدأ عائلتك الآن</div>
        <div style="color: var(--text-muted); margin-top: 8px;">تابع تقدم أطفالك</div>
      </div>
      <button class="btn btn-primary" onclick="createFamily()">➕ إنشاء عائلة</button>
      <div style="text-align: center; margin: 16px 0; color: var(--text-muted);">— أو —</div>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="joinFamilyCode" placeholder="كود العائلة" style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 10px; text-align: center;" />
        <button class="btn btn-success" style="width: auto; padding: 12px 20px;" onclick="joinFamily()">انضمام</button>
      </div></div>`;
  } else {
    container.innerHTML = `
      <div class="card" style="background: #ECFDF5; border-color: #34D399;">
        <div style="font-weight: 800; margin-bottom: 8px;">كود العائلة</div>
        <div style="display: flex; gap: 8px;">
          <input type="text" value="${state.family.code}" readonly style="flex: 1; padding: 12px; border: 2px solid #34D399; border-radius: 10px; font-size: 24px; font-weight: 800; text-align: center; background: white;" />
          <button class="btn btn-success" style="width: auto; padding: 12px 20px;" onclick="shareFamilyCode()">📤 مشاركة</button>
        </div></div>
      <div class="card"><div style="font-weight: 800; margin-bottom: 12px;">أعضاء العائلة</div>
        ${state.family.members.map(m => `<div style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid var(--border); gap: 12px;">
          <div style="font-size: 24px;">${m.role === 'parent' ? '👨' : '👧'}</div>
          <div style="flex: 1; text-align: right;"><div style="font-weight: 700;">${m.name}</div><div style="font-size: 12px; color: var(--text-muted);">${m.role === 'parent' ? 'والد' : 'طفل'}</div></div>
          <div><span style="color: #F97316; font-weight: 800;">🔥 ${m.streak}</span> <span style="color: #F59E0B; font-weight: 800;">💎 ${m.gems}</span></div>
        </div>`).join('')}</div>
      <button class="btn btn-primary" style="background: var(--danger);" onclick="leaveFamily()">🚪 مغادرة</button>`;
  }
}

function createFamily() { const n = prompt('اسم العائلة:'); if (n) { state.family = { name: n, code: generateCode(), members: [{ name: 'أنت', role: 'parent', streak: state.streak, gems: state.gems }], rewards: [] }; saveState(); renderFamily(); } }
function joinFamily() { const c = document.getElementById('joinFamilyCode').value.toUpperCase(); if (c.length === 8) { const n = prompt('اسمك:'); if (n) { state.family = { name: 'عائلتك', code: c, members: [{ name: 'الأب', role: 'parent', streak: 10, gems: 500 }, { name: n, role: 'child', streak: state.streak, gems: state.gems }], rewards: [] }; saveState(); renderFamily(); } } }
function leaveFamily() { if (confirm('هل تريد المغادرة؟')) { state.family = null; saveState(); renderFamily(); } }
function shareFamilyCode() { const msg = `كود عائلتي: ${state.family.code}`; if (navigator.share) navigator.share({ text: msg }); else { navigator.clipboard.writeText(msg); alert('تم النسخ!'); } }

// ==================== LEADERBOARD ====================
function getFullLeaderboard() {
  return [
    { name: "أحمد", level: 4, streak: 45, gems: 1240 },
    { name: "فاطمة", level: 5, streak: 120, gems: 3890 },
    { name: "يوسف", level: 3, streak: 12, gems: 560 },
    { name: "عائشة", level: 4, streak: 67, gems: 2100 },
    { name: "محمد", level: 2, streak: 23, gems: 890 },
    { name: 'أنت', level: state.level, streak: state.streak, gems: state.gems, isYou: true }
  ];
}

function filterLeaderboard(f) { currentLeaderboardFilter = f; document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); renderLeaderboard(); }

function renderLeaderboard() {
  const all = getFullLeaderboard().sort((a, b) => currentLeaderboardFilter === 'streak' ? b.streak - a.streak : currentLeaderboardFilter === 'gems' ? b.gems - a.gems : b.level - a.level);
  document.getElementById('leaderboardList').innerHTML = all.map((e, i) => `
    <div class="card" style="padding: 16px; ${e.isYou ? 'border: 2px solid var(--primary);' : ''}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; font-size: 24px; font-weight: 900; text-align: center;">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
        <div style="flex: 1;"><div style="font-weight: 800;">${e.name}${e.isYou ? ' (أنت)' : ''}</div></div>
        <div style="font-size: 20px; font-weight: 900; color: ${currentLeaderboardFilter === 'streak' ? '#F97316' : currentLeaderboardFilter === 'gems' ? '#F59E0B' : '#3B82F6'};">
          ${currentLeaderboardFilter === 'streak' ? '🔥 ' + e.streak : currentLeaderboardFilter === 'gems' ? '💎 ' + e.gems : '📊 ' + e.level}
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== SHARE ====================
function renderShare() { document.getElementById('referralCode').value = state.referralCode; }
function copyReferralCode() { navigator.clipboard.writeText(state.referralCode); alert('تم النسخ!'); }
function shareWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent(`🌟 كود دعوتي: ${state.referralCode}`)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🌟 كود دعوتي: ${state.referralCode}`)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTelegram() { window.open(`https://t.me/share/url?text=${encodeURIComponent(`🌟 كود دعوتي: ${state.referralCode}`)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareNative() { if (navigator.share) { navigator.share({ text: `🌟 كود دعوتي: ${state.referralCode}` }); state.totalShared++; state.gems += 10; saveState(); } }
function applyFriendCode() { const c = document.getElementById('friendCode').value.toUpperCase(); if (c && c !== state.referralCode) { state.gems += 50; saveState(); alert('🎉 +50 جوهرة!'); } }

// ==================== ACHIEVEMENTS ====================
function renderAchievements() {
  let earned = 0;
  document.getElementById('achievementsGrid').innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned = state.achievements.includes(ach.id);
    if (isEarned) earned++;
    return `<div class="achievement-badge ${isEarned ? 'earned' : ''}"><div class="achievement-icon">${ach.icon}</div><div class="achievement-title">${ach.title}</div></div>`;
  }).join('');
  document.getElementById('achEarned').textContent = earned;
}

function checkAchievements() {
  const stats = { level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, completedChallenges: state.completedChallenges, family: state.family, totalShared: state.totalShared };
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(stats)) {
      state.achievements.push(ach.id); state.gems += ach.gems;
      playSound('achievement'); showNotification('🏆 إنجاز جديد!', `${ach.title} (+${ach.gems} جوهرة)`);
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
        <span style="font-weight: 900; color: #F59E0B;">💎 +${ch.reward}</span>
      </div>
      <button class="btn ${done ? 'btn-success' : 'btn-primary'}" style="margin-top: 12px;" onclick="completeChallenge(${ch.id})" ${done ? 'disabled' : ''}>${done ? '✓ مكتمل' : 'أكمل'}</button>
    </div>`;
  }).join('');
}

function completeChallenge(id) {
  if (!state.completedChallenges.includes(id)) {
    const ch = CHALLENGES.find(c => c.id === id);
    state.gems += ch.reward; state.completedChallenges.push(id);
    playSound('complete'); saveState(); renderChallenges(); checkAchievements();
  }
}

// ==================== SHOP ====================
function renderShop() {
  document.getElementById('shopContent').innerHTML = `
    <div class="card" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: white; text-align: center;">
      <div style="font-size: 36px; margin-bottom: 8px;">💎</div>
      <div style="font-size: 32px; font-weight: 900;">${state.gems}</div>
      <div style="font-size: 14px; opacity: 0.9;">جواهرك</div></div>
    <div class="card"><div style="font-weight: 800; margin-bottom: 8px;">🧊 تجميد السلسلة</div>
      <div style="color: var(--text-muted); margin-bottom: 12px;">احفظ سلامتك يوم واحد</div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 900; color: #F59E0B;">💎 ${STREAK_FREEZE.gems}</span>
        <button class="btn btn-primary" style="width: auto; padding: 10px 20px;" onclick="buyStreakFreeze()">شراء</button>
      </div>
      <div style="text-align: center; margin-top: 8px; font-size: 13px; color: var(--text-muted);">المملوكة: ${state.streakFreezes}</div></div>
    <div class="card"><div style="font-weight: 800; margin-bottom: 8px;">📊 ترقية المستوى</div>
      <div style="color: var(--text-muted); margin-bottom: 12px;">افتح المستوى التالي</div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 900; color: #F59E0B;">💎 200</span>
        <button class="btn btn-primary" style="width: auto; padding: 10px 20px;" onclick="buyLevelUp()" ${state.level >= 5 ? 'disabled' : ''}>ترقية</button>
      </div>
      <div style="text-align: center; margin-top: 8px; font-size: 13px; color: var(--text-muted);">المستوى: ${state.level}/5</div></div>`;
}

function buyStreakFreeze() { if (state.gems >= STREAK_FREEZE.gems) { state.gems -= STREAK_FREEZE.gems; state.streakFreezes++; saveState(); renderShop(); alert('✅ تم الشراء!'); } else alert('❌ جواهر غير كافية'); }
function buyLevelUp() { if (state.gems >= 200 && state.level < 5) { state.gems -= 200; state.level++; saveState(); playSound('levelUp'); alert(`🎉 المستوى ${state.level}!`); renderShop(); } }

// ==================== NOTIFICATIONS ====================
function toggleNotifications() {
  state.notifEnabled = !state.notifEnabled;
  if (state.notifEnabled && 'Notification' in window) {
    Notification.requestPermission().then(p => { if (p === 'granted') scheduleReminder(); });
  }
  saveState();
}

function scheduleReminder() {
  if (state.notifEnabled && 'serviceWorker' in navigator) {
    const now = new Date();
    const [h, m] = state.reminderTime.split(':');
    const reminder = new Date(now);
    reminder.setHours(parseInt(h), parseInt(m), 0);
    if (reminder <= now) reminder.setDate(reminder.getDate() + 1);
    
    const delay = reminder - now;
    setTimeout(() => {
      if (state.notifEnabled) {
        showNotification('🌙 وقت التتبع!', 'لا تنسَ مهامك اليومية. استمر في سلسلتك! 🔥');
        scheduleReminder();
      }
    }, delay);
  }
}

function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png' });
  }
}

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('levelSelector').innerHTML = LEVELS.map(l => `
    <button class="btn ${state.level === l.id ? 'btn-primary' : ''}" style="width: auto; padding: 8px 16px; font-size: 14px;" onclick="selectLevel(${l.id})">${l.icon} ${l.id}</button>
  `).join('');
}

function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = `backup-${getToday()}.json`; a.click(); }
function resetData() { if (confirm('هل أنت متأكد؟')) { localStorage.removeItem('islamicLevels'); location.reload(); } }

// ==================== PWA ====================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; document.getElementById('installBanner').classList.add('show'); });
function installApp() { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then(c => { if (c.outcome === 'accepted') document.getElementById('installBanner').classList.remove('show'); deferredPrompt = null; }); } }
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => { loadState(); renderLevels(); if (state.notifEnabled) scheduleReminder(); });
