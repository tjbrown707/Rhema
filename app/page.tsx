"use client";

import React, { useState } from 'react';
import { passages, defaultPassageKey } from '@/data/bible';
import { BibleReader } from '@/components/rhema/BibleReader';
import { WordStudy } from '@/components/rhema/WordStudy';
import { ContextPanel } from '@/components/rhema/ContextPanel';
import type { WordToken } from '@/lib/types';

const passageKeys = Object.keys(passages) as (keyof typeof passages)[];
const initialPassage = passages[defaultPassageKey];

export default function RhemaApp() {
  const [currentKey, setCurrentKey] = useState<keyof typeof passages>(defaultPassageKey);
  const [activeTab, setActiveTab] = useState<'read' | 'words' | 'context' | 'notes'>('read');
  const [selectedWord, setSelectedWord] = useState<WordToken | null>(null);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  const passage = passages[currentKey];

  const handleWordClick = (token: WordToken) => {
    setSelectedWord(token);
    setActiveTab('words');
  };

  const saveLocalNote = (text: string) => {
    const updated = { ...userNotes, [currentKey]: text };
    setUserNotes(updated);
    // In production this will sync to Supabase
    localStorage.setItem('rhema-user-notes', JSON.stringify(updated));
  };

  const currentNote = userNotes[currentKey] || '';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#0a0c12]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0c12]/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold tracking-[-1.5px]">Rhema</span>
              <span className="text-[10px] font-mono tracking-[2px] text-[var(--accent)]/70">ῥῆμα</span>
            </div>
            <span className="text-[10px] px-2 py-px rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)] font-medium">ALPHA</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a href="https://github.com/tjbrown707/Rhema" target="_blank" className="text-[var(--text-muted)] hover:text-[var(--text)]">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <div className="text-[10px] tracking-[3.5px] text-[var(--accent)] mb-2">ORIGINAL LANGUAGES • MEANING • CONTEXT</div>
        <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-2.8px] mb-3">Rhema</h1>
        <p className="max-w-lg mx-auto text-[17px] text-[var(--text-muted)]">
          A serious study tool for the Bible in the languages it was written, so you can understand what it meant — and what it means.
        </p>
      </header>

      {/* Passage picker */}
      <div className="max-w-5xl mx-auto px-6 mb-4">
        <div className="flex flex-wrap gap-2">
          {passageKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                setCurrentKey(key);
                setSelectedWord(null);
                setActiveTab('read');
              }}
              className={`chip px-4 py-1.5 text-sm rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] ${currentKey === key ? 'active' : ''}`}
            >
              {passages[key].ref}
            </button>
          ))}
          <span className="self-center text-xs text-[var(--text-muted)] ml-3">Greek + Hebrew • full canon ingestion next</span>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 pb-20 flex-1">
        <div className="study-card rounded-3xl p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <div className="font-mono text-xs tracking-[2px] text-[var(--accent)]">{passage.ref}</div>
              <h2 className="text-4xl font-semibold tracking-tight mt-1">{passage.title}</h2>
            </div>
            <div className="text-sm text-[var(--text-muted)]">Greek New Testament • Original context focus</div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--border)] mb-6">
            {(['read', 'words', 'context', 'notes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab ? 'border-[var(--accent)] text-[var(--text)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'}`}
              >
                {tab === 'read' && 'Read'}
                {tab === 'words' && 'Words & Meaning'}
                {tab === 'context' && 'Original Context'}
                {tab === 'notes' && 'My Study'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'read' && (
            <BibleReader passage={passage} onWordClick={handleWordClick} />
          )}

          {activeTab === 'words' && (
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <div className="mb-3 text-xs uppercase tracking-[1.5px] text-[var(--accent)]">Interactive Reader (tap words)</div>
                <BibleReader passage={passage} onWordClick={handleWordClick} />
              </div>
              <div className="md:col-span-2">
                <div className="mb-3 text-xs uppercase tracking-[1.5px] text-[var(--accent)]">Word Study</div>
                <WordStudy token={selectedWord} onClose={() => setSelectedWord(null)} />
                {!selectedWord && (
                  <div className="text-sm text-[var(--text-muted)] border border-[var(--border)] rounded-xl p-5">
                    Click any Greek word in the reader to see morphology, gloss, and usage. Real data from MorphGNT coming next.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <ContextPanel insights={passage.insights} contextNotes={passage.contextNotes} />
          )}

          {activeTab === 'notes' && (
            <div>
              <div className="mb-3 text-xs uppercase tracking-[1.5px] text-[var(--accent)]">Personal notes for {passage.ref}</div>
              <textarea
                value={currentNote}
                onChange={(e) => saveLocalNote(e.target.value)}
                placeholder="Record what God is saying to you through this text. Observations on the Greek, historical background, how the rhema is landing in your life right now..."
                className="w-full min-h-[220px] resize-y bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-[15px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-muted)] mt-2">Saved in your browser for now. Will sync to your Supabase account soon.</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-[var(--text-muted)]">
          This is an early, high-fidelity prototype. The goal is reverent, accurate, beautiful software that helps serious students hear what was actually said in the original languages.
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--text-muted)]">
        Rhema • {new Date().getFullYear()} • <a href="https://github.com/tjbrown707/Rhema" className="underline hover:text-[var(--text)]">Source on GitHub</a>
      </footer>
    </div>
  );
}
