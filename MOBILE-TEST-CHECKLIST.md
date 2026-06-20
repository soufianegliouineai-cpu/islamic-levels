# 📱 Islamic Levels PWA — Real-Device Test Checklist

Use this checklist on a physical iPhone (Safari) and Android phone (Chrome).

## Device Info
- iPhone model: ________________ iOS: ________________
- Android model: ________________ Chrome version: ________________
- Tester name: ________________ Date: ________________

---

## 1. PWA Install

| Step | iOS | Android |
|------|-----|---------|
| Open https://islamic-levels.vercel.app | ☐ | ☐ |
| Add to Home Screen works | ☐ | ☐ |
| App launches in standalone (no browser chrome) | ☐ | ☐ |
| Splash screen / app icon correct | ☐ | ☐ |
| Orientation stays portrait | ☐ | ☐ |

---

## 2. Authentication

| Step | iOS | Android |
|------|-----|---------|
| Guest login works | ☐ | ☐ |
| Register new account | ☐ | ☐ |
| Login with existing account | ☐ | ☐ |
| Logout works | ☐ | ☐ |

---

## 3. Navigation (all screens open without blank/white screen)

| Screen | iOS | Android |
|--------|-----|---------|
| الرئيسية (Home) | ☐ | ☐ |
| التتبع (Tracker) | ☐ | ☐ |
| المتجر (Shop) | ☐ | ☐ |
| الأذكار (Adhkar) | ☐ | ☐ |
| الإعدادات (Settings) | ☐ | ☐ |
| لوحة التحكم (Dashboard) | ☐ | ☐ |
| الصلاة (Prayer) | ☐ | ☐ |
| التسبيح (Tasbih) | ☐ | ☐ |
| القبلة (Qibla) | ☐ | ☐ |
| العائلة (Family) | ☐ | ☐ |
| الهدايا (Gift conversion) | ☐ | ☐ |
| الرسائل (Messages) | ☐ | ☐ |
| الصفحة الشخصية (Profile) | ☐ | ☐ |
| التحليلات (Analytics) | ☐ | ☐ |
| الموسمية (Seasonal) | ☐ | ☐ |
| المجتمع (Community) | ☐ | ☐ |
| القرآن (Quran) | ☐ | ☐ |
| الدعاء (Dua) | ☐ | ☐ |

---

## 4. Core Interactions

| Interaction | iOS | Android |
|-------------|-----|---------|
| Tap a level card → opens level details | ☐ | ☐ |
| Complete a tracker task → XP/gems update | ☐ | ☐ |
| Prayer tracker toggle → state persists | ☐ | ☐ |
| Adhkar count button → counts down | ☐ | ☐ |
| Tasbih counter vibrates | ☐ | ☐ |
| Shop tab switch → different items | ☐ | ☐ |
| Buy shop item → gems decrease | ☐ | ☐ |
| Equip avatar/theme/badge → UI updates | ☐ | ☐ |

---

## 5. Sound & Vibration

| Step | iOS | Android |
|------|-----|---------|
| Toggle sound ON → click/task produces sound | ☐ | ☐ |
| Toggle sound OFF → silent | ☐ | ☐ |
| Toggle vibration ON → haptic feedback | ☐ | ☐ |
| Toggle vibration OFF → no haptic | ☐ | ☐ |

---

## 6. Notifications

| Step | iOS | Android |
|------|-----|---------|
| Toggle notifications ON → permission prompt | ☐ | ☐ |
| Grant permission | ☐ | ☐ |
| Prayer reminder appears at correct time | ☐ | ☐ |
| Toggle notifications OFF → cancels reminders | ☐ | ☐ |

---

## 7. Settings & Data

| Step | iOS | Android |
|------|-----|---------|
| Dark mode toggle works | ☐ | ☐ |
| Export data → valid JSON | ☐ | ☐ |
| Import data → state restored | ☐ | ☐ |
| Clear data → app resets to guest | ☐ | ☐ |

---

## 8. Family Features

| Step | iOS | Android |
|------|-----|---------|
| Create family → code generated | ☐ | ☐ |
| Join family with code | ☐ | ☐ |
| Send message between members | ☐ | ☐ |
| Send/request gems | ☐ | ☐ |
| Parent approves conversion/request | ☐ | ☐ |

---

## 9. Offline Behavior

| Step | iOS | Android |
|------|-----|---------|
| Install PWA | ☐ | ☐ |
| Turn on airplane mode | ☐ | ☐ |
| Close and reopen app → loads | ☐ | ☐ |
| Navigate screens while offline | ☐ | ☐ |
| Complete tasks offline | ☐ | ☐ |
| Re-enable internet → sync banner/status | ☐ | ☐ |

---

## 10. Visual & Polish

| Check | iOS | Android |
|-------|-----|---------|
| No horizontal scroll | ☐ | ☐ |
| Text not cut off | ☐ | ☐ |
| Buttons easy to tap (≥44×44 pt / 48×48 dp) | ☐ | ☐ |
| Modals centered and dismissible | ☐ | ☐ |
| No empty white boxes or missing icons | ☐ | ☐ |

---

## Issues Found

| # | Device | Screen | Issue | Severity | Screenshot |
|---|--------|--------|-------|----------|------------|
| 1 |        |        |       |          |            |
| 2 |        |        |       |          |            |
| 3 |        |        |       |          |            |

---

## Sign-off

- iOS test passed: ☐   Failed items: ________
- Android test passed: ☐   Failed items: ________
