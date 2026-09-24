const fs = require('fs');
const vm = require('vm');

const viewsContent = fs.readFileSync('pages/views.js', 'utf8');

const ctx = {};
vm.createContext(ctx);
// Append exports
vm.runInContext(viewsContent + '\n;globalThis.__Views = Views;', ctx);

const views = ctx.__Views;
console.log('Available views in Views object:');
for (const key of Object.keys(views)) {
  const content = typeof views[key] === 'function' ? views[key]() : views[key];
  console.log(`- ${key}: length ${content.length}`);
  
  // Test if any mojibake exists in the view output
  const suspicious = /[\u00C3][\u0080-\u00BF]|Ã|Â|â€|\uFFFD|[\u0080-\u009F]/.test(content);
  if (suspicious) {
    console.log(`  WARNING: Suspicious characters in view ${key}!`);
  } else {
    console.log(`  ✓ CLEAN UTF-8: ${key}`);
  }
}
console.log('All views tested successfully!');
