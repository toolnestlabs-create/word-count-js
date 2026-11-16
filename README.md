# word-count-js

A small, dependency-free JavaScript function that counts words, characters, sentences and paragraphs, and estimates reading time, speaking time and pages. MIT license.

It follows the counting rules used by [Word Counter](https://wordcounter.network/), a free online word and character counter.

## Use

```js
import countText from "./word-count.js";

const r = countText("Hello world. This is a short test.");
console.log(r);
// { words: 7, characters: 34, charactersNoSpaces: 28, sentences: 2, paragraphs: 1,
//   avgWordsPerSentence: 3.5, readingMinutes: 0, speakingMinutes: 0.1,
//   pagesSingleSpaced: 0, pagesDoubleSpaced: 0 }
```

Options: `countText(text, { readWpm: 238, speakWpm: 130, locale: "en" })`.

## How it counts

| Value | Rule |
|---|---|
| Words | Word-like segments from `Intl.Segmenter` (falls back to splitting on whitespace) |
| Characters | Unicode code points, so an emoji counts as one |
| Characters without spaces | Same, with all whitespace removed |
| Sentences | Runs of text ending in . ! ? (also the full-width forms used in Chinese and Japanese) |
| Paragraphs | Non-empty blocks separated by line breaks |
| Reading time | words / 238 words per minute (average silent reading speed for adults) |
| Speaking time | words / 130 words per minute |
| Pages | 500 words per single-spaced page, 250 per double-spaced page (12 pt font, 1 inch margins) |

## Handy reference

| Words | Pages single-spaced | Pages double-spaced | Speaking time |
|---|---|---|---|
| 500 | 1 | 2 | about 4 min |
| 1,000 | 2 | 4 | about 8 min |
| 1,500 | 3 | 6 | about 12 min |
| 2,000 | 4 | 8 | about 15 min |

More detail in these guides:

- [How many pages is 1,000 words?](https://wordcounter.network/resources/how-many-pages-is-1000-words/)
- [Words per page: single vs double spaced](https://wordcounter.network/resources/words-per-page-single-vs-double-spaced/)
- [How many words is a 5-minute speech?](https://wordcounter.network/resources/how-many-words-is-a-5-minute-speech/)
- [How many words are in a sentence?](https://wordcounter.network/resources/how-many-words-are-in-a-sentence/)

## License

MIT.
