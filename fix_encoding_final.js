/**
 * Encoding repair script for pages/views.js
 * 
 * ROOT CAUSE: The file contains UTF-8 multi-byte sequences that were
 * double-encoded (read as Latin-1, then saved as UTF-8). Previous fix
 * scripts repaired common French accents but missed emoji and symbol
 * characters.
 * 
 * This script reads the file as a raw Buffer, decodes the double-encoded
 * bytes back to correct UTF-8, and writes the result.
 */
const fs = require('fs');

// Read as UTF-8 string
let content = fs.readFileSync('pages/views.js', 'utf8');

// =============================================
// Repair double-encoded multi-byte characters
// =============================================

// The pattern: UTF-8 bytes were read as Latin-1, producing sequences like:
//   É (U+00C9) -> C3 89 in UTF-8 -> Ã‰ in Latin-1 -> C3 83 C2 89 in UTF-8
//   🔒 (U+1F512) -> F0 9F 94 92 in UTF-8 -> ð\x9F\x94\x92 in Latin-1
//
// After previous partial fixes, what remains in the file are:
//   - Some Latin-1 interpreted bytes still present as Unicode codepoints
//   - Specifically: the bytes appear as individual chars in the U+0080-U+00FF range

// 1. Fix HTML comments: "CONNECTÃ\x89" -> "CONNECTÉ"  (C3 89 = É)
//    The file has Ã (U+00C3) followed by control char U+0089
content = content.replace(/\u00C3\u0089/g, 'É');

// 2. Fix lock emoji: ð (U+00F0) + U+009F + U+0094 + U+0092 = 🔒
content = content.replace(/\u00F0\u009F\u0094\u0092/g, '🔒');

// 3. Fix green circle emoji: ð (U+00F0) + U+009F + U+009F + U+00A2 = 🟢
content = content.replace(/\u00F0\u009F\u009F\u00A2/g, '🟢');

// 4. Fix bullet: â (U+00E2) + U+0080 + U+00A2 = • (U+2022)
content = content.replace(/\u00E2\u0080\u00A2/g, '•');

// 5. Fix down triangle: â (U+00E2) + U+0096 + U+00BC = ▼ (U+25BC)
content = content.replace(/\u00E2\u0096\u00BC/g, '▼');

// 6. Fix checkmark: â (U+00E2) + U+009C + U+0093 = ✓ (U+2713)
content = content.replace(/\u00E2\u009C\u0093/g, '✓');

// 7. Fix star: â (U+00E2) + U+0098 + U+0085 = ★ (U+2605)
content = content.replace(/\u00E2\u0098\u0085/g, '★');

// 8. Fix star outline: â (U+00E2) + U+0098 + U+0086 = ☆ (U+2606) 
content = content.replace(/\u00E2\u0098\u0086/g, '☆');

// =============================================
// Verification
// =============================================

// Check for any remaining C1 control characters (U+0080-U+009F) 
// which are a telltale sign of double-encoding
const c1Pattern = /[\u0080-\u009F]/g;
let match;
const remaining = [];
while ((match = c1Pattern.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const lineStart = content.lastIndexOf('\n', match.index) + 1;
    const lineEnd = content.indexOf('\n', match.index);
    const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd).trim();
    remaining.push({ line: lineNum, char: match[0].charCodeAt(0).toString(16), context: line.substring(0, 100) });
}

if (remaining.length > 0) {
    console.error('WARNING: Remaining C1 control characters found:');
    remaining.forEach(r => console.error(`  Line ${r.line}: U+00${r.char} in: ${r.context}`));
} else {
    console.log('✓ No remaining C1 control characters found.');
}

// Write back as clean UTF-8
fs.writeFileSync('pages/views.js', content, 'utf8');

console.log('✓ pages/views.js has been repaired.');

// Verify specific strings
const tests = [
    ['CONNECTÉ', 'É in comments'],
    ['🔒', 'Lock emoji'],
    ['🟢', 'Green circle emoji'],
    ['•', 'Bullet point'],
    ['▼', 'Down triangle'],
    ['✓', 'Checkmark'],
    ['★', 'Star'],
    // Also verify that previously-fixed French accents are still correct
    ['Prénom', 'Prénom'],
    ['Gérez', 'Gérez (if present)'],
    ['études', 'études'],
    ['Années', 'Années (if present)'],
    ['Compétences', 'Compétences'],
    ['Opportunités', 'Opportunités'],
    ['Paramètres', 'Paramètres (in index.html)'],
    ['développer', 'développer'],
    ['adaptées', 'adaptées'],
    ['Déposez', 'Déposez'],
    ['découvrir', 'découvrir'],
    ['Réinitialiser', 'Réinitialiser'],
    ['Connectée', 'Connectée'],
    ['modèle', 'modèle'],
    ['défaut', 'défaut'],
    ['améliorer', 'améliorer'],
];

console.log('\n--- Verification ---');
const verified = fs.readFileSync('pages/views.js', 'utf8');
tests.forEach(([str, label]) => {
    const found = verified.includes(str);
    console.log(`${found ? '✓' : '✗'} ${label}: "${str}" ${found ? 'FOUND' : 'NOT FOUND'}`);
});

// Check that Ã (mojibake marker) no longer appears in the file
// except possibly in legitimate SVG data or technical content
const mojibakeLines = [];
verified.split('\n').forEach((line, i) => {
    if (line.includes('Ã') && !line.includes('svg') && !line.includes('path') && !line.includes('//')) {
        mojibakeLines.push(i + 1);
    }
});
if (mojibakeLines.length > 0) {
    console.log(`\nWARNING: Possible remaining mojibake on lines: ${mojibakeLines.join(', ')}`);
} else {
    console.log('\n✓ No remaining mojibake (Ã) detected in non-technical content.');
}
