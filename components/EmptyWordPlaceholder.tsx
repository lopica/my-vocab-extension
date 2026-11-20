import basket from "~assets/icon.png"
import SuggestChips from "~misc/SuggestChips"

/**
 * Phần hiện thị khi không có thẻ từ nào
 */
export default function EmptyWordPlaceholder() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-surface-container-lowest/80 p-space-lg text-center shadow-xl">
      {/* <!-- Warm Ambient Radial Backlight Glow --> */}
      <div className="pointer-events-none absolute -top-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-secondary-container/25 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-10 top-1/4 h-36 w-36 rounded-full bg-primary-fixed/30 blur-2xl"></div>
      {/* <!-- Basket Illustration Badge --> */}
      <div className="relative mb-space-md mt-space-xs">
        <div className="bg-secondary-fixed/30 flex h-24 w-24 items-center justify-center rounded-full p-3 shadow-inner">
          <img
            alt="Giỏ mây đựng từ vựng"
            className="h-full w-full animate-pulse object-contain drop-shadow-md filter"
            src={basket}
            style={{ animationDuration: "4s" }}
          />
        </div>
        {/* <!-- Subtle Floating Star Sparkle --> */}
        <span
          className="material-symbols-outlined absolute -right-1 -top-1 animate-bounce text-[22px] text-secondary"
          style={{
            animationDuration: "2.5s",
            fontVariationSettings: "'FILL' 1"
          }}>
          auto_awesome
        </span>
      </div>
      {/* <!-- Empty State Copy --> */}
      <h2 className="mb-space-xs font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
        Giỏ từ đang trống
      </h2>
      <p className="mb-space-lg max-w-[320px] font-body-md text-body-md leading-relaxed text-on-surface-variant">
        Bạn chưa lưu từ vựng nào. Hãy bôi đen từ trên bất kỳ trang web nào và
        chọn{" "}
        <span className="font-semibold text-primary">"Thêm vào Giỏ Từ"</span> từ
        menu chuột phải, hoặc gõ từ vào thanh bên dưới để thêm ngay!
      </p>
      {/* <!-- Quick Instruction Step Pill --> */}
      <div className="mb-space-lg flex w-full items-center gap-space-md rounded-xl bg-surface-container-low/90 p-space-md text-left shadow-sm">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
          <span className="material-symbols-outlined text-[20px]">
            ads_click
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
            Mẹo đọc nhanh
          </span>
          <p className="truncate font-body-sm text-body-sm text-on-surface-variant">
            Bôi đen từ → Chuột phải → Lưu vào Giỏ Từ
          </p>
        </div>
      </div>
      {/* <!-- Suggested Sample Words Carousel/Chips --> */}
      {/* <SuggestChips /> */}
    </div>
  )
}
