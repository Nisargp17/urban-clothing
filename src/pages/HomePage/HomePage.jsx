import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../../components/SEO';
import { useGsapContext } from '../../hooks/useGsapContext';
import { HeroSection } from './HeroSection';
import { PressStrip } from './PressStrip';
import { FeaturedCategories } from './FeaturedCategories';
import { MarqueeBanner } from './MarqueeBanner';
import { AboutSection } from './AboutSection';
import { FeaturedProducts } from './FeaturedProducts';
import { Testimonials } from './Testimonials';
import { NewsletterSignup } from './NewsletterSignup';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const pageRef = useGsapContext((scope) => {
    const sections = scope.querySelectorAll('.home-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Premium urban trekking footwear. Shop the Spring/Summer 2025 collection."
        pathname="/"
      />
    <div ref={pageRef}>
      <HeroSection />
      <div className="home-section">
        <PressStrip />
      </div>
      <div id="categories" className="home-section">
        <FeaturedCategories />
      </div>
      <div className="home-section">
        <MarqueeBanner />
      </div>
      <div className="home-section">
        <AboutSection />
      </div>
      <div id="products" className="home-section">
        <FeaturedProducts />
      </div>
      <div className="home-section">
        <Testimonials />
      </div>
      <div className="home-section">
        <NewsletterSignup />
      </div>
      <Footer />
    </div>
    </>
  );
}

export default HomePage;
