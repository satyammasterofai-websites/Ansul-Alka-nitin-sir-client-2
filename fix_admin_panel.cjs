const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// 1. Update Props
content = content.replace(
  'interface Props {\n  settings: ECardSettings;',
  'interface Props {\n  settings: ECardSettings;\n  cardId: string;\n  setCardId: (id: string) => void;'
);

// 2. Update AdminPanel signature
content = content.replace(
  'export function AdminPanel({ settings, setSettings, onExit, isExiting }: Props) {',
  'export function AdminPanel({ settings, setSettings, onExit, isExiting, cardId, setCardId }: Props) {'
);

// 3. Add Import/Export/CardId handlers
const handlers = `
  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = \`wedding-ecard-\${cardId}-backup.json\`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedSettings = JSON.parse(event.target?.result);
        setSettings(importedSettings);
        alert("Settings imported successfully! Don't forget to exit and save.");
      } catch (error) {
        alert("Failed to parse the JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleCardIdChange = () => {
    const newId = window.prompt("Enter new Database Name (e.g., 'remix-v2').\\nThis prevents overlap with the official website. Your changes will be saved to this new database.", cardId);
    if (newId && newId.trim() !== "" && newId !== cardId) {
      setCardId(newId.trim());
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('id', newId.trim());
      window.history.pushState({}, '', newUrl.toString());
      alert(\`Database Name changed to '\${newId.trim()}'. Please save your changes and use the new URL to share.\`);
    }
  };
`;

content = content.replace(
  '  const [activeTextId, setActiveTextId] = useState<string | null>(',
  handlers + '\n  const [activeTextId, setActiveTextId] = useState<string | null>('
);

// 4. Add UI for these handlers in Advanced settings
const newAdvancedUI = `            <div className="space-y-6">
              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Data Management & Remixing</h3>
              <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-stone-900">Database Name (Card ID)</label>
                  <p className="text-xs text-stone-500 mt-1 mb-2">Change this to create an isolated remix of the website so your data won't overlap with the original template.</p>
                  <div className="flex items-center gap-2">
                     <input type="text" readOnly value={cardId} className="flex-1 px-3 py-2 border border-stone-200 rounded-md bg-stone-50 text-stone-600 sm:text-sm" />
                     <button onClick={handleCardIdChange} className="px-4 py-2 bg-stone-900 text-white rounded-md text-sm hover:bg-stone-800 transition-colors">Change Database</button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-stone-100">
                  <label className="block text-sm font-medium text-stone-900 mb-2">Backup & Restore</label>
                  <div className="flex gap-2">
                    <button onClick={handleExport} className="flex-1 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors text-center">Export Data</button>
                    <label className="flex-1 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors cursor-pointer text-center">
                      Import Data
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Advanced Settings</h3>`;

content = content.replace(
  '<h3 className="text-lg font-medium text-stone-800 border-b pb-2">Advanced Settings</h3>',
  newAdvancedUI
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
