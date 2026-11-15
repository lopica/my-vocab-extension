import AvatarPopup from "./AvatarPopup"
import useToggle from "./hooks/useToggle"

export default function AvatarHeaderButton() {
  const { isShowing, toggle } = useToggle()

  return (
    <>
      <button onClick={toggle}>
        <span className="material-symbols-outlined text-[18px]">person</span>
      </button>
      <AvatarPopup isShowing={isShowing} hide={toggle} />
    </>
  )
}
