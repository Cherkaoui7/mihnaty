const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<script src=/g, '<script charset="UTF-8" src=');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html script tags');
