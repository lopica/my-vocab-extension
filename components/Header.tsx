import basketIcon from "~assets/icon.png"
import DeleteAllButton from "./DeleteAllButton"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "~db"

export default function Header() {
  const wordCount = useLiveQuery(() => db.words.count(), [], 0)

    return <header className="fixed top-0 w-full z-50 glass-header pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-gutter max-w-[440px] mx-auto w-full">
          <div className="flex items-center gap-gutter min-w-0">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/15 flex items-center justify-center shadow-sm flex-shrink-0 p-1 border border-primary/20">
              <img
                src={basketIcon}
                alt="Giỏ Từ"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface tracking-tight truncate font-semibold">
                  Giỏ Từ
                </span>
                {wordCount !== 0 && <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  {wordCount}
                </span>}
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Nơi chứa từ của bạn
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs flex-shrink-0">
            {/* <!-- Delete / Clear all words button --> */}
            <DeleteAllButton />
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>
}