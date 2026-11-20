import basketIcon from "~assets/icon.png"

import AvatarHeaderButton from "./AvatarHeaderButton"
import DeleteAllButton from "./DeleteAllButton"
import useHeader from "./hooks/useHeader"

/**
 * Thanh đầu giao diện
 */
export default function Header() {
  const { wordCount, handleSeed, seedingText } = useHeader()

  return (
    <header className="glass-header pt-safe fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-16 w-full max-w-[440px] items-center justify-between gap-gutter px-margin">
        <div className="flex min-w-0 items-center gap-gutter">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-secondary-container/15 p-1 shadow-sm">
            <img
              src={basketIcon}
              alt="Giỏ Từ"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="truncate font-headline-md text-headline-md font-semibold tracking-tight text-on-surface">
                Giỏ Từ
              </span>
              {wordCount !== 0 && (
                <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label-sm text-label-sm font-bold text-on-primary-fixed">
                  {wordCount}
                </span>
              )}
            </div>
            <span className="truncate font-label-sm text-label-sm text-on-surface-variant">
              Nơi chứa từ của bạn
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-space-xs">
          {/* <!-- Delete / Clear all words button --> */}
          {/* <button
            type="button"
            onClick={handleSeed}
            disabled={!!seedingText}
            className="rounded-lg bg-primary/15 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/25"
            title="Tạo 1 triệu từ để test">
            {seedingText || "+1M"}
          </button> */}
          <DeleteAllButton />
          <AvatarHeaderButton />
        </div>
      </div>
    </header>
  )
}
