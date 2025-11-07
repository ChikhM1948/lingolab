// app/components/TestimonialsSection.jsx
'use client';
import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('TestimonialsSection');
  
  const testimonials = [
    { name: t('t1_name'), company: t('t1_company'), text: t('t1_text') },
    { name: t('t2_name'), company: t('t2_company'), text: t('t2_text') },
    { name: t('t3_name'), company: t('t3_company'), text: t('t3_text') }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}