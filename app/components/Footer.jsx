// app/components/Footer.jsx
// ============================================
'use client';
import { Linkedin, Facebook, Send, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation'; // ✅ Fixed import

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              DevLab
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase mb-4">
              {t('navTitle')}
            </h4>
            <ul className="space-y-3">
              {/* These are anchor links, so they don't need next-intl's Link */}
              <li><a href="/#accueil" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('navHome')}</a></li>
              <li><a href="/#services" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('navServices')}</a></li>
              <li><a href="/#apropos" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('navAbout')}</a></li>
            </ul>
          </div>

          {/* Contact/Action Links */}
          <div>
            <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase mb-4">
              {t('startTitle')}
            </h4>
            <ul className="space-y-3">
              {/* This is an anchor link */}
              <li><a href="/#contact" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('startContact')}</a></li>
              {/* These are page links, so they use next-intl's Link */}
              <li><Link href="/formation" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('startTraining')}</Link></li>
              <li><Link href="/bundle" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('startBundles')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('copyright', { year: year })}
            </p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/ChikhM1948" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              <Send className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}