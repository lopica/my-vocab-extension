export default function DeleteBar() {
  return (
    <div className="glass-card flex items-center justify-between rounded-xl px-space-md py-space-sm">
      <div className="flex items-center gap-space-xs">
        <span
          className="material-symbols-outlined text-[18px] text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}>
          bookmarks
        </span>
        <span className="font-label-md text-label-md text-on-surface">
          12 words saved
        </span>
      </div>
      <div className="flex items-center gap-space-xs">
        <button
          className="flex items-center gap-1 rounded px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary transition-colors hover:bg-error-container/30"
          id="strip-clear-all"
          title="Clear library">
          <span className="material-symbols-outlined text-[15px]">
            delete_sweep
          </span>
          <span className="">Clear All</span>
        </button>
      </div>
    </div>
  )
}
