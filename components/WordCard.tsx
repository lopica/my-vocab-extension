import type { VocabularyWord } from "~types"
import getCreateTimeDisplay from "~utils"

import DeleteCardButton from "./DeleteCardButton"
import useWordPlay from "./hooks/useWordPlay"
import MeanInput from "./MeanInput"
import PhoneticInput from "./PhoneticInput"
import WordInput from "./WordInput"

export default function WordCard({
  word: vocabWord
}: {
  word: VocabularyWord
}) {
  const { isPlaying, playWord } = useWordPlay()

  const handleClickDomain = (e) => {
    e.stopPropagation() // Ngăn sự kiện click lan ra thẻ Card bên ngoài
    if (vocabWord.sourceUrl) {
      chrome.tabs.create({ url: vocabWord.sourceUrl })
    }
  }

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    playWord(vocabWord)
  }

  return (
    <div
      className="vocab-card glass-card group relative rounded-2xl p-space-md transition-all duration-200 hover:shadow-lg"
      data-word="serendipity">
      <div className="flex items-start justify-between gap-gutter">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-baseline gap-space-sm">
            <WordInput vocabWord={vocabWord} />
            <PhoneticInput vocabWord={vocabWord} />
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          {/* <!-- Audio Button --> */}
          <button
            className="audio-play-btn flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-150 hover:bg-primary hover:text-on-primary"
            onClick={handleSpeak}>
            {!isPlaying ? (
              <span className="material-symbols-outlined speaker-icon text-[18px]">
                volume_up
              </span>
            ) : (
              <span className="sound-wave flex h-3 items-center gap-0.5 px-1">
                <span className="h-2 w-0.5 animate-pulse bg-current"></span>
                <span className="h-3 w-0.5 animate-bounce bg-current"></span>
                <span className="h-1.5 w-0.5 animate-pulse bg-current"></span>
              </span>
            )}
          </button>
          {/* <!-- Delete Card Button --> */}
          <DeleteCardButton vocabWord={vocabWord} />
        </div>
      </div>
      {/* <!-- Meaning/Definition (Directly editable in place) --> */}
      <MeanInput vocabWord={vocabWord} />
      {/* <!-- Card Footer --> */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/20 pt-2">
        <div className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[13px] text-primary/70">
            language
          </span>
          <span
            className="cursor-pointer font-label-sm text-label-sm"
            onClick={handleClickDomain}>
            {vocabWord.sourceDomain}
          </span>
          <span className="font-label-sm text-outline-variant">•</span>
          <span className="font-label-sm text-label-sm text-outline">
            {getCreateTimeDisplay(vocabWord.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
