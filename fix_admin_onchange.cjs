const fs = require('fs');

let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

code = code.replace(/onChange\(data\);/g, "setSettings(data);");
code = code.replace(/onChange\(\{ customFields: newFields \}\);/g, "setSettings(prev => ({ ...prev, customFields: newFields }));");
code = code.replace(/onChange\(\{ customFields: \{ \.\.\.settings\.customFields, \[key\]: e\.target\.value \} \}\);/g, "setSettings(prev => ({ ...prev, customFields: { ...prev.customFields, [key]: e.target.value } }));");
code = code.replace(/onChange\(\{ customFields: \{ \.\.\.settings\.customFields, \[newKey\]: '' \} \}\);/g, "setSettings(prev => ({ ...prev, customFields: { ...prev.customFields, [newKey]: '' } }));");

fs.writeFileSync('src/components/AdminPanel.tsx', code);
