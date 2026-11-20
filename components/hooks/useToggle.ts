import { useState } from "react"

/**
 * Logic bật tắt
 */
export default function useToggle() {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  return { isShowing, toggle }
}
