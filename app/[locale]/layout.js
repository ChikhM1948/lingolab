// app/[locale]/layout.js

// 👇 ADD THIS LINE
import '../globals.css'; // Adjust path if your global CSS is elsewhere

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider'; 

// Initialize your fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "DevLab - Services Informatiques",
  description: "Votre partenaire technologique de A à Z en Algérie",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

// Generate static params for all locales
export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'ar' }
  ];
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }

  return (
    <html 
      lang={locale} 
      dir={locale === 'ar' ? 'rtl' : 'ltr'} 
      suppressHydrationWarning 
    >
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}