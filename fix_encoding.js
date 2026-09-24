const fs = require('fs');
const path = require('path');

const replacements = {
  'é': 'é',
  'è': 'è',
  'Ã\xa0': 'à',
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
};

function decodeDoubleUtf8(str) {
  let result = str;
  // Also clean up any lingering é which were previously messed up characters in cv-upload.js
  result = result.replace(/é/g, 'é');

  for (const [bad, good] of Object.entries(replacements)) {
    result = result.split(bad).join(good);
  }
  
  return result;
}

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
        let fixed = decodeDoubleUtf8(content);
        
        if (content !== fixed) {
          console.log(`Fixed encoding in: ${fullPath}`);
          fs.writeFileSync(fullPath, fixed, 'utf8');
        }
      }
    }
  }
}

processDirectory(__dirname);
console.log('Encoding fix complete.');
