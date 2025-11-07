// navigation.js
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'ar'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  
  // Optional: Define localized pathnames
  pathnames: {
    '/': '/',
    '/about': {
      fr: '/a-propos',
      en: '/about',
      ar: '/حول'
    },
    '/services': {
      fr: '/services',
      en: '/services',
      ar: '/خدمات'
    }
    // Add more routes as needed
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);