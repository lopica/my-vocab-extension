export default function BottomBar() {
  return (
    <nav className="pb-safe glass-nav fixed bottom-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-[440px] items-center justify-around px-gutter">
        <a
          aria-current="page"
          className="flex h-11 min-w-[56px] flex-col items-center justify-center gap-space-xs font-label-md text-primary transition-colors"
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
          className="flex h-11 min-w-[56px] flex-col items-center justify-center gap-space-xs text-on-surface-variant transition-colors hover:text-primary"
          data-path="study-deck"
          href="#">
          <span className="material-symbols-outlined text-[22px]">school</span>
          <span className="font-label-sm text-label-sm">Review</span>
        </a>
        <a
          className="flex h-11 min-w-[56px] flex-col items-center justify-center gap-space-xs text-on-surface-variant transition-colors hover:text-primary"
          data-path="extension-settings"
          href="#">
          <span className="material-symbols-outlined text-[22px]">tune</span>
          <span className="font-label-sm text-label-sm">Config</span>
        </a>
      </div>
    </nav>
  )
}
