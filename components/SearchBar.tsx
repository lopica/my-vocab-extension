import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export default function SearchBar() {
  const [_, setSearchQuery] = useStorage("search_query", "")
  const [searchInput, setSearchInput] = useState<string>("")

  useEffect(() => {
    const debounceFunc = setTimeout(() => setSearchQuery(searchInput), 300)
    return () => clearTimeout(debounceFunc)
  }, [searchInput])

  return (
    <div className="glass-card sticky top-20 z-30 flex items-center rounded-xl bg-[#fdfaf7]/85 shadow-sm backdrop-blur-md">
      <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">
        search
      </span>
      <input
        className="w-full bg-transparent py-2.5 pl-9 pr-9 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none"
        placeholder="Search saved words..."
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {/* Bonus: Nút X nhỏ để xóa nhanh từ khóa đang tìm */}
      {searchInput && (
        <button
          type="button"
          onClick={() => setSearchInput("")}
          className="absolute right-3 flex items-center text-outline hover:text-on-surface">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  )
}
