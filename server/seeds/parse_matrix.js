import fs from 'fs';

const text = fs.readFileSync('./matrix_raw.txt', 'utf8');

const blocks = text.split('\n\n');
const result = {};

for (const block of blocks) {
  const lines = block.trim().split('\n').filter(l => l.trim());
  if (lines.length === 0) continue;
  
  const committeeName = lines[0].trim();
  const portfolios = [];
  
  for (let i = 1; i < lines.length; i++) {
    let p = lines[i].trim();
    // remove leading number if exists (e.g. "1 Narendra Modi")
    p = p.replace(/^\d+\s+/, '');
    portfolios.push(p);
  }
  
  result[committeeName] = portfolios;
}

fs.writeFileSync('./portfolios.json', JSON.stringify(result, null, 2));
console.log('✅ Created portfolios.json');
