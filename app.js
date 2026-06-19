// ==================== DATA ====================
const LEVELS = [
  {
    id: 1,
    title: "البداية المشرقة",
    subtitle: "البداية المباركة",
    duration: "30 دقيقة",
    reward: 10,
    color: ["#10B981", "#0D9488"],
    icon: "🌱",
    description: "أول خطوة في رحلتك الإيمانية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة صفحة واحدة من القرآن", "الاستماع إلى تلاوة صفحة"] },
      { title: "الصلاة والعبادة", tasks: ["الحفاظ على الصلوات الخمس", "صلاة ركعتي الضحى"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح أو المساء", "الاستغفار 100 مرة", "الصلاة على النبي 100 مرة"] },
      { title: "العلم الشرعي", tasks: ["قراءة حديث نبوي واحد", "قراءة فقرة من كتاب إسلامي"] }
    ]
  },
  {
    id: 2,
    title: "المسار المنتظم",
    subtitle: "المنتظم الملتزم",
    duration: "60 دقيقة",
    reward: 30,
    color: ["#3B82F6", "#0891B2"],
    icon: "📚",
    description: "تطور مستمر في عبادتك",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ آيتين", "تدبر المعاني"] },
      { title: "الصلاة والعبادة", tasks: ["الصلوات الخمس مع السنن", "صلاة الضحى يوميًا", "صلاة الوتر"] },
      { title: "الذكر والأدعية", tasks: ["أذكار الصباح والمساء", "الاستغفار 200 مرة"] },
      { title: "العلم الشرعي", tasks: ["15 دقيقة قراءة كتاب", "محاضرة علمية قصيرة"] }
    ]
  },
  {
    id: 3,
    title: "طالب العلم",
    subtitle: "طالب العلم المتفاني",
    duration: "90 دقيقة",
    reward: 60,
    color: ["#8B5CF6", "#DB2777"],
    icon: "🎓",
    description: "تعمق في طلب العلم الشرعي",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزء يوميًا", "حفظ نصف صفحة", "تدبر عميق"] },
      { title: "الصلاة والعبادة", tasks: ["صلاة الجماعة في المسجد", "قيام الليل ركعتين"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم كاملة", "الاستغفار 300 مرة"] },
      { title: "العلم الشرعي", tasks: ["30 دقيقة كتاب علمي", "درس علمي منتظم", "تدوين الفوائد"] }
    ]
  },
  {
    id: 4,
    title: "المجتهد",
    subtitle: "المجتهد الداعي",
    duration: "2-3 ساعات",
    reward: 120,
    color: ["#F97316", "#DC2626"],
    icon: "⚡",
    description: "همة عالية وعزيمة قوية",
    sections: [
      { title: "القرآن الكريم", tasks: ["تلاوة جزأين يوميًا", "حفظ صفحة كاملة", "مراجعة محفوظ"] },
      { title: "الصلاة والعبادة", tasks: ["تبكير للمسجد", "صلاة الضحى 6 ركعات", "قيام الليل 4 ركعات"] },
      { title: "الذكر والأدعية", tasks: ["أذكار اليوم بالإكثار", "الاستغفار 500 مرة"] },
      { title: "العلم الشرعي", tasks: ["ساعة دراسة كتاب شرعي", "درس مع شيخ"] }
    ]
  },
  {
    id: 5,
    title: "الهمة العالية",
    subtitle: "القمة والتميز الإيماني",
    duration: "3-5 ساعات",
    reward: 200,
    color: ["#EF4444", "#E11D48"],
    icon: "👑",
    description: "القمة والتميز الإيماني",
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

const ACHIEVEMENTS = [
  { id: "first-day", title: "أول يوم", icon: "🌟", gems: 10, check: s => s.totalDays >= 1 },
  { id: "streak-3", title: "سلسلة 3", icon: "🔥", gems: 30, check: s => s.streak >= 3 },
  { id: "streak-7", title: "سلسلة أسبوع", icon: "🔥", gems: 100, check: s => s.streak >= 7 },
  { id: "streak-30", title: "سلسلة شهر", icon: "🔥", gems: 500, check: s => s.streak >= 30 },
  { id: "level-2", title: "المستوى 2", icon: "📚", gems: 50, check: s => s.level >= 2 },
  { id: "level-3", title: "المستوى 3", icon: "🎓", gems: 100, check: s => s.level >= 3 },
  { id: "level-5", title: "المستوى 5", icon: "👑", gems: 300, check: s => s.level >= 5 },
  { id: "gems-100", title: "100 جوهرة", icon: "💎", gems: 20, check: s => s.gems >= 100 },
  { id: "gems-500", title: "500 جوهرة", icon: "💎", gems: 100, check: s => s.gems >= 500 },
  { id: "perfect-week", title: "أسبوع كامل", icon: "✅", gems: 150, check: s => s.totalDays >= 7 }
];

const LEADERBOARD = [
  { name: "أحمد", level: 4, streak: 45, gems: 1240 },
  { name: "فاطمة", level: 5, streak: 120, gems: 3890 },
  { name: "يوسف", level: 3, streak: 12, gems: 560 },
  { name: "عائشة", level: 4, streak: 67, gems: 2100 },
  { name: "محمد", level: 2, streak: 23, gems: 890 }
];

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
  notifEnabled: false
};

// Load state from localStorage
function loadState() {
  const saved = localStorage.getItem('islamicLevels');
  if (saved) {
    state = { ...state, ...JSON.parse(saved) };
  }
  updateTheme();
}

// Save state to localStorage
function saveState() {
  localStorage.setItem('islamicLevels', JSON.stringify(state));
}

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  document.getElementById(name + 'Screen').classList.add('active');
  document.querySelector(`[data-screen="${name}"]`).classList.add('active');
  
  if (name === 'tracker') renderTracker();
  if (name === 'dashboard') renderDashboard();
  if (name === 'achievements') renderAchievements();
  if (name === 'challenges') renderChallenges();
}

// ==================== RENDERING ====================
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

function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  if (!level) return;
  
  // Get today's tasks
  const today = new Date().toISOString().split('T')[0];
  if (state.lastDate !== today) {
    state.todayTasks = [];
    state.lastDate = today;
    saveState();
  }
  
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  
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
    
    // Update streak
    const today = new Date().toISOString().split('T')[0];
    if (state.lastDate !== today) {
      state.streak++;
      state.totalDays++;
      state.longestStreak = Math.max(state.longestStreak, state.streak);
      state.lastDate = today;
    }
    
    saveState();
    checkAchievements();
  }
}

function toggleTask(taskId) {
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) {
    state.todayTasks.push(taskId);
  } else {
    state.todayTasks.splice(idx, 1);
  }
  saveState();
  renderTracker();
}

function renderDashboard() {
  document.getElementById('statLevel').textContent = state.level;
  document.getElementById('statGems').textContent = state.gems;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statDays').textContent = state.totalDays;
  
  const level = LEVELS.find(l => l.id === state.level);
  const totalTasks = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completed = state.todayTasks.length;
  const percent = Math.round((completed / totalTasks) * 100);
  
  document.getElementById('dashProgress').style.width = percent + '%';
  document.getElementById('dashProgressText').textContent = percent + '%';
  
  // Leaderboard
  const container = document.getElementById('leaderboardPreview');
  const sorted = [...LEADERBOARD].sort((a, b) => b.streak - a.streak).slice(0, 5);
  container.innerHTML = sorted.map((entry, i) => `
    <div class="leader-row">
      <div class="leader-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</div>
      <div class="leader-name">${entry.name}</div>
      <div class="leader-score" style="color: #F97316;">🔥 ${entry.streak}</div>
    </div>
  `).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  let earned = 0;
  
  container.innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned = state.achievements.includes(ach.id);
    if (isEarned) earned++;
    return `
      <div class="achievement-badge ${isEarned ? 'earned' : ''}">
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-title">${ach.title}</div>
      </div>
    `;
  }).join('');
  
  document.getElementById('achEarned').textContent = earned;
  document.getElementById('achTotal').textContent = ACHIEVEMENTS.length;
}

function renderChallenges() {
  const container = document.getElementById('challengesContainer');
  const completed = state.completedChallenges.length;
  document.getElementById('challengesCount').textContent = `${completed}/${CHALLENGES.length}`;
  
  container.innerHTML = CHALLENGES.map(ch => {
    const isCompleted = state.completedChallenges.includes(ch.id);
    return `
      <div class="card" style="border-color: ${isCompleted ? 'var(--success)' : 'var(--border)'};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 36px;">${ch.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 800;">${ch.title}</div>
            <span class="badge badge-${ch.difficulty}">${ch.difficulty === 'easy' ? 'سهل' : ch.difficulty === 'medium' ? 'متوسط' : 'صعب'}</span>
          </div>
          <span style="font-weight: 900; color: #F59E0B;">💎 +${ch.reward}</span>
        </div>
        <button class="btn ${isCompleted ? 'btn-success' : 'btn-primary'}" style="margin-top: 12px;" 
                onclick="completeChallenge(${ch.id})" ${isCompleted ? 'disabled' : ''}>
          ${isCompleted ? '✓ مكتمل' : 'أكمل'}
        </button>
      </div>
    `;
  }).join('');
}

// ==================== ACTIONS ====================
function selectLevel(levelId) {
  state.level = levelId;
  state.todayTasks = [];
  saveState();
  showScreen('tracker');
}

function completeChallenge(id) {
  if (!state.completedChallenges.includes(id)) {
    const ch = CHALLENGES.find(c => c.id === id);
    state.gems += ch.reward;
    state.completedChallenges.push(id);
    saveState();
    renderChallenges();
    checkAchievements();
  }
}

function checkAchievements() {
  const stats = { level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays };
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(stats)) {
      state.achievements.push(ach.id);
      state.gems += ach.gems;
      showNotification('🏆 إنجاز جديد!', `حصلت على: ${ach.title} (+${ach.gems} جوهرة)`);
    }
  });
  saveState();
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  updateTheme();
  saveState();
}

function updateTheme() {
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) toggle.classList.toggle('active', state.darkMode);
}

function toggleNotifications() {
  state.notifEnabled = !state.notifEnabled;
  const toggle = document.getElementById('notifToggle');
  if (toggle) toggle.classList.toggle('active', state.notifEnabled);
  
  if (state.notifEnabled && 'Notification' in window) {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        scheduleReminder();
      }
    });
  }
  saveState();
}

function scheduleReminder() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Schedule daily reminder via service worker
    navigator.serviceWorker.ready.then(reg => {
      // This would need a backend to schedule push notifications
      // For now, we'll just show a local notification
    });
  }
}

function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'icons/icon-192.png' });
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `islamic-levels-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function resetData() {
  if (confirm('هل أنت متأكد؟ سيتم مسح جميع بياناتك.')) {
    localStorage.removeItem('islamicLevels');
    state = {
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
      notifEnabled: false
    };
    saveState();
    updateTheme();
    renderTracker();
    alert('تم مسح البيانات');
  }
}

// ==================== PWA ====================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.add('show');
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        document.getElementById('installBanner').classList.remove('show');
      }
      deferredPrompt = null;
    });
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW error:', err));
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderLevels();
  renderTracker();
  
  // Set initial toggle states
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
});
