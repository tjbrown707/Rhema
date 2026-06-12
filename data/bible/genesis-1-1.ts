import type { Passage } from '@/lib/types'

// Hebrew example: Genesis 1:1 — the very first "beginning"
// This demonstrates the app's support for Hebrew (original language) + meaning + context.
// Real data would come from OSHB / morphhb with full morphology.

export const genesis11: Passage = {
  ref: 'Genesis 1:1',
  title: 'In the Beginning (Bereishit)',
  verses: [
    {
      book: 'Genesis',
      chapter: 1,
      verse: 1,
      ref: 'Genesis 1:1',
      language: 'he',
      text: 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃',
      tokens: [
        { id: 'gen1-1-1', text: 'בְּרֵאשִׁ֖ית', lemma: 'רֵאשִׁית', strongs: 'H7225', parsing: 'N-fs', gloss: 'beginning', position: 1 },
        { id: 'gen1-1-2', text: 'בָּרָ֣א', lemma: 'בָּרָא', strongs: 'H1254', parsing: 'V-qal-perf-3ms', gloss: 'created', position: 2 },
        { id: 'gen1-1-3', text: 'אֱלֹהִ֑ים', lemma: 'אֱלֹהִים', strongs: 'H430', parsing: 'N-mp', gloss: 'God', position: 3 },
        { id: 'gen1-1-4', text: 'אֵ֥ת', lemma: 'אֵת', strongs: 'H853', parsing: 'part-acc', gloss: '(accusative marker)', position: 4 },
        { id: 'gen1-1-5', text: 'הַשָּׁמַ֖יִם', lemma: 'שָׁמַיִם', strongs: 'H8064', parsing: 'N-mp', gloss: 'heavens', position: 5 },
        { id: 'gen1-1-6', text: 'וְ', lemma: 'וְ', strongs: 'H853', parsing: 'conj', gloss: 'and', position: 6 },
        { id: 'gen1-1-7', text: 'אֵ֥ת', lemma: 'אֵת', strongs: 'H853', parsing: 'part-acc', gloss: '(accusative marker)', position: 7 },
        { id: 'gen1-1-8', text: 'הָאָֽרֶץ', lemma: 'אֶרֶץ', strongs: 'H776', parsing: 'N-fs', gloss: 'earth', position: 8 },
      ],
      translation: {
        source: 'ESV',
        text: 'In the beginning, God created the heavens and the earth.',
      },
    },
  ],
  insights: [
    {
      id: 'bereishit',
      ref: 'Genesis 1:1',
      title: 'Bereishit — “In the beginning”',
      content: 'The very first word of the Bible is בְּרֵאשִׁית (bereishit). It combines the preposition “in” + “head/first”. Jewish tradition notes it can be read as “In the beginning of…” leaving the sentence open. The act of creation is tied to God’s word (dabar) going forth — a foundational rhema.',
      relatedWords: ['בְּרֵאשִׁית', 'בָּרָא', 'דָּבָר'],
    },
  ],
  contextNotes: [
    {
      id: 'gen1-context',
      ref: 'Genesis 1:1',
      category: 'literary',
      title: 'Genesis 1 as Structured Poetry',
      content: 'Genesis 1 is not a modern scientific report but a highly structured liturgical poem. It uses repetition, parallelism, and the number 7 to portray God bringing order out of chaos. The “days” frame a temple-building motif — God “rests” in his creation as in a sanctuary.',
      sources: ['John Walton, The Lost World of Genesis One', 'Hebrew Bible scholarship on priestly source'],
    },
    {
      id: 'hebrew-context',
      ref: 'Genesis 1:1',
      category: 'cultural',
      title: 'Ancient Near Eastern Context',
      content: 'Other creation stories in the ANE (Enuma Elish, Atrahasis) depict creation through conflict and violence among gods. Genesis 1 presents a sovereign, good God who speaks order into being by his word alone — a polemic against surrounding myths.',
      sources: ['ANE comparative studies', 'Walton, Lost World series'],
    },
  ],
}
