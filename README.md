# Rhema

> An app for studying the Bible to help people understand it in its original context and language.

**Rhema (ῥῆμα)** — the spoken, living word that proceeds from God. This project exists to help you encounter Scripture as it was written: in Greek and Hebrew, in the historical and literary world that shaped it, so the personal, present word can speak today.

## Current status

Early working prototype built with Next.js 16 + TypeScript + Tailwind.

- Beautiful, focused dark scholarly reading experience
- Side-by-side English + original Greek for key passages
- Interactive word study (tap Greek words for meaning + context)
- "Rhema Insight" boxes that highlight the spoken/living dimension of the text
- Per-passage notes that persist in your browser (localStorage)
- Currently ships with John 1:1-5 and Matthew 4:4 (Deuteronomy quote) as rich demos

This is the foundation for a much deeper tool: full canon access, proper interlinear, lexicons, historical/cultural notes, saved studies, reading plans, and more.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- Geist font family + strong prose/reading defaults
- Pure client state for the v0 prototype (easy to layer Supabase, a proper Bible API, or static full-text data later)

## Roadmap ideas (very open)

- Full passage browser + search across translations + original text
- Proper interlinear + morphological data
- Word study hub (Strong’s, parsing, usage across Scripture)
- Historical & literary context cards tied to specific verses
- Personal library: highlights, notebooks, "rhema moments"
- Reading plans and progress
- Offline support / PWA
- Optional sync (Supabase or your own backend)

## Contributing / feedback

This is Tyler’s personal project right now. Issues and ideas are welcome.

The goal is reverent, accurate, beautiful software that serves people who want to hear what was actually said — in the languages it was said in.

---

Built to honor the Word. Early days. More coming.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
