const fs = require('fs');
const path = require('path');

// loads a Gutenburg TSV text file
// and returns a collection of book objects
// 
// If no text files exist for the book id
// the item will be stripped from the collection
//
module.exports = toc;
function toc(fn = './glossary-eng-all.tsv') {
    const filename = path.join(__dirname, fn);
    return fs
        .readFileSync(filename, 'utf8')
        .split('\n')
        .map((s) => s.split('\t'))
        .map(([id, title, by, misc = null]) => ({ id, title, by, misc }))
        .map((o, index) => {
            const author = String(o.by || 'Unknown').replace(/^by /i, '');
            const src = relativepath(o.id);
            const files = getTextFiles(src);
            delete o.by;
            return { ...o, author, files, index };
        })
        .filter((o) => o.files.length);
}

// return array of text files in folder
// that match the folder name as prefix
// the last item is generally the current item
//
// eg 1/2/123 => ["1/2/123/123-0.txt","1/2/123/123.txt"]
//
function getTextFiles(folder) {
    folder = folder.replace(/\/$/, '');

    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir);
    const [name] = folder
        .split(/\//)
        .filter((s) => s.trim())
        .slice(-1);

    const re = new RegExp(`^(${name}).*(txt)$`);
    return items.filter((s) => re.test(s)).map((s) => `${folder}/${s}`); //?
}

// Gutenburg convention: (id) 123 = 1/2/123/123.txt
// returns "1/2/123" when given "123"
//
function relativepath(id) {
    const parts = String(id).split('');
    parts.splice(-1, 1, id, '');
    return parts.join('/');
}
