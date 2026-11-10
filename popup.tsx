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
    <div className="w-[420px] bg-gradient-to-b from-[#fdfaf7] via-[#f7f0e8] to-[#f4ebe1] font-body-md text-on-surface min-h-[540px] flex flex-col relative selection:bg-primary-fixed selection:text-primary">
      <div className="fixed top-0 -left-20 w-72 h-72 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-1/3 -right-20 w-80 h-80 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-10 left-10 w-60 h-60 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none z-0"></div>
      {/* <!-- Top Glass Header --> */}
      <Header />
      {/* <!-- Main Body Content --> */}
      <main className="flex flex-col relative w-full pt-16 min-h-screen z-10">
        <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-md max-w-[420px] mx-auto w-full">
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
