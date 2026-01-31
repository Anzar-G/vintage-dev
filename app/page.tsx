import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { BackToTop } from '@/components/ui/BackToTop';
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd />
      <Header />
      <div className="flex flex-1 flex-col items-center">
        <div className="w-full max-w-7xl px-4 md:px-8">
          <Hero />
          <Services />
          <Portfolio />
          <Pricing />
          <Testimonials />
          <Contact />
          <Faq />
        </div>
      </div>
      <Footer />
      <BackToTop />
    </main>
  );
}
