import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../utils/posts';
import { PrefetchLink } from '../components/PrefetchLink';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const Component: React.FC = () => {
  const { slug } = useParams();
  const entry = slug ? getPostBySlug(slug) : undefined;
  const Content = entry?.Component;
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;
    const nodes = Array.from(contentRef.current.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const parsed = nodes.map((node) => {
      const id = node.id || slugify(node.textContent ?? '');
      node.id = id;
      return { id, text: node.textContent ?? '' };
    });
    setHeadings(parsed);
  }, [entry]);

  const related = useMemo(() => {
    if (!entry) return [];
    return getRelatedPosts(entry.slug, entry.meta.category, 3);
  }, [entry]);

  if (!entry || !Content) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Article not found</h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Try exploring the latest stories from our newsroom.</p>
          <PrefetchLink to="/news" className="btn-primary mt-6 inline-flex justify-center" prefetch={() => import('./NewsIndex')}>
            Back to news
          </PrefetchLink>
        </div>
      </section>
    );
  }

  const shareUrl = `https://www.example.com/news/${entry.slug}`;
  const shareText = encodeURIComponent(entry.meta.title);

  return (
    <>
      <SEO title={entry.meta.title} description={entry.meta.excerpt} url={`/news/${entry.slug}`} />
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-primary-600">
              <span>{entry.meta.category}</span>
              <span>•</span>
              <span>{entry.meta.readingTime}</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{entry.meta.title}</h1>
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:gap-4">
              <span>By {entry.meta.author}</span>
              <span aria-hidden>•</span>
              <time dateTime={entry.meta.date}>{new Date(entry.meta.date).toLocaleDateString()}</time>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {entry.meta.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {headings.length > 0 && (
            <nav aria-label="Table of contents" className="mb-10 rounded-2xl border border-slate-200 bg-white/70 p-6 text-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="hover:text-primary-600">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div ref={contentRef} className="prose prose-slate max-w-none dark:prose-invert">
            <Content />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span>Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              className="rounded-full border border-slate-300 px-4 py-2 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700"
              target="_blank"
              rel="noreferrer"
            >
              Twitter/X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              className="rounded-full border border-slate-300 px-4 py-2 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:?subject=${shareText}&body=${shareUrl}`}
              className="rounded-full border border-slate-300 px-4 py-2 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700"
            >
              Email
            </a>
          </div>

          <section className="mt-12 grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="card space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">About the author</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {entry.meta.author} contributes to Health Gauge with a focus on practical strategies that turn research into daily habits.
              </p>
            </div>
            <AdSlot slotId="5555555555" className="w-full" />
          </section>

          {related.length > 0 && (
            <section className="mt-12 space-y-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Related posts</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <article key={item.slug} className="card space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{item.meta.category}</span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.meta.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.meta.excerpt}</p>
                    <PrefetchLink to={`/news/${item.slug}`} className="btn-primary w-full justify-center" prefetch={() => import('./NewsArticle')}>
                      Read article
                    </PrefetchLink>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};

export { Component };
export default Component;
