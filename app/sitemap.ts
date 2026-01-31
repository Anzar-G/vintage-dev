import { MetadataRoute } from 'next';

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) return url;
  return 'https://example.com';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
