import "@fontsource-variable/plus-jakarta-sans"
import "@fontsource-variable/material-symbols-outlined"
import "~style.css"

import { useContext } from "react"

// Nhớ import Provider và Context của bạn vào đây (Sửa lại đường dẫn cho đúng)

import BottomBar from "~components/BottomBar"
import Header from "~components/Header"
import SearchBar from "~components/SearchBar"
import WordSection from "~components/WordSection"
import DeleteBar from "~misc/DeleteBar"
import ManualWord from "~misc/ManualWord"
import type { Route } from "~types"

import { RouteContext } from "./contexts/RouteContext"

// 1. Đưa toàn bộ giao diện cũ vào một component con
export default function PopupContent() {
  // Vì PopupContent nằm trong RouteProvider, ta có thể thoải mái gọi useContext
  const context = useContext(RouteContext)
  // Lấy ra state hiện tại (nếu context null thì mặc định là "home")
  const route: Route = context?.route || "home"

  return (
    <div className="relative flex min-h-[540px] w-[420px] flex-col bg-gradient-to-b from-[#fdfaf7] via-[#f7f0e8] to-[#f4ebe1] font-body-md text-on-surface selection:bg-primary-fixed selection:text-primary">
      <div className="pointer-events-none fixed -left-20 top-0 z-0 h-72 w-72 rounded-full bg-secondary-container/15 blur-3xl"></div>
      <div className="pointer-events-none fixed -right-20 top-1/3 z-0 h-80 w-80 rounded-full bg-primary-fixed/25 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-10 left-10 z-0 h-60 w-60 rounded-full bg-tertiary-container/10 blur-3xl"></div>

      {/* <!-- Top Glass Header --> */}
      <Header />

      {/* <!-- Main Body Content --> */}
      <main
        id="main-portal-target"
        className="relative z-10 flex min-h-screen w-full flex-col pt-16">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-space-md px-margin pt-space-md">
          {/* Cấu hình đổi trang dựa trên biến route */}
          {route === "home" && (
            <>
              {/* <DeleteBar /> */}
              <SearchBar />
              <WordSection />
              {/* <ManualWord /> */}
            </>
          )}
          {route === "setting" && (
            <div className="py-8 text-center font-label-md text-on-surface-variant">
              Đây là trang cấu hình (Setting)
            </div>
          )}
        </div>
      </main>

      {/* <!-- Bottom Navigation Bar --> */}
      {/* <BottomBar /> */}
    </div>
  )
}
