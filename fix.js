const fs = require('fs');
const glob = require('fs').readdirSync;
const path = require('path');

function replaceMojibake(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const repl = {
        'àƒÂ©': 'é',
        'àƒÂ¨': 'è',
        'àƒÂª': 'ê',
        'àƒÂ': 'à',
        'àƒÂ®': 'î',
        'àƒÂ§': 'ç',
        'àƒÂ´': 'ô',
        'âÂ€Â¢': '•',
        'âÂ€Â™': '’',
        'âÂ–Â¼': '▼',
        'à°ÂŸÂ”Â’': '🔒',
        'à°ÂŸÂŸÂ¢': '🟢',
        'âÂœÂ“': '✓',
        'âÂœÂ–': '✖',
        'âÂ†Â’': '→',
        'âÂ†Â“': '↓',
        'âÂ†Â‘': '↑',
        // In case they look like the user string:
        'DàÂ©posez': 'Déposez',
        'âÂÂ': '•',
        'compàÂ©tences': 'compétences',
        'dàÂ©velopper': 'développer',
        'adaptàÂ©es': 'adaptées',
        'opportunitàÂ©s': 'opportunités',
        'àÂ ': 'à '
    };
    
    let changed = false;
    for (const [k, v] of Object.entries(repl)) {
        if (content.includes(k)) {
            content = content.split(k).join(v);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

replaceMojibake('pages/views.js');
replaceMojibake('index.html');
console.log('Done');
