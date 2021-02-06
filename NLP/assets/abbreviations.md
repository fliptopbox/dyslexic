# abbreviations for text messagining

The table was derived from this [website](https://www.webopedia.com/reference/text-message-abbreviations/),
by running the following JavaScript in the browser console, and saving the output as a tab seperated values file TSV.

Some of the more obsure phrases where removed.

```javascript
const table = document.querySelector('table.style5');
const rows = table.querySelectorAll('tr');
const array = Array.from(rows)
    .filter((el) => el.children.length > 1)
    .map((el) => {
        let [key, text] = el.children;
        key = key.innerText;
        text = text.innerText;
        return { key, text };
    })
    .filter((o) => o.key);

const tsv = array.map(({ key, text }) => `${key}\t${text}`).join('\n');

console.log(tsv);
```

### Top 10 text abbreviations (unqualified??)

| Abbr  | Description                   |
| ----- | ----------------------------- |
| ROFL  | Rolling on floor laughing.    |
| STFU  | Shut the _freak_ up.          |
| LMK   | Let me know.                  |
| ILY   | I love you.                   |
| YOLO  | You only live once.           |
| SMH   | Shaking my head.              |
| LMFAO | Laughing my freaking _a_ off. |
| NVM   | Never mind.                   |
| IKR   | I know, right.                |
| OFC   | Of course.                    |

Not sure how it was determined that these are the most used.
It would be good to have a running mean of word, based on processed text/corpus to qualify these rankings.

## Some sample rows for discussion

Some of the abbreviations are too obsure. Glyphs used by numeric keypads are too niche to represent a useful sub-set of abbreviation, and perhaps we should cull this list.

| Abbr     | Description                                            |
| -------- | ------------------------------------------------------ |
| ?        | I have a question                                      |
| ?        | I don’t understand what you mean                       |
| ?4U      | I have a question for you                              |
| ;S       | Gentle warning, like “Hmm? What did you say?”          |
| ^^       | Meaning “read line” or “read message” above            |
| @TEOTD   | At the end of the day                                  |
| .02      | My (or your) two cents worth                           |
| 1TG, 2TG | Meaning number of items needed for win (online gaming) |
| 1UP      | Meaning extra life (online gaming)                     |
| 121      | One-to-one (private chat initiation)                   |
| 459      | Means I love you (ILY is 459 using keypad numbers)     |
| 1337     | Leet, meaning ‘elite’                                  |
| EOD      | End of day                                             |
| EOD      | End of discussion                                      |
| EOL      | End of lecture                                         |
| EOL      | End of life                                            |

See [full list](./abbreviations.tsv) of 1550 key, value pairs
