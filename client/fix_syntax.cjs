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
    
    // The previous script replaced: fetch('/api/ => fetch(`${import.meta.env.VITE_API_URL || ''}/api/
    // We need to fix the trailing quote at the end of the string.
    // Example: fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings') => fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`)
    
    let newContent = content.replace(/fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| ''\}\/api\/([^'"`]+)['"`]\)/g, "fetch(`${import.meta.env.VITE_API_URL || ''}/api/$1`)");
    
    // Also handle cases with extra arguments like fetch(`${...}/api/settings', { method: ... })
    newContent = newContent.replace(/fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| ''\}\/api\/([^'"`]+)['"`],/g, "fetch(`${import.meta.env.VITE_API_URL || ''}/api/$1`,");
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed syntax ' + filePath);
    }
  }
});
