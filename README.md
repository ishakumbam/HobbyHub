# HobbyHub

A lightweight social-style **feed app** for sharing hobby posts with **titles**, optional **body text**, **external image URLs**, **comments**, and **unlimited upvotes** per click. Built with **React**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **React Router**. Data lives in **localStorage** in the browser (no backend required for the demo).

**Repository:** [github.com/ishakumbam/HobbyHub](https://github.com/ishakumbam/HobbyHub)

---

## Video overview

[Watch the HobbyHub overview →]
<div>
    <a href="https://www.loom.com/share/4fad851cd3424a44a0fd395afa07db96">
      <p>HobbyHub - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/4fad851cd3424a44a0fd395afa07db96">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/4fad851cd3424a44a0fd395afa07db96-2823798ded10b9a8-full-play.gif#t=0.1">
    </a>
  </div>




## Features

- **Create posts** — required **title**; optional **content** and **image URL** (external link).
- **Home feed** — shows **creation time**, **title**, and **upvotes**; click through to the full post.
- **Sort** by newest or by upvotes; **search** titles.
- **Post page** — full content, image, **upvote** button (each click adds one), **comments**, **edit** / **delete** for posts you created in this browser.
- **Demo seed posts** — first visit with an empty board loads sample posts with images.

---

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview production build locally
```

---

## Tech stack

- React 19 · Vite 8 · Tailwind CSS 4 (`@theme` tokens)
- react-router-dom (SPA routes)
- Framer Motion (navbar / light motion)

---

## Project structure (high level)

| Path | Role |
|------|------|
| `src/App.jsx` | Router + layout |
| `src/pages/` | Feed, create/edit post, post detail |
| `src/context/` | Posts store + session author id |
| `src/data/seedPosts.js` | Demo posts when storage is empty |

---

## Clone this repo

```bash
git clone https://github.com/ishakumbam/HobbyHub.git
cd HobbyHub
npm install
npm run dev
```

---

## License


