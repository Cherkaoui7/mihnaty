const fs = require('fs');
const path = require('path');

function fixFile(fullPath) {
    let text = fs.readFileSync(fullPath, 'utf8');
    if (text.includes('Ã')) {
        let fixedBuf = Buffer.from(text, 'latin1');
        let fixedText = fixedBuf.toString('utf8');
        // Ensure that decoding didn't result in replacement characters 
        if (!fixedText.includes('\uFFFD')) {
            fs.writeFileSync(fullPath, fixedText, 'utf8');
            console.log('Fixed: ' + fullPath);
        } else {
            console.log('Skipped (contains replacement chars when decoded): ' + fullPath);
        }
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                processDir(fullPath);
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.json')) {
                fixFile(fullPath);
            }
        }
    }
}

processDir(__dirname);
console.log('Done!');
