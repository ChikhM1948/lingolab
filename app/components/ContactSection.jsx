// app/components/ContactSection.jsx
'use client';
import { Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('ContactSection');
  
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          {t('title')}
        </h2>
        <p className="text-xl mb-12 opacity-90">
          {t('subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <a href="mailto:contact@devlab.info" className="flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <Mail className="w-5 h-5" />
            {t('email')}
          </a>
          <a href="https://wa.me/213698784457" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            {t('whatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}