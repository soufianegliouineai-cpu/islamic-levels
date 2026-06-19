// ==================== COMPREHENSIVE WORSHIP DATA ====================

// Prayer names in Arabic
const PRAYER_NAMES = {
  fajr: 'الفجر',
  sunrise: 'الشروق',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء'
};

// ==================== ADHKAR (Remembrances) ====================
const ADHKAR = {
  morning: {
    title: 'أذكار الصباح',
    icon: '☀️',
    time: 'من الفجر إلى شروق الشمس',
    items: [
      { text: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', count: 1, reward: 100 },
      { text: 'اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور', count: 1, reward: 100 },
      { text: 'سبحان الله وبحمده', count: 100, reward: 1000 },
      { text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', count: 100, reward: 1000 },
      { text: 'أستغفر الله وأتوب إليه', count: 100, reward: 1000 },
      { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم', count: 3, reward: 300 },
      { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', count: 3, reward: 300 },
      { text: 'حسبي الله لا إله إلا عليه توكلت وهو رب العرش العظيم', count: 7, reward: 700 },
      { text: 'سبحان الله عدد خلقه، سبحان الله عدد نعمه، سبحان الله عدد ما في كتابه', count: 3, reward: 300 },
      { text: 'اللهم صلِّ وسلم على نبينا محمد', count: 10, reward: 1000 }
    ]
  },
  evening: {
    title: 'أذكار المساء',
    icon: '🌙',
    time: 'من العصر إلى المغرب',
    items: [
      { text: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', count: 1, reward: 100 },
      { text: 'اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المحشور', count: 1, reward: 100 },
      { text: 'أستغفر الله وأتوب إليه', count: 100, reward: 1000 },
      { text: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم', count: 3, reward: 300 },
      { text: 'أعوذ بكلمات الله التامات من شر ما خلق', count: 3, reward: 300 },
      { text: 'اللهم إني أسألك العافية في الدنيا والآخرة', count: 3, reward: 300 },
      { text: 'سبحان الله وبحمده', count: 100, reward: 1000 }
    ]
  },
  afterPrayer: {
    title: 'أذكار بعد الصلاة',
    icon: '🕌',
    time: 'بعد كل صلاة مفروضة',
    items: [
      { text: 'أستغفر الله', count: 3, reward: 300 },
      { text: 'اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام', count: 1, reward: 100 },
      { text: 'سبحان الله', count: 33, reward: 3300 },
      { text: 'الحمد لله', count: 33, reward: 3300 },
      { text: 'الله أكبر', count: 33, reward: 3300 },
      { text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', count: 1, reward: 100 }
    ]
  },
  sleep: {
    title: 'أذكار النوم',
    icon: '😴',
    time: 'قبل النوم',
    items: [
      { text: 'باسمك اللهم أموت وأحيا', count: 1, reward: 100 },
      { text: 'سبحان الله', count: 33, reward: 3300 },
      { text: 'الحمد لله', count: 33, reward: 3300 },
      { text: 'الله أكبر', count: 34, reward: 3400 },
      { text: 'آية الكرسي', count: 1, reward: 1000 },
      { text: 'قل هو الله أحد (الإخلاص)', count: 3, reward: 300 },
      { text: 'قل أعوذ برب الفلق', count: 3, reward: 300 },
      { text: 'قل أعوذ برب الناس', count: 3, reward: 300 }
    ]
  },
  wake: {
    title: 'أذكار الاستيقاظ',
    icon: '⏰',
    time: 'عند الاستيقاظ من النوم',
    items: [
      { text: 'الحمد لله الذي أحيانا بعد ما أماتنا وإ إليه النشور', count: 1, reward: 100 }
    ]
  },
  quran: {
    title: 'أذكار تلاوة القرآن',
    icon: '📖',
    time: 'عند تلاوة القرآن',
    items: [
      { text: 'بسم الله الرحمن الرحيم', count: 1, reward: 10 },
      { text: 'اللهم ارحمني بالقرآن واجعله لي إماما ونورا وهدى ورحمة', count: 1, reward: 100 },
      { text: 'اللهم ارزقني تلاوته آناء الليل وآناء النهار', count: 1, reward: 100 }
    ]
  },
  distress: {
    title: 'أذكار الكرب',
    icon: '🆘',
    time: 'عند التكرب أو الخوف',
    items: [
      { text: 'لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم، لا إله إلا الله رب السماوات ورب الأرض ورب العرش العظيم', count: 1, reward: 100 },
      { text: 'اللهم رحمتك أرجو فلا تكلني إلى نفسي طرفة عين وأصلح لي شأني كله، لا إله إلا أنت', count: 3, reward: 300 },
      { text: 'حسبي الله ونعم الوكيل', count: 7, reward: 700 }
    ]
  },
  travel: {
    title: 'أذكار السفر',
    icon: '✈️',
    time: 'عند السفر',
    items: [
      { text: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون', count: 1, reward: 100 },
      { text: 'اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى', count: 1, reward: 100 }
    ]
  },
  entering: {
    title: 'أذكار الدخول',
    icon: '🏠',
    time: 'عند دخول المنزل',
    items: [
      { text: 'بسم الله ولجنا، بسم الله خرجنا، على الله ربنا توكلنا', count: 1, reward: 100 }
    ]
  },
  leaving: {
    title: 'أذكار الخروج',
    icon: '🚪',
    time: 'عند الخروج من المنزل',
    items: [
      { text: 'بسم الله توكلت على الله ولا حول ولا قوة إلا بالله', count: 1, reward: 100 }
    ]
  },
  eating: {
    title: 'أذكار الطعام',
    icon: '🍽️',
    time: 'قبل وبعد الطعام',
    items: [
      { text: 'بسم الله (قبل الأكل)', count: 1, reward: 10 },
      { text: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة', count: 1, reward: 100 }
    ]
  },
  mosque: {
    title: 'أذكار المسجد',
    icon: '🕌',
    time: 'عند دخول المسجد',
    items: [
      { text: 'اللهم افتح لي أبواب رحمتك', count: 1, reward: 100 },
      { text: 'أعوذ بالله العظيم وبوجهه الكريم وسلطانه القديم من الشيطان الرجيم', count: 1, reward: 100 }
    ]
  }
};

// ==================== SEASONAL WORSHIP ====================
const SEASONAL_WORSHIP = {
  ramadan: {
    title: 'عبادات رمضان',
    icon: '🌙',
    months: [9], // Ramadan is 9th month
    items: [
      { title: 'قراءة القرآن كاملاً', description: 'ختم القرآن مرة على الأقل', icon: '📖', reward: 500 },
      { title: 'صلاة التراويح', description: 'صلاة 20 ركعة كل ليلة', icon: '🕌', reward: 30 },
      { title: 'الإفطار على الصائمين', description: 'إطعام صائم', icon: '🍽️', reward: 100 },
      { title: 'الاعتكاف', description: 'البقاء في المسجد آخر 10 أيام', icon: '🕋', reward: 300 },
      { title: 'ليلة القدر', description: 'البحث عن ليلة القدر في العشر الأواخر', icon: '⭐', reward: 1000 },
      { title: 'الصدقة اليومية', description: 'إطعام مسكين كل يوم', icon: '💰', reward: 50 }
    ]
  },
  dhulHijjah: {
    title: 'عبادات ذي الحجة',
    icon: '🕋',
    months: [12],
    items: [
      { title: 'صيام 9 ذي الحجة', description: 'صيام يوم عرفة وعشرة أيام', icon: '📅', reward: 200 },
      { title: 'ذبح الأضحية', description: 'ذبح أضحية عيد الأضحى', icon: '🐑', reward: 150 },
      { title: 'تكبير الله', description: 'تكبير من يوم عرفة إلى يوم النحر', icon: '📢', reward: 100 },
      { title: 'دعاء عرفة', description: 'الدعاء في يوم عرفة', icon: '🤲', reward: 300 }
    ]
  },
  muharram: {
    title: 'عبادات محرم',
    icon: '📅',
    months: [1],
    items: [
      { title: 'صيام يوم عاشوراء', description: 'صيام التاسع والعاشر من محرم', icon: '🌙', reward: 100 },
      { title: 'صيام يوم عرفة', description: 'صيام يوم عرفة يكفر ذنوب سنتين', icon: '📅', reward: 200 }
    ]
  },
  shawwal: {
    title: 'عبادات شوال',
    icon: '🌙',
    months: [10],
    items: [
      { title: 'صيام الستة أيام', description: 'صيام 6 أيام من شوال', icon: '📅', reward: 150 }
    ]
  }
};

// ==================== QURAN SECTIONS ====================
const QURAN_PARTS = [
  { id: 1, name: 'الجزء الأول', pages: '1-20', surahs: 'الفاتحة - البقرة' },
  { id: 2, name: 'الجزء الثاني', pages: '21-41', surahs: 'البقرة' },
  { id: 3, name: 'الجزء الثالث', pages: '42-62', surahs: 'البقرة' },
  { id: 4, name: 'الجزء الرابع', pages: '63-82', surahs: 'البقرة - آل عمران' },
  { id: 5, name: 'الجزء الخامس', pages: '83-102', surahs: 'آل عمران' },
  { id: 6, name: 'الجزء السادس', pages: '103-122', surahs: 'آل عمران - النساء' },
  { id: 7, name: 'الجزء السابع', pages: '123-142', surahs: 'النساء' },
  { id: 8, name: 'الجزء الثامن', pages: '143-162', surahs: 'النساء - المائدة' },
  { id: 9, name: 'الجزء التاسع', pages: '163-182', surahs: 'المائدة' },
  { id: 10, name: 'الجزء العاشر', pages: '183-202', surahs: 'المائدة - الأنعام' },
  { id: 11, name: 'الجزء الحادي عشر', pages: '203-222', surahs: 'الأعراف' },
  { id: 12, name: 'الجزء الثاني عشر', pages: '223-242', surahs: 'الأعراف - الأنفال' },
  { id: 13, name: 'الجزء الثالث عشر', pages: '243-262', surahs: 'التوبة' },
  { id: 14, name: 'الجزء الرابع عشر', pages: '263-282', surahs: 'التوبة - يونس' },
  { id: 15, name: 'الجزء الخامس عشر', pages: '283-302', surahs: 'هود' },
  { id: 16, name: 'الجزء السادس عشر', pages: '303-322', surahs: 'يوسف - إبراهيم' },
  { id: 17, name: 'الجزء السابع عشر', pages: '323-342', surahs: 'النحل - الإسراء' },
  { id: 18, name: 'الجزء الثامن عشر', pages: '343-362', surahs: 'الكهف - مريم' },
  { id: 19, name: 'الجزء التاسع عشر', pages: '363-382', surahs: 'مريم - طه' },
  { id: 20, name: 'الجزء العشرون', pages: '383-402', surahs: 'طه - الأنبياء' },
  { id: 21, name: 'الجزء الحادي والعشرون', pages: '403-422', surahs: 'الحج - المؤمنون' },
  { id: 22, name: 'الجزء الثاني والعشرون', pages: '423-442', surahs: 'النور - الفرقان' },
  { id: 23, name: 'الجزء الثالث والعشرون', pages: '443-462', surahs: 'الشعراء - النمل' },
  { id: 24, name: 'الجزء الرابع والعشرون', pages: '463-482', surahs: 'القصص - العنكبوت' },
  { id: 25, name: 'الجزء الخامس والعشرون', pages: '483-502', surahs: 'الروم - لقمان' },
  { id: 26, name: 'الجزء السادس والعشرون', pages: '503-522', surahs: 'سجدة - الأحزاب' },
  { id: 27, name: 'الجزء السابع والعشرون', pages: '523-542', surahs: 'سبأ - فاطر' },
  { id: 28, name: 'الجزء الثامن والعشرون', pages: '543-562', surahs: 'يس - الصافات' },
  { id: 29, name: 'الجزء التاسع والعشرون', pages: '563-582', surahs: 'ص - الزمر' },
  { id: 30, name: 'الجزء الثلاثون', pages: '583-604', surahs: 'غافر - الناس' }
];

// ==================== DHUHR/ASR DIFFERENCES ====================
// Some scholars say delay Asr slightly after its time begins
// Some say to pray Sunnah Rawatib before/after

// Daily Worship Checklist
const DAILY_WORSHIP = {
  faraid: {
    title: 'الفرائض',
    icon: '🕌',
    items: [
      { name: 'صلاة الفجر', prayer: 'fajr', sunnahBefore: 2, sunnahAfter: 0, fard: 2 },
      { name: 'صلاة الظهر', prayer: 'dhuhr', sunnahBefore: 4, sunnahAfter: 2, fard: 4 },
      { name: 'صلاة العصر', prayer: 'asr', sunnahBefore: 0, sunnahAfter: 0, fard: 4 },
      { name: 'صلاة المغرب', prayer: 'maghrib', sunnahBefore: 0, sunnahAfter: 3, fard: 3 },
      { name: 'صلاة العشاء', prayer: 'isha', sunnahBefore: 0, sunnahAfter: 2, fard: 4 }
    ]
  },
  nawafil: {
    title: 'النوافل',
    icon: '⭐',
    items: [
      { name: 'صلاة الضحى', time: 'بعد شروق الشمس', rakat: 2, reward: 100 },
      { name: 'صلاة الوتر', time: 'قبل الفجر', rakat: 3, reward: 200 },
      { name: 'قيام الليل', time: 'الثلث الأخير من الليل', rakat: '2+', reward: 500 },
      { name: 'صلاة التوبة', time: 'أي وقت', rakat: 2, reward: 100 }
    ]
  }
};

// Export all data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRAYER_NAMES, ADHKAR, SEASONAL_WORSHIP, QURAN_PARTS, DAILY_WORSHIP };
}
