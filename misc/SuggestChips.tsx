export default function SuggestChips() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-space-xs flex items-center gap-1 text-outline">
        <span className="material-symbols-outlined text-[14px]">lightbulb</span>
        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">
          Gợi ý từ hay bắt đầu
        </span>
      </div>
      <div
        className="flex w-full flex-wrap items-center justify-center gap-space-xs pt-1"
        id="sample-chips-container">
        <button
          className="sample-chip bg-secondary-fixed/40 hover:bg-secondary-fixed text-on-secondary-fixed group inline-flex items-center gap-1 rounded-full px-3 py-1.5 shadow-sm transition-all duration-200 active:scale-95"
          data-meaning="Sự may mắn bất ngờ khi tìm thấy điều quý giá"
          data-sample="Serendipity"
          type="button">
          <span className="material-symbols-outlined text-[14px] text-secondary transition-transform group-hover:rotate-90">
            add
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            Serendipity
          </span>
        </button>
        <button
          className="sample-chip bg-tertiary-fixed/40 hover:bg-tertiary-fixed text-on-tertiary-fixed group inline-flex items-center gap-1 rounded-full px-3 py-1.5 shadow-sm transition-all duration-200 active:scale-95"
          data-meaning="Phù du, chỉ kéo dài trong khoảnh khắc ngắn ngủi"
          data-sample="Ephemeral"
          type="button">
          <span className="material-symbols-outlined text-[14px] text-tertiary transition-transform group-hover:rotate-90">
            add
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            Ephemeral
          </span>
        </button>
        <button
          className="sample-chip group inline-flex items-center gap-1 rounded-full bg-primary-fixed/40 px-3 py-1.5 text-on-primary-fixed shadow-sm transition-all duration-200 hover:bg-primary-fixed active:scale-95"
          data-meaning="Tinh hoa nhất, đại diện tiêu biểu hoàn hảo nhất"
          data-sample="Quintessential"
          type="button">
          <span className="material-symbols-outlined text-[14px] text-primary transition-transform group-hover:rotate-90">
            add
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            Quintessential
          </span>
        </button>
      </div>
    </div>
  )
}
