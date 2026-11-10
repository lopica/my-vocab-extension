import basket from "~assets/icon.png"
import SuggestChips from "~misc/SuggestChips"

export default function EmptyWordPlaceholder() {
  return (
    <div className="relative rounded-2xl bg-surface-container-lowest/80 shadow-xl p-space-lg flex flex-col items-center text-center overflow-hidden">
      {/* <!-- Warm Ambient Radial Backlight Glow --> */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 -right-10 w-36 h-36 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
      {/* <!-- Basket Illustration Badge --> */}
      <div className="relative mb-space-md mt-space-xs">
        <div className="w-24 h-24 rounded-full bg-secondary-fixed/30 flex items-center justify-center p-3 shadow-inner">
          <img
            alt="Giỏ mây đựng từ vựng"
            className="w-full h-full object-contain filter drop-shadow-md animate-pulse"
            src={basket}
            style={{ animationDuration: "4s" }}
          />
        </div>
        {/* <!-- Subtle Floating Star Sparkle --> */}
        <span
          className="material-symbols-outlined absolute -top-1 -right-1 text-secondary text-[22px] animate-bounce"
          style={{
            animationDuration: "2.5s",
            fontVariationSettings: "'FILL' 1"
          }}>
          auto_awesome
        </span>
      </div>
      {/* <!-- Empty State Copy --> */}
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight mb-space-xs">
        Giỏ từ đang trống
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg max-w-[320px]">
        Bạn chưa lưu từ vựng nào. Hãy bôi đen từ trên bất kỳ trang web nào và
        chọn{" "}
        <span className="font-semibold text-primary">"Thêm vào Giỏ Từ"</span> từ
        menu chuột phải, hoặc gõ từ vào thanh bên dưới để thêm ngay!
      </p>
      {/* <!-- Quick Instruction Step Pill --> */}
      <div className="w-full bg-surface-container-low/90 rounded-xl p-space-md mb-space-lg flex items-center gap-space-md text-left shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">
            ads_click
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
            Mẹo đọc nhanh
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
            Bôi đen từ → Chuột phải → Lưu vào Giỏ Từ
          </p>
        </div>
      </div>
      {/* <!-- Suggested Sample Words Carousel/Chips --> */}
      {/* <SuggestChips /> */}
    </div>
  )
}
