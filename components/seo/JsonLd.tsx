import { pricingPlans } from '@/data/pricing';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faq';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'DevPortfolio',
    jobTitle: 'Web Developer',
    description: 'Freelance web developer specializing in Next.js, TypeScript, and modern web applications.',
    url: SITE_URL,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Jasa Web Development',
    description: 'Pembuatan website profesional: landing page, web app, e-commerce. Next.js, TypeScript, performa tinggi.',
    provider: { '@type': 'Person', name: 'DevPortfolio' },
    areaServed: 'ID',
  };

  const offerSchemas = pricingPlans.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `Paket ${plan.name}`,
    description: plan.description,
    price: plan.price,
    priceCurrency: 'IDR',
  }));

  const reviewSchemas = testimonials
    .filter((t) => (t.rating ?? 0) >= 1)
    .map((t) => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      author: { '@type': 'Person', name: t.client_name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating ?? 5,
        bestRating: 5,
      },
      reviewBody: t.testimonial || (t as { quote?: string }).quote,
    }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const allSchemas = [
    personSchema,
    serviceSchema,
    ...offerSchemas,
    ...reviewSchemas,
    faqSchema,
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
    />
  );
}
