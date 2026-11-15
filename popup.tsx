import RouteProvider from "~components/contexts/RouteContext"
import PopupContent from "~components/PopupContent"

function IndexPopup() {
  return (
    <RouteProvider>
      <PopupContent />
    </RouteProvider>
  )
}

export default IndexPopup
