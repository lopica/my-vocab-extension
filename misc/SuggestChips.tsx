export default function SuggestChips() {
    return <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-1 text-outline mb-space-xs">
          <span className="material-symbols-outlined text-[14px]">
            lightbulb
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            Gợi ý từ hay bắt đầu
          </span>
        </div>
        <div
          className="flex flex-wrap items-center justify-center gap-space-xs w-full pt-1"
          id="sample-chips-container">
          <button
            className="sample-chip group inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed text-on-secondary-fixed transition-all duration-200 active:scale-95 shadow-sm"
            data-meaning="Sự may mắn bất ngờ khi tìm thấy điều quý giá"
            data-sample="Serendipity"
            type="button">
            <span className="material-symbols-outlined text-[14px] text-secondary group-hover:rotate-90 transition-transform">
              add
            </span>
            <span className="font-body-sm text-body-sm font-medium">
              Serendipity
            </span>
          </button>
          <button
            className="sample-chip group inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tertiary-fixed/40 hover:bg-tertiary-fixed text-on-tertiary-fixed transition-all duration-200 active:scale-95 shadow-sm"
            data-meaning="Phù du, chỉ kéo dài trong khoảnh khắc ngắn ngủi"
            data-sample="Ephemeral"
            type="button">
            <span className="material-symbols-outlined text-[14px] text-tertiary group-hover:rotate-90 transition-transform">
              add
            </span>
            <span className="font-body-sm text-body-sm font-medium">
              Ephemeral
            </span>
          </button>
          <button
            className="sample-chip group inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-fixed/40 hover:bg-primary-fixed text-on-primary-fixed transition-all duration-200 active:scale-95 shadow-sm"
            data-meaning="Tinh hoa nhất, đại diện tiêu biểu hoàn hảo nhất"
            data-sample="Quintessential"
            type="button">
            <span className="material-symbols-outlined text-[14px] text-primary group-hover:rotate-90 transition-transform">
              add
            </span>
            <span className="font-body-sm text-body-sm font-medium">
              Quintessential
            </span>
          </button>
        </div>
      </div>
}