// ==================== DATA ====================
const LEVELS = [
  {
    id: 1, title: "البداية المشرقة", subtitle: "البداية المباركة", duration: "30 دقيقة", reward: 10,
    color: ["#10B981", "#0D9488"], icon: "🌱", description: "أول خطوة في رحلتك الإيمانية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة صفحة واحدة من القرآن", "الاستماع إلى تلاوة صفحة"] },
      { title: "الصلاة والعبادة", tasks: ["الحفاظ على الصلوات الخمس", "صلاة ركعتي الضحى"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح أو المساء", "الاستغفار 100 مرة", "الصلاة على النبي 100 مرة"] },
      { title: "العلم الشرعي", tasks: ["قراءة حديث نبوي واحد", "قراءة فقرة من كتاب إسلامي"] }
    ]
  },
  {
    id: 2, title: "المسار المنتظم", subtitle: "المنتظم الملتزم", duration: "60 دقيقة", reward: 30,
    color: ["#3B82F6", "#0891B2"], icon: "📚", description: "تطور مستمر في عبادتك",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ آيتين", "تدبر المعاني"] },
      { title: "الصلاة والعبادة", tasks: ["الصلوات الخمس مع السنن", "صلاة الضحى يوميًا", "صلاة الوتر"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح والمساء", "الاستغفار 200 مرة"] },
      { title: "العلم الشرعي", tasks: ["15 دقيقة قراءة كتاب", "محاضرة علمية قصيرة"] }
    ]
  },
  {
    id: 3, title: "طالب العلم", subtitle: "طالب العلم المتفاني", duration: "90 دقيقة", reward: 60,
    color: ["#8B5CF6", "#DB2777"], icon: "🎓", description: "تعمق في طلب العلم الشرعي",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ نصف صفحة", "تدبر عميق"] },
      { title: "الصلاة والعبادة", tasks: ["صلاة الجماعة في المسجد", "قيام الليل ركعتين"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم كاملة", "الاستغفار 300 مرة"] },
      { title: "العلم الشرعي", tasks: ["30 دقيقة كتاب علمي", "درس علمي منتظم", "تدوين الفوائد"] }
    ]
  },
  {
    id: 4, title: "المجتهد", subtitle: "المجتهد الداعي", duration: "2-3 ساعات", reward: 120,
    color: ["#F97316", "#DC2626"], icon: "⚡", description: "همة عالية وعزيمة قوية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزأين يوميًا", "حفظ صفحة كاملة", "مراجعة محفوظ"] },
      { title: "الصلاة والعبادة", tasks: ["تبكير للمسجد", "صلاة الضحى 6 ركعات", "قيام الليل 4 ركعات"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم بالإكثار", "الاستغفار 500 مرة"] },
      { title: "العلم الشرعي", tasks: ["ساعة دراسة كتاب شرعي", "درس مع شيخ"] }
    ]
  },
  {
    id: 5, title: "الهمة العالية", subtitle: "القمة والتميز الإيماني", duration: "3-5 ساعات", reward: 200,
    color: ["#EF4444", "#E11D48"], icon: "👑", description: "القمة والتميز الإيماني",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة 3-5 أجزاء", "حفظ صفحتين", "تدبر مفصل"] },
      { title: "الصلاة والعبادة", tasks: ["قيام الليل نصف الليل", "صلاة الضحى 8 ركعات"] },
      { title: "الذكر والأدعية", tasks: ["أذكار بالإكثار الشديد", "الاستغفار 1000 مرة"] },
      { title: "العلم الشرعي", tasks: ["ساعتان دراسة متعمقة", "حلقات علم مسجدية"] }
    ]
  }
];

const CHALLENGES = [
  { id: 1, title: "قراءة جزء كامل", reward: 50, difficulty: "medium", icon: "📖" },
  { id: 2, title: "حفظ 5 آيات", reward: 100, difficulty: "hard", icon: "✍️" },
  { id: 3, title: "أذكار الصباح", reward: 30, difficulty: "easy", icon: "☀️" },
  { id: 4, title: "قيام الليل", reward: 150, difficulty: "hard", icon: "🌙" },
  { id: 5, title: "الصلاة في وقتها", reward: 40, difficulty: "easy", icon: "🕌" },
  { id: 6, title: "الدعاء للوالدين", reward: 25, difficulty: "easy", icon: "🤲" }
];

const SEASONAL_CHALLENGES = [
  { id: "ramadan-1", title: "صيام 10 أيام", reward: 100, icon: "🌙", target: 10, season: "ramadan" },
  { id: "ramadan-2", title: "تلاوة القرآن كاملاً", reward: 300, icon: "📖", target: 30, season: "ramadan" },
  { id: "ramadan-3", title: "قيام الليل كل ليلة", reward: 200, icon: "⭐", target: 30, season: "ramadan" },
  { id: "ramadan-4", title: "الإفطار على الصائمين", reward: 150, icon: "🍽️", target: 10, season: "ramadan" },
  { id: "dhul-hijjah-1", title: "صيام 9 ذي الحجة", reward: 150, icon: "🕋", target: 9, season: "dhul-hijjah" },
  { id: "dhul-hijjah-2", title: "ذبح أضحية", reward: 100, icon: "🐑", target: 1, season: "dhul-hijjah" }
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

// Streak freeze item
const STREAK_FREEZE = {
  name: "تجميد السلسلة",
  icon: "🧊",
  gems: 50,
  description: "يحافظ على سلامتك يوم واحد بدون إكمال المهام"
};

// ==================== STATE ====================
let state = {
  level: 1,
  streak: 0,
  longestStreak: 0,
  gems: 0,
  totalDays: 0,
  lastDate: null,
  todayTasks: [],
  completedChallenges: [],
  achievements: [],
  darkMode: false,
  notifEnabled: false,
  family: null,
  referralCode: null,
  referredBy: null,
  totalShared: 0,
  streakFreezes: 0,
  seasonalProgress: {},
  dailyReminderTime: "08:00",
  soundEnabled: true,
  weeklyGoal: 7,
  totalPrayers: 0,
  totalQuran: 0,
  totalDhikr: 0
};

let currentLeaderboardFilter = 'streak';
let currentSeasonFilter = 'all';

// ==================== AUDIO ====================
const sounds = {
  complete: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH+JkI+LhHl1dHt/goiLiYJ7eH2Dio6Oi4F8eX2Eio+PjIR+e32FiY6PjYV/e36GiY6PjoZ/e3+GiY6OjYV+e3+GiY6OjYV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjA=='),
  levelUp: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH+JkI+LhHl1dHx/g4iLiYJ7eH2Eio+PjIR+e32Eio+PjIR+e36GiY6PjYV+e3+GiY6PjYV+e3+GiY6PjYV+e3+GiY6OjYV+e3+GiY6OjYV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjA=='),
  achievement: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH+JkI+LhHl1dHx/g4iLiYJ7eH2Eio+PjIR+e32Eio+PjIR+e36GiY6PjYV+e3+GiY6PjYV+e3+GiY6PjYV+e3+GiY6OjYV+e3+GiY6OjYV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjIV+e3+GiY6OjA=='),
  click: new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA=')
};

function playSound(name) {
  if (state.soundEnabled && sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(() => {});
  }
}

// ==================== UTILITY ====================
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function loadState() {
  const saved = localStorage.getItem('islamicLevels');
  if (saved) state = { ...state, ...JSON.parse(saved) };
  if (!state.referralCode) state.referralCode = generateCode();
  
  // Check if streak should be frozen
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (state.lastDate === yesterday && !state.todayTasks.length) {
    // Streak is safe, no action needed
  } else if (state.lastDate !== today && state.lastDate !== yesterday && state.streak > 0) {
    // Streak broken - check for freeze
    if (state.streakFreezes > 0) {
      state.streakFreezes--;
      showNotification('🧊 تم تجميد السلسلة', 'تم استخدام تجميد السلسلة للحفاظ على سلسلتك!');
    }
  }
  
  updateTheme();
}

function saveState() {
  localStorage.setItem('islamicLevels', JSON.stringify(state));
}

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
  if (name === 'settings') renderSettings();
}

// ==================== HOME ====================
function renderLevels() {
  const container = document.getElementById('levelsContainer');
  container.innerHTML = LEVELS.map(level => `
    <div class="level-card" onclick="selectLevel(${level.id})">
      <div class="level-gradient" style="background: linear-gradient(135deg, ${level.color[0]} 0%, ${level.color[1]} 100%);">
        <div class="level-emoji">${level.icon}</div>
        <div class="level-name">${level.title}</div>
        <div class="level-sub">${level.subtitle}</div>
        <div class="level-time">⏱️ ${level.duration} — 💎 ${level.reward} جوهرة</div>
      </div>
      <div class="level-desc">${level.description}</div>
    </div>
  `).join('');
}

function selectLevel(levelId) {
  state.level = levelId;
  state.todayTasks = [];
  saveState();
  showScreen('tracker');
}

// ==================== TRACKER ====================
function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  const today = new Date().toISOString().split('T')[0];
  
  if (state.lastDate !== today) {
    state.todayTasks = [];
    state.lastDate = today;
    saveState();
  }
  
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  document.getElementById('freezeCount').textContent = state.streakFreezes;
  
  const container = document.getElementById('tasksContainer');
  let html = '';
  let taskId = 0;
  
  level.sections.forEach(section => {
    html += `<div class="task-section">`;
    html += `<div class="task-section-title">${section.title}</div>`;
    section.tasks.forEach(task => {
      const isCompleted = state.todayTasks.includes(taskId);
      html += `
        <div class="task-item ${isCompleted ? 'completed' : ''}" onclick="toggleTask(${taskId})">
          <div class="task-checkbox">${isCompleted ? '✓' : ''}</div>
          <div class="task-text">${task}</div>
        </div>
      `;
      taskId++;
    });
    html += `</div>`;
  });
  
  container.innerHTML = html;
  updateProgress();
}

function toggleTask(taskId) {
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) {
    state.todayTasks.push(taskId);
    playSound('complete');
  } else {
    state.todayTasks.splice(idx, 1);
  }
  saveState();
  renderTracker();
}

function updateProgress() {
  const level = LEVELS.find(l => l.id === state.level);
  const totalTasks = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completed = state.todayTasks.length;
  const percent = Math.round((completed / totalTasks) * 100);
  
  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('progressBar').style.width = percent + '%';
  
  if (percent === 100) {
    const reward = level.reward;
    state.gems += reward;
    document.getElementById('rewardBanner').style.display = 'block';
    document.getElementById('rewardGems').textContent = reward;
    state.streak++;
    state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = new Date().toISOString().split('T')[0];
    saveState();
    playSound('levelUp');
    checkAchievements();
    showConfetti();
  }
}

function useStreakFreeze() {
  if (state.streakFreezes > 0 && state.streak > 0) {
    state.streakFreezes--;
    state.lastDate = new Date().toISOString().split('T')[0];
    saveState();
    alert('✅ تم تجميد السلسلة! ستبقى سلسلتك للأمام.');
    renderTracker();
  } else {
    alert('❌ لا تمتلك تجميدات أو لا توجد سلسلة للحماية.');
  }
}

// ==================== CONFETTI ====================
function showConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// ==================== DASHBOARD ====================
function renderDashboard() {
  document.getElementById('statLevel').textContent = state.level;
  document.getElementById('statGems').textContent = state.gems;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statDays').textContent = state.totalDays;
  
  const level = LEVELS.find(l => l.id === state.level);
  const totalTasks = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const percent = Math.round((state.todayTasks.length / totalTasks) * 100);
  document.getElementById('dashProgress').style.width = percent + '%';
  
  renderLeaderboardPreview();
}

function renderLeaderboardPreview() {
  const container = document.getElementById('leaderboardPreview');
  const all = getFullLeaderboard();
  container.innerHTML = all.slice(0, 5).map((entry, i) => `
    <div class="leader-row">
      <div class="leader-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
      <div class="leader-name">${entry.name}${entry.isYou ? ' (أنت)' : ''}</div>
      <div class="leader-score" style="color: #F97316;">🔥 ${entry.streak}</div>
    </div>
  `).join('');
}

// ==================== FAMILY ====================
function renderFamily() {
  const container = document.getElementById('familyContent');
  
  if (!state.family) {
    container.innerHTML = `
      <div class="card">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; margin-bottom: 12px;">👨‍👩‍👧</div>
          <div style="font-weight: 800; font-size: 18px;">ابدأ عائلتك الآن</div>
          <div style="color: var(--text-muted); margin-top: 8px;">تابع تقدم أطفالك وشاركهم المكافآت</div>
        </div>
        <button class="btn btn-primary" onclick="createFamily()">➕ إنشاء عائلة جديدة</button>
        <div style="text-align: center; margin: 16px 0; color: var(--text-muted);">— أو —</div>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="joinFamilyCode" placeholder="كود العائلة" style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 10px; text-align: center; font-size: 16px;" />
          <button class="btn btn-success" style="width: auto; padding: 12px 20px;" onclick="joinFamily()">انضمام</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="card" style="background: #ECFDF5; border-color: #34D399;">
        <div style="font-weight: 800; margin-bottom: 8px;">كود العائلة</div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="text" value="${state.family.code}" readonly style="flex: 1; padding: 12px; border: 2px solid #34D399; border-radius: 10px; font-size: 24px; font-weight: 800; text-align: center; background: white;" />
          <button class="btn btn-success" style="width: auto; padding: 12px 20px;" onclick="shareFamilyCode()">📤 مشاركة</button>
        </div>
      </div>
      <div class="card">
        <div style="font-weight: 800; margin-bottom: 12px;">أعضاء العائلة</div>
        ${state.family.members.map(m => `
          <div style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid var(--border); gap: 12px;">
            <div style="font-size: 24px;">${m.role === 'parent' ? '👨' : '👧'}</div>
            <div style="flex: 1; text-align: right;">
              <div style="font-weight: 700;">${m.name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${m.role === 'parent' ? 'والد' : 'طفل'}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <span style="color: #F97316; font-weight: 800;">🔥 ${m.streak}</span>
              <span style="color: #F59E0B; font-weight: 800;">💎 ${m.gems}</span>
            </div>
          </div>
        `).join('')}
      </div>
      ${state.family.rewards.length ? `
        <div class="card">
          <div style="font-weight: 800; margin-bottom: 12px;">المكافآت</div>
          ${state.family.rewards.map((r, i) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700;">${r.name}</div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #F59E0B; font-weight: 800;">💎 ${r.gems}</span>
                ${r.completed ? '<span style="color: var(--success);">✓</span>' : `<button class="btn btn-success" style="width: auto; padding: 6px 12px; font-size: 12px;" onclick="redeemReward(${i})">استبدال</button>`}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      <button class="btn btn-primary" style="background: var(--danger);" onclick="leaveFamily()">🚪 مغادرة العائلة</button>
    `;
  }
}

function createFamily() {
  const name = prompt('اسم العائلة:');
  if (name) {
    state.family = {
      name, code: generateCode(),
      members: [{ name: 'أنت', role: 'parent', streak: state.streak, gems: state.gems }],
      rewards: []
    };
    saveState(); renderFamily();
  }
}

function joinFamily() {
  const code = document.getElementById('joinFamilyCode').value.toUpperCase();
  if (code.length === 8) {
    const name = prompt('اسمك:');
    if (name) {
      state.family = {
        name: 'عائلتك', code,
        members: [
          { name: 'الأب', role: 'parent', streak: 10, gems: 500 },
          { name, role: 'child', streak: state.streak, gems: state.gems }
        ],
        rewards: []
      };
      saveState(); renderFamily();
    }
  }
}

function leaveFamily() {
  if (confirm('هل تريد مغادرة العائلة؟')) { state.family = null; saveState(); renderFamily(); }
}

function shareFamilyCode() {
  const msg = `كود عائلتي: ${state.family.code}\nانضم إلى عائلتنا في المستويات الإيمانية!`;
  if (navigator.share) navigator.share({ title: 'كود العائلة', text: msg });
  else { navigator.clipboard.writeText(msg); alert('تم نسخ الكود!'); }
}

function addFamilyReward() {
  const name = document.getElementById('rewardName').value;
  const gems = parseInt(document.getElementById('rewardGemsReq').value);
  if (name && gems) { state.family.rewards.push({ name, gems, completed: false }); saveState(); renderFamily(); }
}

function redeemReward(index) {
  const reward = state.family.rewards[index];
  if (state.gems >= reward.gems) { state.gems -= reward.gems; state.family.rewards[index].completed = true; saveState(); renderFamily(); }
  else alert('ليس لديك جواهر كافية!');
}

// ==================== LEADERBOARD ====================
function getFullLeaderboard() {
  const fakeUsers = [
    { name: "أحمد", level: 4, streak: 45, gems: 1240 },
    { name: "فاطمة", level: 5, streak: 120, gems: 3890 },
    { name: "يوسف", level: 3, streak: 12, gems: 560 },
    { name: "عائشة", level: 4, streak: 67, gems: 2100 },
    { name: "محمد", level: 2, streak: 23, gems: 890 },
    { name: "خديجة", level: 3, streak: 34, gems: 1100 },
    { name: "علي", level: 4, streak: 56, gems: 1800 },
    { name: "زينب", level: 2, streak: 18, gems: 720 }
  ];
  fakeUsers.push({ name: 'أنت', level: state.level, streak: state.streak, gems: state.gems, isYou: true });
  return fakeUsers;
}

function filterLeaderboard(filter) {
  currentLeaderboardFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderLeaderboard();
}

function renderLeaderboard() {
  const all = getFullLeaderboard();
  const sorted = [...all].sort((a, b) => {
    if (currentLeaderboardFilter === 'streak') return b.streak - a.streak;
    if (currentLeaderboardFilter === 'gems') return b.gems - a.gems;
    return b.level - a.level;
  });
  
  document.getElementById('leaderboardList').innerHTML = sorted.map((entry, i) => `
    <div class="card" style="padding: 16px; ${entry.isYou ? 'border: 2px solid var(--primary); background: rgba(139,92,246,0.05);' : ''}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; font-size: 24px; font-weight: 900; text-align: center;">
          ${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 800;">${entry.name}${entry.isYou ? ' (أنت)' : ''}</div>
          <div style="font-size: 12px; color: var(--text-muted);">المستوى ${entry.level}</div>
        </div>
        <div>
          ${currentLeaderboardFilter === 'streak' ? `<span style="font-size: 20px; font-weight: 900; color: #F97316;">🔥 ${entry.streak}</span>` : ''}
          ${currentLeaderboardFilter === 'gems' ? `<span style="font-size: 20px; font-weight: 900; color: #F59E0B;">💎 ${entry.gems}</span>` : ''}
          ${currentLeaderboardFilter === 'level' ? `<span style="font-size: 20px; font-weight: 900; color: #3B82F6;">📊 ${entry.level}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== SHARE ====================
function renderShare() {
  document.getElementById('referralCode').value = state.referralCode;
}

function copyReferralCode() { navigator.clipboard.writeText(state.referralCode); alert('تم نسخ الكود!'); }

function shareWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(`🌟 انضم إلي في تطبيق المستويات الإيمانية! كود دعوتي: ${state.referralCode}`)}`);
  state.totalShared++; state.gems += 10; saveState();
}

function shareTwitter() {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🌟 أنا أتابع رحلتي الإيمانية! كود دعوتي: ${state.referralCode}`)}`);
  state.totalShared++; state.gems += 10; saveState();
}

function shareTelegram() {
  window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(`🌟 انضم إلي! كود دعوتي: ${state.referralCode}`)}`);
  state.totalShared++; state.gems += 10; saveState();
}

function shareNative() {
  if (navigator.share) { navigator.share({ title: 'المستويات الإيمانية', text: `🌟 كود دعوتي: ${state.referralCode}` }); state.totalShared++; state.gems += 10; saveState(); }
}

function applyFriendCode() {
  const code = document.getElementById('friendCode').value.toUpperCase();
  if (code && code !== state.referralCode) { state.gems += 50; state.referredBy = code; saveState(); alert('🎉 حصلت على 50 جوهرة!'); }
}

// ==================== ACHIEVEMENTS ====================
function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  let earned = 0;
  container.innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned = state.achievements.includes(ach.id);
    if (isEarned) earned++;
    return `<div class="achievement-badge ${isEarned ? 'earned' : ''}"><div class="achievement-icon">${ach.icon}</div><div class="achievement-title">${ach.title}</div></div>`;
  }).join('');
  document.getElementById('achEarned').textContent = earned;
  document.getElementById('achTotal').textContent = ACHIEVEMENTS.length;
}

function checkAchievements() {
  const stats = { level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, completedChallenges: state.completedChallenges, family: state.family, totalShared: state.totalShared };
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(stats)) {
      state.achievements.push(ach.id); state.gems += ach.gems;
      playSound('achievement');
      showNotification('🏆 إنجاز جديد!', `${ach.title} (+${ach.gems} جوهرة)`);
    }
  });
  saveState();
}

// ==================== CHALLENGES ====================
function renderChallenges() {
  const completed = state.completedChallenges.length;
  document.getElementById('challengesCount').textContent = `${completed}/${CHALLENGES.length}`;
  
  const container = document.getElementById('challengesContainer');
  container.innerHTML = CHALLENGES.map(ch => {
    const isCompleted = state.completedChallenges.includes(ch.id);
    return `
      <div class="card" style="border-color: ${isCompleted ? 'var(--success)' : 'var(--border)'};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 36px;">${ch.icon}</span>
          <div style="flex: 1;"><div style="font-weight: 800;">${ch.title}</div>
            <span class="badge badge-${ch.difficulty}">${ch.difficulty === 'easy' ? 'سهل' : ch.difficulty === 'medium' ? 'متوسط' : 'صعب'}</span></div>
          <span style="font-weight: 900; color: #F59E0B;">💎 +${ch.reward}</span>
        </div>
        <button class="btn ${isCompleted ? 'btn-success' : 'btn-primary'}" style="margin-top: 12px;" onclick="completeChallenge(${ch.id})" ${isCompleted ? 'disabled' : ''}>
          ${isCompleted ? '✓ مكتمل' : 'أكمل'}
        </button>
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
  const container = document.getElementById('shopContent');
  container.innerHTML = `
    <div class="card" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white;">
      <div style="text-align: center;">
        <div style="font-size: 36px; margin-bottom: 8px;">💎</div>
        <div style="font-size: 32px; font-weight: 900;">${state.gems}</div>
        <div style="font-size: 14px; opacity: 0.9;">جواهرك المتاحة</div>
      </div>
    </div>
    
    <div class="card">
      <div style="font-weight: 800; margin-bottom: 12px;">🧊 تجميد السلسلة</div>
      <div style="color: var(--text-muted); margin-bottom: 12px;">احفظ سلامتك يوم واحد بدون إكمال المهام</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 900; color: #F59E0B;">💎 ${STREAK_FREEZE.gems}</span>
        <button class="btn btn-primary" style="width: auto; padding: 10px 20px;" onclick="buyStreakFreeze()">شراء</button>
      </div>
      <div style="text-align: center; margin-top: 8px; font-size: 13px; color: var(--text-muted);">المملوكة: ${state.streakFreezes}</div>
    </div>
    
    <div class="card">
      <div style="font-weight: 800; margin-bottom: 12px;">📊 ترقية المستوى</div>
      <div style="color: var(--text-muted); margin-bottom: 12px;">افتح المستوى التالي بـ 200 جوهرة</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 900; color: #F59E0B;">💎 200</span>
        <button class="btn btn-primary" style="width: auto; padding: 10px 20px;" onclick="buyLevelUp()" ${state.level >= 5 ? 'disabled' : ''}>ترقية</button>
      </div>
      <div style="text-align: center; margin-top: 8px; font-size: 13px; color: var(--text-muted);">المستوى الحالي: ${state.level}/5</div>
    </div>
  `;
}

function buyStreakFreeze() {
  if (state.gems >= STREAK_FREEZE.gems) {
    state.gems -= STREAK_FREEZE.gems; state.streakFreezes++; saveState(); renderShop();
    alert('✅ تم شراء تجميد السلسلة!');
  } else alert('❌ جواهر غير كافية');
}

function buyLevelUp() {
  if (state.gems >= 200 && state.level < 5) {
    state.gems -= 200; state.level++; saveState(); renderShop();
    playSound('levelUp'); alert(`🎉 تمت ترقيةك إلى المستوى ${state.level}!`);
  }
}

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  
  const selector = document.getElementById('levelSelector');
  selector.innerHTML = LEVELS.map(l => `
    <button class="btn ${state.level === l.id ? 'btn-primary' : ''}" style="width: auto; padding: 8px 16px; font-size: 14px;" onclick="selectLevel(${l.id})">
      ${l.icon} ${l.id}
    </button>
  `).join('');
}

function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission(); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function showNotification(title, body) { if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: 'icons/icon-192.png' }); }
function exportData() { const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `backup-${new Date().toISOString().split('T')[0]}.json`; a.click(); }
function resetData() { if (confirm('هل أنت متأكد؟')) { localStorage.removeItem('islamicLevels'); location.reload(); } }

// ==================== PWA ====================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; document.getElementById('installBanner').classList.add('show'); });
function installApp() { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then(choice => { if (choice.outcome === 'accepted') document.getElementById('installBanner').classList.remove('show'); deferredPrompt = null; }); } }
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => { loadState(); renderLevels(); });
