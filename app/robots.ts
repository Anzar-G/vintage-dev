import { MetadataRoute } from 'next';

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) return url;
  return 'https://example.com';
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
