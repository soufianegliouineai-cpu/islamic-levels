# 🌟 المستويات الإيمانية - Islamic Levels PWA

A comprehensive Progressive Web App (PWA) for tracking daily Islamic spiritual progress with full family management, real-time sync, and gamification.

## ✨ Features

### 🕌 Worship Tracking
- **5 Islamic Levels** with detailed daily tasks
- **Prayer Tracker** (Fard + Sunnah for all 5 prayers)
- **Comprehensive Adhkar** (12 categories, 80+ adhkar)
- **Quran Tracker** (30 parts with progress)
- **Dua Book** (6 categories, 20+ duas)
- **Digital Tasbih** (Counter with vibration)
- **Qibla Direction** (GPS-based compass)

### 👨‍👩‍👧 Family Management
- **Parent Role**: Create family, monitor children, approve requests
- **Child Role**: Join family with 6-char code, request gifts
- **Real-time Online Status** (Online/Away/Offline)
- **Messaging System** (Family-only chat)
- **Gift Requests** (Child → Parent approval workflow)
- **Multi-device Sync** (via Supabase)

### 💰 Real Gift Conversion
- **1000 💎 = 200 MAD** (0.2 MAD per gem)
- Convert any amount ≥ 100 gems
- Charity donations (water, food, education, mosque, orphan)
- Parent approval required for withdrawals

### 🛒 Shop System (60+ Items)
- 🎁 **Daily Rewards** (streak-based milestones)
- ⚡ **Power-ups** (Streak freeze, Double XP, Shield)
- 👤 **Avatars** (12 profile pictures)
- 🎨 **Themes** (10 color themes)
- 🔊 **Sounds** (Adhan, Quran, Bell)
- 🏅 **Badges** (10 collectible badges)
- 💰 **Charity** (6 donation causes)

### 🔒 Level Lock System
- 30 days required per level
- Visual progress bar
- Counter resets if streak breaks
- 120 days for max level (Level 5)

### 📊 Gamification
- **XP System**: Earn XP per task, auto-level up
- **Gems**: Currency for shop purchases
- **Streaks**: Daily completion tracking
- **19 Achievements**: Unlock badges
- **Daily Login Rewards**: Streak-based bonuses

### 🌙 Special Features
- **Ramadan Mode**: Seasonal worship tracking
- **Dark Mode**: Eye-friendly night use
- **Haptic Feedback**: Vibration on actions
- **Offline Mode**: Works without internet
- **PWA**: Install on home screen

## 🗄️ Database

Uses **Supabase** for multi-device sync. Schema includes 13 tables:
- `users`, `families`, `family_members`
- `daily_progress`, `prayer_records`, `adhkar_progress`, `quran_progress`
- `user_achievements`, `shop_purchases`, `messages`, `family_requests`
- `notifications`, `gift_conversions`

## 🚀 Setup

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npx serve .

# Or with Python
python3 -m http.server 8000
```

### Deploy to Vercel
```bash
vercel --prod
```

### Supabase Setup (Optional)
1. Create account at [supabase.com](https://supabase.com)
2. Open SQL Editor
3. Run `supabase-schema.sql`
4. Add credentials to `supabase.js`

## 📁 File Structure

```
islamic-levels-pwa/
├── index.html              # Main entry point
├── styles.css              # All styles
├── data.js                 # Levels, adhkar, quran, shop data
├── prayer-times.js         # Aladhan API integration
├── notifications.js        # Notification service
├── family.js               # Family manager class
├── supabase.js             # Supabase service
├── supabase-setup.js       # Setup wizard
├── app.js                  # Main app logic
├── sw.js                   # Service worker
├── manifest.json           # PWA manifest
├── supabase-schema.sql     # Database schema
└── icons/                  # App icons
```

## 🔗 Links

- **Live App**: https://islamic-levels.vercel.app
- **GitHub**: https://github.com/soufianegliouineai-cpu/islamic-levels
- **Supabase**: https://supabase.com/dashboard/project/poannvzbffghwldwvjxk

## 🎯 Features Tested

| Feature | Status |
|---------|--------|
| All 12 Screens | ✅ Working |
| Task Toggle + XP | ✅ Working |
| Prayer Tracker | ✅ Working |
| Adhkar System | ✅ Working |
| Quran Tracker | ✅ Working |
| Digital Tasbih | ✅ Working |
| Shop System (Buy/Equip) | ✅ Working |
| Family Creation | ✅ Working |
| Family Join | ✅ Working |
| Messaging | ✅ Working |
| Gift Requests | ✅ Working |
| Online Status | ✅ Working |
| Gift Conversion | ✅ Working |
| Level Lock System | ✅ Working |
| Daily Rewards | ✅ Working |
| Achievement System | ✅ Working |
| Dark Mode | ✅ Working |
| Supabase Connection | ✅ Connected |
| API Key Validation | ✅ Valid |
| Offline Mode | ✅ Working |
| PWA Install | ✅ Working |

## 💡 Usage

1. **Install**: Visit the app in your browser, tap "Add to Home Screen"
2. **Choose Level**: Pick your spiritual level (1-5)
3. **Complete Tasks**: Check off daily worship tasks
4. **Earn Rewards**: Collect gems and XP
5. **Family**: Create or join a family for group tracking
6. **Shop**: Spend gems on items and themes
7. **Real Money**: Convert gems to MAD with parental approval

## 📜 License

MIT License - Free to use and modify.
