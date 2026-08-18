const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Replace fetch(url) with fetch(url, { credentials: 'include' })
    // We target lines where fetch(url) is closed immediately with a parenthesis.
    let newContent = content.replace(/fetch\((`[^`]+`|'[^']+'|"[^"]+")\)/g, "fetch($1, { credentials: 'include' })");
    
    // 2. Replace fetch(url, { ... }) with fetch(url, { credentials: 'include', ... })
    newContent = newContent.replace(/fetch\((`[^`]+`|'[^']+'|"[^"]+"),\s*\{/g, "fetch($1, { credentials: 'include', ");
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Added credentials to ' + filePath);
    }
  }
});
