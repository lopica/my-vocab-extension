export interface VocabularyWord {
  id: string // Định danh duy nhất (VD: UUID) để phục vụ việc xóa/sửa
  word: string // Từ vựng chính
  phonetic?: string // Phiên âm (Nên để optional vì có thể không tra cứu được)
  meaning?: string // Định nghĩa hoặc ghi chú
  sourceUrl: string // URL gốc của trang web chứa từ vựng
  sourceDomain: string // Tên miền hiển thị trên UI
  createdAt: number // Thời gian lưu (Timestamp: mili-giây)
}
