# Rhema

**A Bible study app for the original languages, word meanings, and historical/literary/cultural context of Scripture.**

> "Man shall not live by bread alone, but by every **rhema** (ῥῆμα — spoken word/utterance) that comes from the mouth of God." — Matthew 4:4

The vision: help serious students understand what the text *actually said* in Greek and Hebrew, what it *meant* in its original world, and what that living word is saying today.

## Current state (Alpha)

High-fidelity working prototype (Next.js 16):

- Clean, scholarly dark UI optimized for long reading sessions
- Structured data model (verses → tokens with lemma/strongs/parsing/gloss)
- Interactive reader with clickable Greek words → study panel
- Dedicated tabs: **Read** / **Words & Meaning** / **Original Context** / **My Study**
- Rich context notes (literary structure, historical background, cultural setting)
- "Rhema Insights" that directly address the spoken/personal dimension
- Local notes persistence (will move to Supabase)

Currently seeded with high-quality data for **John 1:1-5** (the Logos passage) + plans for rapid expansion.

## Recommended Architecture (what we're building)

**Frontend**
- Next.js 16 App Router (TypeScript + Tailwind)
- Excellent typography for Greek/Hebrew (Noto Serif + Geist)
- Component-driven study surface (interlinear-style, word popovers, context cards, annotation surface)

**Bible Text & Original Language Data (the heart of the app)**
- Primary sources (open-licensed where possible):
  - Greek NT: SBLGNT + MorphGNT (morphology)
  - Hebrew OT: Open Scriptures Hebrew Bible (OSHB) / morphhb
  - STEPBible-Data TSVs for rich tagging
- Strategy: Versioned, structured data files in `data/bible/` (JSON/TS modules) for the core canon. Accurate tokenization per word. Later move heavy lifting or search into Postgres.
- Translations: Public domain + user-selectable modern ones (with proper attribution).

**Backend & Personalization (Supabase — full trust here)**
- **Supabase Postgres + Auth + Realtime + Storage**
  - User accounts (email + magic links to start)
  - Personal data: notes, highlights, saved passages/"rhema", reading plans, custom word lists, study collections
  - Powerful full-text + trigram search over your own notes + (later) the texts themselves
- Next.js Server Actions / Route Handlers + React Server Components for data fetching
- Edge Functions for any heavier processing (advanced morphological search, etc.)

**Why this stack?**
- Leverages your existing Supabase experience from Tangle.
- Fast iteration + excellent DX.
- Great free tier.
- Can stay mostly client + edge at first, then scale the data layer cleanly.
- Offline-friendly (bundle key texts + use local persistence).

**Hosting**
- Vercel (perfect pairing with Next.js)
- Supabase for the database/auth layer

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev
```

## Immediate next steps (the plan)

1. Expand structured data (full John 1 + a couple of key OT passages) using real MorphGNT/OSHB sources.
2. Wire Supabase (auth, user_notes, highlights tables + RLS).
3. Build proper interlinear + lexicon-style views.
4. Global search + morphological filters.
5. Reading plans + export.
6. Polish + mobile experience.

See the active TODOs in the code / this conversation for the detailed breakdown.

## Data licensing & accuracy note

We will only use properly licensed open data for original language texts (SBLGNT is CC-licensed with conditions; OSHB is public domain). Modern translations will be handled carefully (many require keys or have restrictions — we'll document everything).

## Let's build this

This is going to be a genuinely useful, reverent tool. I'm treating the data model, token accuracy, and context quality as first-class citizens.

Tell me priorities:
- More passages / specific book first?
- Get Supabase user layer live next?
- Focus on word studies / morphology?
- Something else?

I'm ready to keep shipping.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
