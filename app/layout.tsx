import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/Toaster';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

// Fonts: use system-ui for build without network; optionally add next/font in layout when online
const fontVariables = '';

/** Pastikan URL valid agar build tidak error "Invalid URL" (mis. env kosong di Vercel). */
function getMetadataBase(): URL {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    try {
      return new URL(url);
    } catch {
      // fallback jika URL tidak valid
    }
  }
  return new URL('https://example.com');
}

export const metadata: Metadata = {
  title: {
    default: 'Portfolio & Jasa Web Development | Landing Page & Aplikasi Web',
    template: '%s | Portfolio Web Dev',
  },
  description:
    'Jasa pembuatan website profesional: landing page, web app, e-commerce. Next.js, TypeScript, performa tinggi. Konsultasi gratis.',
  keywords: ['web development', 'landing page', 'jasa website', 'Next.js', 'portfolio'],
  authors: [{ name: 'DevPortfolio' }],
  openGraph: {
    title: 'Portfolio & Jasa Web Development',
    description: 'Landing page, web app, e-commerce. Next.js, TypeScript, performa tinggi.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'DevPortfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Jasa Web Development',
    description: 'Landing page, web app, e-commerce. Next.js, TypeScript.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: getMetadataBase(),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-[#0f0f14] dark:text-slate-50">
        <ThemeProvider>
          <ScrollProgress />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
