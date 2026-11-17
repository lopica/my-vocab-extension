import useVoiceSetting from "./hooks/useVoiceSetting"

export default function VoiceDropdown() {
  const {
    groupedOptions,
    selectedOption,
    speechRate,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    isPlaying,
    sampleText,
    selectVoice,
    handleRateChange,
    previewSpeech,
    dropdownRef
  } = useVoiceSetting()

  return (
    <>
      {/* <!-- Dropdown Selector --> */}
      <div className="space-y-1.5" ref={dropdownRef}>
        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Giọng đọc đã chọn
        </label>

        {/* Trigger button */}
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface-container-low px-space-md py-2.5 shadow-sm transition-colors hover:bg-surface-container"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-base leading-none">
              {selectedOption?.flag ?? "🌐"}
            </span>
            <div className="flex min-w-0 flex-col text-left">
              <span className="truncate font-label-md text-label-md text-on-surface">
                {selectedOption
                  ? `${selectedOption.langLabel} — ${selectedOption.voice.name}`
                  : "Đang tải giọng đọc..."}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[20px] text-primary transition-transform duration-200">
            {isDropdownOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>

        {/* Dropdown panel */}
        {isDropdownOpen && (
          <div className="space-y-space-xs rounded-xl bg-surface-container-lowest p-space-sm shadow-xl">
            {/* Search voices */}
            <div className="relative mb-1 flex items-center">
              <span className="material-symbols-outlined absolute left-2.5 text-[16px] text-outline">
                search
              </span>
              <input
                className="w-full rounded-lg border-none bg-surface-container-low py-1.5 pl-8 pr-2 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                placeholder="Tìm theo ngôn ngữ hoặc mã quốc gia..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-2 text-outline hover:text-on-surface"
                  onClick={() => setSearchQuery("")}>
                  <span className="material-symbols-outlined text-[14px]">
                    close
                  </span>
                </button>
              )}
            </div>

            {/* Dropdown items list */}
            <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
              {groupedOptions.length === 0 && (
                <p className="py-4 text-center font-body-sm text-body-sm text-outline">
                  Không tìm thấy giọng đọc phù hợp
                </p>
              )}

              {groupedOptions.map(({ group, options }) => (
                <div key={group}>
                  {/* Group header */}
                  <div className="px-2 py-1 font-label-sm text-[10px] uppercase tracking-wider text-outline">
                    {group}
                  </div>

                  {/* Options */}
                  {options.map((opt) => {
                    const isSelected =
                      opt.voice.name === selectedOption?.voice.name
                    return (
                      <button
                        key={opt.voice.name}
                        type="button"
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg p-2 transition-colors ${
                          isSelected
                            ? "bg-primary-fixed/40"
                            : "hover:bg-surface-container-low"
                        }`}
                        onClick={() => selectVoice(opt.voice)}>
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="text-sm">{opt.flag}</span>
                          <div className="flex min-w-0 flex-col text-left">
                            <span
                              className={`truncate font-label-md text-label-md ${
                                isSelected
                                  ? "font-semibold text-on-primary-fixed"
                                  : "text-on-surface"
                              }`}>
                              {opt.langLabel}
                            </span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              {opt.voice.name}
                            </span>
                          </div>
                        </div>

                        {isSelected ? (
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                            <span className="material-symbols-outlined text-[14px]">
                              check
                            </span>
                          </div>
                        ) : (
                          <span className="material-symbols-outlined text-[18px] text-outline-variant">
                            radio_button_unchecked
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Speech Rate Slider */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
            Tốc độ phát âm:
          </span>
          <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label-sm text-label-sm font-bold text-primary">
            {(speechRate ?? 1.0).toFixed(2)}x
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-body-sm text-body-sm text-outline">0.75x</span>
          <input
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-highest accent-primary"
            max="1.25"
            min="0.75"
            step="0.05"
            type="range"
            value={speechRate ?? 1.0}
            onChange={handleRateChange}
          />
          <span className="font-body-sm text-body-sm text-outline">1.25x</span>
        </div>
      </div>

      {/* Sample Audio Preview Trigger */}
      <div className="pt-1">
        <button
          className="group flex w-full items-center justify-between rounded-xl bg-surface-container-low px-3.5 py-2.5 transition-all hover:bg-surface-container active:scale-[0.99]"
          type="button"
          onClick={previewSpeech}>
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              {!isPlaying ? (
                <span className="material-symbols-outlined text-[16px]">
                  volume_up
                </span>
              ) : (
                <span className="flex h-3 items-center gap-0.5 px-1">
                  <span className="h-2 w-0.5 animate-pulse bg-current"></span>
                  <span className="h-3 w-0.5 animate-bounce bg-current"></span>
                  <span className="h-1.5 w-0.5 animate-pulse bg-current"></span>
                </span>
              )}
            </div>
            <span className="truncate font-body-sm text-body-sm italic text-on-surface">
              "{sampleText}"
            </span>
          </div>
          <span className="flex-shrink-0 font-label-sm text-label-sm font-semibold text-primary">
            {isPlaying ? "Đang phát..." : "Nghe thử"}
          </span>
        </button>
      </div>
    </>
  )
}
