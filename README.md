# Shawon — Portfolio

A single-page, static portfolio site with a light/dark theme toggle
(dark mode + a "bluish white" light mode). Pure HTML/CSS/JS — no build step,
no framework, ready for GitHub Pages.

## Design notes

- **Fonts:** Space Grotesk (headings), Inter (body text), JetBrains Mono
  (labels, tags, terminal panel) — loaded from Google Fonts.
- **Theme tokens:** all colors are CSS variables in `css/style.css`
  under `:root` (dark) and `[data-theme="light"]` (bluish-white). Change
  those variables to retheme the whole site.
- **Signature element:** the hero's terminal-style "whoami" panel, and the
  `// 01 — about` comment-style section eyebrows, echo an ICT/developer
  identity throughout the page.

## File structure

```
index.html          the whole page
css/style.css        all styles + both themes
js/script.js          theme toggle, mobile nav, typing effect, scroll reveal
images/               placeholder SVG images (see below)
resume-placeholder.pdf  placeholder — replace with your real resume/CV
```

## Before you publish — replace the placeholders

Everything below is a stand-in so the site works out of the box. Search the
project for these and swap in your real info:

| Placeholder | Where | Replace with |
|---|---|---|
| `images/avatar-placeholder.svg` | hero terminal panel | a real headshot (square image works best, e.g. `avatar.jpg`) |
| `images/project-*.svg` | project cards | real screenshots of each project |
| `your.email@example.com` | contact section | your real email |
| `https://github.com/your-github-username` | hero, nav, project links | your GitHub profile/repo URLs |
| `https://linkedin.com/in/your-linkedin` | contact section | your LinkedIn (or delete the card) |
| `resume-placeholder.pdf` | hero "Download Resume" button | your actual resume, same filename or update the `href` in `index.html` |

The project GitHub links currently point to guessed repo names
(`Quiz_game_javaproject`, `smart-vehicle-access-system`, etc.) — update the
`your-github-username` part and repo names to match your actual repos.

## Run locally

No build tools needed. Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for a user/organization site, name it
   `your-github-username.github.io`; for a project site, any name works).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/your-github-username/your-repo.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick branch `main`, folder `/ (root)`, then **Save**.
6. Wait a minute, then visit:
   - `https://your-github-username.github.io` (if the repo is named
     `your-github-username.github.io`), or
   - `https://your-github-username.github.io/your-repo` (project site).

## Notes

- The theme toggle remembers the visitor's choice (via `localStorage`) and
  otherwise falls back to their system preference.
- Scroll-reveal animations and the typing effect respect
  `prefers-reduced-motion`.
- The site is responsive down to small mobile widths, with a collapsible
  nav menu under ~720px.
