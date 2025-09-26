import React from 'react';

type PostMeta = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  readingTime?: string;
};

type PostModule = {
  default: React.ComponentType;
  meta: PostMeta;
};

type PostEntry = {
  slug: string;
  meta: PostMeta & { readingTime: string };
  Component: React.ComponentType;
};

const modules = import.meta.glob('../content/posts/*.mdx', { eager: true }) as Record<string, PostModule>;

const normalizeReadingTime = (value?: string) => value ?? '4 min';

const posts: PostEntry[] = Object.values(modules)
  .filter((module) => module?.meta)
  .map((module) => ({
    slug: module.meta.slug,
    meta: { ...module.meta, readingTime: normalizeReadingTime(module.meta.readingTime) },
    Component: module.default,
  }))
  .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));

export const getAllPosts = () => posts;

export const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);

export const getLatestPosts = (count = 3) => posts.slice(0, count);

export const getRelatedPosts = (slug: string, category: string, limit = 3) =>
  posts.filter((post) => post.slug !== slug && post.meta.category === category).slice(0, limit);
