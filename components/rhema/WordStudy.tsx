'use client'

import type { WordToken } from '@/lib/types'

interface WordStudyProps {
  token: WordToken | null
  onClose: () => void
}

export function WordStudy({ token, onClose }: WordStudyProps) {
  if (!token) return null

  return (
    <div className="study-card rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-medium tracking-tight text-[var(--greek)]">{token.text}</div>
          <div className="font-mono text-xs text-[var(--accent)] mt-0.5">{token.lemma} • {token.strongs}</div>
        </div>
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text)]">×</button>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        {token.parsing && (
          <div>
            <span className="text-[var(--accent)] text-xs tracking-widest">PARSING</span>
            <div className="text-[#d9d4c8]">{token.parsing}</div>
          </div>
        )}
        {token.gloss && (
          <div>
            <span className="text-[var(--accent)] text-xs tracking-widest">GLOSS</span>
            <div className="text-[#d9d4c8]">{token.gloss}</div>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-muted)]">
        Full morphological data + occurrences across Scripture will load here once we integrate the complete MorphGNT / OSHB datasets.
      </div>
    </div>
  )
}
