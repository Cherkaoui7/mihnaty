const fs = require('fs');
const path = require('path');

const targetWords = [
  'Gérez',
  'Prénom',
  'études',
  'Années',
  'expérience',
  'Compétences',
  'Opportunités',
  'Paramètres',
  'Déposez',
  'découvrir',
  'développer',
  'adaptées',
  'correspondantes',
  'professionnel',
  'Réinitialiser',
  'Connectée',
  'modèle',
  'défaut',
  'améliorer'
];

const symbols = ['🔒', '🟢', '•', '▼', '✓', '★', '☆'];

const filesToTest = [
  'index.html',
  'pages/views.js',
  'js/app.js',
  'js/router.js',
  'js/storage.js',
  'js/state.js',
  'js/ui/components.js',
  'js/ui/toast.js',
  'js/cv/cv-upload.js',
  'js/cv/docx-parser.js',
  'js/cv/pdf-parser.js',
  'js/data/sectors.js',
  'js/data/courses.js',
  'js/data/opportunities.js',
  'js/demo/demo-data.js',
  'js/demo/demo-state.js',
  'js/demo/demo-service.js',
  'js/mock/mock-data.js',
  'js/matching/skill-matching.js',
  'js/matching/matching-engine.js',
  'js/matching/course-score.js',
  'js/ai/ai-manager.js',
  'js/ai/prompt-builder.js',
  'js/ai/response-normalizer.js',
  'js/ai/schema.js',
  'js/ai/providers/provider-detector.js',
  'js/ai/providers/gemini-adapter.js',
  'js/ai/providers/openai-compatible-adapter.js',
  'js/ai/providers/anthropic-adapter.js',
  'js/ai/providers/cohere-adapter.js',
  'js/ai/providers/provider-registry.js',
  'server.js'
];

let allPassed = true;

console.log('=== VERIFYING PROJECT FILES FOR CLEAN UTF-8 & TARGET WORDS ===\n');

filesToTest.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`[SKIPPED] ${file} does not exist`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for any mojibake
  const mojibakeMatch = content.match(/[\u00C3][\u0080-\u00BF]|Ã|Â|â€|\uFFFD|[\u0080-\u009F]/g);
  if (mojibakeMatch) {
    console.error(`[FAIL] ${file} has mojibake characters: ${mojibakeMatch.slice(0, 5).join(', ')}`);
    allPassed = false;
  } else {
    // Count target words found
    const foundWords = targetWords.filter(w => content.includes(w));
    const foundSymbols = symbols.filter(s => content.includes(s));
    console.log(`[PASS] ${file}: 0 mojibake, ${foundWords.length} target words, ${foundSymbols.length} symbols found`);
  }
});

console.log('\n=== VERIFYING SPECIFIC USER SCENARIOS ===');
const viewsContent = fs.readFileSync('pages/views.js', 'utf8');

const checks = [
  { name: 'Upload checklist line 1', check: viewsContent.includes('Déposez votre CV pour découvrir :') },
  { name: 'Upload checklist line 2', check: viewsContent.includes('✓ votre profil professionnel') },
  { name: 'Upload checklist line 3', check: viewsContent.includes('✓ vos compétences') },
  { name: 'Upload checklist line 4', check: viewsContent.includes('✓ vos compétences à développer') },
  { name: 'Upload checklist line 5', check: viewsContent.includes('✓ les formations adaptées') },
  { name: 'Upload checklist line 6', check: viewsContent.includes('✓ les opportunités correspondantes') },
  { name: 'Profile field: Prénom', check: viewsContent.includes('Prénom') },
  { name: 'Profile field: Niveau d\'études', check: viewsContent.includes('Niveau d\'études') },
  { name: 'Profile field: Années d\'expérience', check: viewsContent.includes('Années d\'expérience') },
  { name: 'Settings title: Gérez', check: viewsContent.includes('Gérez vos clés API') },
  { name: 'Sidebar: Paramètres', check: fs.readFileSync('index.html', 'utf8').includes('Paramètres') },
  { name: 'Dashboard: Compétences', check: viewsContent.includes('Compétences clés') || viewsContent.includes('Compétences') },
  { name: 'Dashboard: Opportunités', check: viewsContent.includes('Opportunités') },
];

checks.forEach(c => {
  if (c.check) {
    console.log(`✓ ${c.name}: OK`);
  } else {
    console.error(`✗ ${c.name}: FAILED`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n>>> ALL ENCODING VERIFICATION CHECKS PASSED PERFECTLY! <<<');
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
