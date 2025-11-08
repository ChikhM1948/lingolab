// app/[locale]/bundle/page.js
'use client';

import { useState } from 'react';
import { Check, X, Gift, Zap, Shield, Clock, Code, Smartphone, TrendingUp, Users, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/app/components/ThemeProvider';
import { Link } from 'next-intl'; // Use next-intl Link
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';


export default function BundlePage() {
  const { darkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const t = useTranslations('BundlePage');

  const plans = [
    {
      id: 'starter',
      name: t('starter.name'),
      price: t('starter.price'),
      currency: t('currency'),
      period: '',
      description: t('starter.description'),
      color: 'from-orange-400 to-yellow-500',
      features: [
        { included: true, text: t('starter.features.0') },
        { included: true, text: t('starter.features.1') },
        { included: true, text: t('starter.features.2') },
        { included: true, text: t('starter.features.3') },
        { included: true, text: t('starter.features.4') },
        { included: true, text: t('starter.features.5') },
        { included: false, text: t('starter.features.6') },
        { included: false, text: t('starter.features.7') },
        { included: false, text: t('starter.features.8') },
      ],
      popular: false
    },
    {
      id: 'premium',
      name: t('premium.name'),
      price: t('premium.price'),
      currency: t('currency'),
      period: '',
      description: t('premium.description'),
      color: 'from-orange-500 to-red-600',
      features: [
        { included: true, text: t('premium.features.0') },
        { included: true, text: t('premium.features.1') },
        { included: true, text: t('premium.features.2') },
        { included: true, text: t('premium.features.3') },
        { included: true, text: t('premium.features.4') },
        { included: true, text: t('premium.features.5') },
        { included: true, text: t('premium.features.6') },
        { included: true, text: t('premium.features.7') },
        { included: true, text: t('premium.features.8') },
      ],
      popular: true,
      savings: t('premium.savings')
    },
    {
      id: 'enterprise',
      name: t('enterprise.name'),
      price: t('customPrice'),
      currency: '',
      period: '',
      description: t('enterprise.description'),
      color: 'from-red-600 to-red-800',
      features: [
        { included: true, text: t('enterprise.features.0') },
        { included: true, text: t('enterprise.features.1') },
        { included: true, text: t('enterprise.features.2') },
        { included: true, text: t('enterprise.features.3') },
        { included: true, text: t('enterprise.features.4') },
        { included: true, text: t('enterprise.features.5') },
        { included: true, text: t('enterprise.features.6') },
        { included: true, text: t('enterprise.features.7') },
        { included: true, text: t('enterprise.features.8') },
      ],
      popular: false
    }
  ];

  const bonusFeatures = [
    { icon: Zap, title: t('bonusTitle'), description: t('bonusDesc') },
    { icon: Shield, title: t('bonus2Title'), description: t('bonus2Desc') },
    { icon: Clock, title: t('bonus3Title'), description: t('bonus3Desc') },
    { icon: Sparkles, title: t('bonus4Title'), description: t('bonus4Desc') }
  ];

  const whatIncluded = [
    {
      category: t('catDev'),
      icon: Code,
      items: t.raw('catDevItems')
    },
    {
      category: t('catDesign'),
      icon: Smartphone,
      items: t.raw('catDesignItems')
    },
    {
      category: t('catMarketing'),
      icon: TrendingUp,
      items: t.raw('catMarketingItems')
    },
    {
      category: t('catTraining'),
      icon: BookOpen,
      items: t.raw('catTrainingItems')
    }
  ];

  const faqs = t.raw('faqs');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToHome')}</span>
          </Link>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Gift className="w-6 h-6" />
              <span className="font-bold text-lg">{t('promoBanner')}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            
            <p className="text-xl sm:text-2xl opacity-95 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('pageTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('pageSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all transform hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-orange-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 text-sm font-bold rounded-bl-2xl">
                    {t('popular')}
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Gift className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    {plan.price !== t('customPrice') ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="text-lg text-gray-600 dark:text-gray-400">
                            {plan.currency}/{plan.period}
                          </span>
                        </div>
                        {plan.savings && (
                          <div className="inline-block mt-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                            {t('save')} {plan.savings}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Using next-intl Link for /devis */}
                  {plan.price === t('customPrice') ? (
                    <Link
                      href="/devis"
                      className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t('quoteButton')}
                    </Link>
                  ) : (
                    // External link remains an <a> tag
                    <a
                      href="https://wa.me/213698784457"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t('chooseButton')}
                    </a>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('includedTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('includedSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whatIncluded.map((section, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bonus Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonusFeatures.map((bonus, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <bonus.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {bonus.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('faqTitle')}
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Note: This is an anchor link to an ID on the homepage, 
                so it needs to be formatted with the locale prefix. 
                Since this is a client component, we can just use '/' 
                and next-intl Link will handle the locale.
            */}
            <Link href="/#contact" className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              {t('ctaButton1')}
            </Link>
            <Link href="/#services" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all">
              {t('ctaButton2')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}