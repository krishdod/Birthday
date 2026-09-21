# For Bubu, with love

A personal React birthday website for Anita (Anu/Bubu), from Krish.

- Birthday: October 6, 2026, midnight in India.
- Engagement: January 25, 2026.
- Six hidden love notes, falling hearts, confetti, relationship timeline and an accessible personal letter.
- Before, during and after birthday states; the gift stays available afterwards.
- Keyboard controls, small-screen layouts, motion pause and system reduced-motion support.

The decorative ribbon-and-envelope artwork was generated for this project. It does not depict the couple. No personal photos or music were supplied, so there are no empty photo frames or audio placeholders.

## Local preview

Run `npm run install:ci`, then `npm run dev`. The preview opens on port 5173.
On this machine, the installed npm launcher is misconfigured; its direct entry point works:
`node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run install:ci`

In development only, `/?preview=birthday` and `/?preview=after` show the birthday and keepsake states. These overrides are disabled in production.

## Edit

- `app/page.tsx`: wishes, timeline and letter.
- `app/globals.css`: appearance and responsive layout.
- `lib/birthday.ts`: India-time birthday boundary logic.
- `public/love-letter.png`: decorative artwork.

Run `node node_modules/typescript/bin/tsc --noEmit` for type checking and `npm run build` for the production build.

## Image brief

Built-in image generation: editorial overhead photograph of a blank cream envelope tied with a burgundy satin bow on blush linen, two blush roses, tiny white daisies, warm window light and subtle film grain. No people, text, branding or watermark.
