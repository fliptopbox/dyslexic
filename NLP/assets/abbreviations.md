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
