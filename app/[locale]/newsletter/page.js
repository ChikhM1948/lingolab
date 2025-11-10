// app/[locale]/newsletter/page.js
'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowLeft, Gift, Zap, TrendingUp, Bell, Star, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';
import { useTheme } from '@/app/components/ThemeProvider';

export default function NewsletterPage() {
  const t = useTranslations('NewsletterPage');
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: t('errorInvalid') });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ 
          type: 'success', 
          message: t('statusSuccess')
        });
        setEmail('');
      } else {
        throw new Error(data.message || t('statusError'));
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: t('statusError')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: t('benefit1Title'),
      description: t('benefit1Desc')
    },
    {
      icon: Zap,
      title: t('benefit2Title'),
      description: t('benefit2Desc')
    },
    {
      icon: TrendingUp,
      title: t('benefit3Title'),
      description: t('benefit3Desc')
    },
    {
      icon: Bell,
      title: t('benefit4Title'),
      description: t('benefit4Desc')
    },
    {
      icon: Star,
      title: t('benefit5Title'),
      description: t('benefit5Desc')
    },
    {
      icon: Users,
      title: t('benefit6Title'),
      description: t('benefit6Desc')
    }
  ];

  const stats = [
    { number: '5000+', label: t('stat1Label') },
    { number: '2x/mois', label: t('stat2Label') },
    { number: '95%', label: t('stat3Label') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">{t('backToHome')}</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 dark:bg-orange-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-300 dark:bg-red-900 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg mb-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto transition-colors duration-300">
            {t('subtitle')}
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('placeholder')}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-lg text-lg"
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-lg shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t('subscribing')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('subscribe')}
                  </>
                )}
              </button>
            </div>

            {status.message && (
              <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 shadow-lg border-2 transition-colors duration-300 ${
                status.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-400 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400 text-red-800 dark:text-red-300'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}
          </form>

          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {t('privacy')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {t('benefitsTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {t('benefitsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 duration-300"
              >
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {t('ctaButton')}
            </button>
            <Link 
              href="/#services" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              {t('ctaButton2')}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div 
                key={idx}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed transition-colors duration-300">
                  "{t(`testimonial${idx}Text`)}"
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 transition-colors duration-300">
                  <p className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {t(`testimonial${idx}Name`)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    {t(`testimonial${idx}Role`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}