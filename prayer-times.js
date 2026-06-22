// ==================== PRAYER TIMES SERVICE ====================

class PrayerTimesService {
  constructor() {
    this.times = null;
    this.location = null;
    this.hijriDate = null;
  }

  // Get user's location
  async getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.location = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          resolve(this.location);
        },
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // Fetch prayer times from Aladhan API
  async fetchPrayerTimes(latitude, longitude) {
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const baseUrl = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}`;
      const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), method: '2' });
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      if (!response.ok) throw new Error('Prayer API HTTP ' + response.status);

      const data = await response.json();
      const timings = data?.data?.timings;
      const hijri = data?.data?.date?.hijri;
      if (data?.code !== 200 || !timings?.Fajr || !hijri?.month?.number) {
        throw new Error('Unexpected prayer API response shape');
      }

      this.times = {
        fajr: timings.Fajr,
        sunrise: timings.Sunrise,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha,
        imsak: timings.Imsak,
        midnight: timings.Midnight
      };

      // Hijri date
      this.hijriDate = {
        day: hijri.day,
        month: hijri.month.number,
        monthName: hijri.month.ar,
        year: hijri.year,
        formatted: data.data.date.hijri_formatted || `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`
      };

      return { times: this.times, hijri: this.hijriDate };
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      return null;
    }
  }

  // Get current prayer
  getCurrentPrayer() {
    if (!this.times) return null;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const prayers = [
      { name: 'fajr', arabic: 'الفجر', time: this.times.fajr },
      { name: 'sunrise', arabic: 'الشروق', time: this.times.sunrise },
      { name: 'dhuhr', arabic: 'الظهر', time: this.times.dhuhr },
      { name: 'asr', arabic: 'العصر', time: this.times.asr },
      { name: 'maghrib', arabic: 'المغرب', time: this.times.maghrib },
      { name: 'isha', arabic: 'العشاء', time: this.times.isha }
    ];
    
    // Find current prayer
    for (let i = prayers.length - 1; i >= 0; i--) {
      if (currentTime >= prayers[i].time) {
        const nextPrayer = prayers[(i + 1) % prayers.length];
        return {
          current: prayers[i],
          next: nextPrayer,
          timeUntilNext: this.getTimeUntil(nextPrayer.time)
        };
      }
    }
    
    // Before Fajr
    return {
      current: prayers[prayers.length - 1],
      next: prayers[0],
      timeUntilNext: this.getTimeUntil(prayers[0].time)
    };
  }

  // Calculate time until prayer
  getTimeUntil(prayerTime) {
    const now = new Date();
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const prayerDate = new Date(now);
    prayerDate.setHours(hours, minutes, 0);
    
    if (prayerDate < now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }
    
    const diff = prayerDate - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    
    return { hours: h, minutes: m, formatted: `${h} ساعة ${m} دقيقة` };
  }

  // Check if it's time for specific prayer
  isPrayerTime(prayerName) {
    if (!this.times) return false;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const prayerTime = this.times[prayerName];
    
    if (!prayerTime) return false;
    
    const [pHours, pMinutes] = prayerTime.split(':').map(Number);
    const [cHours, cMinutes] = currentTime.split(':').map(Number);
    
    const prayerMins = pHours * 60 + pMinutes;
    const currentMins = cHours * 60 + cMinutes;
    
    // Within 30 minutes of prayer time
    return Math.abs(currentMins - prayerMins) <= 30;
  }

  // Get seasonal status based on Hijri month
  getSeasonalStatus() {
    if (!this.hijriDate) return null;
    
    const month = this.hijriDate.month;
    const seasons = [];
    
    // Ramadan (9th month)
    if (month === 9) {
      seasons.push({
        name: 'ramadan',
        title: 'شهر رمضان المبارك',
        icon: '🌙',
        isSpecial: true
      });
    }
    
    // Dhul Hijjah (12th month)
    if (month === 12) {
      seasons.push({
        name: 'dhulHijjah',
        title: 'ذي الحجة',
        icon: '🕋',
        isSpecial: true
      });
    }
    
    // Muharram (1st month)
    if (month === 1) {
      seasons.push({
        name: 'muharram',
        title: 'محرم',
        icon: '📅',
        isSpecial: true
      });
    }
    
    // Shawwal (10th month - 6 days fasting)
    if (month === 10) {
      seasons.push({
        name: 'shawwal',
        title: 'شوال',
        icon: '🌙',
        isSpecial: true
      });
    }
    
    // Rajab & Sha'ban (months before Ramadan)
    if (month === 7 || month === 8) {
      seasons.push({
        name: 'preRamadan',
        title: 'الاستعداد لرمضان',
        icon: '📅',
        isSpecial: false
      });
    }
    
    return seasons.length > 0 ? seasons : null;
  }
}

// Create global instance
const prayerService = new PrayerTimesService();
