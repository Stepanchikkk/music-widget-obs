const fetch = require('node-fetch');
const fs = require('fs');
fetch('https://cdn.jsdelivr.net/fontsource/fonts/dseg7-classic@latest/latin-400-normal.woff2')
  .then(r => r.buffer())
  .then(buf => {
    const b64 = buf.toString('base64');
    const css = '@font-face {\n  font-family: "DSEG7 Classic";\n  font-style: normal;\n  font-weight: 400;\n  src: url(data:font/woff2;base64,' + b64 + ') format("woff2");\n}\n';
    fs.writeFileSync('dseg7-base64.css', css);
    console.log('OK size=' + b64.length);
  })
  .catch(e => console.error(e));
