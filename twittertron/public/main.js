const host = getSocketHost(window.location);
const ws = new WebSocket(host);

ws.onopen = () => ws.send('hello');
ws.onmessage = (e) => parseMessasge(e);

window.socket = ws;

function getSocketHost({ hostname, protocol }) {
    const port = /localhost/i.test(hostname) ? ':3000' : '';
    const proto = `${protocol.replace(/^http/i, 'ws')}`;
    return `${proto}//${hostname}${port}`;
}

function parseMessasge({ data }) {
    if (!data) return;
    const tsv = data.split('\t');

    if (tsv.length === 1) {
        console.log(data);
        return;
    }

    if (/^(oxymoron|cliche)/i.test(data)) {
        progress(tsv);
        pulse(tsv);
    }

    if (/^flow/i.test(data)) {
        // console.log(data);
    }
}

function pulse(tsv) {
    const [type] = tsv;
    const parts = tsv.slice(1, -2);
    const el = document.querySelector('.pulse');

    el.innerHTML = `<span>${type.toUpperCase()}: ${parts.join(' ')}</span>`;
}

function progress(tsv) {
    const value = Number(tsv.slice(-1));
    const width = (value * 100) >> 0;
    document.querySelector('.progress').style.width = `${width}%`;
}

function lastmessage(txt) {
    txt = txt.replace(/\n\n+/g, '<hr>');
    const array = txt.split('\n').map((s) => {
        let text = `${s}`.trim() ? s : '<hr>';
        text = text.replace(/(#.*)/, `<em>$1</em>`);
        return text;
    });
    document.querySelector('.message').innerHTML = array.join('\n');
}

function checksums(txt) {
    const array = txt
        .split('\n')
        .reverse()
        .slice(0, 10)
        .map((s, i) => {
            const cells = s.split('\t');
            const [chk, id, user, hashes, ts, text] = cells;
            const [wd, mm, dd, yyyy, time] = new Date(Number(ts))
                .toString()
                .split(/\s/g);
            const cliches = `${hashes || ''}`.replace(/,/g, ' ');
            const row = `
                <td>
                    <strong>
                      ${i} - ${chk} -
                      <a href="https://twitter.com/${user}">${user}</a> -
                      ${time} - ${cliches}
                    </strong>
                    <br>
                    ${text || ''}
                </td>`;

            return `<tr>${row}</tr>`;
        });

    const content = array.join('\n');
    document.querySelector('table').innerHTML = content;
}

function getdata() {
    fetch('/lastmessage.txt')
        .then((d) => d.text())
        .then(lastmessage);

    fetch('/checksums.txt')
        .then((d) => d.text())
        .then(checksums);
    setTimeout(getdata, 5000);
}

getdata();
