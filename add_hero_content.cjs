const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const heroContentHTML = `
              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Hero Section Content</h3>
              
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Top Intro Text</label>
                <textarea name="heroTopText" value={settings.heroTopText || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" rows={2}></textarea>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Groom Name</label>
                <input type="text" name="heroGroomName" value={settings.heroGroomName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
                <label className="block text-sm font-medium text-stone-800 mt-2">Groom Parents Info</label>
                <textarea name="heroGroomParents" value={settings.heroGroomParents || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" rows={2}></textarea>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Middle Text (e.g. 'with')</label>
                <input type="text" name="heroMiddleText" value={settings.heroMiddleText || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Bride Name</label>
                <input type="text" name="heroBrideName" value={settings.heroBrideName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
                <label className="block text-sm font-medium text-stone-800 mt-2">Bride Parents Info</label>
                <textarea name="heroBrideParents" value={settings.heroBrideParents || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" rows={2}></textarea>
              </div>
`;

content = content.replace(
  `          ) : activeTab === 'content' ? (
            <div className="space-y-6">`,
  `          ) : activeTab === 'content' ? (
            <div className="space-y-6">` + heroContentHTML
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
