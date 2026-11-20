import RouteProvider from "~components/contexts/RouteContext"
import PopupContent from "~PopupContent"

/**
 * Phần khởi tạo gốc hiện thị của extension
 */
function IndexPopup() {
  return (
    <RouteProvider>
      <PopupContent />
    </RouteProvider>
  )
}

export default IndexPopup
