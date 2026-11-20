import AppSettingSection from "./AppSettingSection"
import BackHomeButton from "./BackHomeButton"
import VoiceSetting from "./VoiceSetting"

/**
 * Trang hiển thị cài đặt
 */
export default function SettingSection() {
  return (
    <>
      <BackHomeButton />
      <VoiceSetting />
      <AppSettingSection />
    </>
  )
}
