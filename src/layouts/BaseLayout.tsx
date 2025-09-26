import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { PrefetchLink } from '../components/PrefetchLink';

const navItems = [
  { to: '/', key: 'home', prefetch: () => import('../pages/Home') },
  { to: '/calculators', key: 'calculators', prefetch: () => import('../pages/Calculators') },
  { to: '/news', key: 'news', prefetch: () => import('../pages/NewsIndex') },
  { to: '/about', key: 'about', prefetch: () => import('../pages/About') },
  { to: '/contact', key: 'contact', prefetch: () => import('../pages/Contact') },
];

const legalItems = [
  { to: '/privacy', key: 'privacy', prefetch: () => import('../pages/Privacy') },
  { to: '/terms', key: 'terms', prefetch: () => import('../pages/Terms') },
];

export const BaseLayout: React.FC = () => {
  const { dictionary, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <PrefetchLink to="/" className="flex items-center gap-2 font-display text-xl font-bold" prefetch={() => import('../pages/Home')}>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">C</span>
            Health Gauge
          </PrefetchLink>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <PrefetchLink key={item.to} to={item.to} className="hover:text-primary-600" prefetch={item.prefetch}>
                {dictionary.nav[item.key as keyof typeof dictionary.nav]}
              </PrefetchLink>
            ))}
            {legalItems.map((item) => (
              <PrefetchLink key={item.to} to={item.to} className="hover:text-primary-600" prefetch={item.prefetch}>
                {dictionary.nav[item.key as keyof typeof dictionary.nav]}
              </PrefetchLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold shadow-sm transition hover:border-primary-500 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700"
              onClick={toggleLanguage}
              aria-label={dictionary.language.label}
            >
              {dictionary.language.toggle}
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold shadow-sm transition hover:border-primary-500 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700"
              onClick={toggleTheme}
              aria-label={dictionary.theme.toggle}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white/90 py-10 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg text-slate-900 dark:text-white">Health Gauge Health Hub</p>
            <p>{dictionary.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <PrefetchLink key={item.to} to={item.to} className="hover:text-primary-600" prefetch={item.prefetch}>
                {dictionary.nav[item.key as keyof typeof dictionary.nav]}
              </PrefetchLink>
            ))}
            {legalItems.map((item) => (
              <PrefetchLink key={item.to} to={item.to} className="hover:text-primary-600" prefetch={item.prefetch}>
                {dictionary.nav[item.key as keyof typeof dictionary.nav]}
              </PrefetchLink>
            ))}
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Health Gauge. {dictionary.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
