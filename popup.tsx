import "@fontsource-variable/plus-jakarta-sans"
import "@fontsource-variable/material-symbols-outlined"
import "~style.css"

import BottomBar from "~components/BottomBar"
import Header from "~components/Header"
import SearchBar from "~components/SearchBar"
import WordSection from "~components/WordSection"
import DeleteBar from "~misc/DeleteBar"
import ManualWord from "~misc/ManualWord"

function IndexPopup() {
  return (
    <div className="relative flex min-h-[540px] w-[420px] flex-col bg-gradient-to-b from-[#fdfaf7] via-[#f7f0e8] to-[#f4ebe1] font-body-md text-on-surface selection:bg-primary-fixed selection:text-primary">
      <div className="pointer-events-none fixed -left-20 top-0 z-0 h-72 w-72 rounded-full bg-secondary-container/15 blur-3xl"></div>
      <div className="pointer-events-none fixed -right-20 top-1/3 z-0 h-80 w-80 rounded-full bg-primary-fixed/25 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-10 left-10 z-0 h-60 w-60 rounded-full bg-tertiary-container/10 blur-3xl"></div>
      {/* <!-- Top Glass Header --> */}
      <Header />
      {/* <!-- Main Body Content --> */}
      <main className="relative z-10 flex min-h-screen w-full flex-col pt-16">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-space-md px-margin pt-space-md">
          {/* <!-- Top Utility & Counter Summary Strip --> */}
          {/* <DeleteBar /> */}
          {/* <!-- Search Bar --> */}
          <SearchBar />
          {/* <!-- Vocabulary Card Stream (No Word Type Badges, Inline Editable, No Edit Buttons) --> */}
          <WordSection />
          {/* <!-- Quick Manual Entry Bar with warm glassmorphism --> */}
          {/* <ManualWord /> */}
        </div>
        {/* <!-- Clear All Confirmation Modal Dialog --> */}
      </main>
      {/* <!-- Bottom Navigation Bar with warm glassmorphism --> */}
      {/* <BottomBar /> */}
    </div>
  )
}

export default IndexPopup
