import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { BaseLayout } from './layouts/BaseLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home'),
      },
      {
        path: 'calculators',
        lazy: () => import('./pages/Calculators'),
      },
      {
        path: 'calculator/:slug',
        lazy: () => import('./pages/CalculatorDetail'),
      },
      {
        path: 'news',
        lazy: () => import('./pages/NewsIndex'),
      },
      {
        path: 'news/:slug',
        lazy: () => import('./pages/NewsArticle'),
      },
      {
        path: 'about',
        lazy: () => import('./pages/About'),
      },
      {
        path: 'contact',
        lazy: () => import('./pages/Contact'),
      },
      {
        path: 'privacy',
        lazy: () => import('./pages/Privacy'),
      },
      {
        path: 'terms',
        lazy: () => import('./pages/Terms'),
      },
      {
        path: '*',
        lazy: () => import('./pages/NotFound'),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
