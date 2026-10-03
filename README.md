# La Shish — Online Ordering

Bilingual mobile-first ordering website for La Shish.

## Languages

The interface is available in **French (FR)** and **English (EN)**. The selected language is saved in the browser and the WhatsApp order summary uses the same language.

The menu keeps the restaurant's official product names and data; interface labels, checkout instructions, categories where applicable, notifications and order messages are localized.

## Features

- Responsive menu with categories and instant search.
- Persistent cart using localStorage.
- Pizza size selection.
- Customer and delivery information validation.
- Bilingual WhatsApp order summary.
- Wave payment and delivery information.
- PWA / service worker support.
- Graceful image fallbacks.
- Reduced-motion support.
- No build step required.

## Project structure

```text
/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── sw.js
├── data/
│   ├── plats.js
│   ├── pizzas.js
│   ├── tacos.js
│   └── boissons.js
└── images/
```

## Menu data

Products are stored in `data/*.js`. Prices and availability can be changed without modifying the ordering engine.

## WhatsApp

The destination number is configured in `app.js`. The generated message includes customer details, delivery address, items, options, total, and optional comments.

## Maintenance notes

The cart key `laShishCart` is kept for compatibility with existing browser sessions. Invalid or corrupted cart data is safely discarded instead of breaking the application.

The interface is intentionally static: it can be deployed directly to GitHub Pages, Vercel, or another static host.
