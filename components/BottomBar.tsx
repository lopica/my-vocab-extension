export default function BottomBar() {
    return <nav className="fixed bottom-0 w-full z-50 pb-safe glass-nav">
        <div className="flex justify-around items-center h-16 px-gutter max-w-[440px] mx-auto">
          <a
            aria-current="page"
            className="flex flex-col items-center justify-center gap-space-xs min-w-[56px] h-11 transition-colors text-primary font-label-md"
            data-path="saved-words"
            href="#">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <span className="font-label-sm text-label-sm">Words</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-space-xs min-w-[56px] h-11 text-on-surface-variant hover:text-primary transition-colors"
            data-path="study-deck"
            href="#">
            <span className="material-symbols-outlined text-[22px]">
              school
            </span>
            <span className="font-label-sm text-label-sm">Review</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-space-xs min-w-[56px] h-11 text-on-surface-variant hover:text-primary transition-colors"
            data-path="extension-settings"
            href="#">
            <span className="material-symbols-outlined text-[22px]">tune</span>
            <span className="font-label-sm text-label-sm">Config</span>
          </a>
        </div>
      </nav>
}