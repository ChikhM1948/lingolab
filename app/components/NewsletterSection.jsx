// app/components/NewsletterSection.jsx
'use client';
import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NewsletterSection() {
  const t = useTranslations('NewsletterSection');
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

  return (
    <section 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white overflow-hidden"
    >
      {/* Decorative blurs - same as BundleSection */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 dark:bg-orange-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-300 dark:bg-red-900 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
            <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">{('tag')}</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-lg"
                disabled={isSubmitting}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-lg shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
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
            <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 shadow-lg border-2 ${
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

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8 max-w-2xl mx-auto">
          {t('privacy')}
        </p>
      </div>
    </section>
  );
}