// ==================== SUPABASE SETUP WIZARD ====================//
// This script handles the case where Supabase tables don't exist yet
// It provides a clear UI for the user to set up the database

class SupabaseSetup {
  constructor() {
    this.url = 'https://poannvzbffghwldwvjxk.supabase.co';
    this.key = 'sb_publishable_EehuSICW6DcDhEwl6DvjHA_aSQiQMRi';
    this.tablesExist = false;
  }

  async checkTables() {
    const tables = ['users', 'families', 'family_members', 'messages'];
    const results = {};
    for (const table of tables) {
      try {
        const response = await fetch(this.url + '/rest/v1/' + table + '?limit=1', {
          headers: {
            'apikey': this.key,
            'Authorization': 'Bearer ' + this.key
          }
        });
        results[table] = response.status === 200;
      } catch (e) {
        results[table] = false;
      }
    }
    this.tablesExist = Object.values(results).every(v => v);
    return results;
  }

  getSetupInstructions() {
    return {
      url: 'https://supabase.com/dashboard/project/poannvzbffghwldwvjxk/sql',
      steps: [
        '1. افتح Supabase Dashboard',
        '2. اذهب إلى SQL Editor',
        '3. الصق ملف supabase-schema.sql',
        '4. اضغط Run',
        '5. انتظر حتى تكتمل العملية'
      ],
      tables: ['users', 'families', 'family_members', 'daily_progress', 'prayer_records', 'adhkar_progress', 'quran_progress', 'user_achievements', 'shop_purchases', 'messages', 'family_requests', 'notifications', 'gift_conversions']
    };
  }
}

if (typeof window !== 'undefined') {
  window.SupabaseSetup = SupabaseSetup;
  window.supabaseSetup = new SupabaseSetup();
}
