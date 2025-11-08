// app/components/LocaleSwitcher.jsx (REPLACE WITH THIS)
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/routing'; // ✅ FIXED: Use relative path
import { Globe, Check } from 'lucide-react';

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  // Locales you support
  const locales = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  // Handle language change
  const onSelectLocale = (newLocale) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <ul className="py-1">
            {locales.map((loc) => (
              <li key={loc.code}>
                <button
                  onClick={() => onSelectLocale(loc.code)}
                  disabled={isPending}
                  className={`flex justify-between items-center w-full px-4 py-2 text-sm ${
                    locale === loc.code
                      ? 'font-bold text-orange-600 dark:text-orange-400'
                      : 'text-gray-700 dark:text-gray-300'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50`}
                >
                  <span className="flex-1 text-left" dir="ltr">{loc.name}</span>
                  {locale === loc.code && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}