import AvatarPopup from "./AvatarPopup"
import useToggle from "./hooks/useToggle"

export default function AvatarHeaderButton() {
  const { isShowing, toggle } = useToggle()

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
      <button onClick={toggle}>
        <span className="material-symbols-outlined text-[18px]">person</span>
      </button>
      <AvatarPopup isShowing={isShowing} hide={toggle} />
    </div>
  )
}
