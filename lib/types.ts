// Core domain types for Rhema — Bible study focused on original languages + context

export type Language = 'he' | 'gr' | 'ar' // Hebrew, Greek, Aramaic

export interface WordToken {
  id: string // e.g. "john-1-1-1"
  text: string // the actual Greek/Hebrew word as it appears
  lemma?: string // dictionary form
  strongs?: string // e.g. "G3056"
  parsing?: string // e.g. "N-NSF" or full description
  gloss?: string // basic English gloss
  position: number // word order in verse
}

export interface Verse {
  book: string // "John"
  chapter: number
  verse: number
  ref: string // "John 1:1"
  language: Language
  text: string // full verse text in original
  tokens: WordToken[]
  translation?: {
    source: string // "ESV" | "NASB" etc.
    text: string
  }
}

export interface ContextNote {
  id: string
  ref: string // "John 1:1-5" or specific verse
  category: 'historical' | 'cultural' | 'literary' | 'theological' | 'geographical'
  title: string
  content: string // rich explanation of original context
  sources?: string[]
}

export interface RhemaInsight {
  id: string
  ref: string
  title: string // e.g. "Logos vs Rhema"
  content: string
  relatedWords?: string[]
}

export interface UserNote {
  id?: string
  user_id: string
  ref: string
  content: string
  created_at?: string
  updated_at?: string
}

export interface Highlight {
  id?: string
  user_id: string
  ref: string
  word_ids?: string[] // which specific words highlighted
  color?: string
  note?: string
  created_at?: string
}

// For the data layer (initially static JSON/TS modules, later mixed with Supabase)
export interface Passage {
  ref: string
  title: string
  verses: Verse[]
  insights: RhemaInsight[]
  contextNotes: ContextNote[]
}
