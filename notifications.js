// ==================== NOTIFICATION SERVICE ====================

class NotificationService {
  constructor() {
    this.scheduled = [];
    this.intervals = [];
  }

  // Initialize notifications
  async init() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Schedule daily reminders
  scheduleDailyReminders(prayerTimes) {
    this.clearAll();
    
    if (!prayerTimes) return;

    // Fajr reminder (15 min before)
    this.schedulePrayerReminder('الفجر', prayerTimes.fajr, 15);
    
    // Dhuhr reminder
    this.schedulePrayerReminder('الظهر', prayerTimes.dhuhr, 10);
    
    // Asr reminder
    this.schedulePrayerReminder('العصر', prayerTimes.asr, 10);
    
    // Maghrib reminder
    this.schedulePrayerReminder('المغرب', prayerTimes.maghrib, 5);
    
    // Isha reminder
    this.schedulePrayerReminder('العشاء', prayerTimes.isha, 10);
    
    // Morning Adhkar reminder (after Fajr)
    this.scheduleAdhkarReminder('أذكار الصباح', '☀️', prayerTimes.fajr, 30);
    
    // Evening Adhkar reminder (after Asr)
    this.scheduleAdhkarReminder('أذكار المساء', '🌙', prayerTimes.asr, 30);
    
    // Quran reading reminder (midday)
    this.scheduleSpecificReminder('وقت القرآن', '📖', '12:00', 'حان وقت تلاوة القرآن');
    
    // Sleep Adhkar reminder
    this.scheduleSpecificReminder('أذكار النوم', '😴', '21:00', 'لا تنسَ أذكار النوم قبل النوم');
  }

  schedulePrayerReminder(prayerName, prayerTime, minutesBefore) {
    if (!prayerTime) return;
    
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes - minutesBefore, 0);
    
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const delay = reminderTime - now;
    const timeoutId = setTimeout(() => {
      this.showNotification(`🕌 حان وقت صلاة ${prayerName}`, {
        body: `تبقّى ${minutesBefore} دقيقة على صلاة ${prayerName}`,
        icon: 'icons/icon-192.png',
        tag: `prayer-${prayerName}`,
        requireInteraction: true
      });
    }, delay);
    
    this.scheduled.push(timeoutId);
  }

  scheduleAdhkarReminder(title, icon, afterTime, minutesAfter) {
    if (!afterTime) return;
    
    const [hours, minutes] = afterTime.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes + minutesAfter, 0);
    
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const delay = reminderTime - now;
    const timeoutId = setTimeout(() => {
      this.showNotification(`${icon} ${title}`, {
        body: `حان وقت ${title}. لا تنسَها!`,
        icon: 'icons/icon-192.png',
        tag: `adhkar-${title}`
      });
    }, delay);
    
    this.scheduled.push(timeoutId);
  }

  scheduleSpecificReminder(title, icon, time, message) {
    if (!time) return;
    
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0);
    
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const delay = reminderTime - now;
    const timeoutId = setTimeout(() => {
      this.showNotification(`${icon} ${title}`, {
        body: message,
        icon: 'icons/icon-192.png',
        tag: `specific-${title}`
      });
    }, delay);
    
    this.scheduled.push(timeoutId);
  }

  showNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: options.body || '',
          icon: options.icon || 'icons/icon-192.png',
          badge: 'icons/icon-192.png',
          tag: options.tag || 'islamic-levels',
          requireInteraction: options.requireInteraction || false,
          vibrate: [200, 100, 200]
        });
      } catch (e) {
        console.log('Notification error:', e);
      }
    }
  }

  clearAll() {
    this.scheduled.forEach(id => clearTimeout(id));
    this.scheduled = [];
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
  }
}

// Create global instance
const notificationService = new NotificationService();
