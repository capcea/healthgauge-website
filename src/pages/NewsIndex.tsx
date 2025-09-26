import React, { useMemo, useState } from 'react';
import { getAllPosts } from '../utils/posts';
import { useLanguage } from '../providers/LanguageProvider';
import { PrefetchLink } from '../components/PrefetchLink';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

const pageSize = 6;

const Component: React.FC = () => {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.meta.category)));
  const { dictionary } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.meta.category === category;
      const target = `${post.meta.title} ${post.meta.excerpt} ${post.meta.tags.join(' ')}`.toLowerCase();
      const matchesSearch = target.includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, category, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetPagination = () => setPage(1);

  return (
    <>
      <SEO title="Codex newsroom" description="Read the latest Codex health, fitness, and lifestyle insights in English and Romanian." url="/news" />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{dictionary.news.title}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">Fresh takes on healthspan, nutrition, and movement science.</p>
            </div>
            <AdSlot slotId="4444444444" className="w-full max-w-xs" />
          </div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
                  category === 'All'
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-slate-300 text-slate-600 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300'
                }`}
                onClick={() => {
                  setCategory('All');
                  resetPagination();
                }}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ${
                    category === item
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-slate-300 text-slate-600 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => {
                    setCategory(item);
                    resetPagination();
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-sm">
              <label htmlFor="news-search" className="sr-only">
                {dictionary.news.search}
              </label>
              <input
                id="news-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPagination();
                }}
                placeholder={dictionary.news.search}
                className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
          </div>

          {paginated.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
              {dictionary.news.empty}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <article key={post.slug} className="card space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{post.meta.category}</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{post.meta.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{post.meta.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(post.meta.date).toLocaleDateString()}</span>
                    <span>{post.meta.readingTime}</span>
                  </div>
                  <PrefetchLink to={`/news/${post.slug}`} className="btn-primary w-full justify-center" prefetch={() => import('./NewsArticle')}>
                    Read more
                  </PrefetchLink>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={page === 1}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary-400 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
              >
                Prev
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary-400 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
