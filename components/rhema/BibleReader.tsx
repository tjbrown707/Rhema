'use client'

import React, { useState } from 'react'
import type { Passage, WordToken } from '@/lib/types'

interface BibleReaderProps {
  passage: Passage
  onWordClick?: (token: WordToken) => void
}

export function BibleReader({ passage, onWordClick }: BibleReaderProps) {
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {passage.verses.map((verse) => (
        <div
          key={verse.ref}
          className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/40"
          onClick={() => setSelectedVerse(verse.ref)}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-sm tracking-[1.5px] text-[var(--accent)]">{verse.ref}</div>
            {verse.translation && (
              <div className="text-xs text-[var(--text-muted)]">{verse.translation.source}</div>
            )}
          </div>

          {/* Original language */}
          <div className="mb-4">
            <div className="mb-1 text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">Original</div>
            <p className="greek text-xl leading-tight tracking-[-0.2px] text-[var(--greek)]">
              {verse.text}
            </p>
          </div>

          {/* English translation */}
          {verse.translation && (
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">English ({verse.translation.source})</div>
              <p className="passage-text text-[15.5px] leading-[1.7] text-[#d9d4c8]">
                {verse.translation.text}
              </p>
            </div>
          )}

          {/* Token chips for study (clickable words) */}
          {verse.tokens.length > 0 && (
            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <div className="mb-2 text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">Key words (tap for study)</div>
              <div className="flex flex-wrap gap-2">
                {verse.tokens.slice(0, 8).map((token) => (
                  <button
                    key={token.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onWordClick?.(token)
                    }}
                    className="word-btn rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-sm hover:border-[var(--accent)]"
                    title={token.gloss}
                  >
                    {token.text}
                    {token.strongs && <span className="ml-1 text-[10px] text-[var(--text-muted)]">({token.strongs})</span>}
                  </button>
                ))}
                {verse.tokens.length > 8 && (
                  <span className="self-center text-xs text-[var(--text-muted)]">+{verse.tokens.length - 8} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
