import { useLiveQuery } from "dexie-react-hooks"

import { db } from "~db"

import DeleteAllModal from "./DeleteAllModal"
import useToggle from "./hooks/useToggle"

export default function DeleteAllButton() {
  const wordCount = useLiveQuery(() => db.words.count(), [], 0)
  const { isShowing, toggle } = useToggle()

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant transition-all hover:bg-error-container/30 hover:text-error disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
        onClick={toggle}
        disabled={wordCount === 0}>
        <span className="material-symbols-outlined text-[20px]">
          delete_outline
        </span>
      </button>
      <DeleteAllModal isShowing={isShowing} hide={toggle} />
    </>
  )
}
