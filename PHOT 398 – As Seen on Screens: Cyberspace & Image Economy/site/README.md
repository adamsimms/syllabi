# PHOT 398 static site

Cargo-styled static site generated from the course Markdown files in this folder's parent directory.

## Build

```bash
cd site
npm install
npm run build
```

Output is written to `site/_site/`.

Preview locally:

```bash
npm run serve
```

Then open http://localhost:8080

## How it works

- **Content source:** `../README.md`, `../assignments.md`, `../schedule.md`, `../resources.md`
- **Design shell:** vendored CSS, fonts, and layout extracted from [phot398.cargo.site](https://phot398.cargo.site)
- **Builder:** [Eleventy](https://www.11ty.dev/) injects rendered Markdown into the Cargo `<bodycopy>` layout

Edit the Markdown files, then run `npm run build` to regenerate the site.

## Assets

`assets/cargo/` contains:

- `member.css` — site stylesheet from Cargo
- `platform.css` — Cargo platform layout rules
- `local-nav.css` / `local-content.css` — page-specific layout from the Cargo snapshot
- `fonts.css` + `fonts/` — Nitti Grotesk, Neue Haas Grotesk, and Cargo icon font
- `static-overrides.css` — responsive nav and Markdown table styles (no Cargo JS required)

## Deployment

Built files in `_site/` can later be copied to `adamsimms.xyz/courses/phot398/` when ready.
