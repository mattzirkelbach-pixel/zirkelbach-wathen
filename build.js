// Assembles the single-file site from src/ into dist/.
//   dist/index.html    full standalone page (host anywhere, open from disk)
//   dist/artifact.html the same page without the document skeleton, for a claude.ai preview
const fs = require('fs');
const path = require('path');
const src = (f) => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');

const css = src('style.css');
const body = src('body.html');
const data = src('data.js') + '\n' + src('landdots.js');
const app = src('app.js');

const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap">';

const title = 'Zirkelbach–Wathen Family';
const description = 'Four families, one marriage: the Zirkelbachs, Dailys, Wathens and Vogts of Evansville, Indiana, their origins, and what the records say.';

const scripts = `<script>\n${data}\n</script>\n<script>\n${app}\n</script>`;
const fav = `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="15" height="15" rx="2" fill="#7b2e3a"/><rect x="17" width="15" height="15" rx="2" fill="#2b6a4e"/><rect y="17" width="15" height="15" rx="2" fill="#96600f"/><rect x="17" y="17" width="15" height="15" rx="2" fill="#355a8a"/></svg>')}">`;

const full = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="color-scheme" content="light dark">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://mattzirkelbach-pixel.github.io/zirkelbach-wathen/">
<meta property="og:image" content="https://mattzirkelbach-pixel.github.io/zirkelbach-wathen/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${fav}
${fonts}
<style>
${css}
</style>
</head>
<body>
${body}
${scripts}
</body>
</html>
`;

const artifact = `<title>${title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fonts}
<style>
${css}
</style>
${body}
${scripts}
`;

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), full);
fs.writeFileSync(path.join(__dirname, 'dist', 'artifact.html'), artifact);
const og = path.join(__dirname, 'src', 'assets', 'og.png');
if (fs.existsSync(og)) fs.copyFileSync(og, path.join(__dirname, 'dist', 'og.png'));
console.log('index.html', (full.length / 1024).toFixed(1) + ' KB;', 'artifact.html', (artifact.length / 1024).toFixed(1) + ' KB');
