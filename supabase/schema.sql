-- Portfolio Landing Page - Supabase Schema
-- Run this in Supabase SQL Editor to create tables and RLS.

-- ============================================
-- Table: inquiries
-- ============================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  package TEXT NOT NULL CHECK (package IN ('bronze', 'silver', 'gold', 'custom')),
  budget_range TEXT,
  description TEXT NOT NULL,
  deadline DATE,
  attachment_url TEXT,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  ip_address INET,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);

-- ============================================
-- Table: portfolio_projects
-- ============================================
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  full_description TEXT,
  category TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  live_url TEXT,
  github_url TEXT,
  client_name TEXT,
  testimonial TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status ON public.portfolio_projects (status);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_order ON public.portfolio_projects ("order");
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON public.portfolio_projects (featured) WHERE featured = true;

-- ============================================
-- Table: testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  client_name TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  avatar_url TEXT,
  project_thumbnail TEXT,
  "order" INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials (status);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON public.testimonials ("order");

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Inquiries: allow anonymous insert (form submit), restrict read/update/delete to service role or admin
CREATE POLICY "Allow anonymous insert inquiries"
  ON public.inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role full access inquiries"
  ON public.inquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Portfolio: public read for published only
CREATE POLICY "Public read published projects"
  ON public.portfolio_projects FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Service role full access portfolio"
  ON public.portfolio_projects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Testimonials: public read for approved only
CREATE POLICY "Public read approved testimonials"
  ON public.testimonials FOR SELECT
  TO anon
  USING (status = 'approved');

CREATE POLICY "Service role full access testimonials"
  ON public.testimonials FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Trigger: updated_at for inquiries
-- ============================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS inquiries_updated_at ON public.inquiries;
CREATE TRIGGER inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
