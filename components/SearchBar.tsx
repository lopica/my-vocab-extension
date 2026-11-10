import { useStorage } from "@plasmohq/storage/hook"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useStorage("search_query", "")

  return (
    // Thêm: sticky top-20 z-30 backdrop-blur-md shadow-sm
    <div className="glass-card sticky top-20 z-30 flex items-center rounded-xl bg-[#fdfaf7]/85 shadow-sm backdrop-blur-md">
      <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">
        search
      </span>
      <input
        className="w-full bg-transparent py-2.5 pl-9 pr-9 font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none"
        placeholder="Search saved words..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Bonus: Nút X nhỏ để xóa nhanh từ khóa đang tìm */}
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="absolute right-3 flex items-center text-outline hover:text-on-surface">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  )
}
