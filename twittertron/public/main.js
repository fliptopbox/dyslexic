function getdata() {
    fetch('/lastmessage.txt')
        .then((d) => d.text())
        .then((txt) => {
            document.querySelector('.message').innerHTML = txt;
        });
    fetch('/checksums.txt')
        .then((d) => d.text())
        .then((txt) => {
            const array = txt
                .split('\n')
                .reverse()
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
                        </td>
                    `;
                    return `<tr>${row}</tr>`;
                });

            const content = array.join('\n');
            document.querySelector('table').innerHTML = content;
        });
    setTimeout(getdata, 5000);
}

getdata();
