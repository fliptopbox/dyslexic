# emoticons
Perhaps we should default to Wikipedia for common "stuff"? It is not the best source or definitive ideal but it is prepresentitive of a common mean. WDYT?

My initial feeling is we should stick with latin sideways emoticons and the officially supported unicode glyphs. This resourse get unwhieldy very quickly.

https://en.wikipedia.org/wiki/List_of_emoticons

## Complete Wikipedia article
-   [Supplemental Symbols and Pictographs](https://en.wikipedia.org/wiki/Supplemental_Symbols_and_Pictographs 'Supplemental Symbols and Pictographs')
-   [Official Unicode Consortium code chart](https://www.unicode.org/charts/PDF/U1F900.pdf) (PDF)
-   [Official unicode Emoji dataset](https://www.unicode.org/Public/13.0.0/ucd/emoji/emoji-data.txt)
- [Regular_Expressions: Unicode_Property_Escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
## Current proposed dataset
Text based icons and unicode icons are commonly supported in social communications, there is a consortium to control the unicode proposition, essentially a group to agree which font icons are represented. However there are more ASCII variants of an emotion than glyph font representatives.

To ensure we get the largest range of matching the emoticons dataset combintes the two glyph types into a unified schema inspired by the wikipedia table data. To ensure computer readabiliy the dataset follows this predictable plain text schema.

**Example recordset**
Here is the ideal presentation of the dataset in table format

| ASCII      | Unicode | Description                 |
| ---------- | ------- | --------------------------- |
| :‑J        | 😏😒    | Tongue-in-cheek             |
| :‑) :) :-] | 😊😀😁  | Smiley or happy face.       |
| #‑)        |         | Partied all night           |
| %)         | 😵😕    | Drunk,confused              |
| :###..     |         | Being sick                  |
| <:‑        |         | Dumb, dunce-like            |
| :E         |         | Grimacing, nervous, awkward |



**Raw text dataset schema**
- Blank line to signify the start of a data section
- An ASCII icon string, one glyph per line (repeating)
- An Array literal of Unicode icon(s)
- A string description of the hieroglyph group

**Example of plain-text schema**
```ascii

:-*  
:*
:x
[😗😙😚😘😍]
Smiley or happy face.[4][5][6]
```

See [[../NLP/assets/emoticons.txt]] dataset in the NLP assetss folder.
See [[../NLP/assets/emoji-data.txt]] official emoji unicode data

#emoji #emoticons #glyphs #hieroglyphs
