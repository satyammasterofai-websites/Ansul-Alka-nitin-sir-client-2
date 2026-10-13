const fs = require('fs');

const replaceInFile = (file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/doc\(db, 'ecard'/g, "doc(db, 'wedding_invitations'");
    content = content.replace(/doc\(db, "ecard"/g, "doc(db, 'wedding_invitations'");
    content = content.replace(/collection\(db, 'ecard'/g, "collection(db, 'wedding_invitations'");
    content = content.replace(/collection\(db, "ecard"/g, "collection(db, 'wedding_invitations'");
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
};

replaceInFile('src/App.tsx');
replaceInFile('src/lib/storage.ts');
replaceInFile('src/lib/diagnostics.ts');
