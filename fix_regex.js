const fs = require('fs');
let content = fs.readFileSync('pages/views.js', 'utf8');
const newUpload = `
            <p style="margin-bottom: 1.5rem; color: var(--text-muted);">
                Déposez votre CV pour découvrir :<br>
                • votre profil professionnel<br>
                • vos compétences<br>
                • vos compétences à développer<br>
                • les formations adaptées<br>
                • les opportunités correspondantes
            </p>`;
content = content.replace(/<p style="margin-bottom: 1\.5rem; color: var\(--text-muted\);">[\s\S]*?opportunit[\s\S]*?correspondantes\s*<\/p>/m, newUpload.trim());
fs.writeFileSync('pages/views.js', content, 'utf8');
console.log('Fixed pages/views.js paragraph via regex');
