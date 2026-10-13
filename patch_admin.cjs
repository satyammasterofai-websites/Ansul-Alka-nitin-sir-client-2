const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const importTarget = `  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {`;
const importReplace = `  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedSettings = JSON.parse(event.target?.result as string);
        setSettings(importedSettings);
        alert("Settings imported successfully! Don't forget to exit and save.");
      } catch (error) {
        alert("Failed to parse the JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {`;

code = code.replace(importTarget, importReplace);

const uiTarget = `                  <div className="flex gap-2">
                    <button onClick={handleExport} className="flex-1 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors text-center">Export Data</button>
                    <label className="flex-1 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors cursor-pointer text-center">
                      Import Data
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                  </div>`;
                  
const uiReplace = `                  <button onClick={handleExport} className="w-full mb-3 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors text-center">Export Data</button>
                  
                  <div 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={\`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors \${isDragging ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}\`}
                  >
                    <Upload className="w-6 h-6 text-stone-400 mb-2" />
                    <p className="text-sm text-stone-600 mb-1">Drag and drop backup JSON</p>
                    <p className="text-xs text-stone-400 mb-3">or</p>
                    <label className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-md text-sm hover:bg-stone-200 transition-colors cursor-pointer font-medium">
                      Browse Files
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                  </div>`;

code = code.replace(uiTarget, uiReplace);

// Need to make sure Upload icon is imported from lucide-react
if (!code.includes('Upload,')) {
    code = code.replace('Settings2, Loader2, Save, X, Type', 'Settings2, Loader2, Save, X, Type, Upload');
}

fs.writeFileSync('src/components/AdminPanel.tsx', code);
