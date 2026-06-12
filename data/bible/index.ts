import type { Passage } from '@/lib/types'
import { john1 } from './john-1'
import { genesis11 } from './genesis-1-1'

export const passages: Record<string, Passage> = {
  'john-1': john1,
  'genesis-1-1': genesis11,
  // TODO: Ingest real full data from MorphGNT (Greek) + OSHB (Hebrew)
  // Sources: https://github.com/morphgnt/sblgnt , https://github.com/openscriptures/morphhb
}

export const defaultPassageKey = 'john-1'
