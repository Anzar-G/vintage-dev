import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'founder-saas',
    client_name: 'Alex Johnson',
    company: 'Insight Analytics',
    project_type: 'SaaS Dashboard',
    rating: 5,
    testimonial:
      'Working together was seamless. From architecture to UI polish, everything shipped on time and exceeded expectations. Highly recommend for complex web projects.',
    quote:
      'Working together was seamless. From architecture to UI polish, everything shipped on time and exceeded expectations.',
    avatar_url: '/images/avatars/alex.jpg',
    order: 1,
    is_featured: true,
  },
  {
    id: 'marketing-lead',
    client_name: 'Sarah Lee',
    company: 'EcoShop',
    project_type: 'E-commerce',
    rating: 5,
    testimonial:
      'Our new landing page doubled conversions and loads blazingly fast. Communication was clear throughout the project. Will definitely work together again.',
    quote:
      'Our new landing page doubled conversions and loads blazingly fast. Communication was clear throughout the project.',
    avatar_url: '/images/avatars/sarah.jpg',
    order: 2,
    is_featured: true,
  },
  {
    id: 'ceo-fintrack',
    client_name: 'Budi Santoso',
    company: 'FinTrack',
    project_type: 'Mobile App',
    rating: 5,
    testimonial:
      'Aplikasi yang dikembangkan sangat stabil dan user-friendly. Tim sangat profesional dan selalu on-time. Hasil akhir melebihi ekspektasi kami.',
    quote:
      'Aplikasi yang dikembangkan sangat stabil dan user-friendly. Tim sangat profesional dan selalu on-time.',
    order: 3,
    is_featured: true,
  },
];
