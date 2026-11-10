import { useStorage } from "@plasmohq/storage/hook"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useStorage("search_query", "")

  return (
    // Thêm: sticky top-20 z-30 backdrop-blur-md shadow-sm
    <div className="sticky top-20 z-30 flex items-center glass-card backdrop-blur-md bg-[#fdfaf7]/85 rounded-xl shadow-sm">
      <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
        search
      </span>
      <input
        className="w-full pl-9 pr-9 py-2.5 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none"
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
          className="absolute right-3 flex items-center text-outline hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  )
}