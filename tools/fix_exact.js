const fs = require('fs');
const path = require('path');

const replacements = {
  'é': 'é',
  'è': 'è',
  'Ã\xA0': 'à', // A0 is non-breaking space, but sometimes it is the à character
  'à': 'à',
  'ô': 'ô',
  'û': 'û',
  'ç': 'ç',
  'î': 'î',
  'ë': 'ë',
  'ï': 'ï',
  'â': 'â',
  'ê': 'ê',
  'œ': 'œ',
  '’': '’',
  'É': 'É',
  'È': 'È',
  'À': 'À',
  'Ç': 'Ç',
  '🔒': '🔒',
  '✓': '✓',
  '▼': '▼',
  '•': '•',
  '★': '★',
  '☆': '☆',
  'Ã': 'à', // Catchall for isolated àoften meant to be à in some contexts, but be careful! We'll just replace 'à' with 'à ' below.
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        processDirectory(fullPath);
      }
    } else {
      if (fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.json')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;
        
        // Manual replacements
        content = content.replace(/é/g, 'é');
        content = content.replace(/è/g, 'è');
        content = content.replace(/Ã\xA0/g, 'à');
        content = content.replace(/à/g, 'à');
        content = content.replace(/ô/g, 'ô');
        content = content.replace(/û/g, 'û');
        content = content.replace(/ç/g, 'ç');
        content = content.replace(/î/g, 'î');
        content = content.replace(/ë/g, 'ë');
        content = content.replace(/ï/g, 'ï');
        content = content.replace(/â/g, 'â');
        content = content.replace(/ê/g, 'ê');
        content = content.replace(/œ/g, 'œ');
        content = content.replace(/’/g, '’');
        content = content.replace(/É/g, 'É');
        content = content.replace(/È/g, 'È');
        content = content.replace(/À/g, 'À');
        content = content.replace(/Ç/g, 'Ç');
        content = content.replace(/🔒/g, '🔒');
        content = content.replace(/✓/g, '✓');
        content = content.replace(/▼/g, '▼');
        content = content.replace(/•/g, '•');
        content = content.replace(/★/g, '★');
        content = content.replace(/☆/g, '☆');
        content = content.replace(/Ã\x80/g, 'À');
        
        // Specifically fix remaining 'à' before 'développer' or similar:
        content = content.replace(/Ã\s/g, 'à ');

        if (content !== original) {
          console.log(`Fixed encoding in: ${fullPath}`);
          fs.writeFileSync(fullPath, content, 'utf8');
        }
      }
    }
  }
}

processDirectory(__dirname);
console.log('Encoding fix complete.');
