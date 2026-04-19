# HobbyHub

A lightweight social-style **feed app** for sharing hobby posts with **titles**, optional **body text**, **external image URLs**, **comments**, and **unlimited upvotes** per click. Built with **React**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **React Router**. Data lives in **localStorage** in the browser (no backend required for the demo).

---

## Video overview

Record a short screen walkthrough (features, create post, feed, detail page, comments, upvotes), upload it to **YouTube** (unlisted is fine) or **Loom**, then drop your link into the README.

**Option A — YouTube thumbnail link (replace `YOUR_VIDEO_ID` with the ID from your video URL):**

[![HobbyHub walkthrough](https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

**Option B — Plain link**

[Watch the HobbyHub overview →](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

*(Delete this section’s placeholder lines once your real video is linked.)*

---

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

## License

Private / educational use unless you add your own license.
