# Aleksandar Kamenev — Systems & imagination

A personal portfolio spanning data and AI engineering, full-stack development,
distributed-systems research, creative code, and personal explorations.

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
- Animation follows the operating system's reduced-motion preference. The footer has a motion control and a “Break the grid” interaction.
- Content and links work without JavaScript. Filters and interactive controls appear only when JavaScript initializes.
- Google Fonts supplies DM Sans, IBM Plex Mono, and Pinyon Script; system fonts are fallbacks.

## Content sources and privacy

Professional wording is based on the public [GitHub profile](https://github.com/Alex-Kamenev)
and [LinkedIn](https://www.linkedin.com/in/aleksandar-kamenev/). The research links to
its [published DOI](https://doi.org/10.1145/3593426). Public project links point to
their original repositories. Project graphics are conceptual artwork, not
screenshots of employer systems or research results.

Private local projects are described only as high-level work in progress. No
private source, architecture, customer information, internal metrics, resume
contact details, or unpublished product names are included. The portrait was
already part of this public website repository.

## Deployment

`npm run build` produces a minimal `dist/` containing only the assets this version
uses. It can be deployed on a static host or GitHub Pages. Existing historical
images remain in source but are omitted from the deployment.
