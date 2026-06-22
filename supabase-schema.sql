-- ==================== SUPABASE DATABASE SCHEMA ====================
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  password_hash TEXT,
  password_salt TEXT,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'parent', 'admin')),
  avatar TEXT,
  theme TEXT DEFAULT 'default',
  total_xp INTEGER DEFAULT 0,
  total_gems INTEGER DEFAULT 0,
  total_days INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  family_id UUID,
  is_parent BOOLEAN DEFAULT FALSE,
  referral_code TEXT UNIQUE,
  referred_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  is_online BOOLEAN DEFAULT FALSE,
  current_member_id TEXT
);

-- ==================== FAMILIES TABLE ====================
CREATE TABLE IF NOT EXISTS public.families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_name TEXT NOT NULL,
  parent_code TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  total_gems INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== FAMILY MEMBERS TABLE ====================
CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  role TEXT DEFAULT 'child' CHECK (role IN ('parent', 'child', 'guardian')),
  relationship TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_gems INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  total_days INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- ==================== DAILY PROGRESS TABLE ====================
CREATE TABLE IF NOT EXISTS public.daily_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_id UUID,
  date DATE NOT NULL,
  level INTEGER NOT NULL,
  completed_tasks INTEGER DEFAULT 0,
  total_tasks INTEGER NOT NULL,
  completion_percentage INTEGER DEFAULT 0,
  gems_earned INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  prayers_completed JSONB DEFAULT '[]',
  adhkar_completed JSONB DEFAULT '[]',
  quran_pages INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ==================== PRAYER TIMES TABLE ====================
CREATE TABLE IF NOT EXISTS public.prayer_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_id UUID,
  date DATE NOT NULL,
  fajr BOOLEAN DEFAULT FALSE,
  dhuhr BOOLEAN DEFAULT FALSE,
  asr BOOLEAN DEFAULT FALSE,
  maghrib BOOLEAN DEFAULT FALSE,
  isha BOOLEAN DEFAULT FALSE,
  sunnah_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ==================== ADHKAR PROGRESS TABLE ====================
CREATE TABLE IF NOT EXISTS public.adhkar_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_id UUID,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  item_index INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  target_count INTEGER NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  gems_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== QURAN PROGRESS TABLE ====================
CREATE TABLE IF NOT EXISTS public.quran_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_id UUID,
  date DATE NOT NULL,
  part_number INTEGER NOT NULL,
  pages_read INTEGER DEFAULT 0,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date, part_number)
);

-- ==================== ACHIEVEMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  member_id UUID,
  achievement_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ==================== SHOP PURCHASES TABLE ====================
CREATE TABLE IF NOT EXISTS public.shop_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  gems_spent INTEGER DEFAULT 0,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- ==================== MESSAGES TABLE ====================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES public.families(id) ON DELETE CASCADE,
  from_user_id UUID,
  from_member_id UUID,
  from_name TEXT NOT NULL,
  to_user_id UUID,
  to_member_id UUID,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== REQUESTS TABLE ====================
CREATE TABLE IF NOT EXISTS public.family_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES public.families(id) ON DELETE CASCADE,
  from_user_id UUID,
  from_member_id UUID,
  from_name TEXT NOT NULL,
  to_user_id UUID,
  type TEXT NOT NULL,
  amount INTEGER DEFAULT 0,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- ==================== NOTIFICATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== GIFT CONVERSIONS TABLE ====================
CREATE TABLE IF NOT EXISTS public.gift_conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  gems_converted INTEGER NOT NULL,
  mad_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_users_family ON public.users(family_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_online ON public.users(is_online);
CREATE INDEX IF NOT EXISTS idx_daily_progress_user_date ON public.daily_progress(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_records_user_date ON public.prayer_records(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_adhkar_progress_user_date ON public.adhkar_progress(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_messages_family ON public.messages(family_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_to ON public.messages(to_user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_requests_to ON public.family_requests(to_user_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_families_parent_code ON public.families(parent_code);

-- ==================== ROW LEVEL SECURITY ====================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adhkar_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_conversions ENABLE ROW LEVEL SECURITY;

-- ==================== POLICIES ====================
-- Users: can read all, update own
CREATE POLICY "Users readable" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert" ON public.users FOR INSERT WITH CHECK (true);

-- Families: readable by members, managed by parent
CREATE POLICY "Families readable" ON public.families FOR SELECT USING (true);
CREATE POLICY "Families insertable" ON public.families FOR INSERT WITH CHECK (true);
CREATE POLICY "Families updatable by parent" ON public.families FOR UPDATE USING (auth.uid() = parent_id);

-- Family members: readable by family
CREATE POLICY "Family members readable" ON public.family_members FOR SELECT USING (true);
CREATE POLICY "Family members insertable" ON public.family_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Family members updatable" ON public.family_members FOR UPDATE USING (true);

-- Daily progress: own data
CREATE POLICY "Daily progress readable" ON public.daily_progress FOR SELECT USING (true);
CREATE POLICY "Daily progress insertable" ON public.daily_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Daily progress updatable" ON public.daily_progress FOR UPDATE USING (true);

-- Prayer records: own data
CREATE POLICY "Prayer records readable" ON public.prayer_records FOR SELECT USING (true);
CREATE POLICY "Prayer records writable" ON public.prayer_records FOR ALL USING (true);

-- Adhkar progress: own data
CREATE POLICY "Adhkar readable" ON public.adhkar_progress FOR SELECT USING (true);
CREATE POLICY "Adhkar writable" ON public.adhkar_progress FOR ALL USING (true);

-- Quran progress: own data
CREATE POLICY "Quran readable" ON public.quran_progress FOR SELECT USING (true);
CREATE POLICY "Quran writable" ON public.quran_progress FOR ALL USING (true);

-- Achievements: own data
CREATE POLICY "Achievements readable" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "Achievements writable" ON public.user_achievements FOR ALL USING (true);

-- Shop purchases: own data
CREATE POLICY "Shop readable" ON public.shop_purchases FOR SELECT USING (true);
CREATE POLICY "Shop writable" ON public.shop_purchases FOR ALL USING (true);

-- Messages: family members only
CREATE POLICY "Messages readable" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Messages insertable" ON public.messages FOR INSERT WITH CHECK (true);

-- Requests: family members
CREATE POLICY "Requests readable" ON public.family_requests FOR SELECT USING (true);
CREATE POLICY "Requests writable" ON public.family_requests FOR ALL USING (true);

-- Notifications: own
CREATE POLICY "Notifications readable" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Notifications writable" ON public.notifications FOR ALL USING (true);

-- Gift conversions: own
CREATE POLICY "Gifts readable" ON public.gift_conversions FOR SELECT USING (true);
CREATE POLICY "Gifts writable" ON public.gift_conversions FOR ALL USING (true);

-- ==================== FUNCTIONS ====================
-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_families_updated_at ON public.families;
CREATE TRIGGER update_families_updated_at BEFORE UPDATE ON public.families FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_prayer_records_updated_at ON public.prayer_records;
CREATE TRIGGER update_prayer_records_updated_at BEFORE UPDATE ON public.prayer_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_adhkar_progress_updated_at ON public.adhkar_progress;
CREATE TRIGGER update_adhkar_progress_updated_at BEFORE UPDATE ON public.adhkar_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get family stats
CREATE OR REPLACE FUNCTION public.get_family_stats(family_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_members', COUNT(*),
    'online_members', COUNT(*) FILTER (WHERE is_online = true),
    'total_gems', COALESCE(SUM(total_gems), 0),
    'total_xp', COALESCE(SUM(total_xp), 0)
  ) INTO result
  FROM public.family_members
  WHERE family_id = family_uuid;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
