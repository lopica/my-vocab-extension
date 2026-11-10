import type { VocabularyWord } from "~types";
import getCreateTimeDisplay from "~utils";
import WordInput from "./WordInput";
import PhoneticInput from "./PhoneticInput";
import MeanInput from "./MeanInput";
import DeleteCardButton from "./DeleteCardButton";
import { useState } from "react";

export default function WordCard({word: vocabWord}: {word: VocabularyWord}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickDomain = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ Card bên ngoài
    if (vocabWord.sourceUrl) {
      chrome.tabs.create({ url: vocabWord.sourceUrl });
    }
  }

  const handleSpeak = (e) => {
    e.stopPropagation();

    if (!("speechSynthesis" in window)) {
      console.warn("Trình duyệt không hỗ trợ phát âm.");
      return;
    }

    // Dừng âm thanh cũ nếu người dùng bấm liên tục
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(vocabWord.word);
    utterance.lang = "en-US"; // Đặt ngôn ngữ tiếng Anh (hoặc "en-GB")
    utterance.rate = 0.85;    // Tốc độ đọc chậm lại một chút cho rõ chữ
    utterance.pitch = 1.0;

    // Bật/tắt hiệu ứng sóng âm theo sự kiện đọc
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }

  return (
    <div
      className="vocab-card glass-card rounded-2xl p-space-md transition-all duration-200 hover:shadow-lg relative group"
      data-word="serendipity">
      <div className="flex items-start justify-between gap-gutter">
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-baseline gap-space-sm flex-wrap">
            <WordInput vocabWord={vocabWord} />
            <PhoneticInput vocabWord={vocabWord} />
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* <!-- Audio Button --> */}
          <button
            className="audio-play-btn w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all duration-150"
            onClick={handleSpeak}>
            {!isPlaying ? (
              <span className="material-symbols-outlined text-[18px] speaker-icon">
                volume_up
              </span>
            ) : (
              <span className="sound-wave flex items-center gap-0.5 h-3 px-1">
                <span className="w-0.5 h-2 bg-current animate-pulse"></span>
                <span className="w-0.5 h-3 bg-current animate-bounce"></span>
                <span className="w-0.5 h-1.5 bg-current animate-pulse"></span>
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
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-outline-variant/20 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-on-surface-variant text-body-sm">
          <span className="material-symbols-outlined text-[13px] text-primary/70">
            language
          </span>
          <span className="font-label-sm text-label-sm cursor-pointer"
          onClick={handleClickDomain}>{vocabWord.sourceDomain}</span>
          <span className="text-outline-variant font-label-sm">•</span>
          <span className="font-label-sm text-label-sm text-outline">
            {getCreateTimeDisplay(vocabWord.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
