import Dexie, { type EntityTable } from "dexie"
import type { VocabularyWord } from "~types"

export const db = new Dexie("VocabDatabase") as Dexie & {
  words: EntityTable<VocabularyWord, "id">
}

db.version(1).stores({
  words: "id, &word, createdAt"
})