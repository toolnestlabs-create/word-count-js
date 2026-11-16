// word-count-js - MIT license
// Reference implementation of the counting rules used on https://wordcounter.network/

/**
 * Count words, characters, sentences and paragraphs in a text.
 * Works with any language that separates words with spaces; uses Intl.Segmenter
 * when available so Chinese, Japanese and Thai text is counted sensibly too.
 */
export function countText(text, { readWpm = 238, speakWpm = 130, locale = "en" } = {}) {
  const str = String(text ?? "");
  const trimmed = str.trim();

  let words = 0;
  if (trimmed) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const seg = new Intl.Segmenter(locale, { granularity: "word" });
      for (const s of seg.segment(trimmed)) if (s.isWordLike) words++;
    } else {
      words = trimmed.split(/\s+/).length;
    }
  }

  const characters = Array.from(str).length;
  const charactersNoSpaces = Array.from(str.replace(/\s/g, "")).length;
  const sentences = trimmed ? (trimmed.match(/[^.!?\u3002\uFF01\uFF1F]+[.!?\u3002\uFF01\uFF1F]*/g) || []).filter((s) => s.trim()).length : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n|\n/).filter((p) => p.trim()).length : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    avgWordsPerSentence: sentences ? Math.round((words / sentences) * 10) / 10 : 0,
    readingMinutes: Math.round((words / readWpm) * 10) / 10,
    speakingMinutes: Math.round((words / speakWpm) * 10) / 10,
    pagesSingleSpaced: Math.round((words / 500) * 10) / 10,
    pagesDoubleSpaced: Math.round((words / 250) * 10) / 10,
  };
}

export default countText;
