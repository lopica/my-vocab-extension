import Dexie, { type EntityTable } from "dexie"

import type { VocabularyCard } from "~types"

export const db = new Dexie("VocabDatabase") as Dexie & {
  words: EntityTable<VocabularyCard, "id">
}

db.version(1).stores({
  words: "id, &word, createdAt"
})

db.version(2).stores({
  words: "id, &wordOrPhrase, createdAt"
})
