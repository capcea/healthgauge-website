import React from 'react';
import { PrefetchLink } from './PrefetchLink';
import { getAllPosts } from '../utils/posts';

type NewsCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
};

export const NewsCard: React.FC<NewsCardProps> = ({ slug, title, excerpt, date, category, readingTime }) => {
  return (
    <article className="card flex h-full flex-col gap-4">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{category}</span>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{excerpt}</p>
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>{readingTime}</span>
      </div>
      <PrefetchLink to={`/news/${slug}`} className="btn-primary w-full justify-center" prefetch={() => import('../pages/NewsArticle')}>
        Read article
      </PrefetchLink>
    </article>
  );
};

// Exporting posts for static usage on Home page without re-importing utility in component tree
export const featuredPosts = () => getAllPosts();
