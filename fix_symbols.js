const fs = require('fs');
let txt = fs.readFileSync('pages/views.js', 'utf8');
txt = txt.replace(/â€¢/g, '•')
         .replace(/â–¼/g, '▼')
         .replace(/â˜…/g, '★')
         .replace(/â˜†/g, '☆')
         .replace(/ðŸ”’/g, '🔒')
         .replace(/ðŸŸ¢/g, '🟢')
         .replace(/CONNECTÃ‰/g, 'CONNECTÉ')
         .replace(/AVANCÃ‰/g, 'AVANCÉ')
         .replace(/âœ“/g, '✓');
fs.writeFileSync('pages/views.js', txt, 'utf8');
console.log('Fixed symbols in views.js');
