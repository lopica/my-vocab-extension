import VoiceDropdown from "./VoiceDropdown"

export default function VoiceSetting() {
  return (
    <section className="glass-card relative flex flex-col gap-space-md overflow-hidden rounded-2xl p-space-lg shadow-sm">
      {/* Subtle warm glow edge */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-primary-fixed/30 blur-2xl"></div>

      {/* Header */}
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]">
              record_voice_over
            </span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Giọng đọc phát âm
            </h2>
            {/* <p className="font-body-sm text-body-sm text-on-surface-variant">
              Chrome Web Speech API tích hợp sẵn
            </p> */}
          </div>
        </div>
        {/* <span className="bg-secondary-fixed/50 rounded-md px-2 py-0.5 font-label-sm text-label-sm font-bold text-secondary">
          API Chrome
        </span> */}
      </div>

      {/* Voice Dropdown + Rate Slider + Preview — tất cả dùng chung hook qua VoiceDropdown */}
      <VoiceDropdown />
    </section>
  )
}
