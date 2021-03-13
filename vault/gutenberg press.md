# gutenberg project

A royalty free repository of free books in various formats from txt, html to mobi and ipub. The repository also permits mirroring of content.

https://www.gutenberg.org/help/mirroring.html

To reduce the total overall disk space required for a full mirror backup here is an `rsync` command that excludes the traditionally heavier binary formats, but permits images.

```bash
rsync -av --del  \
      --exclude{"*part","*zip","*rar","*iso*","*avi","*.m*","*.pdf","*.doc*","/old/*","*.ogg"} \
	  ftp.ibiblio.org::gutenberg .
```

or alternatively ONLY download txt, the following command will include all folders, include `txt` files and exclude everything else. The parameter order is important.

```bash
rsync -av --del  \
      --include'*/*' --include='*.txt*' --exclude='**'
	  ftp.ibiblio.org::gutenberg .
```

## processing the corpus

In general the text files are very uniform, they have a prefix and suffix section that declare legal disclamiers. The header contains some publicatoin metadata. The content section is variable, however the line length is hard wrapped at 74 characters.

### example of metadata

-   Title: Vain Fortune
-   Author: George Moore
-   Release Date: February 26, 2004 [eBook #11303]
-   Language: English
-   Character set encoding: US ASCII

### example of hard wrapping

```
It was also my purpose to study art while in Europe. Mr. Harris was in
sympathy with me in this. He was as much of an enthusiast in art as
I was, and not less anxious to learn to paint. I desired to learn the
German language; so did Harris.
```

### normalizing the text

1. Replace all quotation styles with `"'` simple quotes
2. Replace all dash parens with `space`
3. Unwrap continuous paragraphs, so that there is one paragraph per line, with a single carridge return seperating each paragraph.

-   `%s/-\+/ /g` to replace hyphens with a `space`
-   `%s/_\+//g` delete undescores
-   `%s/^\s\+//g` remove leading (and double) spaces
-   `%s/\(.\)\n\(\S\+\)/\1 \2/g` unwrap consecutive lines
-   `%s/\n\+\(.\)/\r\r\1/g` remove duplicate carridge returns
-   `%s/\s\+/ /g` replace doube spaces

### using the file index as a table of contents

The `GUTINDEX.ALL` is a catenation of all the other GITINDEXs. We will use this file's contents as a data glossary to open an parse the corpus.
The ALL index lets us idenfify language. We are interested in English, and will ignore other languages for now.
Also the basic listing lets us idenfify the file name, title, author metadata, but the index is formated ASCII so we need to unwrap the lines and use TAB (4 spaces) to deliminate the columns.

For example input unformated

```
Our Little Japanese Cousin, by Mary Hazelton Wade                        43833
 [Illustrator: L. J. Bridgman]

Every-day Science: Volume VII. The Conquest of Time and Space,           43819
 by Henry Smith Williams and Edward Huntington Williams]
```

Plaintext tab formated (file number, book title and author, optional ie subtitle)

```
Ref      Title                                        Author
43833    Our Little Japanese Cousin,                  Mary Hazelton Wade
43819    Every-day Science: Volume ..... and Space    Henry Smith Williams and Edward Huntington Williams]
```
