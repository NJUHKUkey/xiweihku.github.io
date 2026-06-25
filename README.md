# Xi Wei Academic Website

This is a Vite + React + TypeScript academic homepage project.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publish with GitHub Pages

This repository is configured to deploy through GitHub Actions. Push changes to the `main` branch and the workflow will build the site and deploy the `dist` folder to GitHub Pages.

## Regular maintenance

Most academic content is maintained in `src/App.tsx`.

### Add a publication

Find the `publications` array and add a new object:

```tsx
{
  title: 'New paper title',
  link: 'https://doi.org/xxxxx',
  authors: [
    { name: 'Xi Wei', highlight: true, corresponding: false },
    { name: 'Coauthor Name', highlight: false, corresponding: true },
  ],
  venue: 'Journal Name',
  year: '2026',
  themes: ['Inter-city Travel', 'Accessibility'],
  status: 'Published',
},
```

### Add an award

Find the `awards` array and add:

```tsx
{
  name: 'Award Name',
  grantor: 'Granting Institution',
  time: '2026',
},
```

### Update profile photo

The profile photo is stored at:

```text
public/photo.jpg
```

Replace it with a new image using the same filename.

## SEO maintenance

The site includes:

- `index.html` metadata
- Person structured data
- `public/robots.txt`
- `public/sitemap.xml`

After major updates, submit `https://xiweihku.github.io/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
