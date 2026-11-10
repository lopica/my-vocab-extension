export default function ManualWord() {
    return  <div className="sticky bottom-20 z-30 mt-space-xs glass-input-bar p-space-xs rounded-2xl shadow-xl">
            <form
              className="flex items-center gap-space-xs"
              id="quick-add-form">
              <div className="relative flex-1">
                <input
                  className="w-full bg-white/70 pl-3.5 pr-8 py-2.5 rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:bg-white transition-all shadow-inner border border-white/60"
                  id="new-word-input"
                  placeholder="Type a new word to save directly..."
                  type="text"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                  id="auto-detect-btn"
                  title="Detect from active tab selection"
                  type="button">
                  <span className="material-symbols-outlined text-[16px]">
                    magic_button
                  </span>
                </button>
              </div>
              <button
                className="h-10 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-label-md text-label-md flex items-center gap-1 shadow-md hover:brightness-105 active:scale-95 transition-all"
                type="submit">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                <span className="">Add</span>
              </button>
            </form>
          </div>
}