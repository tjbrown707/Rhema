"use client";

import React, { useState, useEffect } from 'react';

// Demo passages focused on original language + context (expandable)
const PASSAGES = {
  'John 1:1-5': {
    ref: 'John 1:1-5',
    title: 'The Eternal Word',
    en: 'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through him, and without him was not any thing made that was made. In him was life, and the life was the light of men. The light shines in the darkness, and the darkness has not overcome it.',
    gr: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος. οὗτος ἦν ἐν ἀρχῇ πρὸς τὸν θεόν. πάντα δι’ αὐτοῦ ἐγένετο, καὶ χωρὶς αὐτοῦ ἐγένετο οὐδὲ ἕν ὃ γέγονεν. ἐν αὐτῷ ζωὴ ἦν, καὶ ἡ ζωὴ ἦν τὸ φῶς τῶν ἀνθρώπων. καὶ τὸ φῶς ἐν τῇ σκοτίᾳ φαίνει, καὶ ἡ σκοτία αὐτὸ οὐ κατέλαβεν.',
    insight: 'Logos (λόγος) here carries the full weight of divine reason and eternal order. Rhema (ῥῆμα) often points to the spoken, personal, living utterance — the word that comes to you. This passage is the foundation for both.',
    words: [
      { word: 'λόγος', meaning: 'logos — word, reason, account, divine expression', note: 'The pre-existent, creative intelligence of God.' },
      { word: 'ἀρχῇ', meaning: 'archē — beginning, origin, first principle', note: 'Not just time, but the ultimate source and ruler.' },
      { word: 'κατέλαβεν', meaning: 'katelaben — seized, comprehended, overcame', note: 'Darkness could not seize or extinguish the light.' },
    ],
  },
  'Matthew 4:4': {
    ref: 'Matthew 4:4',
    title: 'Man shall not live by bread alone',
    en: 'But he answered, “It is written, ‘Man shall not live by bread alone, but by every word that comes from the mouth of God.’”',
    gr: 'ὁ δὲ ἀποκριθεὶς εἶπεν· Γέγραπται· Οὐκ ἐπ’ ἄρτῳ μόνῳ ζήσεται ὁ ἄνθρωπος, ἀλλ’ ἐπὶ παντὶ ῥήματι ἐκπορευομένῳ διὰ στόματος θεοῦ.',
    insight: 'Here Jesus quotes Deuteronomy using rhema (ῥῆμα): the word that proceeds out of the mouth of God. Not abstract text alone — the living, spoken utterance that sustains life.',
    words: [
      { word: 'ῥήματι', meaning: 'rhēmati (dative of rhema) — by (every) spoken word / utterance', note: 'The precise term the app is named after. The personal, proceeding word.' },
      { word: 'ἐκπορευομένῳ', meaning: 'ekporeuomenō — proceeding, going out, coming forth', note: 'Emphasizes ongoing, active coming from God’s mouth.' },
    ],
  },
};

type PassageKey = keyof typeof PASSAGES;

export default function Rhema() {
  const [currentKey, setCurrentKey] = useState<PassageKey>('John 1:1-5');
  const [selectedWord, setSelectedWord] = useState<{ word: string; meaning: string; note: string } | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const passage = PASSAGES[currentKey];

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rhema-notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Persist notes
  const saveNote = (text: string) => {
    const updated = { ...notes, [currentKey]: text };
    setNotes(updated);
    localStorage.setItem('rhema-notes', JSON.stringify(updated));
  };

  const currentNote = notes[currentKey] || '';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#0a0c12]/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold tracking-[-1.5px] text-[var(--text)]">Rhema</span>
              <span className="text-[10px] font-mono tracking-[2px] text-[var(--accent)]/70">ῥῆμα</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]">EARLY</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#reader" className="hover:text-[var(--accent)] transition-colors">Read</a>
            <a href="#study" className="hover:text-[var(--accent)] transition-colors">Study</a>
            <a 
              href="https://github.com/tjbrown707/Rhema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero / Mission */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[3px] text-[var(--accent)] mb-3">THE SPOKEN WORD IN CONTEXT</div>
        <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-2.5px] mb-4">Rhema</h1>
        <p className="max-w-md mx-auto text-xl text-[var(--text-muted)] leading-tight">
          A Bible study app for understanding Scripture in its original context and language.
        </p>
        <p className="mt-3 text-sm text-[var(--accent-dim)]">Encounter the Word as it was spoken.</p>
      </header>

      {/* Passage selector */}
      <div className="max-w-5xl mx-auto px-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PASSAGES) as PassageKey[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setCurrentKey(key);
                setSelectedWord(null);
              }}
              className={`chip px-4 py-1.5 text-sm rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] ${currentKey === key ? 'active' : ''}`}
            >
              {key}
            </button>
          ))}
          <div className="text-[10px] self-center text-[var(--text-muted)] ml-2">More passages coming soon</div>
        </div>
      </div>

      {/* Main Reader */}
      <section id="reader" className="max-w-5xl mx-auto px-6 pb-16">
        <div className="study-card rounded-2xl p-8 md:p-10">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="font-mono text-xs tracking-[2px] text-[var(--accent)]">{passage.ref}</div>
              <h2 className="text-4xl font-semibold tracking-[-1px] mt-1">{passage.title}</h2>
            </div>
            <div className="text-right text-xs text-[var(--text-muted)] hidden sm:block">
              Greek • English<br />Original context
            </div>
          </div>

          {/* English */}
          <div className="mb-8">
            <div className="uppercase tracking-[1.5px] text-[10px] text-[var(--accent)] mb-2">English (ESV)</div>
            <p className="passage-text text-[17px] leading-[1.75] text-[#d9d4c8]">
              {passage.en}
            </p>
          </div>

          {/* Greek */}
          <div className="mb-8">
            <div className="flex items-center gap-2 uppercase tracking-[1.5px] text-[10px] text-[var(--accent)] mb-2">
              <span>Original Greek</span>
              <span className="font-sans text-[9px] normal-case tracking-normal text-[var(--text-muted)]">(Interlinear focus coming)</span>
            </div>
            <p className="greek text-[17px] leading-[1.7] select-text">
              {passage.gr}
            </p>
          </div>

          {/* Rhema Insight */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[var(--accent)]">✦</span>
              <span className="uppercase tracking-[1px] text-xs text-[var(--accent)]">Rhema Insight</span>
            </div>
            <p className="text-[15px] leading-relaxed text-[#d9d4c8]">{passage.insight}</p>
          </div>

          {/* Word study tools */}
          <div id="study">
            <div className="uppercase tracking-[1.5px] text-[10px] text-[var(--accent)] mb-3">Tap a word for study</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {passage.words.map((w, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedWord(w)}
                  className="word-btn bg-[var(--surface-2)] border border-[var(--border)] px-3 py-1 text-sm font-medium hover:border-[var(--accent)]"
                >
                  {w.word}
                </button>
              ))}
            </div>

            {selectedWord && (
              <div className="study-card rounded-xl p-5 text-sm">
                <div className="font-medium text-[var(--accent)] mb-1">{selectedWord.word}</div>
                <div className="mb-2 text-[#d9d4c8]">{selectedWord.meaning}</div>
                <div className="text-[var(--text-muted)] text-xs leading-snug">{selectedWord.note}</div>
                <button 
                  onClick={() => setSelectedWord(null)} 
                  className="mt-3 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  close
                </button>
              </div>
            )}
          </div>

          {/* Personal notes */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <div className="uppercase tracking-[1px] text-xs text-[var(--accent)]">Your notes on this passage</div>
              <div className="text-[10px] text-[var(--text-muted)]">saved locally</div>
            </div>
            <textarea
              value={currentNote}
              onChange={(e) => saveNote(e.target.value)}
              placeholder="What is God speaking to you here? Observations from the Greek, historical context, how this rhema lands today..."
              className="w-full h-28 resize-y bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </section>

      {/* Mission footer */}
      <footer className="mt-auto border-t border-[var(--border)] py-10">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-[var(--text-muted)] space-y-1">
          <p>Rhema exists to help people read Scripture in the languages it was written, in the world it was written for, so the living word can speak today.</p>
          <p className="pt-2">Early prototype • <a href="https://github.com/tjbrown707/Rhema" target="_blank" className="underline hover:text-[var(--text)]">github.com/tjbrown707/Rhema</a></p>
        </div>
      </footer>
    </div>
  );
}
