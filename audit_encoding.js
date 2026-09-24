const fs = require('fs');
const path = require('path');

// Patterns that indicate mojibake / corrupted UTF-8
const patterns = [
  { name: 'Double-encoded or latin-1 Ã', regex: /Ã[\x80-\xFF]/ },
  { name: 'Isolated or accented Ã', regex: /Ã/ },
  { name: 'C2 non-breaking/symbol mojibake Â', regex: /Â[\x80-\xFF]|Â/ },
  { name: 'E2 punctuation mojibake â', regex: /â[\x80-\xBF]{2}|â€/ },
  { name: '4-byte emoji mojibake ð', regex: /ð[\x80-\xBF]{3}/ },
  { name: 'Unicode replacement char', regex: /\uFFFD/ },
  { name: 'C1 control characters', regex: /[\u0080-\u009F]/ }
];

const ignoreDirs = ['node_modules', '.git', '.system_generated', 'scratch'];
const scriptPrefixesToIgnore = ['fix', 'patch', 'audit'];

const results = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.includes(entry.name)) {
        scanDir(full);
      }
    } else if (entry.isFile() && /\.(js|html|css|json)$/i.test(entry.name)) {
      if (scriptPrefixesToIgnore.some(prefix => entry.name.startsWith(prefix))) {
        continue;
      }
      const relPath = path.relative(process.cwd(), full);
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, idx) => {
        // Exclude svg path definitions if they happen to have characters, but let's check
        for (const p of patterns) {
          if (p.regex.test(line)) {
            // Check if it's in SVG data path or intentional
            results.push({
              file: relPath,
              line: idx + 1,
              pattern: p.name,
              preview: line.trim()
            });
            break;
          }
        }
      });
    }
  }
}

scanDir(process.cwd());
console.log('AUDIT RESULT: Found ' + results.length + ' suspicious lines across files:');
results.forEach(r => {
  console.log('[' + r.pattern + '] ' + r.file + ':' + r.line + ' -> ' + r.preview.slice(0, 100));
});
