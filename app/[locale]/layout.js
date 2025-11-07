import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
// Note: The font imports are now in the root app/layout.js

export const metadata = {
  title: "DevLab - Services Informatiques", // You can translate this later
  description: "Votre partenaire technologique de A à Z en Algérie", // This too
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = params; // <-- FIX: Access locale from params here
  
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    // Add lang and dir attributes for correct language/RTL support
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body> {/* The ThemeProvider is in the root layout, so it wraps this */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}