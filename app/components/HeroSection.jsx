// app/components/HeroSection.jsx
'use client'; 

import { GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Import hook
import { Link } from 'next-intl'; // Import Link

export default function HeroSection({ scrollToSection }) {
  const t = useTranslations('HeroSection'); // Use the "HeroSection" section of your JSON

  return (
    <section id="accueil" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Text Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Use next-intl Link */}
              <Link 
                href="/formation" 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 animate-pulse-slow"
              >
                <GraduationCap className="w-5 h-5" />
                {t('trainingButton')}
              </Link>
              
              {/* Use next-intl Link */}
              <Link 
                href="/devis"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-400 transition-all"
              >
                {t('quoteButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}