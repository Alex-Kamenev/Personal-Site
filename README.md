# Aleksandar Kamenev — Data & AI Engineering

A personal portfolio focused on professional data and AI engineering at OnTrac,
previous software leadership at UPS, published distributed-systems research,
and public open-source contributions.

**Live portfolio: [alex-kamenev.github.io](https://alex-kamenev.github.io/)**

## Run locally

Requires Node.js 22+ and Python 3 for the preview server. No npm installation is needed.

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:8765. The source HTML can also be served directly by any static web server.

## Design and behavior

- Buildless HTML, CSS, and JavaScript with no runtime framework or third-party scripts.
- Responsive layouts, visible keyboard focus, semantic headings, and project filtering.
- Generative canvas network with a static SVG fallback.
- Animation follows the operating system's reduced-motion preference. The footer has an explicit Pause animations / Resume animations control.
- Content and links work without JavaScript. Filters and interactive controls appear only when JavaScript initializes.
- Google Fonts supplies DM Sans, IBM Plex Mono, and Pinyon Script; system fonts are fallbacks.

## Content sources and privacy

Professional wording is based on the public [GitHub profile](https://github.com/Alex-Kamenev)
and [LinkedIn](https://www.linkedin.com/in/aleksandar-kamenev/). The research links to
its [published DOI](https://doi.org/10.1145/3593426). Public project links point to
their original repositories. Project graphics are conceptual artwork, not
screenshots of employer systems or research results.

The featured selection contains OnTrac, UPS, the co-authored ACM paper, and
SlashDB contributions. Learning exercises and private local projects are not
featured. No private source, architecture, customer information, internal
metrics, resume contact details, or unpublished product names are included. The portrait was
already part of this public website repository.

## Deployment

`npm run build` produces `dist/` with the page, styles, scripts, shared `assets/`
directory, and selected portrait. It can be deployed on a static host or GitHub
Pages. Other historical portraits remain in source and are omitted from the build.

The public production address is `https://alex-kamenev.github.io/`, served from the `main` branch root of [alex-kamenev.github.io](https://github.com/Alex-Kamenev/alex-kamenev.github.io). Publish the files produced in `dist/` there and retain `.nojekyll`. The prior Sites project is retained as a fallback; it is no longer the primary portfolio link.
