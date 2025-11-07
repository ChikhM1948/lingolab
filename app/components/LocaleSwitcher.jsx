// app/components/LocaleSwitcher.jsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/navigation'; // <-- CORRECTED IMPORT
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      // router.replace will replace the URL with the new locale
      // while preserving the current path.
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <select
        defaultValue={localeActive}
        onChange={onSelectChange}
        disabled={isPending}
        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}