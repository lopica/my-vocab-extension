export default function ManualWord() {
  return (
    <div className="glass-input-bar sticky bottom-20 z-30 mt-space-xs rounded-2xl p-space-xs shadow-xl">
      <form className="flex items-center gap-space-xs" id="quick-add-form">
        <div className="relative flex-1">
          <input
            className="w-full rounded-xl border border-white/60 bg-white/70 py-2.5 pl-3.5 pr-8 font-body-sm text-body-sm text-on-surface shadow-inner transition-all placeholder:text-outline/70 focus:bg-white focus:outline-none"
            id="new-word-input"
            placeholder="Type a new word to save directly..."
            type="text"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
            id="auto-detect-btn"
            title="Detect from active tab selection"
            type="button">
            <span className="material-symbols-outlined text-[16px]">
              magic_button
            </span>
          </button>
        </div>
        <button
          className="flex h-10 items-center gap-1 rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 font-label-md text-label-md text-on-primary shadow-md transition-all hover:brightness-105 active:scale-95"
          type="submit">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="">Add</span>
        </button>
      </form>
    </div>
  )
}
