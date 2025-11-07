// app/[locale]/devis/page.js
'use client';

import { useState } from 'react';
import { 
  Calculator, Check, ArrowRight, ArrowLeft, 
  Smartphone, Globe, Palette, TrendingUp, 
  Megaphone, Shield, Zap, Users, Mail, Phone,
  CheckCircle2, Package, Sparkles, Moon, Sun
} from 'lucide-react';
import { Link, usePathname, useRouter } from 'next-intl/navigation'; // <-- CORRECTED IMPORT
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/app/components/ThemeProvider'; // <-- Import useTheme

export default function QuotePage() {
  const t = useTranslations('DevisPage');
  const locale = useLocale();
  const { darkMode, toggleDarkMode } = useTheme(); // <-- Use context for theme
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    budget: '',
    timeline: '',
    message: ''
  });

  // Dynamically generate services from translations
  const services = [
    {
      id: 'web-vitrine',
      category: t('services.web.category'),
      icon: Globe,
      name: t('services.web.vitrine.name'),
      description: t('services.web.vitrine.description'),
      price: 35000,
      features: t.raw('services.web.vitrine.features') // .raw() gets the array
    },
    {
      id: 'web-ecommerce',
      category: t('services.web.category'),
      icon: Globe,
      name: t('services.web.ecommerce.name'),
      description: t('services.web.ecommerce.description'),
      price: 65000,
      features: t.raw('services.web.ecommerce.features')
    },
    {
      id: 'web-custom',
      category: t('services.web.category'),
      icon: Globe,
      name: t('services.web.custom.name'),
      description: t('services.web.custom.description'),
      price: 100000,
      features: t.raw('services.web.custom.features')
    },
    {
      id: 'mobile-ios-android',
      category: t('services.mobile.category'),
      icon: Smartphone,
      name: t('services.mobile.iosAndroid.name'),
      description: t('services.mobile.iosAndroid.description'),
      price: 65000,
      features: t.raw('services.mobile.iosAndroid.features')
    },
    {
      id: 'mobile-cross-platform',
      category: t('services.mobile.category'),
      icon: Smartphone,
      name: t('services.mobile.crossPlatform.name'),
      description: t('services.mobile.crossPlatform.description'),
      price: 85000,
      features: t.raw('services.mobile.crossPlatform.features')
    },
    {
      id: 'design-branding',
      category: t('services.design.category'),
      icon: Palette,
      name: t('services.design.branding.name'),
      description: t('services.design.branding.description'),
      price: 35000,
      features: t.raw('services.design.branding.features')
    },
    {
      id: 'design-ui-ux',
      category: t('services.design.category'),
      icon: Palette,
      name: t('services.design.uiux.name'),
      description: t('services.design.uiux.description'),
      price: 40000,
      features: t.raw('services.design.uiux.features')
    },
    {
      id: 'marketing-seo',
      category: t('services.marketing.category'),
      icon: TrendingUp,
      name: t('services.marketing.seo.name'),
      description: t('services.marketing.seo.description'),
      price: 45000,
      features: t.raw('services.marketing.seo.features')
    },
    {
      id: 'marketing-social',
      category: t('services.marketing.category'),
      icon: Megaphone,
      name: t('services.marketing.social.name'),
      description: t('services.marketing.social.description'),
      price: 20000,
      features: t.raw('services.marketing.social.features')
    },
    {
      id: 'marketing-ads',
      category: t('services.marketing.category'),
      icon: Megaphone,
      name: t('services.marketing.ads.name'),
      description: t('services.marketing.ads.description'),
      price: 45000,
      features: t.raw('services.marketing.ads.features')
    },
    {
      id: 'scaling-maintenance',
      category: t('services.scaling.category'),
      icon: Shield,
      name: t('services.scaling.maintenance.name'),
      description: t('services.scaling.maintenance.description'),
      price: 25000,
      features: t.raw('services.scaling.maintenance.features')
    },
    {
      id: 'scaling-performance',
      category: t('services.scaling.category'),
      icon: Zap,
      name: t('services.scaling.performance.name'),
      description: t('services.scaling.performance.description'),
      price: 75000,
      features: t.raw('services.scaling.performance.features')
    }
  ];

  const budgetRanges = [
    { value: '50-100k', label: t('budgets.range1') },
    { value: '100-250k', label: t('budgets.range2') },
    { value: '250-500k', label: t('budgets.range3') },
    { value: '500k+', label: t('budgets.range4') }
  ];

  const timelines = [
    { value: '1-2weeks', label: t('timelines.range1') },
    { value: '1month', label: t('timelines.range2') },
    { value: '2-3months', label: t('timelines.range3') },
    { value: 'flexible', label: t('timelines.range4') }
  ];

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const calculateTotal = () => {
    return formData.services.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert(t('errorRequired'));
      return;
    }

    try {
      const selectedServicesData = services.filter(s => 
        formData.services.includes(s.id)
      ).map(s => ({ // Send translated names/descriptions for the email
        name: s.name,
        description: s.description,
        price: s.price
      }));

      const budgetLabel = budgetRanges.find(b => b.value === formData.budget)?.label || t('budgets.notSpecified');
      const timelineLabel = timelines.find(t => t.value === formData.timeline)?.label || t('timelines.notSpecified');

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        services: selectedServicesData,
        budget: budgetLabel,
        timeline: timelineLabel,
        message: formData.message,
        totalPrice: calculateTotal(),
        locale: locale // Pass the current locale to the API
      };

      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStep(4);
      } else {
        alert(t('errorApi'));
        console.error('Erreur API:', result.error);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert(t('errorNetwork'));
    }
  };

  const selectedServices = services.filter(s => formData.services.includes(s.id));
  const totalPrice = calculateTotal();
  const categories = [...new Set(services.map(s => s.category))];

  // Removed redundant useEffects for dark mode.
  // ThemeProvider in app/layout.js handles this.

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 text-white py-16 px-4 relative">
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>
        
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToHome')}</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-10 h-10" />
            <h1 className="text-4xl font-bold">{t('mainTitle')}</h1>
          </div>
          <p className="text-xl opacity-90">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: t('steps.1') },
              { num: 2, label: t('steps.2') },
              { num: 3, label: t('steps.3') },
              { num: 4, label: t('steps.4') }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.num 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    step >= s.num ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`h-1 flex-1 mx-2 transition-colors ${
                    step > s.num ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
              {t('step1Title')}
            </h2>
            
            {categories.map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3 transition-colors">
                  <Package className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                  {category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.filter(s => s.category === category).map(service => {
                    const Icon = service.icon;
                    const isSelected = formData.services.includes(service.id);
                    
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all transform hover:scale-105 border border-transparent ${
                          isSelected 
                            ? 'ring-4 ring-orange-500 shadow-xl' 
                            : 'shadow-lg hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full p-1">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 transition-colors">
                          <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 transition-colors">
                          {service.name}
                        </h4>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 transition-colors">
                          {service.description}
                        </p>
                        
                        <div className="border-t dark:border-gray-700 pt-4 mb-4 transition-colors">
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors">
                                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 transition-colors">
                          {service.price.toLocaleString()} DZD
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={formData.services.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold flex items-center gap-2 hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('continue')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
              {t('step2Title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-colors">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  {t('budgetLabel')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {budgetRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setFormData(prev => ({ ...prev, budget: range.value }))}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        formData.budget === range.value
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 dark:text-gray-300'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  {t('timelineLabel')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {timelines.map(time => (
                    <button
                      key={time.value}
                      onClick={() => setFormData(prev => ({ ...prev, timeline: time.value }))}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        formData.timeline === time.value
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 dark:text-gray-300'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  {t('messageLabel')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder={t('messagePlaceholder')}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {t('back')}
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold flex items-center gap-2 hover:from-orange-600 hover:to-red-700 transition-all"
              >
                {t('continue')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
              {t('step3Title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-colors">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder={t('namePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    {t('companyLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder={t('companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    {t('emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder={t('emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    {t('phoneLabel')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder={t('phonePlaceholder')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('back')}
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold flex items-center gap-2 hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  {t('submitButton')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center mb-8 transition-colors">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                {t('step4Title')}
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 transition-colors">
                {t('step4Subtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                <Sparkles className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                {t('summaryTitle')}
              </h3>

              <div className="space-y-6 mb-8">
                <div className="border-b dark:border-gray-700 pb-4 transition-colors">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 transition-colors">{t('summaryServices')}</h4>
                  {selectedServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center py-2">
                      <span className="text-gray-700 dark:text-gray-300 transition-colors">{service.name}</span>
                      <span className="font-bold text-gray-900 dark:text-white transition-colors">
                        {service.price.toLocaleString()} DZD
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-2xl font-bold">
                    <span className="text-gray-900 dark:text-white transition-colors">{t('summaryTotal')}</span>
                    <span className="text-orange-600 dark:text-orange-400 transition-colors">
                      {totalPrice.toLocaleString()} DZD
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 transition-colors">
                    {t('summaryDisclaimer')}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 transition-colors">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">{t('summaryBudget')}</p>
                    <p className="font-bold text-gray-900 dark:text-white transition-colors">
                      {budgetRanges.find(b => b.value === formData.budget)?.label || t('budgets.notSpecified')}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 transition-colors">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">{t('summaryTimeline')}</p>
                    <p className="font-bold text-gray-900 dark:text-white transition-colors">
                      {timelines.find(t => t.value === formData.timeline)?.label || t('timelines.notSpecified')}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    services: [],
                    budget: '',
                    timeline: '',
                    message: ''
                  });
                }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all"
              >
                {t('newRequestButton')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Price Summary */}
      {step < 4 && formData.services.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl border-t-4 border-orange-500 p-4 z-50 transition-colors">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                {t('floatingSummary', { count: formData.services.length })}
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 transition-colors">
                {t('floatingTotal', { total: totalPrice.toLocaleString() })}
              </p>
            </div>
            <button
              onClick={() => {
                if (step === 1) setStep(2);
                else if (step === 2) setStep(3);
                else if (step === 3) handleSubmit();
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all"
            >
              {step === 1 ? t('floatingContinue') : step === 2 ? t('floatingFinalize') : t('floatingSubmit')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}