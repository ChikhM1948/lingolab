// lib/i18n.js
import { getRequestConfig } from 'next-intl/server';

export const locales = ['fr', 'en', 'ar'];
export const defaultLocale = 'fr';

export default getRequestConfig(async ({ locale }) => {
  // Provide a fallback if locale is undefined
  const currentLocale = locale || defaultLocale;
  
  console.log('🌍 Current locale:', currentLocale);
  
  // Validate locale
  if (!locales.includes(currentLocale)) {
    console.error('❌ Invalid locale:', currentLocale);
    // Return default locale messages instead of throwing
    const messages = (await import(`../messages/${defaultLocale}.json`)).default;
    return {
      messages,
      locale: defaultLocale
    };
  }

  try {
    const messages = (await import(`../messages/${currentLocale}.json`)).default;
    console.log('✅ Messages loaded for:', currentLocale);
    return {
      messages,
      locale: currentLocale
    };
  } catch (error) {
    console.error('❌ Error loading messages:', error.message);
    // Fallback to default locale
    const messages = (await import(`../messages/${defaultLocale}.json`)).default;
    return {
      messages,
      locale: defaultLocale
    };
  }
});

// -------------------
// next.config.js (create this file in root if it doesn't exist)
// -------------------
// const createNextIntlPlugin = require('next-intl/plugin');
// 
// const withNextIntl = createNextIntlPlugin('./lib/i18n.js');
// 
// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// 
// module.exports = withNextIntl(nextConfig);

// -------------------
// middleware.js (create this file in root)
// -------------------
// import createMiddleware from 'next-intl/middleware';
// import { locales, defaultLocale } from './lib/i18n';
// 
// export default createMiddleware({
//   locales,
//   defaultLocale,
//   localePrefix: 'always'
// });
// 
// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };

// -------------------
// messages/fr.json (create this file)
// -------------------
// {
//   "common": {
//     "welcome": "Bienvenue"
//   },
//   "nav": {
//     "home": "Accueil",
//     "about": "À propos",
//     "services": "Services",
//     "contact": "Contact"
//   }
// }

// -------------------
// messages/en.json (create this file)
// -------------------
// {
//   "common": {
//     "welcome": "Welcome"
//   },
//   "nav": {
//     "home": "Home",
//     "about": "About",
//     "services": "Services",
//     "contact": "Contact"
//   }
// }

// -------------------
// messages/ar.json (create this file)
// -------------------
// {
//   "common": {
//     "welcome": "مرحبا"
//   },
//   "nav": {
//     "home": "الرئيسية",
//     "about": "من نحن",
//     "services": "الخدمات",
//     "contact": "اتصل بنا"
//   }
// }