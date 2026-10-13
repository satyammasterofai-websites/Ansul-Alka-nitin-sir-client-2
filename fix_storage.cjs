const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace(/const CHUNK_SIZE = 900000;/g, 'const CHUNK_SIZE = 500000;');

fs.writeFileSync('src/lib/storage.ts', content);
