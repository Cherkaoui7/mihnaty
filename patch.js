const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');
code = code.replace(
  /catch \(err\) \{\s*UI\.showToast\(getUserFriendlyProviderError\(err\), "error"\);\s*\} finally \{/,
  `catch (err) {
              document.getElementById('ai-detection-error').style.display = 'block';
              document.getElementById('ai-advanced-container').style.display = 'block';
              document.getElementById('adv-key').value = key;
              document.getElementById('ai-advanced-container').scrollIntoView({ behavior: 'smooth' });
              UI.showToast(getUserFriendlyProviderError(err), 'error');
            } finally {`
);
fs.writeFileSync('js/app.js', code);
console.log('patched app.js (regex)');
