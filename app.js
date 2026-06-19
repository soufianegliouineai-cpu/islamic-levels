// ==================== STATE ====================
let authState = { isLoggedIn: false, user: null, isGuest: false };
let state = {
  level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, soundEnabled: true, vibrationEnabled: true, autoSync: true,
  referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
  totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null,
  prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {},
  tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33,
  dailyGoals: [], purchasedItems: [], equippedAvatar: null, equippedTheme: null, equippedBadge: null,
  doubleXPTimer: 0, shieldActive: false, weeklyGoal: 7, completedThisWeek: 0
};

// ==================== SHOP DATA ====================
const SHOP_CATEGORIES = {
  powerups: {
    title: '⚡ تعزيزات', icon: '⚡',
    items: [
      { id: 'streak_freeze', name: 'تجميد السلسلة', desc: 'احفظ سلامتك يوم واحد', icon: '🧊', price: 50, type: 'consumable', effect: 'freeze' },
      { id: 'double_xp', name: 'مضاعف XP', desc: 'ضعف الخبرة لمدة ساعة', icon: '⚡', price: 100, type: 'consumable', effect: 'doubleXP' },
      { id: 'shield', name: 'درع الحماية', desc: 'حماية من فقدان السلسلة', icon: '🛡️', price: 150, type: 'consumable', effect: 'shield' },
      { id: 'bonus_gems', name: 'صندوق جواهر', desc: 'احصل على 25 جوهرة', icon: '🎁', price: 30, type: 'consumable', effect: 'bonusGems' },
      { id: 'auto_complete', name: 'إكمال تلقائي', desc: 'أكمل 3 مهام تلقائياً', icon: '🤖', price: 200, type: 'consumable', effect: 'autoComplete' },
      { id: 'time_freeze', name: 'تجميد الوقت', desc: 'أجّل السلسلة 3 أيام', icon: '⏰', price: 300, type: 'consumable', effect: 'timeFreeze' }
    ]
  },
  avatars: {
    title: '👤 الصور الرمزية', icon: '👤',
    items: [
      { id: 'avatar_mosque', name: 'مسجد', desc: 'صورة مسجد', icon: '🕌', price: 100, type: 'avatar' },
      { id: 'avatar_quran', name: 'قرآن', desc: 'صورة مصحف', icon: '📖', price: 100, type: 'avatar' },
      { id: 'avatar_star', name: 'نجمة', desc: 'نجمة ذهبية', icon: '⭐', price: 150, type: 'avatar' },
      { id: 'avatar_moon', name: 'قمر', desc: 'قمر إسلامي', icon: '🌙', price: 150, type: 'avatar' },
      { id: 'avatar_kabah', name: 'كعبة', desc: 'الكعبة المشرفة', icon: '🕋', price: 200, type: 'avatar' },
      { id: 'avatar_palmtree', name: 'نخلة', desc: 'نخلة', icon: '🌴', price: 80, type: 'avatar' },
      { id: 'avatar_horse', name: 'حصان', desc: 'حصان عربي', icon: '🐴', price: 120, type: 'avatar' },
      { id: 'avatar_eagle', name: 'نسر', desc: 'نسر حر', icon: '🦅', price: 120, type: 'avatar' },
      { id: 'avatar_lion', name: 'أسد', desc: 'أسد الغابة', icon: '🦁', price: 180, type: 'avatar' },
      { id: 'avatar_diamond', name: 'ماسة', desc: 'ماسة ثمينة', icon: '💎', price: 250, type: 'avatar' }
    ]
  },
  themes: {
    title: '🎨 الثيمات', icon: '🎨',
    items: [
      { id: 'theme_ocean', name: 'المحيط', desc: 'ثيم أزرق مائي', icon: '🌊', price: 120, type: 'theme', color: '#0891B2' },
      { id: 'theme_forest', name: 'الغابة', desc: 'ثيم أخضر طبيعي', icon: '🌲', price: 120, type: 'theme', color: '#059669' },
      { id: 'theme_sunset', name: 'الغروب', desc: 'ثيم برتقالي دافئ', icon: '🌅', price: 150, type: 'theme', color: '#EA580C' },
      { id: 'theme_purple', name: 'البنفسجي', desc: 'ثيم بنفسجي أنيق', icon: '💜', price: 150, type: 'theme', color: '#7C3AED' },
      { id: 'theme_rose', name: 'الورد', desc: 'ثيم وردي', icon: '🌹', price: 150, type: 'theme', color: '#E11D48' },
      { id: 'theme_night', name: 'الليل', desc: 'ثيم داكن أنيق', icon: '🌑', price: 200, type: 'theme', color: '#1E293B' },
      { id: 'theme_gold', name: 'الذهب', desc: 'ثيم ذهبي فاخر', icon: '✨', price: 250, type: 'theme', color: '#B45309' },
      { id: 'theme_ramadan', name: 'رمضان', desc: 'ثيم رمضاني خاص', icon: '🌙', price: 300, type: 'theme', color: '#059669' }
    ]
  },
  sounds: {
    title: '🔊 أصوات التنبيه', icon: '🔊',
    items: [
      { id: 'sound_bell', name: 'جرس', desc: 'صوت جرس مسجد', icon: '🔔', price: 80, type: 'sound' },
      { id: 'sound_athan', name: 'أذان', desc: 'صوت أذان', icon: '🕌', price: 150, type: 'sound' },
      { id: 'sound_quran', name: 'قرآن', desc: 'تلاوة قرآن', icon: '📖', price: 120, type: 'sound' },
      { id: 'sound_click', name: 'نقر', desc: 'صوت نقر', icon: '👆', price: 50, type: 'sound' },
      { id: 'sound_success', name: 'نجاح', desc: 'صوت نجاح', icon: '✅', price: 60, type: 'sound' },
      { id: 'sound_levelup', name: 'ترقية', desc: 'صوت ترقية', icon: '🎉', price: 100, type: 'sound' }
    ]
  },
  badges: {
    title: '🏅 الشارات', icon: '🏅',
    items: [
      { id: 'badge_gold_star', name: 'نجمة ذهبية', desc: 'شارة مميزة', icon: '⭐', price: 200, type: 'badge' },
      { id: 'badge_crown', name: 'تاج', desc: 'تاج ملكي', icon: '👑', price: 300, type: 'badge' },
      { id: 'badge_sword', name: 'سيف', desc: 'سيف إسلامي', icon: '⚔️', price: 250, type: 'badge' },
      { id: 'badge_shield', name: 'درع', desc: 'درع الحماية', icon: '🛡️', price: 200, type: 'badge' },
      { id: 'badge_lightning', name: 'برق', desc: 'سرعة وقوة', icon: '⚡', price: 180, type: 'badge' },
      { id: 'badge_fire', name: 'نار', desc: 'الهمة العالية', icon: '🔥', price: 220, type: 'badge' },
      { id: 'badge_diamond', name: 'ماس', desc: 'ندرة وثمين', icon: '💎', price: 350, type: 'badge' },
      { id: 'badge_rocket', name: 'صاروخ', desc: 'تقدم سريع', icon: '🚀', price: 280, type: 'badge' }
    ]
  },
  gifts: {
    title: '🎁 هدايا للعائلة', icon: '🎁',
    items: [
      { id: 'gift_streak', name: 'سلسلة هدية', desc: 'أهدي سلسلة 7 أيام', icon: '🔥', price: 100, type: 'gift' },
      { id: 'gift_gems', name: 'صندوق جواهر', desc: 'أهدي 50 جوهرة', icon: '💎', price: 80, type: 'gift' },
      { id: 'gift_level', name: 'ترقية هدية', desc: 'أهدي ترقية مستوى', icon: '📈', price: 200, type: 'gift' },
      { id: 'gift_badge', name: 'شارة هدية', desc: 'أهدي شارة مميزة', icon: '🏅', price: 150, type: 'gift' },
      { id: 'gift_avatar', name: 'صورة هدية', desc: 'أهدي صورة رمزية', icon: '👤', price: 120, type: 'gift' },
      { id: 'gift_freeze', name: 'تجميد هدية', desc: 'أهدي تجميد سلسلة', icon: '🧊', price: 60, type: 'gift' }
    ]
  }
};

// ==================== DUA DATA ====================
const DUAS = {
  morning: { title: 'أدعية الصباح', icon: '☀️', items: [
    { text: 'اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور', occasion: 'عند الاستيقاظ' },
    { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', occasion: 'صباح كل يوم' },
    { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم', occasion: '3 مرات' }
  ]},
  evening: { title: 'أدعية المساء', icon: '🌙', items: [
    { text: 'اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المحشور', occasion: 'عند النوم' },
    { text: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه', occasion: '100 مرة' }
  ]},
  food: { title: 'أدعية الطعام', icon: '🍽️', items: [
    { text: 'بسم الله', occasion: 'قبل الأكل' },
    { text: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة', occasion: 'بعد الأكل' }
  ]},
  travel: { title: 'أدعية السفر', icon: '✈️', items: [
    { text: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون', occasion: 'عند السفر' }
  ]},
  sleep: { title: 'أدعية النوم', icon: '😴', items: [
    { text: 'باسمك اللهم أموت وأحيا', occasion: 'قبل النوم' },
    { text: 'اللهم قني عذابك يوم تبعث عبادك', occasion: 'قبل النوم' }
  ]},
  distress: { title: 'أدعية الكرب', icon: '🆘', items: [
    { text: 'لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم', occasion: 'عند الكرب' },
    { text: 'حسبي الله ونعم الوكيل', occasion: '7 مرات' }
  ]}
};

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function playSound(type) { if (!state.soundEnabled) return; try { const a = new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA='); a.play().catch(() => {}); } catch(e) {} }
function vibrate(pattern) { if (state.vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern || 50); }
function getDefaultState() { return { level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null, todayTasks: [], completedChallenges: [], achievements: [], darkMode: false, notifEnabled: false, soundEnabled: true, vibrationEnabled: true, autoSync: true, referralCode: generateCode(), totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [], totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null, prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {}, tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33, dailyGoals: [], purchasedItems: [], equippedAvatar: null, equippedTheme: null, equippedBadge: null, doubleXPTimer: 0, shieldActive: false, weeklyGoal: 7, completedThisWeek: 0 }; }
function loadState() { const s = localStorage.getItem('islamicLevels'); if (s) { const parsed = JSON.parse(s); state = { ...getDefaultState(), ...parsed }; } if (!state.referralCode) state.referralCode = generateCode(); if (!state.dailyHistory) state.dailyHistory = []; if (!state.todayPrayers) state.todayPrayers = {}; if (!state.todayAdhkar) state.todayAdhkar = {}; if (!state.purchasedItems) state.purchasedItems = []; updateTheme(); }
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
  
  const renderers = { tracker: renderTracker, prayer: renderPrayerTracker, adhkar: renderAdhkarCategories, quran: renderQuran, profile: renderProfile, settings: renderSettings, tasbih: renderTasbih, shop: renderShop, dua: renderDuaBook };
  if (renderers[name]) renderers[name]();
}

// ==================== HOME ====================
function renderLevels() {
  document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => `
    <div class="level-card" onclick="selectLevel(${level.id})">
      <div class="level-gradient" style="background: linear-gradient(135deg, ${level.color[0]}, ${level.color[1]});">
        <div class="level-emoji">${level.icon}</div>
        <div class="level-name">${level.title}</div>
        <div style="display: flex; justify-content: space-between; margin-top: 8px;">
          <span style="font-size: 12px; opacity: 0.9;">⏱️ ${level.duration}</span>
          <span style="font-size: 12px; opacity: 0.9;">💎 ${level.reward} | ⭐ ${level.xp} XP</span>
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
      html += '<div class="task-item ' + (done ? 'completed' : '') + '" onclick="toggleTask(' + taskId + ')"><div class="task-checkbox">' + (done ? '✓' : '') + '</div><div class="task-text">' + taskText + '</div><div style="font-size:11px;color:var(--primary);font-weight:700;">+' + taskXP + ' XP</div></div>';
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
          let taskXP = typeof task === 'string' ? 10 : (task.xp || 10);
          if (state.doubleXPTimer > Date.now()) taskXP *= 2;
          state.xp = (state.xp || 0) + taskXP;
          const newLevel = calculateLevel(state.xp);
          if (newLevel > state.level) { state.level = newLevel; state.gems += LEVELS[newLevel - 1].reward; }
          break;
        }
        taskIdCounter++;
      }
      if (taskIdCounter > taskId) break;
    }
    playSound('click'); vibrate(50);
  } else { state.todayTasks.splice(idx, 1); }
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
  // Update profile avatar if purchased
  const avatarEl = document.getElementById('profileBtn');
  if (avatarEl && state.equippedAvatar) {
    const avatarItem = SHOP_CATEGORIES.avatars.items.find(i => i.id === state.equippedAvatar);
    if (avatarItem) avatarEl.textContent = avatarItem.icon;
  }
}

// ==================== TASBIH ====================
function renderTasbih() {
  document.getElementById('tasbihText').textContent = state.tasbihText;
  document.getElementById('tasbihCounter').textContent = state.tasbihCount;
  document.getElementById('tasbihTarget').textContent = state.tasbihTarget;
  document.getElementById('tasbihTotal').textContent = state.tasbihTotal;
}
function incrementTasbih() {
  state.tasbihCount++; state.tasbihTotal++; vibrate(state.vibrationEnabled ? 30 : 0);
  if (state.tasbihCount >= state.tasbihTarget) { state.gems += 5; state.xp = (state.xp || 0) + 5; state.tasbihCount = 0; vibrate([100, 50, 100]); updateHeaderGems(); }
  saveState(); document.getElementById('tasbihCounter').textContent = state.tasbihCount;
  document.getElementById('tasbihTotal').textContent = state.tasbihTotal;
}
function resetTasbih() { state.tasbihCount = 0; saveState(); renderTasbih(); }
function changeTasbihText(text) { state.tasbihText = text; state.tasbihCount = 0; saveState(); renderTasbih(); vibrate(50); }

// ==================== SHOP ====================
let currentShopCategory = 'powerups';

function renderShop() {
  document.getElementById('shopGems').textContent = state.gems;
  showShopCategory(currentShopCategory);
}

function showShopCategory(cat) {
  currentShopCategory = cat;
  document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector('[data-cat="' + cat + '"]');
  if (activeTab) activeTab.classList.add('active');
  
  const category = SHOP_CATEGORIES[cat];
  if (!category) return;
  
  let html = '<div style="font-weight: 800; font-size: 18px; margin-bottom: 12px;">' + category.icon + ' ' + category.title + '</div>';
  
  category.items.forEach(item => {
    const owned = state.purchasedItems.includes(item.id);
    const equipped = (item.type === 'avatar' && state.equippedAvatar === item.id) || (item.type === 'theme' && state.equippedTheme === item.id) || (item.type === 'badge' && state.equippedBadge === item.id);
    const canBuy = state.gems >= item.price && !owned;
    
    html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (equipped ? 'var(--success)' : 'var(--border)') + ';">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<div style="width: 50px; height: 50px; border-radius: 12px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 28px;">' + item.icon + '</div>';
    html += '<div style="flex: 1;"><div style="font-weight: 800;">' + item.name + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-muted);">' + item.desc + '</div></div>';
    html += '<div style="text-align: center;">';
    if (owned) {
      if (equipped) {
        html += '<span style="color: var(--success); font-weight: 800; font-size: 12px;">✓ مُلبس</span>';
      } else {
        html += '<button class="btn btn-primary" style="width: auto; padding: 6px 12px; font-size: 11px;" onclick="equipItem(\'' + item.id + '\', \'' + item.type + '\')">لبس</button>';
      }
    } else {
      html += '<div style="font-weight: 800; color: #F59E0B; font-size: 14px;">💎 ' + item.price + '</div>';
      html += '<button class="btn ' + (canBuy ? 'btn-success' : '') + '" style="width: auto; padding: 6px 12px; font-size: 11px; ' + (!canBuy ? 'opacity: 0.5;' : '') + '" onclick="buyItem(\'' + item.id + '\', ' + item.price + ', \'' + item.type + '\', \'' + item.effect + '\')" ' + (!canBuy ? 'disabled' : '') + '>شراء</button>';
    }
    html += '</div></div></div>';
  });
  
  document.getElementById('shopItemsContainer').innerHTML = html;
}

function buyItem(itemId, price, type, effect) {
  if (state.gems < price) { alert('❌ جواهر غير كافية!'); return; }
  if (state.purchasedItems.includes(itemId)) { alert('❌ تملك هذا بالفعل!'); return; }
  
  state.gems -= price;
  state.purchasedItems.push(itemId);
  
  // Apply consumable effects
  if (type === 'consumable') {
    if (effect === 'freeze') { state.streakFreezes++; alert('✅ تم شراء تجميد السلسلة!'); }
    else if (effect === 'doubleXP') { state.doubleXPTimer = Date.now() + 3600000; alert('✅ مضاعف XP لمدة ساعة!'); }
    else if (effect === 'shield') { state.shieldActive = true; alert('✅ درع الحماية مفعّل!'); }
    else if (effect === 'bonusGems') { state.gems += 25; alert('✅ +25 جوهرة!'); }
    else if (effect === 'autoComplete') { for (let i = 0; i < 3; i++) { const taskId = state.todayTasks.length; state.todayTasks.push(taskId); } alert('✅ أُكملت 3 مهام تلقائياً!'); }
    else if (effect === 'timeFreeze') { state.streakFreezes += 3; alert('✅ +3 تجميدات!'); }
    state.purchasedItems = state.purchasedItems.filter(id => id !== itemId);
  }
  
  vibrate([100, 50, 100]);
  saveState(); renderShop(); updateHeaderGems();
}

function equipItem(itemId, type) {
  if (type === 'avatar') state.equippedAvatar = itemId;
  else if (type === 'theme') { state.equippedTheme = itemId; applyTheme(itemId); }
  else if (type === 'badge') state.equippedBadge = itemId;
  vibrate(50);
  saveState(); renderShop(); updateHeaderGems();
}

function applyTheme(themeId) {
  const item = SHOP_CATEGORIES.themes.items.find(i => i.id === themeId);
  if (item && item.color) {
    document.documentElement.style.setProperty('--primary', item.color);
  }
}

// ==================== DUA BOOK ====================
function renderDuaBook() {
  let html = '';
  Object.entries(DUAS).forEach(([key, category]) => {
    html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showDuaCategory(\'' + key + '\')">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<span style="font-size: 32px;">' + category.icon + '</span>';
    html += '<div style="flex: 1;"><div style="font-weight: 800;">' + category.title + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-muted);">' + category.items.length + ' أدعية</div></div></div></div>';
  });
  document.getElementById('duaCategories').innerHTML = html;
}

function showDuaCategory(key) {
  const category = DUAS[key];
  if (!category) return;
  let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">';
  html += '<button onclick="renderDuaBook()" style="background: none; border: none; font-size: 24px; cursor: pointer;">←</button>';
  html += '<div style="font-weight: 800; font-size: 18px;">' + category.icon + ' ' + category.title + '</div></div>';
  category.items.forEach(dua => {
    html += '<div class="card" style="margin-bottom: 12px;"><div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">' + dua.occasion + '</div>';
    html += '<div style="font-size: 16px; line-height: 1.8; text-align: right;">' + dua.text + '</div>';
    html += '<button class="btn btn-primary" style="width: auto; padding: 8px 16px; font-size: 13px; margin-top: 12px;" onclick="copyDua(\'' + dua.text.replace(/'/g, "\\'") + '\')">📋 نسخ</button></div>';
  });
  document.getElementById('duaCategories').innerHTML = html;
}

function copyDua(text) { navigator.clipboard.writeText(text).then(() => { vibrate(50); alert('تم نسخ الدعاء!'); }); }

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
    html += '<div style="font-size: 13px; color: var(--text-muted);">' + (time ? '⏰ ' + time : '') + '</div></div>';
    html += '<button class="btn ' + (completed ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 12px 20px;" onclick="togglePrayer(\'' + prayer.key + '\')">' + (completed ? '✓' : 'أديت') + '</button>';
    html += '</div></div>';
  });
  document.getElementById('prayerTrackerContainer').innerHTML = html;
  document.getElementById('prayersCompleted').textContent = Object.values(state.todayPrayers).filter(v => v).length;
  document.getElementById('sunnahCompleted').textContent = Math.floor(Object.values(state.todayPrayers).filter(v => v).length * 1.5);
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
    html += '<div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + category.icon + '</span>';
    html += '<div style="flex: 1;"><div style="font-weight: 800;">' + category.title + '</div><div style="font-size: 12px; color: var(--text-muted);">' + category.time + '</div></div>';
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
    state.todayAdhkar[key]++; state.totalDhikr++; vibrate(30);
    if (state.todayAdhkar[key] >= totalCount) { state.gems += reward; state.xp = (state.xp || 0) + Math.floor(reward / 10); vibrate([100, 50, 100]); }
    saveState(); updateHeaderGems(); showAdhkar(key.split('_')[0]);
  }
}

// ==================== QURAN ====================
function renderQuran() {
  let html = '<div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📖 القرآن الكريم</div></div>';
  QURAN_PARTS.forEach(part => {
    html += '<div class="card" style="margin-bottom: 12px;"><div style="font-weight: 800;">الجزء ' + part.id + ': ' + part.name + '</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">صفحات: ' + part.pages + ' | ' + part.surahs + '</div>';
    html += '<button class="btn btn-primary" style="margin-top: 8px;" onclick="logQuran(' + part.id + ')">✓ قرأت</button></div>';
  });
  document.getElementById('quranPartsContainer').innerHTML = html;
}
function logQuran(partId) { state.totalQuran += 20; state.gems += 10; state.xp = (state.xp || 0) + 15; vibrate(50); saveState(); updateHeaderGems(); alert('🎉 +10 جواهر | +15 XP'); }

// ==================== PROFILE ====================
function renderProfile() {
  const user = authState.user;
  if (user) { document.getElementById('profileName').textContent = user.name || 'المستخدم'; document.getElementById('profileEmail').textContent = user.email || 'ضيف'; }
  document.getElementById('profileLevel').textContent = calculateLevel(state.xp || 0);
  document.getElementById('profileGems').textContent = state.gems;
  document.getElementById('profileStreak').textContent = state.streak;
  document.getElementById('profileXP').textContent = state.xp || 0;
  if (state.equippedAvatar) { const item = SHOP_CATEGORIES.avatars.items.find(i => i.id === state.equippedAvatar); if (item) document.getElementById('profileAvatar').textContent = item.icon; }
}

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('vibrationToggle').classList.toggle('active', state.vibrationEnabled);
}
function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission(); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function toggleVibration() { state.vibrationEnabled = !state.vibrationEnabled; vibrate(100); saveState(); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = 'backup-' + getToday() + '.json'; a.click(); }
function importData() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => { try { state = { ...getDefaultState(), ...JSON.parse(ev.target.result) }; saveState(); alert('✅ تم الاستيراد!'); location.reload(); } catch { alert('❌ ملف غير صالح'); } }; reader.readAsText(file); } }; input.click(); }

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check({ level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, todayPrayers: state.todayPrayers, totalDhikr: state.totalDhikr, totalQuran: state.totalQuran, xp: state.xp || 0 })) {
      state.achievements.push(ach.id); state.gems += ach.gems; state.xp = (state.xp || 0) + (ach.xp || 0);
      vibrate([200, 100, 200, 100, 200]);
    }
  });
  saveState();
}

// ==================== PRAYER TIMES ====================
async function initPrayerTimes() {
  if (!state.prayerTimesEnabled) return;
  try {
    const pos = await prayerService.getLocation();
    const result = await prayerService.fetchPrayerTimes(pos.latitude, pos.longitude);
    if (result) {
      document.getElementById('prayerTimesCard').style.display = 'block';
      document.getElementById('hijriCard').style.display = 'block';
      document.getElementById('hijriDate').textContent = result.hijri.formatted || (result.hijri.day + ' ' + result.hijri.monthName + ' ' + result.hijri.year + ' هـ');
      document.getElementById('gregorianDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('headerSubtitle').textContent = result.hijri.formatted || '';
      updatePrayerBanner();
      if (state.notifEnabled) notificationService.scheduleDailyReminders(prayerService.times);
    }
    saveState();
  } catch (e) { document.getElementById('headerSubtitle').textContent = 'فعّل الموقع لمواقيت الصلاة'; }
}

function updatePrayerBanner() {
  const current = prayerService.getCurrentPrayer();
  if (current) {
    document.getElementById('nextPrayerName').textContent = current.next.arabic;
    document.getElementById('nextPrayerTime').textContent = current.next.time;
    document.getElementById('timeUntilPrayer').textContent = current.timeUntilNext.formatted;
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
  if (state.equippedTheme) applyTheme(state.equippedTheme);
  setInterval(updatePrayerBanner, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedAuth = localStorage.getItem('islamicAuth');
  if (savedAuth) { authState = JSON.parse(savedAuth); if (authState.isLoggedIn) { loadState(); showApp(); return; } }
  loadState();
  document.getElementById('authModal').style.display = 'flex';
});
