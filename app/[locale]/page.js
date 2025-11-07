// app/[locale]/page.js
'use client';

import { useState } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';
import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import ServicesSection from '@/app/components/ServicesSection';
import BundleSection from '@/app/components/BundleSection';
import AboutSection from '@/app/components/AboutSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/app/components/Footer';

// No need for PageContent, just export default the function
export default function Page() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for sticky header
      const headerOffset = 80; // Adjust this value based on your navbar's height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <ServicesSection />
      
      <BundleSection scrollToSection={scrollToSection} />
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
}