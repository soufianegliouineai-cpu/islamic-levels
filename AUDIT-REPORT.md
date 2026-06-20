# 🔍 Islamic Levels PWA — Audit Report

**Date:** 2026-06-20
**Scope:** `/var/minis/workspace/islamic-levels-pwa/`
**Mode:** READ-ONLY (no fixes applied)

---

## 1. SYNTAX ERRORS

✅ **All 14 JavaScript files pass `node --check` with zero syntax errors.**

| File | Status |
|---|---|
| advanced-features.js | ✅ |
| analytics.js | ✅ |
| app.js (82 KB) | ✅ |
| community.js | ✅ |
| data.js | ✅ |
| family.js | ✅ |
| notifications.js | ✅ |
| prayer-times.js | ✅ |
| premium-enhancements.js | ✅ |
| premium-icons.js | ✅ |
| seasonal.js | ✅ |
| supabase-setup.js | ✅ |
| supabase.js | ✅ |
| sw.js | ✅ |

---

## 2. MISSING FUNCTIONS

✅ **All 18 onclick handlers in `index.html` resolve to defined functions.**
✅ **All 23 dynamic onclick handlers generated in JS files resolve.**

Handlers verified: `changeTasbihText, exportData, guestLogin, importData, incrementTasbih, login, logout, register, resetData, resetTasbih, showLogin, showRegister, showScreen, showShopCategory, toggleDarkMode, toggleNotifications, toggleSound, toggleVibration`.

---

## 3. SCREEN RENDERING

| Screen | HTML Container | Render Function | Wired in `showScreen()`? | Status |
|---|---|---|---|---|
| home | ✅ `#homeScreen` (1572 chars static) | `renderLevels()` | ⚠️ Called in `showApp()`, NOT in `showScreen('home')` | ⚠️ Partial |
| tracker | ✅ | `renderTracker` | ✅ | ✅ |
| prayer | ✅ | `renderPrayerTracker` | ✅ | ✅ |
| adhkar | ✅ | `renderAdhkarCategories` | ✅ | ✅ |
| quran | ✅ | `renderQuran` | ✅ | ✅ |
| shop | ✅ | `renderShop` | ✅ | ✅ |
| family | ✅ | `renderFamily` | ✅ | ✅ |
| messages | ✅ | `renderMessages` | ✅ | ✅ |
| gift | ✅ | `renderGiftConversion` | ✅ | ✅ |
| **dashboard** | ✅ `#dashboardScreen` | ❌ **NO `renderDashboard`** | ❌ Not in renderers map | ❌ **Broken** |
| profile | ✅ | `renderProfile` | ✅ | ✅ |
| settings | ✅ | `renderSettings` | ✅ | ✅ |
| tasbih | ✅ | `renderTasbih` | ✅ | ✅ |
| qibla | ✅ | `renderQibla` | ✅ | ✅ |
| analytics | ✅ | `renderAnalytics` | ✅ | ✅ |
| seasonal | ✅ | `renderSeasonal` | ✅ | ✅ |
| community | ✅ | `renderCommunity` | ✅ | ✅ |
| dua | ✅ | `renderDuaBook` | ✅ | ✅ |

### Issues:
- ❌ **`dashboardScreen` has no renderer** — stats (`#statLevel`, `#statGems`, `#statStreak`, `#statDays`, `#dashProgress`, `#leaderboardPreview`) never get populated. Dashboard navigation shows static "0" values forever.
- ⚠️ **`home` screen relies on `renderLevels()` being called once in `showApp()`** — if a user navigates away and back, levels still display (because innerHTML persists), but any state-dependent reflection (unlock status, equipped theme) is not re-applied.

---

## 4. TOGGLE FUNCTIONALITY

| Toggle | Updates State | Updates UI | Real Effect? | Status |
|---|---|---|---|---|
| **darkMode** | ✅ `state.darkMode` | ✅ `data-theme` attr | ✅ **YES** — CSS variables switch | ✅ Working |
| **notifications** | ✅ `state.notifEnabled` | ✅ active class | ⚠️ Requests browser permission ONLY — no scheduling of actual notifications (no `notifications.js` integration in `toggleNotifications()`) | ⚠️ Partial |
| **sound** | ✅ `state.soundEnabled` | ✅ active class | ⚠️ `playSound()` exists (line 175) and is gated by `state.soundEnabled`, but the audio is a **placeholder empty WAV** (`data:audio/wav;base64,UklGRl9vT19teleQAVlbmV0ZAAAAAA=`) that won't play any real sound | ⚠️ Partial |
| **vibration** | ✅ `state.vibrationEnabled` | ✅ active class | ✅ **YES** — `vibrate()` (line 174) is gated by state and called 13× across app.js (tasks, prayers, navigation) | ✅ Working |
| **font size** | ❌ Not present in HTML | — | — | N/A (not implemented) |

### Issues:
- ⚠️ **Sound toggle is cosmetic** — the audio data URI is corrupted/invalid, so even when enabled no sound plays.
- ⚠️ **Notification toggle does not schedule prayer/dhikr reminders** — `notifications.js` is loaded but `toggleNotifications()` only requests permission. No `scheduleNotifications(state)` call when enabled.

---

## 5. BUTTON EFFECTS

All 18 static + 23 dynamic onclick handlers map to existing functions and produce side effects:

| Handler | Side Effect | Status |
|---|---|---|
| `showScreen(name)` | DOM class toggle + render call | ✅ |
| `guestLogin()` | localStorage write + showApp | ✅ |
| `login() / register()` | Validate + showApp | ✅ |
| `toggleTask(id)` | State mutation + progress update | ✅ |
| `togglePrayer(id)` | State mutation + count update | ✅ |
| `incrementTasbih()` | Counter increment + persist | ✅ |
| `resetTasbih()` | Counter reset | ✅ |
| `changeTasbihText()` | Prompt + update text | ✅ |
| `buyItem(id, cat)` | Gems deduct + add to purchased | ✅ |
| `equipItem(id, cat)` | Set equipped slot + applyTheme | ✅ |
| `showShopCategory(cat)` | Re-render shop tab | ✅ |
| `exportData() / importData() / resetData()` | File I/O + reload | ✅ |
| `toggleDarkMode/Notifications/Sound/Vibration` | See Section 4 | ⚠️ |
| `selectLevel(id)` | Set state.level + navigate to tracker | ✅ |
| `logout()` | Clear auth + show login | ✅ |

✅ **No dead button handlers detected.**

---

## 6. DUPLICATE VARIABLES / FUNCTIONS

### Duplicate function definitions:
- ❌ **`exportData`** defined TWICE in `app.js`:
  - Line 760 (inline, one-liner)
  - Line 764 (full block version)
  → JavaScript silently uses the SECOND definition. The line-760 version is dead code but causes confusion.
- ❌ **`importData`** defined TWICE in `app.js`:
  - Line 761 (inline)
  - Block version further down
  → Same shadowing issue.
- ❌ **`getToday`** defined TWICE across files (likely `app.js` + one helper file). Last one wins.

### Duplicate CSS classes:
- ⚠️ **`.screen` and `.screen.active`** defined identically in BOTH `styles.css` (lines 119, 123) AND `premium-redesign.css` (lines 685, 689) — harmless since values match, but `styles.css` is NOT loaded so duplicate is moot.
- ⚠️ **`.nav-item`** defined in `styles.css` (82), `premium-redesign.css` (300), and `premium-styles.css` (239) — neither `styles.css` nor `premium-styles.css` is loaded.

---

## 7. CSS CONFLICTS — 🚨 **CRITICAL FINDING**

🚨 **Only ONE CSS file is loaded in `index.html`:**

```html
<link rel="stylesheet" href="premium-redesign.css">
```

❌ **`styles.css` is NOT linked.**
❌ **`premium-styles.css` is NOT linked.**

### Classes defined in `styles.css` but MISSING from `premium-redesign.css`:

```
.activity-chart      .analytics-grid       .analytics-item
.analytics-label     .analytics-value      .animate-level-up
.animate-pulse       .btn-warning          .chart-bar
.chart-fill          .chart-label          .empty-icon
.empty-state         .empty-text           .filter-btn
.goal-card           .goal-item            .goals-list
.install-banner      .install-btn          .install-text
.level-sub           .main                 .modal
.modal-content       .shop-card            .shop-tab
.task-section        .task-section-title   .tip-card
.tip-text            .tip-title            .toggle-label
.toggle-row
```

**Impact:** These classes are referenced by JS-generated HTML across the app but receive NO styling:
- `.task-section`, `.task-section-title` → **Tracker screen sections unstyled**
- `.modal`, `.modal-content` → **All modals invisible / unstyled**
- `.empty-state`, `.empty-icon`, `.empty-text` → **Empty placeholders broken**
- `.analytics-grid`, `.analytics-item`, `.chart-bar` → **Analytics screen has no charts**
- `.goal-card`, `.goals-list` → **Goals look broken**
- `.shop-tab`, `.shop-card` → **Shop tabs unstyled**
- `.toggle-row`, `.toggle-label` → **Settings rows misaligned**
- `.install-banner` → **PWA install banner invisible**

🔑 **This is the single most impactful bug in the app — explains "many buttons don't show anything" and "menus showing same content" reports.**

---

## 8. EMPTY STATEMENTS / DEAD CODE

✅ **No empty function bodies detected.**
✅ **No empty if/else blocks detected.**
✅ **No TODO/FIXME/XXX markers.**

### Dead code found:
- Line 760 `exportData` (inline) → shadowed by line 764 block version
- Line 761 `importData` (inline) → shadowed by later block version
- `styles.css` (13 KB) → file exists but never loaded
- `premium-styles.css` (13 KB) → file exists but never loaded

---

## 📊 SUMMARY

| Category | Status |
|---|---|
| Syntax | ✅ Clean |
| Function definitions | ✅ Complete (with 3 duplicate shadows) |
| Screen renderers | ⚠️ 1 missing (`dashboard`) |
| Toggles | ⚠️ 2 of 4 are cosmetic (sound, notifications) |
| Button handlers | ✅ All wired |
| CSS | ❌ **CRITICAL: 35+ classes unstyled (styles.css not loaded)** |
| Dead code | ⚠️ 2 shadowed functions + 2 unloaded CSS files |

---

## 🎯 PRIORITY RANKING (for fixing later)

| Priority | Issue | Fix Effort |
|---|---|---|
| 🔴 **P0** | `styles.css` not linked → 35+ classes unstyled | 1 line in `index.html` |
| 🔴 **P0** | `dashboard` screen has no renderer | Add `renderDashboard()` + register in renderers map |
| 🟡 **P1** | Sound toggle plays empty WAV | Replace with real audio asset |
| 🟡 **P1** | Notification toggle doesn't schedule reminders | Call `scheduleNotifications()` from `notifications.js` |
| 🟢 **P2** | Duplicate `exportData/importData/getToday` definitions | Remove inline shadows |
| 🟢 **P2** | `premium-styles.css` exists but unused | Delete or merge into `premium-redesign.css` |

---

**Report end.**
