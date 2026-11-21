# PRS Shangrila website (prsshangrila.in)

Static site for PRS Shangrila, an apartment building in Vanchiyoor, Thiruvananthapuram. Plain HTML, CSS and JavaScript. No build step, no CDN, no trackers. Hosted on GitHub Pages.

## Folder structure

```
index.html, rent.html, building.html, association.html, notices.html,
contact.html, privacy.html, 404.html     Pages (root page is index.html)
assets/css/site.css                      All styling; colour tokens at the top
assets/js/theme-init.js                  Applies the saved theme before first paint (light is default)
assets/js/site.js                        Header, footer, theme toggle, photo viewer, data-driven blocks
assets/img                               Photos as AVIF and WebP (two widths) and the favicon
data/site.js                             Menu, address, phone, WhatsApp number, email
data/content.js                          Facts, facilities, photos, vacancies, notices, FAQ
CNAME, .nojekyll, robots.txt, sitemap.xml
CLAUDE.md                                Notes for future editing sessions
```

## Common edits

| To do this | Edit |
| --- | --- |
| Change phone, WhatsApp number, email, address, menu | `data/site.js` |
| Show vacant apartments | `data/content.js`, `vacancies` (set `asOf` and add items; leave `items` empty if none) |
| Post a notice | `data/content.js`, `notices` (newest first) |
| Add or change an FAQ | `data/content.js`, `faq` |
| Add a photo | Convert it to AVIF and WebP (widths 480 and full, max 1280), copy into `assets/img`, add to `gallery` |
| Change colours | Tokens at the top of `assets/css/site.css` |
| Add a page | Copy `contact.html`, change title, description, canonical URL and content; add to `data/site.js` `nav` and `sitemap.xml` |

## Notes

- Malayalam text is marked `lang="ml"` and uses the visitor's installed Malayalam font (no download). All Malayalam is a draft until a native speaker has reviewed it.
- English is kept for titles, descriptions, headings and structured data so search engines and overseas visitors can read the site.
- Light is the default theme; a visitor's explicit choice is saved in `localStorage` under `prs-theme`.
