// ==================== STATE ====================
let authState = { isLoggedIn: false, user: null, isGuest: false };
let state = {
  level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, soundEnabled: true, vibrationEnabled: true, autoSync: true, family: null,
  referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
  totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null,
  prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {}, todayQuran: 0,
  tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33,
  dailyGoals: []
};

// ==================== DUA DATA ====================
const DUAS = {
  morning: {
    title: 'أدعية الصباح', icon: '☀️',
    items: [
      { text: 'اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور', occasion: 'عند الاستيقاظ' },
      { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', occasion: 'صباح كل يوم' },
      { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم', occasion: '3 مرات صباحاً' },
      { text: 'سبحان الله وبحمده، سبحان الله العظيم', occasion: 'أداء الصباح' },
      { text: 'اللهم صلِّ وسلم على نبينا محمد', occasion: '10 مرات صباحاً' }
    ]
  },
  evening: {
    title: 'أدعية المساء', icon: '🌙',
    items: [
      { text: 'اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المحشور', occasion: 'عند النوم' },
      { text: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه', occasion: '100 مرة' },
      { text: 'أعوذ بكلمات الله التامات من شر ما خلق', occasion: '3 مرات مساءً' },
      { text: 'حسبي الله لا إله إلا عليه توكلت وهو رب العرش العظيم', occasion: '7 مرات' }
    ]
  },
  food: {
    title: 'أدعية الطعام', icon: '🍽️',
    items: [
      { text: 'بسم الله', occasion: 'قبل الأكل' },
      { text: 'اللهم بارك لنا فيما رزقتنا واحذرنا عذاب النار', occasion: 'قبل الأكل' },
      { text: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة', occasion: 'بعد الأكل' }
    ]
  },
  travel: {
    title: 'أدعية السفر', icon: '✈️',
    items: [
      { text: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون', occasion: 'عند السفر' },
      { text: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى', occasion: 'عند السفر' },
      { text: 'اللهم هو صحبنا في السفر والخليفة في الأهل', occasion: 'عند السفر' }
    ]
  },
  sleep: {
    title: 'أدعية النوم', icon: '😴',
    items: [
      { text: 'باسمك اللهم أموت وأحيا', occasion: 'قبل النوم' },
      { text: 'اللهم قني عذابك يوم تبعث عبادك', occasion: 'قبل النوم' },
      { text: 'سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر، ولا حول ولا قوة إلا بالله', occasion: '33 مرة' }
    ]
  },
  distress: {
    title: 'أدعية الكرب', icon: '🆘',
    items: [
      { text: 'لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم', occasion: 'عند الكرب' },
      { text: 'اللهم رحمتك أرجو فلا تكلني إلى نفسي طرفة عين وأصلح لي شأني كله، لا إله إلا أنت', occasion: '3 مرات' },
      { text: 'حسبي الله ونعم الوكيل', occasion: '7 مرات' },
      { text: 'اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً', occasion: 'عند الكرب' }
    ]
  }
};

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function playSound(type) { if (!state.soundEnabled) return; try { const a = new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='); a.play().catch(() => {}); } catch(e) {} }
function vibrate(pattern) { if (state.vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern || 50); }
function getDefaultState() { return { level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null, todayTasks: [], completedChallenges: [], achievements: [], darkMode: false, notifEnabled: false, soundEnabled: true, vibrationEnabled: true, autoSync: true, family: null, referralCode: generateCode(), totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [], totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null, prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {}, todayQuran: 0, tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33, dailyGoals: [] }; }
function loadState() { const s = localStorage.getItem('islamicLevels'); if (s) { const parsed = JSON.parse(s); state = { ...getDefaultState(), ...parsed }; } if (!state.referralCode) state.referralCode = generateCode(); if (!state.dailyHistory) state.dailyHistory = []; if (!state.todayPrayers) state.todayPrayers = {}; if (!state.todayAdhkar) state.todayAdhkar = {}; if (!state.dailyGoals) state.dailyGoals = []; updateTheme(); }
function saveState() { localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// ==================== AUTH ====================
function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; }
function login() { const e = document.getElementById('authEmail').value; const p = document.getElementById('authPassword').value; if (!e || !p) { alert('أدخل البريد وكلمة المرور'); return; } const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]'); const user = users.find(u => u.email === e && u.password === p); if (user) { authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); loadUserData(user.id); showApp(); } else alert('بيانات الدخول غير صحيحة'); }
function register() { const n = document.getElementById('regName').value; const e = document.getElementById('regEmail').value; const p = document.getElementById('regPassword').value; if (!n || !e || !p) { alert('أكمل جميع الحقول'); return; } const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]'); if (users.find(u => u.email === e)) { alert('البريد مسجل مسبقاً'); return; } const user = { id: Date.now().toString(), name: n, email: e, password: p, createdAt: new Date().toISOString() }; users.push(user); localStorage.setItem('islamicUsers', JSON.stringify(users)); authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); state = getDefaultState(); saveUserData(user.id); showApp(); }
function guestLogin() { authState = { isLoggedIn: true, user: { id: 'guest-' + Date.now(), name: 'ضيف', email: '' }, isGuest: true }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); if (!localStorage.getItem('islamicLevels')) { state = getDefaultState(); saveState(); } else loadState(); showApp(); }
function logout() { if (confirm('تسجيل الخروج؟')) { authState = { isLoggedIn: false, user: null, isGuest: false }; localStorage.removeItem('islamicAuth'); location.reload(); } }
function loadUserData(userId) { const s = localStorage.getItem('islamicLevels_' + userId); if (s) { state = { ...getDefaultState(), ...JSON.parse(s) }; } else { state = getDefaultState(); saveUserData(userId); } }
function saveUserData(userId) { localStorage.setItem('islamicLevels_' + userId, JSON.stringify(state)); }

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById(name + 'Screen');
  if (screen) screen.classList.add('active');
  const navItem = document.querySelector('[data-screen="' + name + '"]');
  if (navItem) navItem.classList.add('active');
  vibrate(30);
  
  const renderers = { tracker: renderTracker, prayer: renderPrayerTracker, adhkar: renderAdhkarCategories, quran: renderQuran, profile: renderProfile, settings: renderSettings, tasbih: renderTasbih, qibla: renderQibla, dua: renderDuaBook, goals: renderGoals };
  if (renderers[name]) renderers[name]();
}

// ==================== HOME ====================
function renderLevels() {
  document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => `
    <div class="level-card" onclick="selectLevel(${level.id})">
      <div class="level-gradient" style="background: linear-gradient(135deg, ${level.color[0]}, ${level.color[1]});">
        <div class="level-emoji">${level.icon}</div>
        <div class="level-name">${level.title}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <span style="font-size: 13px; opacity: 0.9;">⏱️ ${level.duration}</span>
          <span style="font-size: 13px; opacity: 0.9;">💎 ${level.reward} | ⭐ ${level.xp} XP</span>
        </div>
      </div>
    </div>
  `).join('');
}
function selectLevel(levelId) { state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker'); }

// ==================== TRACKER ====================
function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  const today = getToday();
  if (state.lastDate !== today) { state.todayTasks = []; state.lastDate = today; state.todayPrayers = {}; state.todayAdhkar = {}; saveState(); }
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  
  let html = '', taskId = 0;
  level.sections.forEach(section => {
    html += '<div class="task-section"><div class="task-section-title">' + section.title + '</div>';
    section.tasks.forEach(task => {
      const taskText = typeof task === 'string' ? task : task.text;
      const taskXP = typeof task === 'string' ? 10 : (task.xp || 10);
      const done = state.todayTasks.includes(taskId);
      html += '<div class="task-item ' + (done ? 'completed' : '') + '" onclick="toggleTask(' + taskId + ')"><div class="task-checkbox">' + (done ? '✓' : '') + '</div><div class="task-text">' + taskText + '</div><div style="font-size:11px;color:var(--primary);font-weight:700;white-space:nowrap;margin-right:8px;">+' + taskXP + ' XP</div></div>';
      taskId++;
    });
    html += '</div>';
  });
  document.getElementById('tasksContainer').innerHTML = html;
  updateProgress();
}

function toggleTask(taskId) {
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) {
    state.todayTasks.push(taskId);
    const level = LEVELS.find(l => l.id === state.level);
    let taskIdCounter = 0;
    for (const section of level.sections) {
      for (const task of section.tasks) {
        if (taskIdCounter === taskId) {
          const taskXP = typeof task === 'string' ? 10 : (task.xp || 10);
          state.xp = (state.xp || 0) + taskXP;
          const newLevel = calculateLevel(state.xp);
          if (newLevel > state.level) {
            state.level = newLevel;
            state.gems += LEVELS[newLevel - 1].reward;
          }
          break;
        }
        taskIdCounter++;
      }
      if (taskIdCounter > taskId) break;
    }
    playSound('click'); vibrate(50);
  } else {
    state.todayTasks.splice(idx, 1);
  }
  saveState(); renderTracker(); updateHeaderGems();
}

function updateProgress() {
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const pct = Math.round((state.todayTasks.length / total) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressBar').style.width = pct + '%';
  
  if (pct === 100) {
    state.gems += level.reward;
    state.xp = (state.xp || 0) + (level.xp || 0);
    document.getElementById('rewardBanner').style.display = 'block';
    document.getElementById('rewardGems').textContent = level.reward;
    state.streak++; state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = getToday();
    state.dailyHistory.push({ date: getToday(), completed: true, gems: level.reward, xp: level.xp });
    if (state.dailyHistory.length > 30) state.dailyHistory = state.dailyHistory.slice(-30);
    saveState(); checkAchievements(); showConfetti(); updateHeaderGems();
  }
}

function showConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 2 + 's'; c.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(c); setTimeout(() => c.remove(), 4000);
  }
}

function updateHeaderGems() { 
  const gemEl = document.getElementById('headerGems'); 
  const xpEl = document.getElementById('headerXP');
  if (gemEl) gemEl.textContent = state.gems;
  if (xpEl) xpEl.textContent = state.xp || 0;
}

// ==================== TASBIH ====================
function renderTasbih() {
  document.getElementById('tasbihText').textContent = state.tasbihText;
  document.getElementById('tasbihCounter').textContent = state.tasbihCount;
  document.getElementById('tasbihTarget').textContent = state.tasbihTarget;
  document.getElementById('tasbihTotal').textContent = state.tasbihTotal;
}

function incrementTasbih() {
  state.tasbihCount++;
  state.tasbihTotal++;
  vibrate(state.vibrationEnabled ? 30 : 0);
  playSound('click');
  
  if (state.tasbihCount >= state.tasbihTarget) {
    state.gems += 5;
    state.xp = (state.xp || 0) + 5;
    state.tasbihCount = 0;
    vibrate([100, 50, 100]);
    alert('🎉 أحسنت! حصلت على 5 جواهر');
    updateHeaderGems();
  }
  
  saveState();
  document.getElementById('tasbihCounter').textContent = state.tasbihCount;
  document.getElementById('tasbihTotal').textContent = state.tasbihTotal;
}

function resetTasbih() { state.tasbihCount = 0; saveState(); renderTasbih(); }

function changeTasbihText(text) {
  state.tasbihText = text;
  state.tasbihCount = 0;
  saveState();
  renderTasbih();
  vibrate(50);
}

// ==================== QIBLA ====================
function renderQibla() {
  document.getElementById('qiblaDirection').textContent = 'جاري تحديد الاتجاه...';
  document.getElementById('qiblaAngle').textContent = 'يرجى تفعيل الموقع';
  startQibla();
}

function startQibla() {
  if (!navigator.geolocation) {
    document.getElementById('qiblaDirection').textContent = 'الموقع غير مدعوم';
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      
      // Kaaba coordinates
      const kaabaLat = 21.4225;
      const kaabaLng = 39.8262;
      
      // Calculate Qibla direction
      const dLng = (kaabaLng - lng) * Math.PI / 180;
      const lat1 = lat * Math.PI / 180;
      const lat2 = kaabaLat * Math.PI / 180;
      
      const y = Math.sin(dLng);
      const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
      let qiblaAngle = Math.atan2(y, x) * 180 / Math.PI;
      
      if (qiblaAngle < 0) qiblaAngle += 360;
      
      document.getElementById('qiblaDirection').textContent = 'اتجاه القبلة: ' + Math.round(qiblaAngle) + '°';
      document.getElementById('qiblaAngle').textContent = 'من الشمال الصافي';
      
      // Animate compass
      const compass = document.getElementById('qiblaCompass');
      compass.style.transform = 'rotate(' + (-qiblaAngle) + 'deg)';
    },
    (err) => {
      document.getElementById('qiblaDirection').textContent = 'يرجى تفعيل خدمة الموقع';
      document.getElementById('qiblaAngle').textContent = err.message;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// ==================== DUA BOOK ====================
function renderDuaBook() {
  let html = '';
  Object.entries(DUAS).forEach(([key, category]) => {
    html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showDuaCategory(\'' + key + '\')">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<span style="font-size: 32px;">' + category.icon + '</span>';
    html += '<div style="flex: 1;"><div style="font-weight: 800; font-size: 16px;">' + category.title + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-muted);">' + category.items.length + ' أدعية</div></div>';
    html += '</div></div>';
  });
  document.getElementById('duaCategories').innerHTML = html;
}

function showDuaCategory(key) {
  const category = DUAS[key];
  if (!category) return;
  
  let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">';
  html += '<button onclick="renderDuaBook()" style="background: none; border: none; font-size: 24px; cursor: pointer;">←</button>';
  html += '<div><div style="font-weight: 800; font-size: 18px;">' + category.icon + ' ' + category.title + '</div></div></div>';
  
  category.items.forEach((dua) => {
    html += '<div class="card" style="margin-bottom: 12px;">';
    html += '<div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">' + dua.occasion + '</div>';
    html += '<div style="font-size: 16px; line-height: 1.8; text-align: right;">' + dua.text + '</div>';
    html += '<button class="btn btn-primary" style="width: auto; padding: 8px 16px; font-size: 13px; margin-top: 12px;" onclick="copyDua(\'' + dua.text.replace(/'/g, "\\'") + '\')">📋 نسخ</button>';
    html += '</div>';
  });
  
  document.getElementById('duaCategories').innerHTML = html;
}

function copyDua(text) {
  navigator.clipboard.writeText(text).then(() => {
    vibrate(50);
    alert('تم نسخ الدعاء!');
  });
}

// ==================== GOALS ====================
function renderGoals() {
  let html = '';
  if (state.dailyGoals.length === 0) {
    html = '<div class="card" style="text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">🎯</div><div style="font-weight: 800;">لا توجد أهداف بعد</div><div style="color: var(--text-muted); margin-top: 8px;">أضف هدفك الأول!</div></div>';
  } else {
    state.dailyGoals.forEach((goal, index) => {
      const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
      const completed = progress >= 100;
      html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (completed ? 'var(--success)' : 'var(--border)') + ';">';
      html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
      html += '<div style="flex: 1;"><div style="font-weight: 800;">' + (goal.icon || '🎯') + ' ' + goal.title + '</div>';
      html += '<div style="font-size: 13px; color: var(--text-muted);">' + goal.current + ' / ' + goal.target + '</div></div>';
      html += '<div style="display: flex; gap: 8px;">';
      html += '<button class="btn btn-primary" style="width: auto; padding: 6px 12px; font-size: 12px;" onclick="incrementGoal(' + index + ')">+1</button>';
      html += '<button style="background: none; border: none; font-size: 18px; cursor: pointer;" onclick="deleteGoal(' + index + ')">🗑️</button>';
      html += '</div></div>';
      html += '<div class="progress-container" style="margin-top: 12px;"><div class="progress-bar" style="width: ' + progress + '%; background: ' + (completed ? 'var(--success)' : 'var(--primary)') + ';"></div></div>';
      html += '</div>';
    });
  }
  document.getElementById('goalsContainer').innerHTML = html;
}

function addGoal() {
  const title = prompt('اسم الهدف:');
  if (!title) return;
  const target = parseInt(prompt('الهدف (رقم):'));
  if (!target || target <= 0) return;
  const icons = ['📖', '🕌', '📿', '💧', '🏃', '💪', '⭐', '🌙'];
  state.dailyGoals.push({ title, target, current: 0, icon: icons[Math.floor(Math.random() * icons.length)] });
  saveState(); renderGoals();
}

function incrementGoal(index) {
  if (state.dailyGoals[index]) {
    state.dailyGoals[index].current++;
    if (state.dailyGoals[index].current >= state.dailyGoals[index].target) {
      state.gems += 10;
      state.xp = (state.xp || 0) + 20;
      vibrate([100, 50, 100]);
    }
    saveState(); renderGoals(); updateHeaderGems();
  }
}

function deleteGoal(index) {
  state.dailyGoals.splice(index, 1);
  saveState(); renderGoals();
}

// ==================== PRAYER TRACKER ====================
function renderPrayerTracker() {
  document.getElementById('prayerDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  let html = '';
  DAILY_WORSHIP.faraid.forEach(prayer => {
    const completed = state.todayPrayers[prayer.key] || false;
    const time = prayerService.times ? prayerService.times[prayer.key] : '';
    html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (completed ? 'var(--success)' : 'var(--border)') + ';">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<span style="font-size: 32px;">' + prayer.icon + '</span>';
    html += '<div style="flex: 1;"><div style="font-weight: 800; font-size: 18px;">صلاة ' + prayer.name + '</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">' + (time ? '⏰ ' + time : '') + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-muted);">فرض: ' + prayer.fard + ' | سنن: ' + prayer.sunnahQabliyyah + '+' + prayer.sunnahBaadiyyah + '</div></div>';
    html += '<button class="btn ' + (completed ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 12px 20px; font-size: 14px;" onclick="togglePrayer(\'' + prayer.key + '\')">' + (completed ? '✓' : 'أديت') + '</button>';
    html += '</div></div>';
  });
  document.getElementById('prayerTrackerContainer').innerHTML = html;
  const completedCount = Object.values(state.todayPrayers).filter(v => v).length;
  document.getElementById('prayersCompleted').textContent = completedCount;
  document.getElementById('sunnahCompleted').textContent = Math.floor(completedCount * 1.5);
}

function togglePrayer(key) {
  state.todayPrayers[key] = !state.todayPrayers[key];
  if (state.todayPrayers[key]) { state.totalPrayers++; playSound('click'); vibrate(50); }
  else state.totalPrayers = Math.max(0, state.totalPrayers - 1);
  saveState(); renderPrayerTracker(); updateHeaderGems();
}

// ==================== ADHKAR ====================
function renderAdhkarCategories() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #8B5CF6, #DB2777); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📿 الأذكار</div></div>';
  Object.entries(ADHKAR).forEach(([key, category]) => {
    html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showAdhkar(\'' + key + '\')">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<span style="font-size: 32px;">' + category.icon + '</span>';
    html += '<div style="flex: 1;"><div style="font-weight: 800;">' + category.title + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-muted);">' + category.time + '</div></div>';
    html += '<div style="font-weight: 900; color: var(--primary);">' + category.items.length + '</div></div></div>';
  });
  document.getElementById('adhkarCategories').innerHTML = html;
  document.getElementById('adhkarItems').style.display = 'none';
}

function showAdhkar(categoryKey) {
  const category = ADHKAR[categoryKey];
  if (!category) return;
  let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">';
  html += '<button onclick="renderAdhkarCategories()" style="background: none; border: none; font-size: 24px; cursor: pointer;">←</button>';
  html += '<div style="font-weight: 800; font-size: 18px;">' + category.icon + ' ' + category.title + '</div></div>';
  category.items.forEach((item, index) => {
    const key = categoryKey + '_' + index;
    const completed = state.todayAdhkar[key] || 0;
    const remaining = Math.max(0, item.count - completed);
    const isComplete = remaining === 0;
    html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (isComplete ? 'var(--success)' : 'var(--border)') + ';">';
    html += '<div style="font-size: 16px; line-height: 1.8; margin-bottom: 12px; text-align: right;">' + item.text + '</div>';
    html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
    html += '<div style="font-size: 13px; color: var(--text-muted);">💎 +' + item.reward + ' | العدد: ' + item.count + '</div>';
    html += '<button class="btn ' + (isComplete ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 10px 16px; font-size: 14px;" onclick="completeDhikr(\'' + key + '\', ' + item.reward + ', ' + item.count + ')">' + (isComplete ? '✓' : 'تسبيح (' + remaining + ')') + '</button>';
    html += '</div></div>';
  });
  document.getElementById('adhkarCategories').innerHTML = '';
  document.getElementById('adhkarItems').innerHTML = html;
  document.getElementById('adhkarItems').style.display = 'block';
}

function completeDhikr(key, reward, totalCount) {
  if (!state.todayAdhkar[key]) state.todayAdhkar[key] = 0;
  if (state.todayAdhkar[key] < totalCount) {
    state.todayAdhkar[key]++;
    state.totalDhikr++;
    vibrate(30);
    if (state.todayAdhkar[key] >= totalCount) {
      state.gems += reward;
      state.xp = (state.xp || 0) + Math.floor(reward / 10);
      vibrate([100, 50, 100]);
    }
    saveState(); updateHeaderGems();
    const categoryKey = key.split('_')[0];
    showAdhkar(categoryKey);
  }
}

// ==================== QURAN ====================
function renderQuran() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📖 القرآن الكريم</div><div style="font-size: 14px; opacity: 0.9;">30 جزء</div></div>';
  QURAN_PARTS.forEach(part => {
    html += '<div class="card" style="margin-bottom: 12px;"><div style="font-weight: 800;">الجزء ' + part.id + ': ' + part.name + '</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">صفحات: ' + part.pages + ' | ' + part.surahs + '</div>';
    html += '<button class="btn btn-primary" style="margin-top: 8px;" onclick="logQuran(' + part.id + ')">✓ قرأت</button></div>';
  });
  document.getElementById('quranPartsContainer').innerHTML = html;
}

function logQuran(partId) {
  state.totalQuran += 20;
  state.gems += 10;
  state.xp = (state.xp || 0) + 15;
  vibrate(50);
  saveState(); updateHeaderGems();
  alert('🎉 +10 جواهر | +15 XP');
}

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('prayerTimesToggle').classList.toggle('active', state.prayerTimesEnabled);
  document.getElementById('vibrationToggle').classList.toggle('active', state.vibrationEnabled);
}

function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission(); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function toggleVibration() { state.vibrationEnabled = !state.vibrationEnabled; vibrate(100); saveState(); }
function togglePrayerTimes() { state.prayerTimesEnabled = !state.prayerTimesEnabled; if (state.prayerTimesEnabled) initPrayerTimes(); else { document.getElementById('prayerTimesCard').style.display = 'none'; document.getElementById('hijriCard').style.display = 'none'; } saveState(); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = 'backup-' + getToday() + '.json'; a.click(); }
function importData() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => { try { state = { ...getDefaultState(), ...JSON.parse(ev.target.result) }; saveState(); alert('✅ تم الاستيراد!'); location.reload(); } catch { alert('❌ ملف غير صالح'); } }; reader.readAsText(file); } }; input.click(); }
function resetData() { if (confirm('مسح جميع البيانات؟')) { localStorage.removeItem('islamicLevels'); location.reload(); } }

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
  const stats = { level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, todayPrayers: state.todayPrayers, totalDhikr: state.totalDhikr, totalQuran: state.totalQuran, xp: state.xp || 0 };
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(stats)) {
      state.achievements.push(ach.id);
      state.gems += ach.gems;
      state.xp = (state.xp || 0) + (ach.xp || 0);
      vibrate([200, 100, 200, 100, 200]);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🏆 ' + ach.title, { body: '+' + ach.gems + ' جوهرة | +' + (ach.xp || 0) + ' XP' });
      }
    }
  });
  saveState();
}

// ==================== PROFILE ====================
function renderProfile() {
  const user = authState.user;
  if (user) {
    document.getElementById('profileName').textContent = user.name || 'المستخدم';
    document.getElementById('profileEmail').textContent = user.email || 'ضيف';
  }
  const level = calculateLevel(state.xp || 0);
  document.getElementById('profileLevel').textContent = level;
  document.getElementById('profileGems').textContent = state.gems;
  document.getElementById('profileStreak').textContent = state.streak;
  document.getElementById('profileXP').textContent = state.xp || 0;
  document.getElementById('profileDays').textContent = state.totalDays;
}

// ==================== PRAYER TIMES ====================
async function initPrayerTimes() {
  if (!state.prayerTimesEnabled) return;
  try {
    const pos = await prayerService.getLocation();
    state.location = { lat: pos.latitude, lng: pos.longitude };
    const result = await prayerService.fetchPrayerTimes(pos.latitude, pos.longitude);
    if (result) {
      document.getElementById('prayerTimesCard').style.display = 'block';
      document.getElementById('hijriCard').style.display = 'block';
      document.getElementById('hijriDate').textContent = result.hijri.formatted || (result.hijri.day + ' ' + result.hijri.monthName + ' ' + result.hijri.year + ' هـ');
      document.getElementById('gregorianDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('headerSubtitle').textContent = result.hijri.formatted || '';
      updatePrayerBanner();
      checkSeasonalWorship(result.hijri.month);
      if (state.notifEnabled) notificationService.scheduleDailyReminders(prayerService.times);
    }
    saveState();
  } catch (e) {
    console.log('Location not available:', e);
    document.getElementById('headerSubtitle').textContent = 'فعّل الموقع لمواقيت الصلاة';
  }
}

function updatePrayerBanner() {
  const current = prayerService.getCurrentPrayer();
  if (current) {
    document.getElementById('nextPrayerName').textContent = current.next.arabic;
    document.getElementById('nextPrayerTime').textContent = current.next.time;
    document.getElementById('timeUntilPrayer').textContent = current.timeUntilNext.formatted;
  }
}

function checkSeasonalWorship(hijriMonth) {
  if (hijriMonth === 9) {
    document.getElementById('seasonalBanner').style.display = 'block';
    document.getElementById('seasonalTitle').textContent = '🌙 شهر رمضان المبارك';
    document.getElementById('seasonalDesc').textContent = 'عبادات رمضان - تراويح، قيام، صدقات';
  } else if (hijriMonth === 12) {
    document.getElementById('seasonalBanner').style.display = 'block';
    document.getElementById('seasonalTitle').textContent = '🕋 ذي الحجة';
    document.getElementById('seasonalDesc').textContent = 'عبادات ذي الحجة - صيام، ذبح، تكبير';
  }
}

// ==================== PWA ====================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// ==================== INIT ====================
function showApp() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('headerSubtitle').textContent = 'مرحباً، ' + (authState.user?.name || 'ضيف') + '!';
  renderLevels(); updateHeaderGems();
  if (state.prayerTimesEnabled) initPrayerTimes();
  setInterval(updatePrayerBanner, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedAuth = localStorage.getItem('islamicAuth');
  if (savedAuth) { authState = JSON.parse(savedAuth); if (authState.isLoggedIn) { loadState(); showApp(); return; } }
  loadState();
  document.getElementById('authModal').style.display = 'flex';
});
