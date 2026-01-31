// Portfolio (Supabase portfolio_projects)
export interface PortfolioProject {
  id: string;
  created_at?: string;
  title: string;
  slug: string;
  description: string;
  full_description?: string;
  category: string[]; // ['web-app', 'ecommerce', 'landing-page', 'mobile-app', etc]
  tech_stack: string[];
  images: string[];
  thumbnail: string;
  live_url?: string;
  github_url?: string;
  client_name?: string;
  testimonial?: string;
  challenge_solution?: string;
  featured?: boolean;
  order?: number;
  status?: 'draft' | 'published';
}

// For static/JSON fallback
export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  full_description?: string;
  image?: string;
  images?: string[];
  thumbnail?: string;
  tech: string[];
  tech_stack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  category_list?: string[];
  client_name?: string;
  testimonial?: string;
  challenge_solution?: string;
  featured?: boolean;
  order?: number;
}

// Pricing
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingUnit: string;
  description: string;
  features: { text: string; tooltip?: string }[];
  highlight?: boolean;
  badge?: 'popular' | 'best-value' | null;
  delivery_days?: number;
  revisions?: string;
}

// Testimonials (Supabase testimonials)
export interface Testimonial {
  id: string;
  created_at?: string;
  client_name: string;
  company?: string;
  project_type?: string;
  rating: number;
  testimonial: string;
  avatar_url?: string;
  project_thumbnail?: string;
  order?: number;
  is_featured?: boolean;
  status?: string;
  // legacy
  role?: string;
  quote?: string;
  avatar?: string;
}

// Inquiry (Supabase inquiries)
export type InquiryPackage = 'bronze' | 'silver' | 'gold' | 'custom';
export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';

export interface InquiryInsert {
  inquiry_number: string;
  name: string;
  email: string;
  whatsapp: string;
  package: InquiryPackage;
  budget_range?: string;
  description: string;
  deadline?: string;
  attachment_url?: string;
  status?: InquiryStatus;
  ip_address?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'terminal' | 'database' | 'design';
}

export interface ContactFormValues {
  name: string;
  email: string;
  whatsapp: string;
  package: InquiryPackage;
  budget_range?: string;
  description: string;
  deadline?: string;
  attachment?: FileList;
  privacy_agreed: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
