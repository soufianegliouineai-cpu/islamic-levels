// ==================== STATE ====================
let authState = { isLoggedIn: false, user: null, isGuest: false };
let state = {
  level: 1, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, soundEnabled: true, autoSync: true, family: null,
  referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
  totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null,
  prayerTimesEnabled: true, location: null, todayPrayers: {},
  todayAdhkar: {}, todayQuran: 0
};

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function playSound(name) { if (state.soundEnabled) { try { const a = new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='); a.play().catch(() => {}); } catch(e) {} } }
function getDefaultState() { return { level: 1, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null, todayTasks: [], completedChallenges: [], achievements: [], darkMode: false, notifEnabled: false, soundEnabled: true, autoSync: true, family: null, referralCode: generateCode(), totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [], totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null, prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {}, todayQuran: 0 }; }
function loadState() { const s = localStorage.getItem('islamicLevels'); if (s) state = { ...getDefaultState(), ...JSON.parse(s) }; if (!state.referralCode) state.referralCode = generateCode(); if (!state.dailyHistory) state.dailyHistory = []; if (!state.todayPrayers) state.todayPrayers = {}; if (!state.todayAdhkar) state.todayAdhkar = {}; updateTheme(); }
function saveState() { localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// ==================== AUTH ====================
function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; }

function login() {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  if (!email || !password) { alert('أدخل البريد وكلمة المرور'); return; }
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) { authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); loadUserData(user.id); showApp(); }
  else alert('بيانات الدخول غير صحيحة');
}

function register() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  if (!name || !email || !password) { alert('أكمل جميع الحقول'); return; }
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  if (users.find(u => u.email === email)) { alert('البريد مسجل مسبقاً'); return; }
  const user = { id: Date.now().toString(), name, email, password, createdAt: new Date().toISOString() };
  users.push(user); localStorage.setItem('islamicUsers', JSON.stringify(users));
  authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState));
  state = getDefaultState(); saveUserData(user.id); showApp();
}

function guestLogin() {
  authState = { isLoggedIn: true, user: { id: 'guest-' + Date.now(), name: 'ضيف', email: '' }, isGuest: true };
  localStorage.setItem('islamicAuth', JSON.stringify(authState));
  if (!localStorage.getItem('islamicLevels')) { state = getDefaultState(); saveState(); }
  else loadState();
  showApp();
}

function logout() { if (confirm('تسجيل الخروج؟')) { authState = { isLoggedIn: false, user: null, isGuest: false }; localStorage.removeItem('islamicAuth'); location.reload(); } }
function loadUserData(userId) { const s = localStorage.getItem(`islamicLevels_${userId}`); if (s) state = { ...getDefaultState(), ...JSON.parse(s) }; else { state = getDefaultState(); saveUserData(userId); } }
function saveUserData(userId) { localStorage.setItem(`islamicLevels_${userId}`, JSON.stringify(state)); }

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
      document.getElementById('hijriDate').textContent = result.hijri.formatted || `${result.hijri.day} ${result.hijri.monthName} ${result.hijri.year} هـ`;
      document.getElementById('gregorianDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('headerSubtitle').textContent = `${result.hijri.formatted || ''} — مواقيت الصلاة nearby`;
      updatePrayerBanner();
      if (state.notifEnabled) schedulePrayerNotifications();
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

function schedulePrayerNotifications() {
  if (!prayerService.times) return;
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  prayers.forEach(name => {
    const time = prayerService.times[name];
    if (time && 'Notification' in window && Notification.permission === 'granted') {
      const [h, m] = time.split(':').map(Number);
      const now = new Date();
      const prayTime = new Date(); prayTime.setHours(h, m, 0);
      if (prayTime > now) {
        setTimeout(() => {
          new Notification('🕌 حان وقت الصلاة', { body: `صلاة ${PRAYER_NAMES[name]}`, icon: 'icons/icon-192.png' });
        }, prayTime - now);
      }
    }
  });
}

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById(name + 'Screen');
  if (screen) screen.classList.add('active');
  const navItem = document.querySelector(`[data-screen="${name}"]`);
  if (navItem) navItem.classList.add('active');
  
  const renderers = { tracker: renderTracker, prayer: renderPrayerTracker, adhkar: renderAdhkarCategories, quran: renderQuran, seasonal: renderSeasonal, family: renderFamily, share: renderShare, analytics: renderAnalytics, profile: renderProfile, settings: renderSettings };
  if (renderers[name]) renderers[name]();
}

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
  if (state.lastDate !== today) { state.todayTasks = []; state.lastDate = today; state.todayPrayers = {}; state.todayAdhkar = {}; saveState(); }
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  
  let html = '', taskId = 0;
  level.sections.forEach(section => {
    html += `<div class="task-section"><div class="task-section-title">${section.title}</div>`;
    section.tasks.forEach(task => {
      const taskText = typeof task === 'string' ? task : task.text;
      const taskXP = typeof task === 'string' ? 10 : (task.xp || 10);
      const done = state.todayTasks.includes(taskId);
      html += `<div class="task-item ${done ? 'completed' : ''}" onclick="toggleTask(${taskId})"><div class="task-checkbox">${done ? '✓' : ''}</div><div class="task-text">${taskText}</div><div style="font-size:11px;color:var(--primary);font-weight:700;white-space:nowrap;margin-right:8px;">+${taskXP} XP</div></div>`;
      taskId++;
    });
    html += `</div>`;
  });
  document.getElementById('tasksContainer').innerHTML = html;
  updateProgress();
}

function toggleTask(taskId) {
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) {
    state.todayTasks.push(taskId);
    // Earn XP for the task
    const level = LEVELS.find(l => l.id === state.level);
    let taskIdCounter = 0;
    for (const section of level.sections) {
      for (const task of section.tasks) {
        if (taskIdCounter === taskId) {
          const taskXP = typeof task === 'string' ? 10 : (task.xp || 10);
          state.xp = (state.xp || 0) + taskXP;
          // Auto-level up based on XP
          const newLevel = calculateLevel(state.xp);
          if (newLevel > state.level) {
            state.level = newLevel;
            state.gems += LEVELS[newLevel - 1].reward;
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('🎉 ترقية!', { body: `تهانينا! وصلت المستوى ${newLevel}`, icon: 'icons/icon-192.png' });
            }
          }
          break;
        }
        taskIdCounter++;
      }
      if (taskIdCounter > taskId) break;
    }
    playSound('click');
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
    document.getElementById('rewardBanner').style.display = 'block';
    document.getElementById('rewardGems').textContent = level.reward;
    state.streak++; state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = getToday();
    state.dailyHistory.push({ date: getToday(), completed: true, gems: level.reward });
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

function updateHeaderGems() { const el = document.getElementById('headerGems'); if (el) el.textContent = state.gems; }

// ==================== PRAYER TRACKER ====================
function renderPrayerTracker() {
  const today = getToday();
  document.getElementById('prayerDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  let html = '';
  DAILY_WORSHIP.faraid.forEach(prayer => {
    const completed = state.todayPrayers[prayer.key] || false;
    const time = prayerService.times ? prayerService.times[prayer.key] : '';
    html += `
      <div class="card" style="margin-bottom: 12px; border-color: ${completed ? 'var(--success)' : 'var(--border)'};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 32px;">${prayer.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 800; font-size: 18px;">صلاة ${prayer.name}</div>
            <div style="font-size: 13px; color: var(--text-muted);">${time ? '⏰ ' + time : ''}</div>
            <div style="font-size: 12px; color: var(--text-muted);">فرض: ${prayer.fard} | سنن قبل: ${prayer.sunnahQabliyyah} | سنن بعد: ${prayer.sunnahBaadiyyah}</div>
          </div>
          <button class="btn ${completed ? 'btn-success' : 'btn-primary'}" style="width: auto; padding: 12px 20px; font-size: 14px;" onclick="togglePrayer('${prayer.key}')">
            ${completed ? '✓ مكتملة' : 'أديت'}
          </button>
        </div>
      </div>
    `;
  });
  
  document.getElementById('prayerTrackerContainer').innerHTML = html;
  
  const completedCount = Object.values(state.todayPrayers).filter(v => v).length;
  document.getElementById('prayersCompleted').textContent = completedCount;
  document.getElementById('sunnahCompleted').textContent = Math.floor(completedCount * 1.5);
}

function togglePrayer(key) {
  state.todayPrayers[key] = !state.todayPrayers[key];
  if (state.todayPrayers[key]) { state.totalPrayers++; playSound('click'); }
  else state.totalPrayers = Math.max(0, state.totalPrayers - 1);
  saveState(); renderPrayerTracker(); updateHeaderGems();
}

// ==================== ADHKAR ====================
function renderAdhkarCategories() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📿 الأذكار</div><div style="font-size: 14px; opacity: 0.9;">أذكار المسلم اليومية</div></div>';
  
  Object.entries(ADHKAR).forEach(([key, category]) => {
    html += `
      <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showAdhkar('${key}')">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 32px;">${category.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 800; font-size: 16px;">${category.title}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${category.time}</div>
          </div>
          <div style="font-weight: 900; color: var(--primary);">${category.items.length} أذكار</div>
        </div>
      </div>
    `;
  });
  
  document.getElementById('adhkarCategories').innerHTML = html;
  document.getElementById('adhkarItems').style.display = 'none';
}

function showAdhkar(categoryKey) {
  const category = ADHKAR[categoryKey];
  if (!category) return;
  
  let html = `
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <button onclick="renderAdhkarCategories()" style="background: none; border: none; font-size: 24px; cursor: pointer;">←</button>
      <div>
        <div style="font-weight: 800; font-size: 18px;">${category.icon} ${category.title}</div>
        <div style="font-size: 12px; color: var(--text-muted);">${category.time}</div>
      </div>
    </div>
  `;
  
  category.items.forEach((item, index) => {
    const key = `${categoryKey}_${index}`;
    const completed = state.todayAdhkar[key] || 0;
    const remaining = Math.max(0, item.count - completed);
    const isComplete = remaining === 0;
    
    html += `
      <div class="card" style="margin-bottom: 12px; border-color: ${isComplete ? 'var(--success)' : 'var(--border)'};">
        <div style="font-size: 16px; line-height: 1.8; margin-bottom: 12px; text-align: right;">${item.text}</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 13px; color: var(--text-muted);">💎 +${item.reward} | العدد: ${item.count}</div>
          <button class="btn ${isComplete ? 'btn-success' : 'btn-primary'}" style="width: auto; padding: 10px 16px; font-size: 14px;" onclick="completeDhikr('${key}', ${item.reward}, ${item.count})">
            ${isComplete ? '✓ مكتمل' : `تسبيح (${remaining})`}
          </button>
        </div>
      </div>
    `;
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
    if (state.todayAdhkar[key] >= totalCount) {
      state.gems += reward;
      playSound('click');
    }
    saveState(); updateHeaderGems();
    // Re-render current view
    const categoryKey = key.split('_')[0];
    showAdhkar(categoryKey);
  }
}

// ==================== QURAN ====================
function renderQuran() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #8B5CF6, #DB2777); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📖 القرآن الكريم</div><div style="font-size: 14px; opacity: 0.9;">30 جزء - ختم القرآن</div></div>';
  
  QURAN_PARTS.forEach(part => {
    html += `
      <div class="card" style="margin-bottom: 12px;">
        <div style="font-weight: 800;">الجزء ${part.id}: ${part.name}</div>
        <div style="font-size: 13px; color: var(--text-muted);">الصفحات: ${part.pages} | السور: ${part.surahs}</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="logQuran(${part.id})">✓ قرأت</button>
        </div>
      </div>
    `;
  });
  
  document.getElementById('quranPartsContainer').innerHTML = html;
}

function logQuran(partId) {
  state.totalQuran += 20; // Average pages per part
  state.gems += 10;
  saveState(); updateHeaderGems();
  alert('🎉 +10 جواهر!جزء ' + partId + ' مسجل');
}

// ==================== SEASONAL ====================
function renderSeasonal() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📅 العبادات الموسمية</div><div style="font-size: 14px; opacity: 0.9;">عبادات حسب الأوقات والمواسم</div></div>';
  
  Object.entries(SEASONAL_WORSHIP).forEach(([key, season]) => {
    html += `
      <div class="card" style="margin-bottom: 16px;">
        <div style="font-weight: 800; font-size: 18px; margin-bottom: 12px;">${season.icon} ${season.title}</div>
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">الأشهر: ${season.months.join(', ')}</div>
        ${season.items.map(item => `
          <div style="padding: 12px; border-bottom: 1px solid var(--border);">
            <div style="font-weight: 700;">${item.icon} ${item.title}</div>
            <div style="font-size: 13px; color: var(--text-muted);">${item.description}</div>
            <div style="font-size: 12px; color: #F59E0B; font-weight: 800;">💎 +${item.reward}</div>
          </div>
        `).join('')}
      </div>
    `;
  });
  
  document.getElementById('seasonalContent').innerHTML = html;
}

// ==================== FAMILY ====================
function renderFamily() {
  const container = document.getElementById('familyContent');
  if (!state.family) {
    container.innerHTML = `<div class="card" style="text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">👨‍👩‍👧</div><div style="font-weight: 800;">ابدأ عائلتك</div><button class="btn btn-primary" style="margin-top: 16px;" onclick="createFamily()">➕ إنشاء</button></div>`;
  } else {
    container.innerHTML = `<div class="card" style="background: #ECFDF5;"><div style="font-weight: 800;">كود: ${state.family.code}</div></div>
      <div class="card">${state.family.members.map(m => `<div style="display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border);"><span>${m.role === 'parent' ? '👨' : '👧'} ${m.name}</span><span>🔥 ${m.streak} 💎 ${m.gems}</span></div>`).join('')}</div>
      <button class="btn btn-primary" style="background: var(--danger);" onclick="leaveFamily()">🚪 مغادرة</button>`;
  }
}

function createFamily() { const n = prompt('اسم العائلة:'); if (n) { state.family = { name: n, code: generateCode(), members: [{ name: 'أنت', role: 'parent', streak: state.streak, gems: state.gems }], rewards: [] }; saveState(); renderFamily(); } }
function leaveFamily() { if (confirm('مغادرة؟')) { state.family = null; saveState(); renderFamily(); } }

// ==================== SHARE ====================
function renderShare() { document.getElementById('referralCode').value = state.referralCode || ''; }
function copyReferralCode() { navigator.clipboard.writeText(state.referralCode); alert('تم النسخ!'); }
function shareWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareTelegram() { window.open(`https://t.me/share/url?text=${encodeURIComponent('🌟 كود دعوتي: ' + state.referralCode)}`); state.totalShared++; state.gems += 10; saveState(); }
function shareNative() { if (navigator.share) { navigator.share({ text: '🌟 كود دعوتي: ' + state.referralCode }); state.totalShared++; state.gems += 10; saveState(); } }

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(state)) {
      state.achievements.push(ach.id); state.gems += ach.gems;
      if ('Notification' in window && Notification.permission === 'granted') new Notification('🏆 ' + ach.title, { body: '+' + ach.gems + ' جوهرة' });
    }
  });
  saveState();
}

// ==================== ANALYTICS ====================
function renderAnalytics() {
  document.getElementById('totalPrayers').textContent = state.totalPrayers;
  document.getElementById('totalQuran').textContent = state.totalQuran;
  document.getElementById('totalDhikr').textContent = state.totalDhikr;
  document.getElementById('totalDays').textContent = state.totalDays;
  
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
    const dayData = state.dailyHistory.find(h => h.date === date);
    days.push({ date, completed: dayData?.completed });
  }
  document.getElementById('activityChart').innerHTML = days.map(d => `
    <div class="chart-bar"><div class="chart-fill" style="height: ${d.completed ? '100' : '20'}%; background: ${d.completed ? 'var(--primary)' : 'var(--border)'};"></div>
    <div class="chart-label">${new Date(d.date).toLocaleDateString('ar', { weekday: 'short' })}</div></div>`).join('');
}

// ==================== PROFILE ====================
function renderProfile() {
  const user = authState.user;
  if (user) { document.getElementById('profileName').textContent = user.name || 'المستخدم'; document.getElementById('profileEmail').textContent = user.email || 'ضيف'; document.getElementById('profileAvatar').textContent = user.name?.charAt(0) || '👤'; }
  document.getElementById('profileLevel').textContent = state.level;
  document.getElementById('profileGems').textContent = state.gems;
  document.getElementById('profileStreak').textContent = state.streak;
}

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('prayerTimesToggle').classList.toggle('active', state.prayerTimesEnabled);
  document.getElementById('levelSelector').innerHTML = LEVELS.map(l => `<button class="btn ${state.level === l.id ? 'btn-primary' : ''}" style="width: auto; padding: 8px 16px;" onclick="selectLevel(${l.id})">${l.icon} ${l.id}</button>`).join('');
}

function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission().then(() => schedulePrayerNotifications()); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function togglePrayerTimes() { state.prayerTimesEnabled = !state.prayerTimesEnabled; if (state.prayerTimesEnabled) initPrayerTimes(); else { document.getElementById('prayerTimesCard').style.display = 'none'; document.getElementById('hijriCard').style.display = 'none'; } saveState(); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = `backup-${getToday()}.json`; a.click(); }
function resetData() { if (confirm('مسح؟')) { state = getDefaultState(); saveState(); location.reload(); } }

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
