// ==================== STATE ====================
let authState = { isLoggedIn: false, user: null, isGuest: false };
let state = {
  level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null,
  todayTasks: [], completedChallenges: [], achievements: [], darkMode: false,
  notifEnabled: false, soundEnabled: true, vibrationEnabled: true,
  referralCode: null, totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [],
  totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null,
  prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {},
  tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33,
  dailyGoals: [], purchasedItems: [], equippedAvatar: null, equippedTheme: null, equippedBadge: null,
  doubleXPTimer: 0, shieldActive: false, lastLoginDate: null, loginStreak: 0,
  totalLogins: 0, dailyRewardClaimed: false, charityTotal: 0,
  familyId: null, familyRole: null, parentId: null, childId: null
};

// ==================== CONSTANTS ====================
const GEM_TO_MAD_RATE = 0.2;
const LEVEL_REQUIREMENTS = { 2: 30, 3: 60, 4: 90, 5: 120 };

const SHOP_CATEGORIES = {
  dailyRewards: {
    title: '🎁 مكافآت يومية', icon: '🎁',
    items: [
      { id: 'daily_1', name: 'يوم 1', desc: 'المكافأة اليومية', icon: '🌟', price: 0, type: 'daily', day: 1, reward: 10 },
      { id: 'daily_3', name: '3 أيام', desc: 'مكافأة 3 أيام', icon: '🔥', price: 0, type: 'daily', day: 3, reward: 30 },
      { id: 'daily_7', name: 'أسبوع', desc: 'مكافأة أسبوع', icon: '👑', price: 0, type: 'daily', day: 7, reward: 100 },
      { id: 'daily_14', name: 'أسبوعين', desc: 'مكافأة أسبوعين', icon: '💎', price: 0, type: 'daily', day: 14, reward: 200 },
      { id: 'daily_30', name: 'شهر', desc: 'مكافأة شهر', icon: '🏆', price: 0, type: 'daily', day: 30, reward: 500 }
    ]
  },
  powerups: {
    title: '⚡ تعزيزات', icon: '⚡',
    items: [
      { id: 'streak_freeze', name: 'تجميد السلسلة', desc: 'احفظ سلامتك يوم', icon: '🧊', price: 50, type: 'consumable', effect: 'freeze' },
      { id: 'double_xp', name: 'مضاعف XP', desc: 'ضعف الخبرة ساعة', icon: '⚡', price: 100, type: 'consumable', effect: 'doubleXP' },
      { id: 'shield', name: 'درع الحماية', desc: 'حماية السلسلة', icon: '🛡️', price: 150, type: 'consumable', effect: 'shield' },
      { id: 'bonus_gems', name: 'صندوق جواهر', desc: '+25 جوهرة', icon: '🎁', price: 30, type: 'consumable', effect: 'bonusGems' },
      { id: 'auto_complete', name: 'إكمال تلقائي', desc: 'أكمل 3 مهام', icon: '🤖', price: 200, type: 'consumable', effect: 'autoComplete' },
      { id: 'time_freeze', name: 'تجميد الوقت', desc: 'تأجيل 3 أيام', icon: '⏰', price: 300, type: 'consumable', effect: 'timeFreeze' }
    ]
  },
  avatars: {
    title: '👤 الصور', icon: '👤',
    items: [
      { id: 'avatar_mosque', name: 'مسجد', desc: 'مسجد', icon: '🕌', price: 100, type: 'avatar' },
      { id: 'avatar_quran', name: 'قرآن', desc: 'مصحف', icon: '📖', price: 100, type: 'avatar' },
      { id: 'avatar_star', name: 'نجمة', desc: 'نجمة ذهبية', icon: '⭐', price: 150, type: 'avatar' },
      { id: 'avatar_moon', name: 'قمر', desc: 'قمر إسلامي', icon: '🌙', price: 150, type: 'avatar' },
      { id: 'avatar_kabah', name: 'كعبة', desc: 'الكعبة', icon: '🕋', price: 200, type: 'avatar' },
      { id: 'avatar_palmtree', name: 'نخلة', desc: 'نخلة', icon: '🌴', price: 80, type: 'avatar' },
      { id: 'avatar_horse', name: 'حصان', desc: 'حصان', icon: '🐴', price: 120, type: 'avatar' },
      { id: 'avatar_eagle', name: 'نسر', desc: 'نسر', icon: '🦅', price: 120, type: 'avatar' },
      { id: 'avatar_lion', name: 'أسد', desc: 'أسد', icon: '🦁', price: 180, type: 'avatar' },
      { id: 'avatar_diamond', name: 'ماسة', desc: 'ماسة', icon: '💎', price: 250, type: 'avatar' }
    ]
  },
  themes: {
    title: '🎨 الثيمات', icon: '🎨',
    items: [
      { id: 'theme_ocean', name: 'المحيط', desc: 'أزرق', icon: '🌊', price: 120, type: 'theme', color: '#0891B2' },
      { id: 'theme_forest', name: 'الغابة', desc: 'أخضر', icon: '🌲', price: 120, type: 'theme', color: '#059669' },
      { id: 'theme_sunset', name: 'الغروب', desc: 'برتقالي', icon: '🌅', price: 150, type: 'theme', color: '#EA580C' },
      { id: 'theme_purple', name: 'بنفسجي', desc: 'بنفسجي', icon: '💜', price: 150, type: 'theme', color: '#7C3AED' },
      { id: 'theme_rose', name: 'وردي', desc: 'وردي', icon: '🌹', price: 150, type: 'theme', color: '#E11D48' },
      { id: 'theme_night', name: 'ليلي', desc: 'داكن', icon: '🌑', price: 200, type: 'theme', color: '#1E293B' },
      { id: 'theme_gold', name: 'ذهبي', desc: 'ذهبي', icon: '✨', price: 250, type: 'theme', color: '#B45309' },
      { id: 'theme_ramadan', name: 'رمضان', desc: 'رمضاني', icon: '🌙', price: 300, type: 'theme', color: '#059669' }
    ]
  },
  badges: {
    title: '🏅 الشارات', icon: '🏅',
    items: [
      { id: 'badge_gold_star', name: 'نجمة', desc: 'ذهبية', icon: '⭐', price: 200, type: 'badge' },
      { id: 'badge_crown', name: 'تاج', desc: 'ملكي', icon: '👑', price: 300, type: 'badge' },
      { id: 'badge_sword', name: 'سيف', desc: 'إسلامي', icon: '⚔️', price: 250, type: 'badge' },
      { id: 'badge_diamond', name: 'ماس', desc: 'نادر', icon: '💎', price: 350, type: 'badge' },
      { id: 'badge_fire', name: 'نار', desc: 'همة', icon: '🔥', price: 220, type: 'badge' }
    ]
  },
  charity: {
    title: '💰 الصدقات', icon: '💰',
    items: [
      { id: 'charity_water', name: 'ماء', desc: 'ماء', icon: '💧', price: 100, type: 'charity' },
      { id: 'charity_food', name: 'طعام', desc: 'طعام', icon: '🍞', price: 150, type: 'charity' },
      { id: 'charity_education', name: 'تعليم', desc: 'تعليم', icon: '📚', price: 200, type: 'charity' },
      { id: 'charity_mosque', name: 'مسجد', desc: 'بناء مسجد', icon: '🕌', price: 500, type: 'charity' },
      { id: 'charity_orphan', name: 'يتيم', desc: 'كفالة يتيم', icon: '👶', price: 300, type: 'charity' }
    ]
  }
};

function convertGemsToMad(gems) { return Math.floor(gems * GEM_TO_MAD_RATE); }
function convertMadToGems(mad) { return Math.ceil(mad / GEM_TO_MAD_RATE); }

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function vibrate(pattern) { if (state.vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern || 50); }
function playSound() { if (state.soundEnabled) { try { new Audio('data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA=').play().catch(() => {}); } catch(e) {} } }
function getDefaultState() { return { level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null, todayTasks: [], completedChallenges: [], achievements: [], darkMode: false, notifEnabled: false, soundEnabled: true, vibrationEnabled: true, referralCode: generateCode(), totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [], totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null, prayerTimesEnabled: true, location: null, todayPrayers: {}, todayAdhkar: {}, tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33, dailyGoals: [], purchasedItems: [], equippedAvatar: null, equippedTheme: null, equippedBadge: null, doubleXPTimer: 0, shieldActive: false, lastLoginDate: null, loginStreak: 0, totalLogins: 0, dailyRewardClaimed: false, charityTotal: 0, familyId: null, familyRole: null, parentId: null, childId: null }; }
function loadState() { const s = localStorage.getItem('islamicLevels'); if (s) state = { ...getDefaultState(), ...JSON.parse(s) }; if (!state.referralCode) state.referralCode = generateCode(); if (!state.dailyHistory) state.dailyHistory = []; if (!state.todayPrayers) state.todayPrayers = {}; if (!state.todayAdhkar) state.todayAdhkar = {}; if (!state.purchasedItems) state.purchasedItems = []; checkDailyLogin(); updateTheme(); }
function saveState() { localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// ==================== AUTH ====================
function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; }
function login() { const e = document.getElementById('authEmail').value; const p = document.getElementById('authPassword').value; if (!e || !p) { alert('أدخل البريد وكلمة المرور'); return; } const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]'); const user = users.find(u => u.email === e && u.password === p); if (user) { authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); loadUserData(user.id); showApp(); } else alert('بيانات الدخول غير صحيحة'); }
function register() { const n = document.getElementById('regName').value; const e = document.getElementById('regEmail').value; const p = document.getElementById('regPassword').value; if (!n || !e || !p) { alert('أكمل جميع الحقول'); return; } const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]'); if (users.find(u => u.email === e)) { alert('البريد مسجل مسبقاً'); return; } const user = { id: Date.now().toString(), name: n, email: e, password: p }; users.push(user); localStorage.setItem('islamicUsers', JSON.stringify(users)); authState = { isLoggedIn: true, user, isGuest: false }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); state = getDefaultState(); saveUserData(user.id); showApp(); }
function guestLogin() { authState = { isLoggedIn: true, user: { id: 'guest-' + Date.now(), name: 'ضيف', email: '' }, isGuest: true }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); if (!localStorage.getItem('islamicLevels')) { state = getDefaultState(); saveState(); } else loadState(); showApp(); }
function logout() { if (confirm('تسجيل الخروج؟')) { authState = { isLoggedIn: false, user: null, isGuest: false }; localStorage.removeItem('islamicAuth'); location.reload(); } }
function loadUserData(userId) { const s = localStorage.getItem('islamicLevels_' + userId); if (s) state = { ...getDefaultState(), ...JSON.parse(s) }; else { state = getDefaultState(); saveUserData(userId); } }
function saveUserData(userId) { localStorage.setItem('islamicLevels_' + userId, JSON.stringify(state)); }

// ==================== DAILY LOGIN ====================
function checkDailyLogin() { const today = getToday(); if (state.lastLoginDate === today) return; const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]; state.loginStreak = (state.lastLoginDate === yesterday) ? state.loginStreak + 1 : 1; state.lastLoginDate = today; state.totalLogins++; state.dailyRewardClaimed = false; saveState(); }

function claimDailyReward() {
  if (state.dailyRewardClaimed) { alert('✅ حصلت على مكافأتك اليومية بالفعل!'); return; }
  const reward = Math.min(10 + (state.loginStreak * 2), 100);
  state.gems += reward; state.xp = (state.xp || 0) + 10; state.dailyRewardClaimed = true;
  vibrate([100, 50, 100]); saveState(); updateHeaderGems();
  alert('🎉 مكافأة يومية: +' + reward + ' جوهرة | +10 XP');
}

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById(name + 'Screen');
  if (screen) screen.classList.add('active');
  const navItem = document.querySelector('[data-screen="' + name + '"]');
  if (navItem) navItem.classList.add('active');
  vibrate(30);
  const renderers = { tracker: renderTracker, prayer: renderPrayerTracker, adhkar: renderAdhkarCategories, quran: renderQuran, profile: renderProfile, settings: renderSettings, tasbih: renderTasbih, shop: renderShop, dua: renderDuaBook, family: renderFamily, gift: renderGiftConversion, messages: renderMessages };
  if (renderers[name]) renderers[name]();
}

// ==================== HOME ====================
function renderLevels() { document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => { const unlock = checkLevelUnlock(state); const isLocked = level.id > state.level && !state.purchasedItems.includes('unlock_level_' + level.id); return '<div class="level-card" style="' + (isLocked ? 'opacity: 0.6;' : '') + '" onclick="' + (isLocked ? '' : 'selectLevel(' + level.id + ')') + '"><div class="level-gradient" style="background: linear-gradient(135deg, ' + level.color[0] + ', ' + level.color[1] + ');"><div class="level-emoji">' + level.icon + '</div><div class="level-name">' + level.title + '</div><div style="display: flex; justify-content: space-between; margin-top: 8px;"><span style="font-size: 12px; opacity: 0.9;">⏱️ ' + level.duration + '</span><span style="font-size: 12px; opacity: 0.9;">💎 ' + level.reward + ' | ⭐ ' + level.xp + ' XP</span></div>' + (isLocked ? '<div style="font-size: 12px; margin-top: 8px;">🔒 ' + (unlock.reason || 'مقفل') + '</div>' : '') + '</div></div>'; }).join(''); }
function selectLevel(levelId) { state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker'); }

// ==================== TRACKER ====================
function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  const today = getToday();
  if (state.lastDate !== today) { state.todayTasks = []; state.lastDate = today; state.todayPrayers = {}; state.todayAdhkar = {}; saveState(); }
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;
  
  // Show level lock status
  const unlock = checkLevelUnlock(state);
  let html = '';
  if (!unlock.canUnlock && state.level < 5) {
    html += '<div class="card" style="background: #FEF3C7; border-color: #F59E0B; margin-bottom: 12px;">';
    html += '<div style="font-weight: 800; font-size: 14px;">🔒 قفل المستوى التالي</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">' + unlock.reason + '</div>';
    html += '<div class="progress-container" style="margin-top: 8px;"><div class="progress-bar" style="width: ' + Math.round((state.totalDays / (unlock.daysRequired || 30)) * 100) + '%;"></div></div>';
    html += '<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">' + state.totalDays + '/' + (unlock.daysRequired || 30) + ' يوم</div>';
    html += '</div>';
  }
  
  html += '<div class="card"><div style="display: flex; justify-content: space-between; margin-bottom: 12px;"><span style="font-weight: 800;">التقدم اليومي</span><span style="color: var(--primary); font-weight: 900;" id="progressPercent">0%</span></div><div class="progress-container"><div class="progress-bar" id="progressBar" style="width: 0%"></div></div><div style="display: flex; justify-content: space-between; margin-top: 12px;"><span style="font-size: 13px; color: var(--text-muted);">🔥 السلسلة: <span id="streakCount">' + state.streak + '</span></span><span style="font-size: 13px; color: var(--text-muted);" id="todayDate">' + today + '</span></div></div>';
  html += '<div class="card" style="background: #FEF3C7; border-color: #F59E0B; display: none;" id="rewardBanner"><div style="text-align: center; font-weight: 800; color: #92400E;">🎉 مبروك! حصلت على <span id="rewardGems">0</span> جواهر!</div></div>';
  
  let taskId = 0;
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
          break;
        }
        taskIdCounter++;
      }
      if (taskIdCounter > taskId) break;
    }
    playSound(); vibrate(50);
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
    state.gems += level.reward; state.xp = (state.xp || 0) + (level.xp || 0);
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

function showConfetti() { const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']; for (let i = 0; i < 30; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + '%'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; c.style.animationDelay = Math.random() * 2 + 's'; document.body.appendChild(c); setTimeout(() => c.remove(), 4000); } }
function updateHeaderGems() { const g = document.getElementById('headerGems'); const x = document.getElementById('headerXP'); if (g) g.textContent = state.gems; if (x) x.textContent = state.xp || 0; }

// ==================== LEVEL LOCK SYSTEM ====================
function checkLevelUnlock(state) {
  const nextLevel = state.level + 1;
  if (nextLevel > 5) return { canUnlock: false, reason: 'أنت في أعلى مستوى!' };
  const daysRequired = LEVEL_REQUIREMENTS[nextLevel] || 30;
  if (state.totalDays >= daysRequired) return { canUnlock: true, reason: 'أكملت ' + daysRequired + ' يوم!' };
  return { canUnlock: false, reason: 'تحتاج ' + (daysRequired - state.totalDays) + ' يوم إضافي', daysRequired, remaining: daysRequired - state.totalDays };
}

// ==================== TASBIH ====================
function renderTasbih() { document.getElementById('tasbihText').textContent = state.tasbihText; document.getElementById('tasbihCounter').textContent = state.tasbihCount; document.getElementById('tasbihTarget').textContent = state.tasbihTarget; document.getElementById('tasbihTotal').textContent = state.tasbihTotal; }
function incrementTasbih() { state.tasbihCount++; state.tasbihTotal++; vibrate(state.vibrationEnabled ? 30 : 0); if (state.tasbihCount >= state.tasbihTarget) { state.gems += 5; state.xp = (state.xp || 0) + 5; state.tasbihCount = 0; vibrate([100, 50, 100]); updateHeaderGems(); } saveState(); document.getElementById('tasbihCounter').textContent = state.tasbihCount; document.getElementById('tasbihTotal').textContent = state.tasbihTotal; }
function resetTasbih() { state.tasbihCount = 0; saveState(); renderTasbih(); }
function changeTasbihText(text) { state.tasbihText = text; state.tasbihCount = 0; saveState(); renderTasbih(); vibrate(50); }

// ==================== SHOP ====================
let currentShopCategory = 'dailyRewards';
function renderShop() { document.getElementById('shopGems').textContent = state.gems; showShopCategory(currentShopCategory); }
function showShopCategory(cat) {
  currentShopCategory = cat;
  document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector('[data-cat="' + cat + '"]');
  if (activeTab) activeTab.classList.add('active');
  const category = SHOP_CATEGORIES[cat];
  if (!category) return;
  let html = '';
  if (cat === 'dailyRewards') {
    html += '<div class="card" style="margin-bottom: 12px; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; text-align: center;">';
    html += '<div style="font-size: 16px; font-weight: 800;">🔥 سلسلة تسجيل الدخول: ' + state.loginStreak + ' أيام</div>';
    html += '<button class="btn" style="width: auto; padding: 10px 20px; margin-top: 12px; background: white; color: #D97706; font-weight: 800;" onclick="claimDailyReward()">' + (state.dailyRewardClaimed ? '✅ تم' : '🎁 احصل على مكافأتك') + '</button></div>';
  }
  category.items.forEach(item => {
    const owned = state.purchasedItems.includes(item.id);
    const equipped = (item.type === 'avatar' && state.equippedAvatar === item.id) || (item.type === 'theme' && state.equippedTheme === item.id) || (item.type === 'badge' && state.equippedBadge === item.id);
    const canBuy = (item.price === 0 || state.gems >= item.price) && !owned;
    html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (equipped ? 'var(--success)' : 'var(--border)') + ';"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 50px; height: 50px; border-radius: 12px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 28px;">' + item.icon + '</div><div style="flex: 1;"><div style="font-weight: 800;">' + item.name + '</div><div style="font-size: 12px; color: var(--text-muted);">' + item.desc + '</div></div><div style="text-align: center;">';
    if (owned) { html += equipped ? '<span style="color: var(--success); font-weight: 800;">✓ مُلبس</span>' : '<button class="btn btn-primary" style="width: auto; padding: 6px 12px; font-size: 11px;" onclick="equipItem(\'' + item.id + '\', \'' + item.type + '\')">لبس</button>'; }
    else { html += '<div style="font-weight: 800; color: #F59E0B;">💎 ' + (item.price || 'مجاني') + '</div><button class="btn ' + (canBuy ? 'btn-success' : '') + '" style="width: auto; padding: 6px 12px; font-size: 11px; ' + (!canBuy ? 'opacity: 0.5;' : '') + '" onclick="buyItem(\'' + item.id + '\', ' + item.price + ', \'' + item.type + '\', \'' + (item.effect || '') + '\')" ' + (!canBuy ? 'disabled' : '') + '>شراء</button>'; }
    html += '</div></div></div>';
  });
  document.getElementById('shopItemsContainer').innerHTML = html;
}
function buyItem(itemId, price, type, effect) {
  if (price > 0 && state.gems < price) { alert('❌ جواهر غير كافية!'); return; }
  if (state.purchasedItems.includes(itemId)) { alert('❌ تملك هذا بالفعل!'); return; }
  state.gems -= price; state.purchasedItems.push(itemId);
  if (type === 'consumable') {
    if (effect === 'freeze') state.streakFreezes++;
    else if (effect === 'doubleXP') state.doubleXPTimer = Date.now() + 3600000;
    else if (effect === 'shield') state.shieldActive = true;
    else if (effect === 'bonusGems') state.gems += 25;
    else if (effect === 'autoComplete') { for (let i = 0; i < 3; i++) state.todayTasks.push(state.todayTasks.length); }
    state.purchasedItems = state.purchasedItems.filter(id => id !== itemId);
  } else if (type === 'charity') { state.charityTotal += price; }
  else if (type === 'unlock') {
    const levelNum = parseInt(itemId.split('_')[2]);
    if (levelNum) state.level = Math.max(state.level, levelNum);
  }
  vibrate([100, 50, 100]); saveState(); renderShop(); updateHeaderGems();
}
function equipItem(itemId, type) {
  if (type === 'avatar') state.equippedAvatar = itemId;
  else if (type === 'theme') { state.equippedTheme = itemId; applyTheme(itemId); }
  else if (type === 'badge') state.equippedBadge = itemId;
  vibrate(50); saveState(); renderShop(); updateHeaderGems();
}
function applyTheme(themeId) { const item = SHOP_CATEGORIES.themes.items.find(i => i.id === themeId); if (item && item.color) document.documentElement.style.setProperty('--primary', item.color); }

// ==================== FAMILY MANAGEMENT ====================
function renderFamily() {
  if (!familyManager) { familyManager = new FamilyManager(); familyManager.loadFamily(); }
  
  const isParent = state.familyRole === 'parent';
  const isChild = state.familyRole === 'child';
  const hasFamily = state.familyId !== null;
  
  let html = '';
  
  if (!hasFamily) {
    html += '<div class="card"><div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">👨‍👩‍👧</div>';
    html += '<div style="font-weight: 800; font-size: 18px;">إنشاء أو الانضمام لعائلة</div>';
    html += '<div style="color: var(--text-muted); margin-top: 8px;">تابع تقدم أطفالك وشاركهم المكافآت</div></div>';
    html += '<button class="btn btn-primary" style="margin-top: 16px;" onclick="showCreateFamily()">➕ إنشاء عائلة (والد)</button>';
    html += '<button class="btn btn-success" style="margin-top: 12px;" onclick="showJoinFamily()">🔗 الانضمام (طفل)</button>';
    html += '</div>';
  } else {
    html += '<div class="card" style="background: #ECFDF5; border-color: #34D399;">';
    html += '<div style="font-weight: 800;">👨‍👩‍👧 عائلتك</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">دورك: ' + (isParent ? '👨 والد' : '👧 طفل') + '</div>';
    if (isParent) html += '<div style="margin-top: 8px; padding: 8px; background: white; border-radius: 8px;"><div style="font-size: 12px; color: var(--text-muted);">كود العائلة</div><div style="font-size: 20px; font-weight: 900; color: var(--primary);" id="familyCode">' + (familyManager.parentCode || '-') + '</div></div>';
    html += '</div>';
    
    html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">👥 أعضاء العائلة</div>';
    if (familyManager.members.length > 0) {
      familyManager.members.forEach(m => {
        html += '<div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-bottom: 1px solid var(--border);">';
        html += '<div style="width: 40px; height: 40px; border-radius: 50%; background: ' + (m.role === 'parent' ? '#3B82F6' : '#10B981') + '; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">' + (m.role === 'parent' ? '👨' : '👧') + '</div>';
        html += '<div style="flex: 1;"><div style="font-weight: 700;">' + m.name + '</div><div style="font-size: 12px; color: var(--text-muted);">🔥 ' + (m.streak || 0) + ' | 💎 ' + (m.gems || 0) + '</div></div>';
        html += '<div style="font-size: 10px; padding: 4px 8px; border-radius: 8px; background: ' + (m.isOnline ? '#D1FAE5' : '#F3F4F6') + '; color: ' + (m.isOnline ? '#059669' : '#6B7280') + ';">' + (m.isOnline ? 'متصل' : 'غير متصل') + '</div>';
        html += '</div>';
      });
    }
    html += '</div>';
    
    if (isParent) {
      const pending = familyManager.requests.filter(r => r.status === 'pending');
      if (pending.length > 0) {
        html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📬 طلبات معلقة (' + pending.length + ')</div>';
        pending.forEach(req => {
          html += '<div style="padding: 12px; border-bottom: 1px solid var(--border);">';
          html += '<div style="font-weight: 700;">' + req.childName + ': ' + req.type + '</div>';
          if (req.type === 'money') html += '<div style="font-size: 14px; color: #F59E0B;">💰 ' + convertGemsToMad(req.amount) + ' MAD</div>';
          if (req.message) html += '<div style="font-size: 13px; color: var(--text-muted);">' + req.message + '</div>';
          html += '<div style="display: flex; gap: 8px; margin-top: 8px;">';
          html += '<button class="btn btn-success" style="flex: 1; padding: 8px; font-size: 12px;" onclick="approveRequest(\'' + req.id + '\')">✓ قبول</button>';
          html += '<button class="btn" style="flex: 1; padding: 8px; font-size: 12px; background: #FEE2E2; color: #EF4444;" onclick="rejectRequest(\'' + req.id + '\')">✗ رفض</button>';
          html += '</div></div>';
        });
        html += '</div>';
      }
    }
    
    if (isChild) {
      html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📩 طلب مكافأة</div>';
      html += '<button class="btn btn-primary" style="margin-top: 8px;" onclick="requestMoneyGift()">💰 طلب تحويل جواهر إلى مال</button>';
      html += '</div>';
    }
    
    html += '<button class="btn" style="background: #FEE2E2; color: #EF4444; margin-top: 12px;" onclick="leaveFamily()">🚪 مغادرة العائلة</button>';
  }
  
  document.getElementById('familyContent').innerHTML = html;
}

function showCreateFamily() {
  const name = prompt('اسم العائلة:');
  if (!name) return;
  familyManager = new FamilyManager();
  const result = familyManager.createFamily(name);
  state.familyId = result.familyId;
  state.familyRole = 'parent';
  saveState();
  renderFamily();
  alert('✅ تم إنشاء العائلة!\nكود العائلة: ' + result.parentCode);
}

function showJoinFamily() {
  const code = prompt('كود العائلة (6 أحرف):');
  if (!code || code.length !== 6) { alert('كود غير صالح'); return; }
  const name = prompt('اسمك:');
  if (!name) return;
  
  familyManager = new FamilyManager();
  familyManager.loadFamily();
  familyManager.joinFamily(name, code.toUpperCase());
  
  state.familyId = 'family-' + code;
  state.familyRole = 'child';
  state.parentId = 'parent'; // Will be set by actual parent
  saveState();
  renderFamily();
  alert('✅ تم الانضمام!');
}

function approveRequest(requestId) { if (familyManager) { familyManager.approveRequest(requestId); renderFamily(); alert('✅ تمت الموافقة!'); } }
function rejectRequest(requestId) { if (familyManager) { familyManager.rejectRequest(requestId); renderFamily(); alert('❌ تم الرفض'); } }
function leaveFamily() { if (confirm('مغادرة العائلة؟')) { state.familyId = null; state.familyRole = null; saveState(); renderFamily(); } }

// ==================== REAL GIFT CONVERSION ====================
function renderGiftConversion() {
  let html = '';
  
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">💰 أسعار التحويل</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 20px;">💎 100</div><div style="font-size: 14px; color: var(--text-muted);">= 20 MAD</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 20px;">💎 500</div><div style="font-size: 14px; color: var(--text-muted);">= 100 MAD</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 20px;">💎 1000</div><div style="font-size: 14px; color: var(--text-muted);">= 200 MAD</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 20px;">💎 5000</div><div style="font-size: 14px; color: var(--text-muted);">= 1000 MAD</div></div>';
  html += '</div></div>';
  
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🔄 تحويل جواهر</div>';
  html += '<div style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">جواهرك الحالية: <span style="color: #F59E0B; font-weight: 800;">💎 ' + state.gems + '</span></div>';
  html += '<input type="number" id="convertAmount" placeholder="عدد الجواهر" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 12px; text-align: center; font-size: 18px;" />';
  html += '<div style="text-align: center; font-size: 16px; font-weight: 800; margin-bottom: 12px;">= <span id="convertResult" style="color: var(--primary);">0</span> MAD</div>';
  html += '<button class="btn btn-primary" onclick="convertGems()">💰 تحويل إلى MAD</button>';
  html += '</div>';
  
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🎁 طلب مكافأة من الوالد</div>';
  html += '<div style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">أرسل طلب للوالد لتحويل جواهرك إلى مكافأة حقيقية</div>';
  html += '<input type="number" id="requestAmount" placeholder="عدد الجواهر المطلوبة" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 12px; text-align: center;" />';
  html += '<input type="text" id="requestMessage" placeholder="رسالة للوالد (اختياري)" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 12px; text-align: right;" />';
  html += '<button class="btn btn-success" onclick="requestMoneyGift()">📩 إرسال الطلب</button>';
  html += '</div>';
  
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📊 إحصائيات التحويل</div>';
  html += '<div style="display: flex; justify-content: space-around;">';
  html += '<div style="text-align: center;"><div style="font-size: 20px; font-weight: 900; color: var(--primary);">' + (state.charityTotal || 0) + '</div><div style="font-size: 12px; color: var(--text-muted);">total donated</div></div>';
  html += '<div style="text-align: center;"><div style="font-size: 20px; font-weight: 900; color: #F59E0B;">' + convertGemsToMad(state.gems) + '</div><div style="font-size: 12px; color: var(--text-muted);">MAD المتاحة</div></div>';
  html += '</div></div>';
  
  document.getElementById('giftContent').innerHTML = html;
  
  // Add input listener for conversion preview
  setTimeout(() => {
    const input = document.getElementById('convertAmount');
    if (input) {
      input.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        document.getElementById('convertResult').textContent = convertGemsToMad(amount);
      });
    }
  }, 100);
}

function convertGems() {
  const amount = parseInt(document.getElementById('convertAmount').value);
  if (!amount || amount < 100) { alert('الحد الأدنى 100 جوهرة'); return; }
  if (amount > state.gems) { alert('جواهر غير كافية'); return; }
  
  const mad = convertGemsToMad(amount);
  state.gems -= amount;
  saveState(); renderGiftConversion(); updateHeaderGems();
  alert('✅ تم التحويل!\n' + amount + ' 💎 = ' + mad + ' MAD');
}

function requestMoneyGift() {
  const amount = parseInt(document.getElementById('requestAmount')?.value);
  if (!amount || amount < 100) { alert('الحد الأدنى 100 جوهرة'); return; }
  if (amount > state.gems) { alert('جواهر غير كافية'); return; }
  
  const message = document.getElementById('requestMessage')?.value || '';
  
  if (familyManager) {
    familyManager.sendRequest(state.childId || 'child', 'money', amount, message);
    alert('✅ تم إرسال الطلب للوالد!');
  } else {
    alert('❌ يجب الانضمام لعائلة أولاً');
  }
}

// ==================== MESSAGING ====================
function renderMessages() {
  if (!familyManager) { familyManager = new FamilyManager(); familyManager.loadFamily(); }
  
  if (!state.familyId) {
    document.getElementById('messagesContent').innerHTML = '<div class="card" style="text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">💬</div><div style="font-weight: 800;">الرسائل متاحة لأعضاء العائلة فقط</div><div style="color: var(--text-muted); margin-top: 8px;">انضم لعائلة للبدء</div></div>';
    return;
  }
  
  const members = familyManager.members.filter(m => m.id !== (state.childId || state.parentId));
  let html = '';
  
  members.forEach(member => {
    const msgs = familyManager.getMessages(state.childId || state.parentId, member.id);
    const lastMsg = msgs[msgs.length - 1];
    
    html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="openChat(\'' + member.id + '\')">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<div style="width: 40px; height: 40px; border-radius: 50%; background: ' + (member.role === 'parent' ? '#3B82F6' : '#10B981') + '; display: flex; align-items: center; justify-content: center; color: white;">' + (member.role === 'parent' ? '👨' : '👧') + '</div>';
    html += '<div style="flex: 1;"><div style="font-weight: 700;">' + member.name + '</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">' + (lastMsg ? lastMsg.content.substring(0, 30) + '...' : 'لا توجد رسائل') + '</div></div>';
    html += '<div style="font-size: 10px; color: var(--text-muted);">' + (lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) : '') + '</div>';
    html += '</div></div>';
  });
  
  document.getElementById('messagesContent').innerHTML = html;
}

function openChat(memberId) {
  if (!familyManager) return;
  const member = familyManager.getMember(memberId);
  if (!member) return;
  
  const myId = state.childId || state.parentId;
  const msgs = familyManager.getMessages(myId, memberId);
  
  let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">';
  html += '<button onclick="renderMessages()" style="background: none; border: none; font-size: 24px;">←</button>';
  html += '<div><div style="font-weight: 800;">' + member.name + '</div><div style="font-size: 12px; color: var(--text-muted);">' + (member.isOnline ? '🟢 متصل' : '⚫ غير متصل') + '</div></div></div>';
  
  html += '<div style="max-height: 400px; overflow-y: auto; margin-bottom: 16px;">';
  msgs.forEach(msg => {
    const isMine = msg.from === myId;
    html += '<div style="display: flex; justify-content: ' + (isMine ? 'flex-end' : 'flex-start') + '; margin-bottom: 8px;">';
    html += '<div style="max-width: 70%; padding: 10px 14px; border-radius: 16px; background: ' + (isMine ? 'var(--primary)' : 'var(--bg)') + '; color: ' + (isMine ? 'white' : 'var(--text)') + ';">';
    html += '<div style="font-size: 14px;">' + msg.content + '</div>';
    html += '<div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">' + new Date(msg.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) + '</div>';
    html += '</div></div>';
  });
  html += '</div>';
  
  html += '<div style="display: flex; gap: 8px;">';
  html += '<input type="text" id="chatInput" placeholder="اكتب رسالة..." style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 20px; text-align: right;" />';
  html += '<button class="btn btn-primary" style="width: auto; padding: 12px 20px; border-radius: 20px;" onclick="sendMessage(\'' + memberId + '\')">إرسال</button>';
  html += '</div>';
  
  document.getElementById('messagesContent').innerHTML = html;
}

function sendMessage(memberId) {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  
  if (familyManager) {
    familyManager.sendMessage(state.childId || state.parentId, memberId, input.value.trim());
    openChat(memberId);
  }
}

// ==================== DUA BOOK ====================
function renderDuaBook() { let html = ''; Object.entries(DUAS).forEach(([key, cat]) => { html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showDuaCategory(\'' + key + '\')"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + cat.icon + '</span><div style="flex: 1;"><div style="font-weight: 800;">' + cat.title + '</div><div style="font-size: 12px; color: var(--text-muted);">' + cat.items.length + ' أدعية</div></div></div></div>'; }); document.getElementById('duaCategories').innerHTML = html; }
function showDuaCategory(key) { const cat = DUAS[key]; if (!cat) return; let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;"><button onclick="renderDuaBook()" style="background: none; border: none; font-size: 24px;">←</button><div style="font-weight: 800; font-size: 18px;">' + cat.icon + ' ' + cat.title + '</div></div>'; cat.items.forEach(dua => { html += '<div class="card" style="margin-bottom: 12px;"><div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">' + dua.occasion + '</div><div style="font-size: 16px; line-height: 1.8; text-align: right;">' + dua.text + '</div></div>'; }); document.getElementById('duaCategories').innerHTML = html; }

// ==================== PRAYER TRACKER ====================
function renderPrayerTracker() { document.getElementById('prayerDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); let html = ''; DAILY_WORSHIP.faraid.forEach(prayer => { const completed = state.todayPrayers[prayer.key] || false; const time = prayerService.times ? prayerService.times[prayer.key] : ''; html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (completed ? 'var(--success)' : 'var(--border)') + ';"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + prayer.icon + '</span><div style="flex: 1;"><div style="font-weight: 800; font-size: 18px;">صلاة ' + prayer.name + '</div><div style="font-size: 13px; color: var(--text-muted);">' + (time ? '⏰ ' + time : '') + '</div></div><button class="btn ' + (completed ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 12px 20px;" onclick="togglePrayer(\'' + prayer.key + '\')">' + (completed ? '✓' : 'أديت') + '</button></div></div>'; }); document.getElementById('prayerTrackerContainer').innerHTML = html; document.getElementById('prayersCompleted').textContent = Object.values(state.todayPrayers).filter(v => v).length; }
function togglePrayer(key) { state.todayPrayers[key] = !state.todayPrayers[key]; if (state.todayPrayers[key]) state.totalPrayers++; else state.totalPrayers = Math.max(0, state.totalPrayers - 1); vibrate(50); saveState(); renderPrayerTracker(); updateHeaderGems(); }

// ==================== ADHKAR ====================
function renderAdhkarCategories() { let html = '<div class="card" style="background: linear-gradient(135deg, #8B5CF6, #DB2777); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📿 الأذكار</div></div>'; Object.entries(ADHKAR).forEach(([key, cat]) => { html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showAdhkar(\'' + key + '\')"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + cat.icon + '</span><div style="flex: 1;"><div style="font-weight: 800;">' + cat.title + '</div><div style="font-size: 12px; color: var(--text-muted);">' + cat.time + '</div></div><div style="font-weight: 900; color: var(--primary);">' + cat.items.length + '</div></div></div>'; }); document.getElementById('adhkarCategories').innerHTML = html; document.getElementById('adhkarItems').style.display = 'none'; }
function showAdhkar(categoryKey) { const cat = ADHKAR[categoryKey]; if (!cat) return; let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;"><button onclick="renderAdhkarCategories()" style="background: none; border: none; font-size: 24px;">←</button><div style="font-weight: 800; font-size: 18px;">' + cat.icon + ' ' + cat.title + '</div></div>'; cat.items.forEach((item, index) => { const key = categoryKey + '_' + index; const completed = state.todayAdhkar[key] || 0; const remaining = Math.max(0, item.count - completed); const isComplete = remaining === 0; html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (isComplete ? 'var(--success)' : 'var(--border)') + ';"><div style="font-size: 16px; line-height: 1.8; margin-bottom: 12px; text-align: right;">' + item.text + '</div><div style="display: flex; justify-content: space-between; align-items: center;"><div style="font-size: 13px; color: var(--text-muted);">💎 +' + item.reward + ' | العدد: ' + item.count + '</div><button class="btn ' + (isComplete ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 10px 16px;" onclick="completeDhikr(\'' + key + '\', ' + item.reward + ', ' + item.count + ')">' + (isComplete ? '✓' : 'تسبيح (' + remaining + ')') + '</button></div></div>'; }); document.getElementById('adhkarCategories').innerHTML = ''; document.getElementById('adhkarItems').innerHTML = html; document.getElementById('adhkarItems').style.display = 'block'; }
function completeDhikr(key, reward, totalCount) { if (!state.todayAdhkar[key]) state.todayAdhkar[key] = 0; if (state.todayAdhkar[key] < totalCount) { state.todayAdhkar[key]++; state.totalDhikr++; vibrate(30); if (state.todayAdhkar[key] >= totalCount) { state.gems += reward; state.xp = (state.xp || 0) + Math.floor(reward / 10); } saveState(); updateHeaderGems(); showAdhkar(key.split('_')[0]); } }

// ==================== QURAN ====================
function renderQuran() { let html = '<div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📖 القرآن الكريم</div></div>'; QURAN_PARTS.forEach(part => { html += '<div class="card" style="margin-bottom: 12px;"><div style="font-weight: 800;">الجزء ' + part.id + ': ' + part.name + '</div><div style="font-size: 13px; color: var(--text-muted);">صفحات: ' + part.pages + ' | ' + part.surahs + '</div><button class="btn btn-primary" style="margin-top: 8px;" onclick="logQuran(' + part.id + ')">✓ قرأت</button></div>'; }); document.getElementById('quranPartsContainer').innerHTML = html; }
function logQuran(partId) { state.totalQuran += 20; state.gems += 10; state.xp = (state.xp || 0) + 15; vibrate(50); saveState(); updateHeaderGems(); alert('🎉 +10 جواهر | +15 XP'); }

// ==================== PROFILE ====================
function renderProfile() { const user = authState.user; if (user) { document.getElementById('profileName').textContent = user.name || 'المستخدم'; document.getElementById('profileEmail').textContent = user.email || 'ضيف'; } document.getElementById('profileLevel').textContent = calculateLevel(state.xp || 0); document.getElementById('profileGems').textContent = state.gems; document.getElementById('profileStreak').textContent = state.streak; document.getElementById('profileXP').textContent = state.xp || 0; if (state.equippedAvatar) { const item = SHOP_CATEGORIES.avatars.items.find(i => i.id === state.equippedAvatar); if (item) document.getElementById('profileAvatar').textContent = item.icon; } }

// ==================== SETTINGS ====================
function renderSettings() { document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode); document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled); document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled); document.getElementById('vibrationToggle').classList.toggle('active', state.vibrationEnabled); }
function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); }
function updateTheme() { document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light'); }
function toggleNotifications() { state.notifEnabled = !state.notifEnabled; if (state.notifEnabled && 'Notification' in window) Notification.requestPermission(); saveState(); }
function toggleSound() { state.soundEnabled = !state.soundEnabled; saveState(); }
function toggleVibration() { state.vibrationEnabled = !state.vibrationEnabled; vibrate(100); saveState(); }
function exportData() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = 'backup-' + getToday() + '.json'; a.click(); }
function importData() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => { try { state = { ...getDefaultState(), ...JSON.parse(ev.target.result) }; saveState(); location.reload(); } catch { alert('❌ ملف غير صالح'); } }; reader.readAsText(file); } }; input.click(); }

// ==================== ACHIEVEMENTS ====================
function checkAchievements() { ACHIEVEMENTS.forEach(ach => { if (!state.achievements.includes(ach.id) && ach.check({ level: state.level, streak: state.streak, gems: state.gems, totalDays: state.totalDays, todayPrayers: state.todayPrayers, totalDhikr: state.totalDhikr, totalQuran: state.totalQuran, xp: state.xp || 0 })) { state.achievements.push(ach.id); state.gems += ach.gems; state.xp = (state.xp || 0) + (ach.xp || 0); vibrate([200, 100, 200, 100, 200]); } }); saveState(); }

// ==================== PRAYER TIMES ====================
async function initPrayerTimes() { if (!state.prayerTimesEnabled) return; try { const pos = await prayerService.getLocation(); const result = await prayerService.fetchPrayerTimes(pos.latitude, pos.longitude); if (result) { document.getElementById('prayerTimesCard').style.display = 'block'; document.getElementById('hijriCard').style.display = 'block'; document.getElementById('hijriDate').textContent = result.hijri.formatted || (result.hijri.day + ' ' + result.hijri.monthName + ' ' + result.hijri.year + ' هـ'); document.getElementById('gregorianDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); document.getElementById('headerSubtitle').textContent = result.hijri.formatted || ''; updatePrayerBanner(); } saveState(); } catch (e) { document.getElementById('headerSubtitle').textContent = 'فعّل الموقع لمواقيت الصلاة'; } }
function updatePrayerBanner() { const current = prayerService.getCurrentPrayer(); if (current) { document.getElementById('nextPrayerName').textContent = current.next.arabic; document.getElementById('nextPrayerTime').textContent = current.next.time; document.getElementById('timeUntilPrayer').textContent = current.timeUntilNext.formatted; } }

// ==================== PWA ====================
let deferredPrompt; window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// ==================== SUPABASE INTEGRATION ====================
async function initSupabase() {
  try {
    const tables = await supabaseSetup.checkTables();
    state.supabaseConnected = Object.values(tables).every(v => v);
    
    if (state.supabaseConnected) {
      console.log('✅ Supabase connected');
      // Sync current state if user is logged in
      if (supabaseService.userId) {
        await supabaseService.syncState(state);
      }
    } else {
      console.log('⚠️ Supabase tables not created yet');
      // Show setup banner
      const banner = document.createElement('div');
      banner.id = 'supabase-setup-banner';
      banner.style.cssText = 'position: fixed; bottom: 70px; left: 16px; right: 16px; padding: 12px; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; border-radius: 14px; z-index: 999; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 600;';
      banner.innerHTML = '<span>⚠️ قاعدة البيانات غير مُعدة</span><button onclick="showSupabaseSetup()" style="background: white; color: #D97706; border: none; padding: 6px 12px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 12px;">الإعداد</button>';
      if (document.getElementById('appContainer').style.display !== 'none') {
        document.body.appendChild(banner);
      }
    }
  } catch (e) {
    console.warn('Supabase init error:', e);
  }
}

function showSupabaseSetup() {
  const instructions = supabaseSetup.getSetupInstructions();
  let html = '<div style="text-align: right;">';
  html += '<h3 style="font-size: 18px; margin-bottom: 12px;">⚙️ إعداد قاعدة بيانات Supabase</h3>';
  html += '<p style="margin-bottom: 12px;">لتفعيل المزامنة بين الأجهزة، أنشئ الجداول في Supabase:</p>';
  html += '<ol style="text-align: right; line-height: 2; margin-bottom: 16px;">';
  html += '<li>افتح <a href="' + instructions.url + '" target="_blank" style="color: var(--primary); font-weight: 700;">Supabase Dashboard → SQL Editor</a></li>';
  html += '<li>الصق محتوى ملف supabase-schema.sql</li>';
  html += '<li>اضغط Run</li>';
  html += '<li>انتظر حتى تكتمل العملية</li></ol>';
  html += '<p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">الجداول المطلوبة:</p>';
  html += '<div style="font-size: 11px; background: var(--bg); padding: 12px; border-radius: 10px; margin-bottom: 12px; line-height: 1.8;">';
  instructions.tables.forEach(t => html += '<span style="display: inline-block; padding: 2px 6px; background: var(--surface); border-radius: 4px; margin: 2px;">' + t + '</span> ');
  html += '</div>';
  html += '<button class="btn btn-primary" onclick="checkSupabaseSetup()">🔍 تحقق من الإعداد</button>';
  html += '</div>';
  
  document.getElementById('familyContent').innerHTML = html;
  showScreen('family');
}

async function checkSupabaseSetup() {
  showNotification('⏳ جاري التحقق...', 'يرجى الانتظار');
  await initSupabase();
  const banner = document.getElementById('supabase-setup-banner');
  if (banner && state.supabaseConnected) banner.remove();
  if (state.supabaseConnected) {
    alert('✅ تم إعداد قاعدة البيانات بنجاح!');
  } else {
    alert('❌ الجداول غير موجودة بعد، تأكد من تشغيل SQL');
  }
}

async function syncWithSupabase() {
  if (!state.supabaseConnected) {
    console.warn('Supabase not connected, skipping sync');
    return;
  }
  try {
    await supabaseService.syncState(state);
  } catch (e) {
    console.warn('Sync failed:', e);
  }
}

// ==================== INIT ====================
function showApp() { document.getElementById('authModal').style.display = 'none'; document.getElementById('appContainer').style.display = 'block'; document.getElementById('headerSubtitle').textContent = 'مرحباً، ' + (authState.user?.name || 'ضيف') + '!'; renderLevels(); updateHeaderGems(); if (state.prayerTimesEnabled) initPrayerTimes(); if (state.equippedTheme) applyTheme(state.equippedTheme); setInterval(updatePrayerBanner, 60000); setTimeout(initSupabase, 1000); }
document.addEventListener('DOMContentLoaded', () => { const savedAuth = localStorage.getItem('islamicAuth'); if (savedAuth) { authState = JSON.parse(savedAuth); if (authState.isLoggedIn) { loadState(); showApp(); return; } } loadState(); document.getElementById('authModal').style.display = 'flex'; });
