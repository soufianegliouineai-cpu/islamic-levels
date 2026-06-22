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
  totalLogins: 0, dailyRewardClaimed: false, claimedDailyRewards: [], charityTotal: 0,
  familyId: null, familyRole: null, parentId: null, childId: null
};

// ==================== CONSTANTS ====================
const GEM_TO_MAD_RATE = 0.2;
const LEVEL_REQUIREMENTS = { 2: 30, 3: 60, 4: 90, 5: 120 };
const APP_VERSION = '2026.06.22-2';

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
  },
  sounds: {
    title: '🔊 الأصوات', icon: '🔊',
    items: [
      { id: 'sound_athan', name: 'أذان مكة', desc: 'صوت أذان المسجد الحرام', icon: '🕌', price: 200, type: 'sound' },
      { id: 'sound_quran', name: 'تلاوة قرآن', desc: 'تلاوة بصوت جميل', icon: '📖', price: 150, type: 'sound' },
      { id: 'sound_bell', name: 'جرس', desc: 'جرس مسجد', icon: '🔔', price: 100, type: 'sound' },
      { id: 'sound_success', name: 'نجاح', desc: 'صوت عند الإنجاز', icon: '✅', price: 80, type: 'sound' },
      { id: 'sound_click', name: 'نقر', desc: 'صوت النقر', icon: '👆', price: 50, type: 'sound' }
    ]
  },
  gifts: {
    title: '🎁 الهدايا', icon: '🎁',
    items: [
      { id: 'gift_streak', name: 'هدية سلسلة', desc: 'أهدي 7 أيام', icon: '🔥', price: 100, type: 'gift' },
      { id: 'gift_gems', name: 'هدية جواهر', desc: '50 جوهرة', icon: '💎', price: 80, type: 'gift' },
      { id: 'gift_level', name: 'هدية مستوى', desc: 'ترقية مستوى', icon: '📈', price: 200, type: 'gift' },
      { id: 'gift_badge', name: 'هدية شارة', desc: 'شارة مميزة', icon: '🏅', price: 150, type: 'gift' },
      { id: 'gift_avatar', name: 'هدية صورة', desc: 'صورة رمزية', icon: '👤', price: 120, type: 'gift' },
      { id: 'gift_freeze', name: 'هدية تجميد', desc: 'تجميد سلسلة', icon: '🧊', price: 60, type: 'gift' }
    ]
  }
};

function convertGemsToMad(gems) { return Math.floor(gems * GEM_TO_MAD_RATE); }
function convertMadToGems(mad) { return Math.ceil(mad / GEM_TO_MAD_RATE); }

const DUAS = {
  morning: {
    title: 'أدعية الصباح', icon: '☀️',
    items: [
      { text: 'اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور', occasion: 'عند الاستيقاظ' },
      { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', occasion: 'صباح كل يوم' },
      { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم', occasion: '3 مرات' },
      { text: 'سبحان الله وبحمده', occasion: '100 مرة' },
      { text: 'الحمد لله', occasion: '100 مرة' },
      { text: 'الله أكبر', occasion: '100 مرة' },
      { text: 'لا إله إلا الله وحده لا شريك له', occasion: '100 مرة' },
      { text: 'أستغفر الله وأتوب إليه', occasion: '100 مرة' }
    ]
  },
  evening: {
    title: 'أدعية المساء', icon: '🌙',
    items: [
      { text: 'اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المحشور', occasion: 'عند النوم' },
      { text: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه', occasion: '100 مرة' },
      { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء', occasion: '3 مرات' },
      { text: 'أعوذ بكلمات الله التامات من شر ما خلق', occasion: '3 مرات' },
      { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', occasion: '3 مرات' }
    ]
  },
  food: {
    title: 'أدعية الطعام', icon: '🍽️',
    items: [
      { text: 'بسم الله', occasion: 'قبل الأكل' },
      { text: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة', occasion: 'بعد الأكل' }
    ]
  },
  travel: {
    title: 'أدعية السفر', icon: '✈️',
    items: [
      { text: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون', occasion: 'عند السفر' },
      { text: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى', occasion: 'عند السفر' }
    ]
  },
  sleep: {
    title: 'أدعية النوم', icon: '😴',
    items: [
      { text: 'باسمك اللهم أموت وأحيا', occasion: 'قبل النوم' },
      { text: 'اللهم قني عذابك يوم تبعث عبادك', occasion: 'قبل النوم' }
    ]
  },
  distress: {
    title: 'أدعية الكرب', icon: '🆘',
    items: [
      { text: 'لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم', occasion: 'عند الكرب' },
      { text: 'حسبي الله ونعم الوكيل', occasion: '7 مرات' }
    ]
  }
};

// ==================== UTILITY ====================
function generateCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }
function getToday() { return new Date().toISOString().split('T')[0]; }
function vibrate(pattern) { if (state.vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern || 50); }
const clickSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
function playSound() {
  if (!state.soundEnabled) return;
  try {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  } catch(e) {}
}
function requestNotificationPermission() { return ('Notification' in window) ? Notification.requestPermission() : Promise.resolve('denied'); }
function scheduleNotificationsIfEnabled() {
  if (!state.notifEnabled || !('Notification' in window) || Notification.permission !== 'granted') return;
  if (typeof notificationService !== 'undefined') {
    notificationService.scheduleDailyReminders(state.prayerTimes || JSON.parse(localStorage.getItem('cachedPrayerTimes') || '{}'));
  }
}
function clearNotifications() {
  if (typeof notificationService !== 'undefined') notificationService.clearAll();
}

// Security helpers
function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function escapeJsString(str) {
  if (str == null) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function escapeAttr(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function sanitizeInput(str, max = 100) {
  const s = String(str == null ? '' : str).trim();
  return s.length > max ? s.slice(0, max).trim() : s;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}
function generateLocalSalt() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  let s = '';
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s);
}
async function secureHashLocalPassword(password, salt) {
  const data = new TextEncoder().encode(String(salt) + String(password));
  const buf = await crypto.subtle.digest('SHA-256', data);
  const arr = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s);
}
function legacyHashLocalPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(36);
}
function showNotification(title, body) {
  try {
    if (typeof notificationService !== 'undefined' && notificationService.showNotification) {
      notificationService.showNotification(String(title || ''), { body: String(body || '') });
      return;
    }
  } catch (e) {}
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification(String(title || ''), { body: String(body || '') }); return; } catch (e) {}
  }
  const region = document.getElementById('toastRegion');
  if (!region) { try { alert(String(title || '') + (body ? '\n' + body : '')); } catch (e) {} return; }
  const toast = document.createElement('div');
  toast.setAttribute('role', 'status');
  toast.style.cssText = 'background:#10B981;color:#fff;padding:12px 16px;border-radius:12px;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-weight:700;font-size:14px;text-align:center;';
  toast.textContent = String(title || '') + (body ? ' — ' + body : '');
  region.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 4000);
}
const LOGIN_ATTEMPT_KEY = 'il_login_attempts';
function recordLoginAttempt(email, success) {
  let data;
  try { data = JSON.parse(localStorage.getItem(LOGIN_ATTEMPT_KEY) || '{}'); } catch (e) { data = {}; }
  const key = String(email || '').toLowerCase();
  if (success) { delete data[key]; localStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify(data)); return; }
  const now = Date.now();
  const entry = data[key] || { count: 0, lockedUntil: 0 };
  if (entry.lockedUntil > now) entry.lockedUntil = now + Math.min(60000 * Math.pow(2, entry.count - 3), 900000);
  else { entry.count += 1; if (entry.count >= 4) entry.lockedUntil = now + 30000; }
  data[key] = entry;
  try { localStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify(data)); } catch (e) {}
}
function isLoginLocked(email) {
  try {
    const data = JSON.parse(localStorage.getItem(LOGIN_ATTEMPT_KEY) || '{}');
    const entry = data[String(email || '').toLowerCase()];
    return entry && entry.lockedUntil && entry.lockedUntil > Date.now();
  } catch (e) { return false; }
}
function loginRemainingMs(email) {
  try {
    const data = JSON.parse(localStorage.getItem(LOGIN_ATTEMPT_KEY) || '{}');
    const entry = data[String(email || '').toLowerCase()];
    return entry && entry.lockedUntil ? Math.max(0, entry.lockedUntil - Date.now()) : 0;
  } catch (e) { return 0; }
}
function getDefaultState() { return { level: 1, xp: 0, streak: 0, longestStreak: 0, gems: 0, totalDays: 0, lastDate: null, completionRewardedDate: null, lastCompletionReward: null, todayTasks: [], completedChallenges: [], achievements: [], darkMode: false, notifEnabled: false, soundEnabled: true, vibrationEnabled: true, referralCode: generateCode(), totalShared: 0, streakFreezes: 0, dailyHistory: [], goals: [], totalPrayers: 0, totalQuran: 0, totalDhikr: 0, lastSync: null, prayerTimesEnabled: true, prayerTimes: null, location: null, todayPrayers: {}, todayAdhkar: {}, tasbihCount: 0, tasbihTotal: 0, tasbihText: 'سبحان الله وبحمده', tasbihTarget: 33, dailyGoals: [], purchasedItems: [], equippedAvatar: null, equippedTheme: null, equippedBadge: null, doubleXPTimer: 0, shieldActive: false, lastLoginDate: null, loginStreak: 0, totalLogins: 0, dailyRewardClaimed: false, claimedDailyRewards: [], charityTotal: 0, familyId: null, familyRole: null, parentId: null, childId: null }; }

// Roll over per-day state if the calendar day has changed.
// Returns true if a roll-over actually happened.
function rolloverIfNewDay() {
  const today = getToday();
  if (state.lastDate !== today) {
    // New day: reset today's tasks/prayers/adhkar but keep yesterday's history entries.
    state.todayTasks = [];
    state.todayPrayers = {};
    state.todayAdhkar = {};
    state.lastDate = today;
    // Any completion reward granted on a previous day is no longer rollable; clear guard.
    state.completionRewardedDate = null;
    state.lastCompletionReward = null;
    saveState();
    return true;
  }
  return false;
}

// Reconcile streak/totalDays with dailyHistory.
// Recomputes the count of unique completion dates from history and caps the
// stored counters at that count. This recovers from any state that was
// inflated by a buggy cached app.js running before the per-day guard was in
// place.
function reconcileStreakWithHistory() {
  if (!Array.isArray(state.dailyHistory)) { state.dailyHistory = []; return; }
  const uniqueDates = Array.from(new Set(state.dailyHistory.filter(h => h && h.date && h.completed).map(h => h.date))).sort();
  const maxDays = uniqueDates.length;
  if (state.totalDays > maxDays) {
    state.totalDays = maxDays;
    saveState();
  }
  // Recompute current streak from the most recent consecutive completion dates
  let streak = 0;
  const today = getToday();
  for (let i = uniqueDates.length - 1; i >= 0; i--) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - streak);
    const expectedStr = expected.toISOString().split('T')[0];
    if (uniqueDates[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }
  // Only clamp if the stored streak is clearly wrong
  if (state.streak > streak + 1) {
    state.streak = streak;
    state.longestStreak = Math.max(state.longestStreak || 0, streak);
    saveState();
  }
}

function loadState() {
  const s = localStorage.getItem('islamicLevels');
  if (s) state = { ...getDefaultState(), ...JSON.parse(s) };
  if (!state.referralCode) state.referralCode = generateCode();
  if (!state.dailyHistory) state.dailyHistory = [];
  if (!state.todayPrayers) state.todayPrayers = {};
  if (!state.todayAdhkar) state.todayAdhkar = {};
  if (!state.purchasedItems) state.purchasedItems = [];
  if (!('completionRewardedDate' in state)) state.completionRewardedDate = null;
  if (!('lastCompletionReward' in state)) state.lastCompletionReward = null;
  // Always roll over on load so persisted yesterday's tasks can't be re-credited.
  rolloverIfNewDay();
  // Clamp any corrupted counters back to sane values.
  clampCounters();
  // Recover from cached old code by reconciling streak/totalDays with history.
  reconcileStreakWithHistory();
  checkDailyLogin();
  updateTheme();
}
function saveState() { localStorage.setItem('islamicLevels', JSON.stringify(state)); }

// Sanitize persisted state — clamp counters to non-negative and prune bad history.
// Called on load and after every state mutation that touches counters.
function clampCounters() {
  if (!state) return;
  state.xp = Math.max(0, Number(state.xp) || 0);
  state.gems = Math.max(0, Number(state.gems) || 0);
  state.streak = Math.max(0, Number(state.streak) || 0);
  state.longestStreak = Math.max(state.streak, Math.max(0, Number(state.longestStreak) || 0));
  state.totalDays = Math.max(0, Number(state.totalDays) || 0);
  state.totalPrayers = Math.max(0, Number(state.totalPrayers) || 0);
  state.totalQuran = Math.max(0, Number(state.totalQuran) || 0);
  state.totalDhikr = Math.max(0, Number(state.totalDhikr) || 0);
  state.tasbihTotal = Math.max(0, Number(state.tasbihTotal) || 0);
  state.tasbihCount = Math.max(0, Math.min(Number(state.tasbihCount) || 0, state.tasbihTarget || 33));
  state.streakFreezes = Math.max(0, Number(state.streakFreezes) || 0);
  state.charityTotal = Math.max(0, Number(state.charityTotal) || 0);
  if (!Array.isArray(state.dailyHistory)) state.dailyHistory = [];
  // Drop malformed history entries and bound the array size.
  state.dailyHistory = state.dailyHistory.filter(h => h && typeof h.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(h.date));
  if (state.dailyHistory.length > 30) state.dailyHistory = state.dailyHistory.slice(-30);
}

// ==================== AUTH ====================
function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; }
async function login() {
  const e = document.getElementById('authEmail').value.trim();
  const p = document.getElementById('authPassword').value;
  if (!e || !p) { showNotification('تنبيه', 'أدخل البريد وكلمة المرور'); return; }
  if (!isValidEmail(e)) { showNotification('تنبيه', 'البريد الإلكتروني غير صحيح'); return; }
  if (isLoginLocked(e)) {
    const remaining = Math.ceil(loginRemainingMs(e) / 1000);
    showNotification('تم قفل الدخول', 'حاول بعد ' + remaining + ' ثانية');
    return;
  }
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  const matched = users.find(u => u.email === e);
  if (!matched) { recordLoginAttempt(e, false); showNotification('خطأ', 'بيانات الدخول غير صحيحة'); return; }
  let valid = false;
  if (matched.salt) {
    valid = matched.password === await secureHashLocalPassword(p, matched.salt);
  } else if (matched.password && matched.password.startsWith('h_')) {
    valid = matched.password === legacyHashLocalPassword(p);
    if (valid) {
      matched.salt = generateLocalSalt();
      matched.password = await secureHashLocalPassword(p, matched.salt);
      const idx = users.findIndex(u => u.email === e);
      if (idx >= 0) users[idx] = matched;
      try { localStorage.setItem('islamicUsers', JSON.stringify(users)); } catch (err) {}
    }
  }
  if (!valid) { recordLoginAttempt(e, false); showNotification('خطأ', 'بيانات الدخول غير صحيحة'); return; }
  recordLoginAttempt(e, true);
  authState = { isLoggedIn: true, user: matched, isGuest: false };
  localStorage.setItem('islamicAuth', JSON.stringify(authState));
  loadUserData(matched.id);
  showApp();
}
async function register() {
  rolloverIfNewDay();
  const n = sanitizeInput(document.getElementById('regName').value, 50);
  const e = document.getElementById('regEmail').value.trim();
  const p = document.getElementById('regPassword').value;
  if (!n || !e || !p) { showNotification('تنبيه', 'أكمل جميع الحقول'); return; }
  if (n.length < 2) { showNotification('تنبيه', 'الاسم يجب أن يكون حرفين على الأقل'); return; }
  if (!isValidEmail(e)) { showNotification('تنبيه', 'البريد الإلكتروني غير صحيح'); return; }
  if (p.length < 6) { showNotification('تنبيه', 'كلمة المرور 6 أحرف على الأقل'); return; }
  // Per-email registration attempt counter
  if (isLoginLocked(e)) {
    const remaining = Math.ceil(loginRemainingMs(e) / 1000);
    showNotification('تم قفل التسجيل', 'حاول بعد ' + remaining + ' ثانية');
    return;
  }
  const users = JSON.parse(localStorage.getItem('islamicUsers') || '[]');
  if (users.length >= 5) { showNotification('تنبيه', 'الحد الأقصى 5 حسابات على هذا الجهاز'); recordLoginAttempt(e, false); return; }
  if (users.find(u => u.email === e)) { showNotification('تنبيه', 'البريد مسجل مسبقاً'); return; }
  const salt = generateLocalSalt();
  const user = { id: Date.now().toString(), name: n, email: e, salt: salt, password: await secureHashLocalPassword(p, salt), createdAt: new Date().toISOString() };
  users.push(user);
  localStorage.setItem('islamicUsers', JSON.stringify(users));
  recordLoginAttempt(e, true);
  authState = { isLoggedIn: true, user, isGuest: false };
  localStorage.setItem('islamicAuth', JSON.stringify(authState));
  state = getDefaultState();
  saveUserData(user.id);
  showApp();
}
function guestLogin() { authState = { isLoggedIn: true, user: { id: 'guest-' + Date.now(), name: 'ضيف', email: '' }, isGuest: true }; localStorage.setItem('islamicAuth', JSON.stringify(authState)); if (!localStorage.getItem('islamicLevels')) { state = getDefaultState(); saveState(); } else loadState(); showApp(); }
function logout() { if (confirm('تسجيل الخروج؟')) { authState = { isLoggedIn: false, user: null, isGuest: false }; localStorage.removeItem('islamicAuth'); location.reload(); } }
function loadUserData(userId) { const s = localStorage.getItem('islamicLevels_' + userId); if (s) state = { ...getDefaultState(), ...JSON.parse(s) }; else { state = getDefaultState(); saveUserData(userId); } }
function saveUserData(userId) { localStorage.setItem('islamicLevels_' + userId, JSON.stringify(state)); }

// ==================== DAILY LOGIN ====================
function checkDailyLogin() { const today = getToday(); if (state.lastLoginDate === today) return; const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]; state.loginStreak = (state.lastLoginDate === yesterday) ? state.loginStreak + 1 : 1; state.lastLoginDate = today; state.totalLogins++; state.dailyRewardClaimed = false; saveState(); }

function claimDailyReward() {
  rolloverIfNewDay();
  if (state.dailyRewardClaimed) { showNotification('تم', 'حصلت على مكافأتك اليومية بالفعل!'); return; }
  const today = getToday();
  const rewardKey = 'il_daily_reward_' + today;
  if (localStorage.getItem(rewardKey)) { showNotification('تم', 'حصلت على مكافأتك اليومية بالفعل!'); state.dailyRewardClaimed = true; saveState(); renderShop(); return; }
  const reward = Math.min(10 + (state.loginStreak * 2), 100);
  state.gems += reward; state.xp = (state.xp || 0) + 10; state.dailyRewardClaimed = true;
  localStorage.setItem(rewardKey, String(Date.now()));
  vibrate([100, 50, 100]); saveState(); updateHeaderGems(); renderShop();
  showNotification('🎉', 'مكافأة يومية: +' + reward + ' جوهرة | +10 XP');
}

function claimRewardItem(itemId) {
  const item = (SHOP_CATEGORIES.dailyRewards && SHOP_CATEGORIES.dailyRewards.items || []).find(i => i.id === itemId);
  if (!item) return;
  if (typeof itemId !== 'string') return;
  if (state.loginStreak < item.day) { showNotification('مقفل', 'المكافأة غير متاحة بعد. أكمل ' + item.day + ' أيام متتالية.'); return; }
  if (!state.claimedDailyRewards) state.claimedDailyRewards = [];
  if (state.claimedDailyRewards.includes(item.id)) { showNotification('تم', 'تم ادعاء هذه المكافأة من قبل!'); return; }
  state.gems += item.reward; state.xp = (state.xp || 0) + item.day;
  state.claimedDailyRewards.push(item.id);
  vibrate([100, 50, 100]); saveState(); updateHeaderGems(); renderShop();
  showNotification('🎉', escapeHtml(item.name) + ': +' + item.reward + ' جوهرة | +' + item.day + ' XP');
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
  const renderers = { home: renderLevels, tracker: renderTracker, prayer: renderPrayerTracker, adhkar: renderAdhkarCategories, quran: renderQuran, profile: renderProfile, settings: renderSettings, tasbih: renderTasbih, shop: renderShop, dua: renderDuaBook, family: renderFamily, gift: renderGiftConversion, messages: renderMessages, analytics: renderAnalytics, seasonal: renderSeasonal, community: renderCommunity, qibla: renderQibla, dashboard: renderDashboard };
  if (renderers[name]) renderers[name]();
}

// ==================== HOME ====================
function renderLevels() {
  document.getElementById('levelsContainer').innerHTML = LEVELS.map(level => {
    const purchased = state.purchasedItems.includes('unlock_level_' + level.id);
    const required = (typeof LEVEL_REQUIREMENTS !== 'undefined' && LEVEL_REQUIREMENTS[level.id]) || 0;
    const isLocked = level.id > 1 && level.id > state.level && !purchased && state.totalDays < required;
    let lockReason = '';
    if (isLocked) {
      if (required > 0) {
        const remaining = Math.max(0, required - state.totalDays);
        lockReason = '🔒 تحتاج ' + remaining + ' يوم لفتح المستوى ' + level.id;
      } else {
        lockReason = '🔒 أكمل المستوى السابق أولاً';
      }
    }
    return '<div class="level-card" style="' + (isLocked ? 'opacity: 0.6;' : '') + '" onclick="' + (isLocked ? '' : 'selectLevel(' + level.id + ')') + '"><div class="level-gradient" style="background: linear-gradient(135deg, ' + level.color[0] + ', ' + level.color[1] + ');"><div class="level-emoji">' + level.icon + '</div><div class="level-name">' + level.title + '</div><div style="display: flex; justify-content: space-between; margin-top: 8px;"><span style="font-size: 12px; opacity: 0.9;">⏱️ ' + level.duration + '</span><span style="font-size: 12px; opacity: 0.9;">💎 ' + level.reward + ' | ⭐ ' + level.xp + ' XP</span></div>' + (isLocked ? '<div style="font-size: 12px; margin-top: 8px;">' + lockReason + '</div>' : '') + '</div></div>';
  }).join('');
}
function selectLevel(levelId) {
  // Enforce level lock client-side (server-side would be authoritative)
  if (!Number.isInteger(levelId) || levelId < 1 || levelId > 5) return;
  // Level 1 is always accessible
  if (levelId === 1) {
    state.level = 1; state.todayTasks = []; saveState(); showScreen('tracker'); return;
  }
  const purchased = state.purchasedItems.includes('unlock_level_' + levelId);
  if (purchased) {
    state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker'); return;
  }
  // Can only step down or to current level freely
  if (levelId <= state.level) {
    state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker'); return;
  }
  // For level N > 1, require totalDays >= LEVEL_REQUIREMENTS[N]
  const required = (typeof LEVEL_REQUIREMENTS !== 'undefined' && LEVEL_REQUIREMENTS[levelId]) || 30 * levelId;
  if (state.totalDays < required) {
    showNotification('مقفل', 'تحتاج ' + (required - state.totalDays) + ' يوم إضافي لفتح المستوى ' + levelId);
    return;
  }
  state.level = levelId; state.todayTasks = []; saveState(); showScreen('tracker');
}

// ==================== DASHBOARD ====================
function renderDashboard() {
  const level = LEVELS.find(l => l.id === state.level);
  const totalTasks = level ? level.sections.reduce((sum, s) => sum + s.tasks.length, 0) : 0;
  const completedTasks = state.todayTasks.length;
  const pct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  document.getElementById('statLevel').textContent = state.level;
  document.getElementById('statGems').textContent = state.gems;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statDays').textContent = state.totalDays;
  document.getElementById('dashProgress').style.width = pct + '%';
  const preview = document.getElementById('leaderboardPreview');
  if (!preview) return;
  const leaders = [
    { name: 'أحمد', xp: Math.max(state.xp + 500, 1200) },
    { name: 'خالد', xp: Math.max(state.xp + 300, 900) },
    { name: 'أنت', xp: state.xp, me: true },
    { name: 'يوسف', xp: Math.max(state.xp - 100, 400) },
    { name: 'عمر', xp: Math.max(state.xp - 250, 200) }
  ].sort((a, b) => b.xp - a.xp);
  preview.innerHTML = '<div style="display: flex; flex-direction: column; gap: 8px;">' + leaders.map((u, i) => '<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: ' + (u.me ? 'var(--primary-light)' : 'var(--bg)') + '; border-radius: 10px; border: ' + (u.me ? '1px solid var(--primary)' : '1px solid transparent') + ';">' + '<div style="display: flex; align-items: center; gap: 8px;"><span style="font-weight: 800; color: var(--text-muted); width: 24px;">#' + (i + 1) + '</span><span style="font-weight: 700;">' + (u.me ? '👤 ' : '🥇 ') + escapeHtml(u.name) + '</span></div>' + '<span style="font-weight: 800; color: var(--primary);">' + u.xp + ' XP</span></div>').join('') + '</div>';
}

// ==================== TRACKER ====================
function renderTracker() {
  const level = LEVELS.find(l => l.id === state.level);
  const today = getToday();
  rolloverIfNewDay();
  document.getElementById('todayDate').textContent = today;
  document.getElementById('streakCount').textContent = state.streak;

  // Show level lock status
  const unlock = checkLevelUnlock(state);
  let html = '';
  if (!unlock.canUnlock && state.level < 5) {
    html += '<div class="card" style="background: #FEF3C7; border-color: #F59E0B; margin-bottom: 12px;">';
    html += '<div style="font-weight: 800; font-size: 14px;">🔒 قفل المستوى التالي</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">' + escapeHtml(unlock.reason) + '</div>';
    html += '<div class="progress-container" style="margin-top: 8px;"><div class="progress-bar" style="width: ' + Math.round((state.totalDays / (unlock.daysRequired || 30)) * 100) + '%;"></div></div>';
    html += '<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">' + state.totalDays + '/' + (unlock.daysRequired || 30) + ' يوم</div>';
    html += '</div>';
  }

  html += '<div class="card"><div style="display: flex; justify-content: space-between; margin-bottom: 12px;"><span style="font-weight: 800;">التقدم اليومي</span><span style="color: var(--primary); font-weight: 900;" id="progressPercent">0%</span></div><div class="progress-container"><div class="progress-bar" id="progressBar" style="width: 0%"></div></div><div style="display: flex; justify-content: space-between; margin-top: 12px;"><span style="font-size: 13px; color: var(--text-muted);">🔥 السلسلة: <span id="streakCount">' + state.streak + '</span></span><span style="font-size: 13px; color: var(--text-muted);" id="todayDate">' + today + '</span></div></div>';
  html += '<div class="card" style="display: none;" id="rewardBanner"></div>';

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
  rolloverIfNewDay();
  // Validate taskId against the current level's task list
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  if (!Number.isInteger(taskId) || taskId < 0 || taskId >= total) return;
  const idx = state.todayTasks.indexOf(taskId);
  if (idx === -1) {
    state.todayTasks.push(taskId);
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
  saveState(); renderTracker(); updateHeaderGems(); playSound();
}

function updateProgress() {
  const level = LEVELS.find(l => l.id === state.level);
  const total = level.sections.reduce((sum, s) => sum + s.tasks.length, 0);
  // Sanitize: strip any task IDs that aren't valid for the current level
  // (defends against manually injected IDs in localStorage)
  state.todayTasks = (state.todayTasks || []).filter(id => Number.isInteger(id) && id >= 0 && id < total);
  const pct = Math.round((state.todayTasks.length / total) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressBar').style.width = pct + '%';
  const today = getToday();
  const wasRewardedToday = state.completionRewardedDate === today;
  if (pct === 100 && !wasRewardedToday) {
    // Award completion rewards ONCE per calendar day
    state.gems += level.reward;
    state.xp = (state.xp || 0) + (level.xp || 0);
    state.streak++;
    state.totalDays++;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.lastDate = today;
    // Record the reward details so we can roll back if the user unchecks a task
    state.lastCompletionReward = { date: today, gems: level.reward, xp: level.xp || 0 };
    state.completionRewardedDate = today;
    // Append / replace today's history entry (idempotent)
    state.dailyHistory = (state.dailyHistory || []).filter(h => h.date !== today);
    state.dailyHistory.push({ date: today, completed: true, gems: level.reward });
    if (state.dailyHistory.length > 30) state.dailyHistory = state.dailyHistory.slice(-30);
    saveState(); checkAchievements(); showConfetti(); showCompletionCongrats(level); updateHeaderGems();
  } else if (pct < 100 && wasRewardedToday) {
    // Roll back rewards awarded earlier today (user unchecked a task)
    const reward = state.lastCompletionReward;
    if (reward && reward.date === today) {
      state.gems = Math.max(0, state.gems - reward.gems);
      state.xp = Math.max(0, (state.xp || 0) - reward.xp);
      state.streak = Math.max(0, state.streak - 1);
      state.totalDays = Math.max(0, state.totalDays - 1);
      // Remove today's entry from history; previous day still stays
      state.dailyHistory = (state.dailyHistory || []).filter(h => h.date !== today);
      state.lastCompletionReward = null;
      state.completionRewardedDate = null;
      hideCompletionCongrats();
      saveState(); updateHeaderGems();
    }
  } else if (pct === 100 && wasRewardedToday) {
    // Already completed today — show the persistent "all done" notice
    showCompletionCongrats(level, /*persistOnly=*/ true);
  }
}

// Show the completion celebration the FIRST time today,
// then a quieter "all done" notice on subsequent navigations.
function showCompletionCongrats(level, persistOnly) {
  const banner = document.getElementById('rewardBanner');
  if (!banner) return;
  if (persistOnly) {
    banner.style.display = 'block';
    banner.style.background = 'linear-gradient(135deg, #D1FAE5, #A7F3D0)';
    banner.style.borderColor = '#10B981';
    banner.innerHTML =
      '<div style="text-align: center; padding: 8px;">' +
      '<div style="font-size: 28px; margin-bottom: 6px;">✅</div>' +
      '<div style="font-weight: 800; font-size: 18px; color: #065F46;">أحسنت! أكملت جميع المهام اليوم</div>' +
      '<div style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">🔥 السلسلة: ' + state.streak +
      ' | 💎 +' + (level.reward || 0) + ' | ⭐ +' + (level.xp || 0) + ' XP</div>' +
      '<div style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">⏳ عد غداً للمزيد من المهام</div>' +
      '</div>';
    return;
  }
  banner.style.display = 'block';
  banner.style.background = 'linear-gradient(135deg, #FEF3C7, #FDE68A)';
  banner.style.borderColor = '#F59E0B';
  banner.innerHTML =
    '<div style="text-align: center; padding: 12px;">' +
    '<div style="font-size: 36px; margin-bottom: 8px;">🎉</div>' +
    '<div style="font-weight: 900; font-size: 20px; color: #92400E;">مبروك! أكملت جميع مهام اليوم</div>' +
    '<div style="margin-top: 12px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">' +
    '<div style="padding: 8px 12px; background: rgba(255,255,255,0.6); border-radius: 10px;"><div style="font-size: 11px; color: var(--text-muted);">🔥 السلسلة</div><div style="font-weight: 900; color: #92400E;">' + state.streak + '</div></div>' +
    '<div style="padding: 8px 12px; background: rgba(255,255,255,0.6); border-radius: 10px;"><div style="font-size: 11px; color: var(--text-muted);">💎 مكافأة</div><div style="font-weight: 900; color: #92400E;">+' + (level.reward || 0) + '</div></div>' +
    '<div style="padding: 8px 12px; background: rgba(255,255,255,0.6); border-radius: 10px;"><div style="font-size: 11px; color: var(--text-muted);">⭐ خبرة</div><div style="font-weight: 900; color: #92400E;">+' + (level.xp || 0) + '</div></div>' +
    '</div>' +
    '<div style="font-size: 13px; color: var(--text-muted); margin-top: 12px;">⏳ عد غداً لمهام جديدة</div>' +
    '</div>';
  showNotification('🎉', 'أحسنت! أكملت جميع مهام اليوم — +' + (level.reward || 0) + ' جوهرة');
}

function hideCompletionCongrats() {
  const banner = document.getElementById('rewardBanner');
  if (banner) banner.style.display = 'none';
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
function incrementTasbih() {
  rolloverIfNewDay();
  // Per-day reward cap: only 10 full rounds per day, regardless of clicks
  const today = getToday();
  const cyclesKey = 'tasbih_cycles_' + today;
  let cycles = parseInt(localStorage.getItem(cyclesKey) || '0', 10);
  if (cycles >= 10) {
    showNotification('حد يومي', 'وصلت للحد الأقصى اليوم (10 دورات)');
    return;
  }
  state.tasbihCount++; state.tasbihTotal++;
  vibrate(state.vibrationEnabled ? 30 : 0);
  if (state.tasbihCount >= state.tasbihTarget) {
    state.gems += 5; state.xp = (state.xp || 0) + 5;
    state.tasbihCount = 0;
    cycles++;
    localStorage.setItem(cyclesKey, String(cycles));
    vibrate([100, 50, 100]); updateHeaderGems();
  }
  saveState();
  document.getElementById('tasbihCounter').textContent = state.tasbihCount;
  document.getElementById('tasbihTotal').textContent = state.tasbihTotal;
}
function resetTasbih() { state.tasbihCount = 0; saveState(); renderTasbih(); }
function changeTasbihText(text) {
  const safe = sanitizeInput(prompt('نص التسبيح:', text || state.tasbihText) || '', 100);
  if (!safe) return;
  state.tasbihText = safe;
  state.tasbihCount = 0;
  saveState();
  renderTasbih();
  vibrate(50);
}

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
  
  // Daily rewards special section
  if (cat === 'dailyRewards') {
    html += '<div class="card" style="margin-bottom: 12px; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; text-align: center;">';
    html += '<div style="font-size: 16px; font-weight: 800;">🔥 سلسلة تسجيل الدخول: ' + state.loginStreak + ' أيام</div>';
    html += '<button class="btn" style="width: auto; padding: 10px 20px; margin-top: 12px; background: white; color: #D97706; font-weight: 800;" onclick="claimDailyReward()">' + (state.dailyRewardClaimed ? '✅ تم تحصيل اليومية' : '🎁 ادعُ مكافأتك اليومية') + '</button></div>';
  }
  
  category.items.forEach(item => {
    const owned = state.purchasedItems.includes(item.id);
    const equipped = (item.type === 'avatar' && state.equippedAvatar === item.id) || 
                     (item.type === 'theme' && state.equippedTheme === item.id) || 
                     (item.type === 'badge' && state.equippedBadge === item.id);
    const canBuy = (item.price === 0 || state.gems >= item.price) && !owned;
    
    // Determine button text and action
    let buttonText = '';
    let buttonAction = '';
    let buttonStyle = '';
    
    if (cat === 'dailyRewards') {
      // Per-streak milestone rewards
      const claimed = (state.claimedDailyRewards || []).includes(item.id);
      const locked = state.loginStreak < item.day;
      if (claimed) {
        buttonText = '✅ تم الادعاء';
        buttonAction = '';
        buttonStyle = 'background: #D1D5DB; color: #6B7280;';
      } else if (locked) {
        buttonText = '🔒 يوم ' + item.day;
        buttonAction = '';
        buttonStyle = 'background: #E5E7EB; color: #9CA3AF;';
      } else {
        buttonText = '🎁 ادعاء';
        buttonAction = "claimRewardItem('" + item.id + "')";
        buttonStyle = 'background: linear-gradient(135deg, #10B981, #059669); color: white;';
      }
    } else if (owned) {
      if (equipped) {
        buttonText = '✅ مُلبس';
        buttonAction = '';
        buttonStyle = 'background: #10B981; color: white;';
      } else {
        buttonText = 'لبس';
        buttonAction = "equipItem('" + item.id + "', '" + item.type + "')";
        buttonStyle = 'background: #8B5CF6; color: white;';
      }
    } else {
      // Not owned - show price and buy button
      if (item.price === 0) {
        buttonText = 'مجاني - احصل عليه';
        buttonAction = "buyItem('" + item.id + "', 0, '" + item.type + "', '" + (item.effect || '') + "')";
        buttonStyle = 'background: #10B981; color: white;';
      } else if (canBuy) {
        buttonText = 'شراء - ' + item.price + ' 💎';
        buttonAction = "buyItem('" + item.id + "', " + item.price + ", '" + item.type + "', '" + (item.effect || '') + "')";
        buttonStyle = 'background: #8B5CF6; color: white;';
      } else {
        buttonText = '💰 ' + item.price + ' جوهرة';
        buttonAction = '';
        buttonStyle = 'background: #D1D5DB; color: #6B7280;';
      }
    }
    
    html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (equipped ? '#10B981' : '#E5E7EB') + '; border-width: ' + (equipped ? '2px' : '1px') + ';">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<div style="width: 50px; height: 50px; border-radius: 12px; background: #F3F4F6; display: flex; align-items: center; justify-content: center; font-size: 28px;">' + item.icon + '</div>';
    html += '<div style="flex: 1; text-align: right;">';
    html += '<div style="font-weight: 800;">' + escapeHtml(item.name) + '</div>';
    html += '<div style="font-size: 12px; color: #6B7280;">' + escapeHtml(item.desc) + '</div>';
    if (item.price > 0 && !owned) {
      html += '<div style="font-size: 13px; color: #F59E0B; font-weight: 700; margin-top: 2px;">💎 ' + item.price + '</div>';
    }
    html += '</div>';
    html += '<button class="btn" style="' + buttonStyle + ' width: auto; padding: 8px 16px; font-size: 13px; font-weight: 700; border-radius: 10px;" ' + (buttonAction ? 'onclick="' + buttonAction + '"' : 'disabled') + '>' + buttonText + '</button>';
    html += '</div></div>';
  });
  
  document.getElementById('shopItemsContainer').innerHTML = html;
}
function buyItem(itemId, price, type, effect) {
  // Validate itemId is a string
  if (typeof itemId !== 'string' || itemId.length === 0 || itemId.length > 64) { showNotification('خطأ', 'عنصر غير صالح'); return; }
  // Validate price is non-negative integer
  if (!Number.isInteger(price) || price < 0 || price > 100000) { showNotification('خطأ', 'سعر غير صالح'); return; }
  // Validate type
  const validTypes = ['consumable','avatar','theme','badge','sound','charity','unlock','reward'];
  if (typeof type !== 'string' || !validTypes.includes(type)) { showNotification('خطأ', 'نوع غير صالح'); return; }
  if (price > 0 && state.gems < price) { showNotification('خطأ', 'جواهر غير كافية!'); return; }
  if (state.purchasedItems.includes(itemId)) { showNotification('خطأ', 'تملك هذا بالفعل!'); return; }
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
        html += '<div style="flex: 1;"><div style="font-weight: 700;">' + escapeHtml(m.name) + '</div><div style="font-size: 12px; color: var(--text-muted);">🔥 ' + (m.streak || 0) + ' | 💎 ' + (m.gems || 0) + '</div></div>';
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
          html += '<div style="font-weight: 700;">' + escapeHtml(req.childName) + ': ' + escapeHtml(req.type) + '</div>';
          if (req.type === 'money') html += '<div style="font-size: 14px; color: #F59E0B;">💰 ' + convertGemsToMad(req.amount) + ' MAD</div>';
          if (req.message) html += '<div style="font-size: 13px; color: var(--text-muted);">' + escapeHtml(req.message) + '</div>';
          html += '<div style="display: flex; gap: 8px; margin-top: 8px;">';
          html += '<button class="btn btn-success" style="flex: 1; padding: 8px; font-size: 12px;" onclick="approveRequest(\'' + escapeJsString(req.id) + '\')">✓ قبول</button>';
          html += '<button class="btn" style="flex: 1; padding: 8px; font-size: 12px; background: #FEE2E2; color: #EF4444;" onclick="rejectRequest(\'' + escapeJsString(req.id) + '\')">✗ رفض</button>';
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
  const name = sanitizeInput(prompt('اسم العائلة:') || '', 50);
  if (!name) return;
  familyManager = new FamilyManager();
  const result = familyManager.createFamily(name);
  state.familyId = result.familyId;
  state.familyRole = 'parent';
  saveState();
  renderFamily();
  showNotification('تم', 'تم إنشاء العائلة! كود: ' + result.parentCode);
}

function showJoinFamily() {
  const code = (prompt('كود العائلة (6 أحرف):') || '').toUpperCase().trim();
  if (!code || code.length !== 6) { showNotification('خطأ', 'كود غير صالح'); return; }
  const name = sanitizeInput(prompt('اسمك:') || '', 50);
  if (!name) return;

  familyManager = new FamilyManager();
  familyManager.loadFamily();
  const result = familyManager.joinFamily(name, code);
  if (result && result.error) { showNotification('خطأ', result.error); return; }

  state.familyId = 'family-' + code;
  state.familyRole = 'child';
  state.parentId = 'parent'; // Will be set by actual parent
  saveState();
  renderFamily();
  showNotification('تم', 'تم الانضمام!');
}

function approveRequest(requestId) { if (familyManager) { familyManager.approveRequest(requestId); renderFamily(); alert('✅ تمت الموافقة!'); } }
function rejectRequest(requestId) { if (familyManager) { familyManager.rejectRequest(requestId); renderFamily(); alert('❌ تم الرفض'); } }
function leaveFamily() { if (confirm('مغادرة العائلة؟')) { state.familyId = null; state.familyRole = null; saveState(); renderFamily(); } }

// ==================== QIBLA ====================
function renderQibla() {
  const qiblaContent = document.getElementById('qiblaContent');
  if (!qiblaContent) return;
  
  qiblaContent.innerHTML = `
    <div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; text-align: center; margin-bottom: 16px;">
      <div style="font-size: 20px; font-weight: 900;">🧭 اتجاه القبلة</div>
      <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">حدد موقعك لتحديد اتجاه القبلة</div>
    </div>
    <div class="card" style="text-align: center;">
      <div style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid var(--primary); margin: 0 auto 20px; position: relative;">
        <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 14px; font-weight: 800;">شمال</div>
        <div style="position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); font-size: 14px; font-weight: 800;">جنوب</div>
        <div style="position: absolute; left: -15px; top: 50%; transform: translateY(-50%); font-size: 14px; font-weight: 800;">شرق</div>
        <div style="position: absolute; right: -15px; top: 50%; transform: translateY(-50%); font-size: 14px; font-weight: 800;">غرب</div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px;">🕋</div>
      </div>
      <div id="qiblaDirection" style="font-size: 18px; font-weight: 800; margin-bottom: 8px;">جاري تحديد الاتجاه...</div>
      <div id="qiblaAngle" style="font-size: 14px; color: var(--text-muted);">يرجى تفعيل الموقع</div>
      <button class="btn btn-primary" style="margin-top: 16px; width: auto; padding: 10px 20px;" onclick="startQibla()">📍 تحديث الموقع</button>
    </div>
  `;
  startQibla();
}

function startQibla() {
  const qiblaDirection = document.getElementById('qiblaDirection');
  const qiblaAngle = document.getElementById('qiblaAngle');
  if (!navigator.geolocation) {
    if (qiblaDirection) qiblaDirection.textContent = 'الموقع غير مدعوم';
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const kaabaLat = 21.4225, kaabaLng = 39.8262;
      const dLng = (kaabaLng - lng) * Math.PI / 180;
      const lat1 = lat * Math.PI / 180, lat2 = kaabaLat * Math.PI / 180;
      let angle = Math.atan2(Math.sin(dLng), Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng)) * 180 / Math.PI;
      if (angle < 0) angle += 360;
      if (qiblaDirection) qiblaDirection.textContent = 'اتجاه القبلة: ' + Math.round(angle) + '°';
      if (qiblaAngle) qiblaAngle.textContent = 'من الشمال الصافي';
    },
    (err) => {
      if (qiblaDirection) qiblaDirection.textContent = 'يرجى تفعيل خدمة الموقع';
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

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
  const raw = document.getElementById('convertAmount').value;
  const amount = parseInt(raw, 10);
  if (!Number.isInteger(amount) || amount < 100 || amount > 1000000) { showNotification('خطأ', 'الحد الأدنى 100 جوهرة'); return; }
  if (amount > state.gems) { showNotification('خطأ', 'جواهر غير كافية'); return; }

  const mad = convertGemsToMad(amount);
  state.gems -= amount;
  saveState(); renderGiftConversion(); updateHeaderGems();
  showNotification('تم', '+' + amount + ' 💎 = ' + mad + ' MAD');
}

function requestMoneyGift() {
  const amount = parseInt(document.getElementById('requestAmount')?.value, 10);
  if (!Number.isInteger(amount) || amount < 100 || amount > 1000000) { showNotification('خطأ', 'الحد الأدنى 100 جوهرة'); return; }
  if (amount > state.gems) { showNotification('خطأ', 'جواهر غير كافية'); return; }

  const message = sanitizeInput(document.getElementById('requestMessage')?.value || '', 200);

  if (familyManager) {
    familyManager.sendRequest(state.childId || 'child', 'money', amount, message);
    showNotification('تم', 'تم إرسال الطلب للوالد!');
  } else {
    showNotification('خطأ', 'يجب الانضمام لعائلة أولاً');
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
    
    html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" data-member-id="' + escapeAttr(member.id) + '" onclick="openChat(\'' + escapeJsString(member.id) + '\')">';
    html += '<div style="display: flex; align-items: center; gap: 12px;">';
    html += '<div style="width: 40px; height: 40px; border-radius: 50%; background: ' + (member.role === 'parent' ? '#3B82F6' : '#10B981') + '; display: flex; align-items: center; justify-content: center; color: white;">' + (member.role === 'parent' ? '👨' : '👧') + '</div>';
    html += '<div style="flex: 1;"><div style="font-weight: 700;">' + escapeHtml(member.name) + '</div>';
    html += '<div style="font-size: 13px; color: var(--text-muted);">' + (lastMsg ? escapeHtml(lastMsg.content).substring(0, 30) + '...' : 'لا توجد رسائل') + '</div></div>';
    html += '<div style="font-size: 10px; color: var(--text-muted);">' + (lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) : '') + '</div>';
    html += '</div></div>';
  });
  
  document.getElementById('messagesContent').innerHTML = html;
}

function openChat(memberId) {
  if (!familyManager) return;
  const member = familyManager.getMember(memberId);
  if (!member) return;
  
  const myId = state.currentMemberId || familyManager.members.find(m => m.isOnline)?.id || state.childId || state.parentId;
  const msgs = familyManager.getMessages(myId, memberId);
  
  let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">';
  html += '<button onclick="renderMessages()" style="background: none; border: none; font-size: 24px;">←</button>';
  html += '<div><div style="font-weight: 800;">' + escapeHtml(member.name) + '</div><div style="font-size: 12px; color: var(--text-muted);">' + (member.isOnline ? '🟢 متصل' : '⚫ غير متصل') + '</div></div></div>';

  html += '<div style="max-height: 400px; overflow-y: auto; margin-bottom: 16px;">';
  msgs.forEach(msg => {
    const isMine = msg.from === myId;
    html += '<div style="display: flex; justify-content: ' + (isMine ? 'flex-end' : 'flex-start') + '; margin-bottom: 8px;">';
    html += '<div style="max-width: 70%; padding: 10px 14px; border-radius: 16px; background: ' + (isMine ? 'var(--primary)' : 'var(--bg)') + '; color: ' + (isMine ? 'white' : 'var(--text)') + ';">';
    html += '<div style="font-size: 14px;">' + escapeHtml(msg.content) + '</div>';
    html += '<div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">' + new Date(msg.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) + '</div>';
    html += '</div></div>';
  });
  html += '</div>';

  html += '<div style="display: flex; gap: 8px;">';
  html += '<input type="text" id="chatInput" placeholder="اكتب رسالة..." style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 20px; text-align: right;" />';
  html += '<button class="btn btn-primary" style="width: auto; padding: 12px 20px; border-radius: 20px;" onclick="sendMessage(\'' + escapeJsString(memberId) + '\')">إرسال</button>';
  html += '</div>';
  
  document.getElementById('messagesContent').innerHTML = html;
}

function sendMessage(memberId) {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  
  if (familyManager) {
    // Use currentMemberId or determine the sender from family
    const myId = state.currentMemberId || familyManager.members.find(m => m.isOnline)?.id || state.childId || state.parentId;
    familyManager.sendMessage(myId, memberId, input.value.trim());
    openChat(memberId);
  }
}

// ==================== DUA BOOK ====================
function renderDuaBook() { let html = ''; Object.entries(DUAS).forEach(([key, cat]) => { html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showDuaCategory(\'' + key + '\')"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + cat.icon + '</span><div style="flex: 1;"><div style="font-weight: 800;">' + cat.title + '</div><div style="font-size: 12px; color: var(--text-muted);">' + cat.items.length + ' أدعية</div></div></div></div>'; }); document.getElementById('duaCategories').innerHTML = html; }
function showDuaCategory(key) { const cat = DUAS[key]; if (!cat) return; let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;"><button onclick="renderDuaBook()" style="background: none; border: none; font-size: 24px;">←</button><div style="font-weight: 800; font-size: 18px;">' + cat.icon + ' ' + cat.title + '</div></div>'; cat.items.forEach(dua => { html += '<div class="card" style="margin-bottom: 12px;"><div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">' + dua.occasion + '</div><div style="font-size: 16px; line-height: 1.8; text-align: right;">' + dua.text + '</div></div>'; }); document.getElementById('duaCategories').innerHTML = html; }

// ==================== PRAYER TRACKER ====================
function renderPrayerTracker() { document.getElementById('prayerDate').textContent = new Date().toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); let html = ''; DAILY_WORSHIP.faraid.forEach(prayer => { const completed = state.todayPrayers[prayer.key] || false; const time = prayerService.times ? prayerService.times[prayer.key] : ''; html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (completed ? 'var(--success)' : 'var(--border)') + ';"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + prayer.icon + '</span><div style="flex: 1;"><div style="font-weight: 800; font-size: 18px;">صلاة ' + prayer.name + '</div><div style="font-size: 13px; color: var(--text-muted);">' + (time ? '⏰ ' + time : '') + '</div></div><button class="btn ' + (completed ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 12px 20px;" onclick="togglePrayer(\'' + escapeJsString(prayer.key) + '\')">' + (completed ? '✓' : 'أديت') + '</button></div></div>'; }); document.getElementById('prayerTrackerContainer').innerHTML = html; document.getElementById('prayersCompleted').textContent = Object.values(state.todayPrayers).filter(v => v).length; }
function togglePrayer(key) {
  rolloverIfNewDay();
  // Validate key against known prayer keys
  const validKeys = ['fajr','dhuhr','asr','maghrib','isha','duha','witr'];
  if (typeof key !== 'string' || !validKeys.includes(key)) return;
  const today = getToday();
  const todayKey = 'prayers_done_' + today;
  let doneSet;
  try { doneSet = new Set(JSON.parse(localStorage.getItem(todayKey) || '[]')); } catch (e) { doneSet = new Set(); }
  const wasDone = !!state.todayPrayers[key];
  const isDone = !wasDone;
  state.todayPrayers[key] = isDone;
  // Only count toward lifetime total the FIRST time a prayer is checked today.
  // Unchecking today does NOT decrement totalPrayers (would under-count).
  if (isDone && !doneSet.has(key)) {
    state.totalPrayers++;
    doneSet.add(key);
    localStorage.setItem(todayKey, JSON.stringify(Array.from(doneSet)));
  }
  vibrate(50); saveState(); renderPrayerTracker(); updateHeaderGems();
}

// ==================== ADHKAR ====================
function renderAdhkarCategories() { let html = '<div class="card" style="background: linear-gradient(135deg, #8B5CF6, #DB2777); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📿 الأذكار</div></div>'; Object.entries(ADHKAR).forEach(([key, cat]) => { html += '<div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="showAdhkar(\'' + key + '\')"><div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 32px;">' + cat.icon + '</span><div style="flex: 1;"><div style="font-weight: 800;">' + cat.title + '</div><div style="font-size: 12px; color: var(--text-muted);">' + cat.time + '</div></div><div style="font-weight: 900; color: var(--primary);">' + cat.items.length + '</div></div></div>'; }); document.getElementById('adhkarCategories').innerHTML = html; document.getElementById('adhkarItems').style.display = 'none'; }
function showAdhkar(categoryKey) { const cat = ADHKAR[categoryKey]; if (!cat) return; let html = '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;"><button onclick="renderAdhkarCategories()" style="background: none; border: none; font-size: 24px;">←</button><div style="font-weight: 800; font-size: 18px;">' + cat.icon + ' ' + cat.title + '</div></div>'; cat.items.forEach((item, index) => { const key = categoryKey + '_' + index; const completed = state.todayAdhkar[key] || 0; const remaining = Math.max(0, item.count - completed); const isComplete = remaining === 0; html += '<div class="card" style="margin-bottom: 12px; border-color: ' + (isComplete ? 'var(--success)' : 'var(--border)') + ';"><div style="font-size: 16px; line-height: 1.8; margin-bottom: 12px; text-align: right;">' + item.text + '</div><div style="display: flex; justify-content: space-between; align-items: center;"><div style="font-size: 13px; color: var(--text-muted);">💎 +' + item.reward + ' | العدد: ' + item.count + '</div><button class="btn ' + (isComplete ? 'btn-success' : 'btn-primary') + '" style="width: auto; padding: 10px 16px;" onclick="completeDhikr(\'' + escapeJsString(key) + '\', ' + escapeJsString(String(item.reward)) + ', ' + escapeJsString(String(item.count)) + ')">' + (isComplete ? '✓' : 'تسبيح (' + remaining + ')') + '</button></div></div>'; }); document.getElementById('adhkarCategories').innerHTML = ''; document.getElementById('adhkarItems').innerHTML = html; document.getElementById('adhkarItems').style.display = 'block'; }
function completeDhikr(key, reward, totalCount) {
  rolloverIfNewDay();
  // Validate key against known adhkar keys (category + '_' + index)
  if (typeof key !== 'string' || !/^[a-zA-Z]+_\d+$/.test(key)) return;
  if (!Number.isInteger(reward) || reward < 0 || reward > 1000) return;
  if (!Number.isInteger(totalCount) || totalCount < 1 || totalCount > 1000) return;
  if (!state.todayAdhkar[key]) state.todayAdhkar[key] = 0;
  if (state.todayAdhkar[key] >= totalCount) {
    // Already fully counted for this key today.
    showNotification('مكتمل', 'تم إكمال هذا الذكر اليوم');
    return;
  }
  state.todayAdhkar[key]++;
  state.totalDhikr++;
  vibrate(30);
  if (state.todayAdhkar[key] >= totalCount) {
    state.gems += reward;
    state.xp = (state.xp || 0) + Math.floor(reward / 10);
  }
  saveState(); updateHeaderGems(); showAdhkar(key.split('_')[0]);
}

// ==================== QURAN ====================
function renderQuran() { let html = '<div class="card" style="background: linear-gradient(135deg, #10B981, #059669); color: white; margin-bottom: 16px; text-align: center;"><div style="font-size: 20px; font-weight: 900;">📖 القرآن الكريم</div></div>'; QURAN_PARTS.forEach(part => { html += '<div class="card" style="margin-bottom: 12px;"><div style="font-weight: 800;">الجزء ' + part.id + ': ' + part.name + '</div><div style="font-size: 13px; color: var(--text-muted);">صفحات: ' + part.pages + ' | ' + part.surahs + '</div><button class="btn btn-primary" style="margin-top: 8px;" onclick="logQuran(' + part.id + ')">✓ قرأت</button></div>'; }); document.getElementById('quranPartsContainer').innerHTML = html; }
function logQuran(partId) {
  rolloverIfNewDay();
  // Validate partId against the static Quran parts (defends against injected IDs)
  const validPart = typeof QURAN_PARTS !== 'undefined' && QURAN_PARTS.find(p => p.id === partId);
  if (!validPart) return;
  const today = getToday();
  const partsKey = 'quranParts_' + today;
  let loggedParts;
  try { loggedParts = JSON.parse(localStorage.getItem(partsKey) || '[]'); } catch (e) { loggedParts = []; }
  if (loggedParts.includes(partId)) { showNotification('تنبيه', 'سجلت هذا الجزء اليوم'); return; }
  loggedParts.push(partId);
  localStorage.setItem(partsKey, JSON.stringify(loggedParts));
  state.totalQuran += 20; state.gems += 10; state.xp = (state.xp || 0) + 15;
  vibrate(50); saveState(); updateHeaderGems();
  showNotification('🎉', '+10 جواهر | +15 XP');
}

// ==================== PROFILE ====================
function renderProfile() { const user = authState.user; if (user) { document.getElementById('profileName').textContent = user.name || 'المستخدم'; document.getElementById('profileEmail').textContent = user.email || 'ضيف'; } document.getElementById('profileLevel').textContent = calculateLevel(state.xp || 0); document.getElementById('profileGems').textContent = state.gems; document.getElementById('profileStreak').textContent = state.streak; document.getElementById('profileXP').textContent = state.xp || 0; if (state.equippedAvatar) { const item = SHOP_CATEGORIES.avatars.items.find(i => i.id === state.equippedAvatar); if (item) document.getElementById('profileAvatar').textContent = item.icon; } }

// ==================== SETTINGS ====================
function renderSettings() {
  document.getElementById('darkModeToggle').classList.toggle('active', state.darkMode);
  document.getElementById('notifToggle').classList.toggle('active', state.notifEnabled);
  document.getElementById('soundToggle').classList.toggle('active', state.soundEnabled);
  document.getElementById('vibrationToggle').classList.toggle('active', state.vibrationEnabled);
  
  // Populate level selector
  const levelSelector = document.getElementById('levelSelector');
  if (levelSelector) {
    levelSelector.innerHTML = LEVELS.map(level =>
      '<button class="btn ' + (state.level === level.id ? 'btn-primary' : '') + '" style="width: auto; padding: 8px 16px; font-size: 13px;" onclick="selectLevel(' + level.id + ')">' + escapeHtml(level.icon) + ' ' + level.id + '</button>'
    ).join('');
  }
}
function toggleDarkMode() { state.darkMode = !state.darkMode; updateTheme(); saveState(); renderSettings(); }
function updateTheme() {
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  try {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.darkMode ? '#0F172A' : '#8B5CF6');
  } catch (e) {}
}
function toggleNotifications() {
  state.notifEnabled = !state.notifEnabled;
  if (state.notifEnabled && 'Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        scheduleNotificationsIfEnabled();
      } else {
        state.notifEnabled = false;
      }
      saveState(); renderSettings();
    });
    return;
  }
  if (!state.notifEnabled) clearNotifications();
  saveState(); renderSettings();
}
function toggleSound() { state.soundEnabled = !state.soundEnabled; playSound(); saveState(); renderSettings(); }
function toggleVibration() { state.vibrationEnabled = !state.vibrationEnabled; vibrate(100); saveState(); renderSettings(); }
// ==================== DATA MANAGEMENT ====================
function exportData() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'islamic-levels-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (typeof data !== 'object' || data === null || Array.isArray(data)) throw new Error('invalid');
          // Whitelist of safe top-level keys
          const allowed = ['level','xp','streak','longestStreak','gems','totalDays','completionRewardedDate','lastCompletionReward','lastDate','todayTasks','completedChallenges','achievements','darkMode','notifEnabled','soundEnabled','vibrationEnabled','referralCode','streakFreezes','dailyHistory','goals','totalPrayers','totalQuran','totalDhikr','prayerTimesEnabled','prayerTimes','location','todayPrayers','todayAdhkar','tasbihCount','tasbihTotal','tasbihText','tasbihTarget','purchasedItems','equippedAvatar','equippedTheme','equippedBadge','doubleXPTimer','shieldActive','lastLoginDate','loginStreak','totalLogins','dailyRewardClaimed','claimedDailyRewards','charityTotal','familyId','familyRole','parentId','childId'];
          const safe = {};
          for (const k of allowed) if (k in data) safe[k] = data[k];
          Object.assign(state, safe);
          saveState();
          showNotification('تم', 'تم الاستيراد بنجاح!');
          location.reload();
        } catch (err) {
          showNotification('خطأ', 'ملف غير صالح');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

function resetData() {
  if (confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
    localStorage.clear();
    location.reload();
  }
}

// Manual recovery: re-run reconciliation against dailyHistory.
// Useful if the user sees an inflated streak/totalDays from an old cached
// app version. Also clears the SW session-storage flag so the page reload
// picks up the latest code.
function repairStreak() {
  rolloverIfNewDay();
  reconcileStreakWithHistory();
  clampCounters();
  // Reset the SW-reload flag so the page reload picks up the latest code.
  try { sessionStorage.removeItem('il-sw-reload'); } catch (e) {}
  saveState();
  showNotification('تم الإصلاح', 'السلسلة: ' + state.streak + ' | الأيام: ' + state.totalDays);
  renderTracker();
}

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
      if (supabaseService.userId) {
        await supabaseService.syncState(state);
      }
    } else {
      console.log('⚠️ Supabase tables not created yet - using localStorage only');
      // Don't show intrusive banner - user can check in settings
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

// ==================== ANALYTICS ====================
function renderAnalytics() {
  const analytics = new AnalyticsEngine(state);
  const weekly = analytics.getWeeklySummary();
  const monthly = analytics.getMonthlySummary();
  const categoryBreakdown = analytics.getCategoryBreakdown();
  const levelProgress = analytics.getLevelProgress();
  const streakAnalysis = analytics.getStreakAnalysis();
  const achievementProgress = analytics.getAchievementProgress();
  const timeOfDay = analytics.getTimeOfDayAnalysis();
  const overallScore = analytics.getOverallScore();

  let html = '';

  // Overall Score
  html += '<div class="card" style="text-align: center;">';
  html += '<div style="font-size: 16px; font-weight: 800; margin-bottom: 8px;">📈 النتيجة الإجمالية</div>';
  html += '<div style="font-size: 48px; font-weight: 900; color: ' + (overallScore >= 70 ? '#10B981' : overallScore >= 40 ? '#F59E0B' : '#EF4444') + ';">' + overallScore + '%</div>';
  html += '<div style="font-size: 14px; color: var(--text-muted);">' + (overallScore >= 70 ? 'ممتاز! استمر!' : overallScore >= 40 ? 'جيد، يمكنك التحسين' : 'حاول أكثر') + '</div>';
  html += '</div>';

  // Weekly Summary
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📅 ملخص الأسبوع</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #10B981;">' + weekly.daysCompleted + '/7</div><div style="font-size: 12px; color: var(--text-muted);">أيام مكتملة</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #F59E0B;">' + weekly.totalGems + '</div><div style="font-size: 12px; color: var(--text-muted);">جواهر</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #8B5CF6;">' + weekly.totalXp + '</div><div style="font-size: 12px; color: var(--text-muted);">خبرة</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #EF4444;">' + weekly.averageCompletion + '%</div><div style="font-size: 12px; color: var(--text-muted);">متوسط الإنجاز</div></div>';
  html += '</div></div>';

  // Category Breakdown
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📊 تفصيل العبادات</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  html += '<div style="padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 14px; font-weight: 700;">🕌 الصلوات</div><div style="font-size: 20px; font-weight: 900; color: #10B981;">' + categoryBreakdown.prayers.percentage + '%</div><div style="font-size: 11px; color: var(--text-muted);">' + categoryBreakdown.prayers.completed + '/' + categoryBreakdown.prayers.total + '</div></div>';
  html += '<div style="padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 14px; font-weight: 700;">📿 الأذكار</div><div style="font-size: 20px; font-weight: 900; color: #8B5CF6;">' + categoryBreakdown.adhkar.percentage + '%</div><div style="font-size: 11px; color: var(--text-muted);">' + categoryBreakdown.adhkar.completed + '/' + categoryBreakdown.adhkar.total + '</div></div>';
  html += '<div style="padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 14px; font-weight: 700;">📖 القرآن</div><div style="font-size: 20px; font-weight: 900; color: #3B82F6;">' + categoryBreakdown.quran.percentage + '%</div><div style="font-size: 11px; color: var(--text-muted);">' + categoryBreakdown.quran.pages + ' صفحة</div></div>';
  html += '<div style="padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 14px; font-weight: 700;">📊 المهام</div><div style="font-size: 20px; font-weight: 900; color: #EF4444;">' + categoryBreakdown.tasks.percentage + '%</div><div style="font-size: 11px; color: var(--text-muted);">' + categoryBreakdown.tasks.completed + '/' + categoryBreakdown.tasks.total + '</div></div>';
  html += '</div></div>';

  // Level Progress
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🎯 تقدم المستوى</div>';
  html += '<div style="text-align: center;"><div style="font-size: 16px;">المستوى ' + levelProgress.current + ' → ' + levelProgress.next + '</div>';
  html += '<div class="progress-container" style="margin: 12px 0;"><div class="progress-bar" style="width: ' + levelProgress.progress + '%;"></div></div>';
  html += '<div style="font-size: 13px; color: var(--text-muted);">الأيام: ' + levelProgress.daysCompleted + '/' + levelProgress.daysRequired + (levelProgress.remaining > 0 ? ' (متبقي ' + levelProgress.remaining + ' يوم)' : ' ✓ مكتمل!') + '</div></div></div>';

  // Streak Analysis
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🔥 تحليل السلسلة</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">';
  html += '<div><div style="font-size: 24px; font-weight: 900; color: #EF4444;">' + streakAnalysis.currentStreak + '</div><div style="font-size: 11px; color: var(--text-muted);">السلسلة الحالية</div></div>';
  html += '<div><div style="font-size: 24px; font-weight: 900; color: #F59E0B;">' + streakAnalysis.longestStreak + '</div><div style="font-size: 11px; color: var(--text-muted);">أطول سلسلة</div></div>';
  html += '<div><div style="font-size: 24px; font-weight: 900; color: #10B981;">' + streakAnalysis.consistency + '%</div><div style="font-size: 11px; color: var(--text-muted);">الثبات</div></div>';
  html += '</div></div>';

  // Achievement Progress
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🏆 الإنجازات</div>';
  html += '<div style="text-align: center;"><div style="font-size: 32px; font-weight: 900; color: #F59E0B;">' + achievementProgress.earned + '/' + achievementProgress.total + '</div>';
  html += '<div class="progress-container" style="margin: 12px 0;"><div class="progress-bar" style="width: ' + achievementProgress.percentage + '%; background: linear-gradient(90deg, #F59E0B, #D97706);"></div></div>';
  if (achievementProgress.nextAchievement) {
    html += '<div style="font-size: 13px; color: var(--text-muted);">التالي: ' + achievementProgress.nextAchievement.icon + ' ' + achievementProgress.nextAchievement.title + '</div>';
  }
  html += '</div></div>';

  // Time of Day Suggestions
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">⏰ اقتراحات ' + timeOfDay.periodArabic + '</div>';
  html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
  timeOfDay.suggestions.forEach(s => {
    html += '<span style="padding: 6px 12px; background: var(--bg); border-radius: 20px; font-size: 13px;">' + s + '</span>';
  });
  html += '</div></div>';

  document.getElementById('analyticsContent').innerHTML = html;
}

// ==================== SEASONAL CHALLENGES ====================
function renderSeasonal() {
  seasonalManager.load();
  const challenges = seasonalManager.getActiveChallenges();
  
  let html = '';

  // Active Seasons
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🌙 المواسم النشطة</div>';
  html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
  seasonalManager.checkActiveSeasons().forEach(seasonId => {
    const season = SEASONAL_CHALLENGES[seasonId];
    if (season) {
      html += '<span style="padding: 6px 12px; background: ' + season.color + '; color: white; border-radius: 20px; font-size: 13px; font-weight: 700;">' + season.icon + ' ' + season.title + '</span>';
    }
  });
  html += '</div></div>';

  // Challenges
  if (challenges.length > 0) {
    html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🎯 التحديات النشطة</div>';
    challenges.forEach(challenge => {
      const progress = seasonalManager.getProgress(challenge.id);
      const percentage = Math.min(100, Math.round((progress / challenge.target) * 100));
      const isComplete = progress >= challenge.target;
      
      html += '<div style="margin-bottom: 12px; padding: 12px; border: 1px solid ' + (isComplete ? '#10B981' : 'var(--border)') + '; border-radius: 12px;">';
      html += '<div style="display: flex; align-items: center; gap: 12px;">';
      html += '<span style="font-size: 32px;">' + challenge.icon + '</span>';
      html += '<div style="flex: 1;"><div style="font-weight: 700;">' + challenge.title + '</div>';
      html += '<div style="font-size: 12px; color: var(--text-muted);">' + challenge.description + '</div>';
      html += '<div style="font-size: 11px; color: ' + challenge.seasonColor + '; font-weight: 700;">' + challenge.seasonTitle + '</div></div>';
      html += '<div style="text-align: right;"><div style="font-weight: 800; color: #F59E0B;">💎 ' + challenge.reward + '</div>';
      html += '<div style="font-size: 12px; color: var(--text-muted);">' + progress + '/' + challenge.target + '</div></div>';
      html += '</div>';
      html += '<div class="progress-container" style="margin-top: 8px;"><div class="progress-bar" style="width: ' + percentage + '%; background: ' + (isComplete ? '#10B981' : challenge.seasonColor) + ';"></div></div>';
      if (isComplete) {
        html += '<div style="text-align: center; margin-top: 8px; color: #10B981; font-weight: 700;">✅ مكتمل!</div>';
      }
      html += '</div>';
    });
    html += '</div>';
  } else {
    html += '<div class="card" style="text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">🎯</div><div style="font-weight: 800;">لا توجد تحديات نشطة</div><div style="color: var(--text-muted); margin-top: 8px;">تحقق لاحقاً للتحديات الجديدة</div></div>';
  }

  document.getElementById('seasonalContent').innerHTML = html;
}

// ==================== COMMUNITY ====================
function renderCommunity() {
  communityManager.load();
  const stats = communityManager.getCommunityStats();
  const leaderboard = communityManager.getLeaderboard('streak');
  const userRank = communityManager.getUserRank('streak');

  let html = '';

  // Community Stats
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">📊 إحصائيات المجتمع</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #3B82F6;">' + stats.totalUsers + '</div><div style="font-size: 12px; color: var(--text-muted);">إجمالي المستخدمين</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #10B981;">' + stats.activeToday + '</div><div style="font-size: 12px; color: var(--text-muted);">نشط اليوم</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #F59E0B;">' + stats.averageStreak + '</div><div style="font-size: 12px; color: var(--text-muted);">متوسط السلسلة</div></div>';
  html += '<div style="text-align: center; padding: 12px; background: var(--bg); border-radius: 12px;"><div style="font-size: 24px; font-weight: 900; color: #EF4444;">' + stats.topStreak + '</div><div style="font-size: 12px; color: var(--text-muted);">أطول سلسلة</div></div>';
  html += '</div></div>';

  // Your Rank
  html += '<div class="card" style="background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; text-align: center;">';
  html += '<div style="font-size: 14px; opacity: 0.9;">ترتيبك</div>';
  html += '<div style="font-size: 48px; font-weight: 900;">#' + userRank + '</div>';
  html += '<div style="font-size: 14px; opacity: 0.9;">من أصل ' + stats.totalUsers + ' مستخدم</div>';
  html += '</div>';

  // Leaderboard
  html += '<div class="card"><div style="font-weight: 800; margin-bottom: 12px;">🏆 الترتيب العالمي</div>';
  leaderboard.slice(0, 10).forEach((user, index) => {
    const isCurrentUser = user.isCurrentUser;
    html += '<div style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid var(--border); ' + (isCurrentUser ? 'background: rgba(139, 92, 246, 0.1); border-radius: 8px;' : '') + '">';
    html += '<div style="width: 32px; font-size: 20px; font-weight: 900; text-align: center;">' + (user.medal || '#' + user.rank) + '</div>';
    html += '<div style="flex: 1; margin: 0 12px;"><div style="font-weight: 700;">' + escapeHtml(user.name) + (isCurrentUser ? ' (أنت)' : '') + '</div>';
    html += '<div style="font-size: 11px; color: var(--text-muted);">المستوى ' + user.level + '</div></div>';
    html += '<div style="text-align: right;"><div style="font-weight: 800; color: #F97316;">🔥 ' + user.streak + '</div>';
    html += '<div style="font-size: 11px; color: var(--text-muted);">💎 ' + user.gems + '</div></div>';
    html += '</div>';
  });
  html += '</div>';

  document.getElementById('communityContent').innerHTML = html;
}

// ==================== INIT ====================
function showApp() {
  // Hide splash screen with animation
  const splash = document.getElementById('splashScreen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => splash.style.display = 'none', 500);
  }
  
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('appContainer').style.display = 'block';
  document.getElementById('headerSubtitle').textContent = 'مرحباً، ' + (authState.user?.name || 'ضيف') + '!';
  renderLevels();
  updateHeaderGems();
  if (state.prayerTimesEnabled) initPrayerTimes();
  if (state.equippedTheme) applyTheme(state.equippedTheme);
  setInterval(updatePrayerBanner, 60000);
  if (typeof seasonalManager !== 'undefined') seasonalManager.load();
  if (typeof communityManager !== 'undefined') communityManager.load();
}

document.addEventListener('DOMContentLoaded', () => {
  // Hide splash after 2 seconds
  setTimeout(() => {
    const splash = document.getElementById('splashScreen');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.style.display = 'none', 500);
    }
  }, 2000);
  
  const savedAuth = localStorage.getItem('islamicAuth');
  if (savedAuth) { authState = JSON.parse(savedAuth); if (authState.isLoggedIn) { loadState(); showApp(); return; } }
  loadState();
  document.getElementById('authModal').style.display = 'flex';
});
