# For Bubu, with love

A personal React birthday website for Anita (Anu/Bubu), from Krish.

- Birthday: October 6, 2026, midnight India time (born 06-10-2001).
- Engagement: January 25, 2026.
- Gift unwrap, countdown, love notes, timeline, engagement photos, memory album, films, and a personal letter.
- Before / birthday / after states; calm mode and reduced-motion support.

## Local preview

```bash
npm run install:ci
npm run dev
```

Opens on port 5173 (LAN: `http://<your-ip>:5173/`).

Dev-only previews: `/?preview=birthday`, `/?preview=after`, `/?preview=midnight`.

## Edit

- `lib/content.ts` — copy, photos, films, timeline
- `app/page.tsx` — layout and interactions
- `app/globals.css` — look, motion, responsive
- `lib/birthday.ts` — India-time birthday phases
- `public/photos/`, `public/videos/`, `public/love-letter.webp` — media

```bash
npm test
npx tsc --noEmit
npm run build
```

Live: https://birthday.krishdodiya0212.workers.dev
