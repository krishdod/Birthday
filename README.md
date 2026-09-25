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

The birthday chapter opens automatically at midnight India time, or after opening the gift on October 6. If the regular letter is open at midnight, the chapter waits until it closes. It can be reopened from “Your birthday chapter” and remains available after the birthday.

The birthday surprise is a photo-free candlelit room: light the room, blow out the 25 candles, and open a wax-sealed letter. Velvet curtains open over the original artwork, gold letters reveal Bubu's name, and a handwritten flourish draws underneath. Her wish lights a heart constellation around the cake, with rose petals and golden sparks. The seal lifts and paper slips out before the letter appears. Existing calm mode and system reduced-motion preferences apply. Main-page photos and videos are separate and remain available.

Chapters fade out before the next scene appears, and the letter opens with a short wax-seal and paper animation. Repeated taps cannot queue extra transitions. Turning off motion completes pending reveals immediately; closing the surprise cancels them. Background hearts pause while reading, decorative animations pause in hidden tabs, and videos pause when opening a letter or leaving the tab. The next cake image is decoded in advance and all three local font files are preloaded.

The larger effects live in `components/birthday-magic.tsx` and `app/birthday-magic.css`. Celebrations use at most 24 particles (16 on phones, 12 for the letter), finish within 5.2 seconds, and are removed on navigation or close. Calm mode also removes the transient decorations. No extra animation package is needed.

Birthday chapter files: `components/birthday-chapter.tsx`, `app/birthday-chapter.css`, and the `birthdayChapter` copy in `lib/content.ts`. Generated artwork lives at `public/birthday-room.webp` and `public/birthday-cake.webp`. The sealed letter and song record are built with CSS and live text.

The final song reveal stays after the signed birthday letter. Until Krish supplies the finished audio, `birthdaySong.src` in `lib/content.ts` is `null`, and the invitation stays hidden. Add the finished song under `public/audio/` and set its local URL there. Audio starts only after Play, and pauses when leaving its scene, closing the birthday surprise, or hiding the browser. No placeholder song is included.

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
