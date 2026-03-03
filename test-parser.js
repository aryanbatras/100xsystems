import { HtmlToDeltaConverter } from '../src/core/infrastructure/HtmlToDeltaConverter';

// Read the test HTML file
const fs = require('fs');
const path = require('path');

const testHtml = fs.readFileSync(
  path.join(__dirname, '../test-article-sample.html'), 
  'utf8'
);

console.log('🧪 Testing HTML to Delta conversion...\n');

// Test the parsing
const parsed = HtmlToDeltaConverter.parseHtml(testHtml);
console.log('✅ Parsed content:');
console.log('- Title:', parsed.metadata?.title);
console.log('- Slug:', parsed.metadata?.slug);
console.log('- Date:', parsed.metadata?.date);
console.log('- Images:', parsed.images.length);
console.log('- Content length:', parsed.content.length, 'characters\n');

// Test Delta conversion
const delta = HtmlToDeltaConverter.convertToDelta(testHtml);
console.log('✅ Delta conversion:');
console.log('- Operations:', delta.ops?.length || 0);
console.log('- First few operations:');
delta.ops?.slice(0, 3).forEach((op, index) => {
  console.log(`  ${index + 1}.`, JSON.stringify(op, null, 2));
});

console.log('\n🎉 Test completed successfully!');
