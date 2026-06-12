import type { Passage } from '@/lib/types'
import { john1 } from './john-1'

export const passages: Record<string, Passage> = {
  'john-1': john1,
  // Add more as we ingest real data (Genesis 1, Psalm 23, Romans 8, etc.)
}

export const defaultPassageKey = 'john-1'
