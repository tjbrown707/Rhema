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

          {/* Inline clickable Greek words + token list */}
          {verse.tokens.length > 0 && (
            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <div className="mb-2 text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">Original text — tap words for meaning</div>
              <p className="greek text-lg mb-4 leading-tight select-text">
                {verse.tokens.map((token, idx) => {
                  const isWord = token.strongs || token.lemma;
                  if (!isWord) return <span key={idx}>{token.text}</span>;
                  return (
                    <button
                      key={token.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onWordClick?.(token);
                      }}
                      className="word-btn mx-0.5 px-0.5 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] rounded transition-colors"
                      title={`${token.gloss || ''} ${token.strongs ? `(${token.strongs})` : ''}`}
                    >
                      {token.text}
                    </button>
                  );
                })}
              </p>

              <div className="text-[10px] uppercase tracking-[1.5px] text-[var(--accent)] mb-1.5">All words in verse</div>
              <div className="flex flex-wrap gap-1.5">
                {verse.tokens
                  .filter(t => t.strongs || t.lemma)
                  .map((token) => (
                    <button
                      key={token.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onWordClick?.(token);
                      }}
                      className="word-btn rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 text-xs hover:border-[var(--accent)]"
                    >
                      {token.text}
                      {token.strongs && <span className="ml-1 text-[var(--text-muted)]">{token.strongs}</span>}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
