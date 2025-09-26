import React, { useMemo, useState } from 'react';
import { calculatorRegistry, CalculatorTag } from '../data/calculators';
import { CalculatorCard } from '../components/CalculatorCard';
import { useLanguage } from '../providers/LanguageProvider';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

const tags: (CalculatorTag | 'All')[] = ['All', 'Health', 'Fitness', 'Everyday'];

const Component: React.FC = () => {
  const { dictionary } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<(typeof tags)[number]>('All');

  const filtered = useMemo(() => {
    return calculatorRegistry.filter((calculator) => {
      const matchesTag = activeTag === 'All' || calculator.tags.includes(activeTag);
      const matchesQuery = [calculator.name, calculator.description, calculator.tags.join(' ')].some((value) =>
        value.toLowerCase().includes(search.toLowerCase()),
      );
      return matchesTag && matchesQuery;
    });
  }, [activeTag, search]);

  return (
    <>
      <SEO 
        title="Health Calculator Catalog - BMI, Macro, TDEE & More" 
        description="Browse our comprehensive collection of professional health calculators. Find BMI calculators, macro calculators, TDEE calculators, body fat calculators, and nutrition planning tools. All calculators are evidence-based and clinically reviewed."
        url="/calculators"
        keywords={[
          'health calculator catalog',
          'BMI calculator',
          'macro calculator',
          'TDEE calculator',
          'body fat calculator',
          'calorie calculator',
          'nutrition calculator',
          'fitness calculator',
          'weight loss calculator',
          'health tools'
        ]}
      />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{dictionary.catalog.title}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">{filtered.length} {dictionary.catalog.results}</p>
            </div>
            <AdSlot slotId="2222222222" className="w-full max-w-xs" />
          </div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
                    activeTag === tag
                      ? 'border-primary-500 bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'border-slate-200 text-slate-600 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tag === 'All' ? dictionary.catalog.all : tag}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-sm">
              <label htmlFor="catalog-search" className="sr-only">
                {dictionary.search.placeholder}
              </label>
              <input
                id="catalog-search"
                type="search"
                value={search}
                placeholder={dictionary.search.placeholder}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
              {dictionary.catalog.empty}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((calculator) => (
                <CalculatorCard key={calculator.slug} calculator={calculator} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
