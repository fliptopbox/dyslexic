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
                .map((s, i) => `${i}\t${s}`);

            const content = `
                    Updated: ${new Date().toISOString()}
                    \n${array.join('\n')}
                `.trim();
            document.querySelector('pre').innerHTML = content;
        });
    setTimeout(getdata, 5000)
}

getdata();

document.querySelector(".lastmodified").innerHTML = document.lastModified;
