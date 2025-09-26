# Health Gauge Health Hub

Health Gauge is a mobile-first calculator and news platform built with React, Vite, TypeScript, and Tailwind CSS. It ships with bilingual content (English/Romanian), Google Analytics, AdSense placements, SEO metadata, and MDX-powered articles. The project meets WCAG AA color contrast targets and is ready for one-click deploys.

## Features

- ⚡ **Fast calculator hub** powered by Vite + React Router with route prefetching
- 🧮 **Evidence-based calculators**: BMI, TDEE/Calories, Macro Split, Water Intake
- 📰 **MDX newsroom** with share buttons, related posts, and dynamic table of contents
- 🌗 **Dark mode + language toggle** persisted locally
- 📈 **Google Analytics & AdSense** hooks included (replace placeholder IDs)
- 🔍 **SEO-ready**: react-helmet-async, sitemap, robots.txt, schema.org JSON-LD
- ♿ **Accessibility-aware** with semantic landmarks, focus styles, and readable contrast

## Getting started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# type-check and build
npm run build

# optional lint
npm run lint
```

> The repository ships without `node_modules`. Run `npm install` to fetch dependencies.

## Content model

- Calculators are defined in [`src/data/calculators.ts`](src/data/calculators.ts).
- MDX posts live in [`src/content/posts`](src/content/posts) and expose a `meta` export for listing/SEO.
- Translations are simple JSON dictionaries inside [`src/translations`](src/translations).

## Environment variables

Update analytics IDs in `index.html` and `src/components/AdSlot.tsx` with production values.

## Deployment

### Vercel (recommended)

1. Fork or import this repository into Vercel.
2. Choose the Vite preset. Build command: `npm run build`, output directory: `dist`.
3. Set `NODE_VERSION` to 20 (optional) and deploy. Preview + production deploys run automatically.

### GitHub Pages

1. Install dependencies and build locally: `npm install && npm run build`.
2. Push the generated `dist` folder to a `gh-pages` branch using `git subtree` or a deploy action.
3. Enable GitHub Pages from the repository settings pointing to the `gh-pages` branch.
4. Optionally add a GitHub Action using `peaceiris/actions-gh-pages` for automated deployments.

## License

[MIT](LICENSE)
