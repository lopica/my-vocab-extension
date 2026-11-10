export default function DeleteBar() {
    return <div className="flex items-center justify-between glass-card px-space-md py-space-sm rounded-xl">
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
                className="flex items-center gap-1 px-space-xs py-0.5 rounded text-tertiary hover:bg-error-container/30 transition-colors font-label-sm text-label-sm"
                id="strip-clear-all"
                title="Clear library">
                <span className="material-symbols-outlined text-[15px]">
                  delete_sweep
                </span>
                <span className="">Clear All</span>
              </button>
            </div>
          </div>
}