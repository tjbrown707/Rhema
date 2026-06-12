import type { Passage } from '@/lib/types'

// High-quality demo data for John 1:1-5
// In production we will ingest real structured data from MorphGNT / OSHB + aligned translations.
// This is accurate enough for the prototype and illustrates the vision.

export const john1: Passage = {
  ref: 'John 1:1-5',
  title: 'The Eternal Word (Logos)',
  verses: [
    {
      book: 'John',
      chapter: 1,
      verse: 1,
      ref: 'John 1:1',
      language: 'gr',
      text: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
      tokens: [
        { id: 'j1-1-1', text: 'Ἐν', lemma: 'ἐν', strongs: 'G1722', parsing: 'PREP', gloss: 'in', position: 1 },
        { id: 'j1-1-2', text: 'ἀρχῇ', lemma: 'ἀρχή', strongs: 'G746', parsing: 'N-DSF', gloss: 'beginning', position: 2 },
        { id: 'j1-1-3', text: 'ἦν', lemma: 'εἰμί', strongs: 'G1510', parsing: 'V-IAI-3S', gloss: 'was', position: 3 },
        { id: 'j1-1-4', text: 'ὁ', lemma: 'ὁ', strongs: 'G3588', parsing: 'T-NSM', gloss: 'the', position: 4 },
        { id: 'j1-1-5', text: 'λόγος', lemma: 'λόγος', strongs: 'G3056', parsing: 'N-NSM', gloss: 'word', position: 5 },
        // ... (truncated for brevity in prototype — real data will have full tokenization)
      ],
      translation: {
        source: 'ESV',
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
      },
    },
    {
      book: 'John',
      chapter: 1,
      verse: 2,
      ref: 'John 1:2',
      language: 'gr',
      text: 'οὗτος ἦν ἐν ἀρχῇ πρὸς τὸν θεόν.',
      tokens: [
        { id: 'j1-2-1', text: 'οὗτος', lemma: 'οὗτος', strongs: 'G3778', parsing: 'RD-NSM', gloss: 'this one', position: 1 },
        { id: 'j1-2-2', text: 'ἦν', lemma: 'εἰμί', strongs: 'G1510', parsing: 'V-IAI-3S', gloss: 'was', position: 2 },
      ],
      translation: {
        source: 'ESV',
        text: 'He was in the beginning with God.',
      },
    },
    // Verses 3-5 abbreviated for prototype. In real version we'll have complete accurate token data.
  ],
  insights: [
    {
      id: 'logos-rhema',
      ref: 'John 1:1-5',
      title: 'Logos vs. Rhema',
      content: 'John deliberately chooses "logos" (λόγος) for the eternal, divine, creative Reason that was with God and was God. Rhema (ῥῆμα) in the New Testament often emphasizes the spoken, personal, living word that proceeds from God to a person (see Matt 4:4). Both are important: the written logos gives us the rhema that transforms us.',
      relatedWords: ['λόγος', 'ῥῆμα'],
    },
  ],
  contextNotes: [
    {
      id: 'john-prologue',
      ref: 'John 1:1-5',
      category: 'literary',
      title: 'The Prologue as a Hymn',
      content: 'Scholars widely recognize John 1:1-18 as an early Christian hymn or poetic prologue. It deliberately echoes Genesis 1 ("In the beginning...") and Proverbs 8 (Wisdom personified). The structure moves from eternity past → creation → incarnation → response.',
      sources: ['Craig Keener, The Gospel of John (commentary)', 'D.A. Carson, The Gospel according to John'],
    },
    {
      id: 'logos-hellenistic',
      ref: 'John 1:1',
      category: 'historical',
      title: 'Logos in the Ancient World',
      content: 'In Greek philosophy (Heraclitus, Stoics), logos was the rational principle ordering the universe. Philo of Alexandria (Jewish contemporary of Jesus) blended it with Hebrew "dabar" (word). John’s use is both continuous and radically subversive: the logos is not an impersonal force — it is a person who became flesh.',
      sources: ['Philo, On the Creation', 'Heraclitus fragments'],
    },
  ],
}
