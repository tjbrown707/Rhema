'use client'

import type { ContextNote, RhemaInsight } from '@/lib/types'

interface ContextPanelProps {
  insights: RhemaInsight[]
  contextNotes: ContextNote[]
}

export function ContextPanel({ insights, contextNotes }: ContextPanelProps) {
  return (
    <div className="space-y-6">
      {insights.length > 0 && (
        <div>
          <div className="uppercase tracking-[1.5px] text-xs text-[var(--accent)] mb-2">Rhema Insights</div>
          {insights.map((insight) => (
            <div key={insight.id} className="study-card rounded-xl p-5 mb-3">
              <div className="font-semibold text-[var(--accent)] mb-1.5">{insight.title}</div>
              <p className="text-sm leading-relaxed text-[#d9d4c8]">{insight.content}</p>
            </div>
          ))}
        </div>
      )}

      {contextNotes.length > 0 && (
        <div>
          <div className="uppercase tracking-[1.5px] text-xs text-[var(--accent)] mb-2">Original Context</div>
          {contextNotes.map((note) => (
            <div key={note.id} className="study-card rounded-xl p-5 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="uppercase text-[10px] tracking-widest bg-[var(--surface-2)] px-2 py-0.5 rounded text-[var(--accent)]">{note.category}</span>
                <span className="font-medium text-sm">{note.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#d9d4c8]">{note.content}</p>
              {note.sources && note.sources.length > 0 && (
                <div className="mt-3 text-[10px] text-[var(--text-muted)]">Sources: {note.sources.join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
