import { useStorage } from "@plasmohq/storage/hook"

import { AUTO_OPEN_SETTING_KEY } from "~constants"

/**
 * Phần hiển thị cài đặt hành vi của extension
 */
export default function AppSettingSection() {
  const [autoOpen, setAutoOpen] = useStorage(AUTO_OPEN_SETTING_KEY, false)

  return (
    <section className="flex flex-col space-y-space-sm pb-4">
      <div className="flex items-center gap-1.5 px-1">
        <span className="material-symbols-outlined flex items-center justify-center text-[18px] text-primary">
          font_download
        </span>
        <h3 className="flex items-center pt-0.5 font-label-md text-label-md font-bold uppercase leading-none tracking-wider text-primary">
          Tương tác khi thêm từ
        </h3>
      </div>

      <div className="flex flex-col space-y-space-xs rounded-2xl bg-surface-container-lowest p-space-sm shadow-sm">
        <label className="group flex cursor-pointer items-start justify-between rounded-xl p-space-sm transition-colors hover:bg-surface-container-low">
          <div className="flex min-w-0 flex-1 flex-col pr-space-md">
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
              Mở extension tự động khi lưu từ
            </span>
            <span className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              Tự động mở giao diện ngay sau khi bấm lưu từ
            </span>
          </div>
          <div className="relative mt-1 inline-flex flex-shrink-0 items-center">
            <input
              className="peer sr-only"
              id="toggle-auto-pronounce"
              type="checkbox"
              checked={autoOpen}
              onChange={(e) => setAutoOpen(e.target.checked)}
            />
            <div className="peer h-6 w-12 rounded-full bg-surface-container-highest after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-on-primary after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-on-primary peer-focus:outline-none"></div>
          </div>
        </label>
      </div>
    </section>
  )
}
