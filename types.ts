/**
 * Bản ghi một thẻ từ vựng.
 *
 * - `id` - Định danh duy nhất do hệ thống sinh ra để phục vụ xóa/sửa, là UUID
 * - `word` - Từ vựng chính, có thể là một từ hoặc một cụm từ, sau này có thể sửa lại tên trường word cho đúng nghĩa hơn <TEMP>.
 * - `[phonetic]` - Phiên âm cho từ hoặc cụm từ, nó có thể là ipa hoặc phiên âm tiếng việt
 * - `[meaning]` - Ghi chú riêng của người dùng về từ hoặc cụm từ. Nó có thể là nghĩa, câu vd, hoàn cảnh dùng hoặc bất kỳ thông tin khác
 * - `sourceUrl` - URL gốc của trang web chứa từ vựng
 * - `sourceDomain` - Tên miền hiển thị trên UI
 * - `createdAt` - Thời gian lưu (số mili giây tính từ 1 tháng 1 1970)
 */
export interface VocabularyCard {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string
  /**
   * @example "serendipity, make up"
   */
  wordOrPhrase: string
  /**
   * @example "/ˌser.ənˈdɪp.ə.t̬i/, sơ-rưn-di-pơ-ti"
   */
  phonetic?: string
  /**
   * @example
   * - ngẫu hứng
   *
   * - There is a real element of serendipity in archaeology.
   *
   * - Từ này có sắc thái tích cực, có tính ngẫu nhiên
   *
   * ...
   */
  userNote?: string
  /**
   * @example "https://dictionary.cambridge.org/dictionary/english/serendipity"
   */
  sourceUrl: string
  /**
   * @example "https://dictionary.cambridge.org"
   */
  sourceDomain: string
  /**
   * @example "1700000000000"
   */
  createdAt: number
}

/**
 * Tên các màn trong extension
 * - `"home"`  Màn hình chính (hiển thị danh sách từ vựng đã lưu)
 * - `"setting"`  Màn hình cài đặt cấu hình extension
 */
export type Route = "home" | "setting"

/**
 * Sẽ cần bổ sung sau
 */
export interface VoiceOption {
  voice: SpeechSynthesisVoice
  flag: string
  langLabel: string
  group: string
}
