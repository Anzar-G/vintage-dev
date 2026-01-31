import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Dev',
    description:
      'Responsive, pixel-perfect interfaces using React, Next.js, and modern CSS frameworks.',
    icon: 'terminal',
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description:
      'Designing scalable Node.js APIs, authentication, and robust PostgreSQL/NoSQL databases.',
    icon: 'database',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Strategy',
    description:
      'Creating intuitive user journeys and aesthetic designs focused on conversion and usability.',
    icon: 'design',
  },
];
