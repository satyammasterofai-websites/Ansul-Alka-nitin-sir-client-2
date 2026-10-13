const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Replace handleEventChange definition (it might have been changed already)
content = content.replace(
  /const handleEventChange = \(id: string, field: 'heading' \| .*?, value: string\) => \{/,
  `const handleEventChange = (id: string, field: string, value: any) => {`
);

// We need to find the event form fields and add visibility toggles and caricature uploads.
// I'll grab the specific blocks.
const venueBlockRegex = /<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Venue<\/label>\s*<input[^>]+>\s*<\/div>/;

const newVenueBlock = `<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-stone-800">Description</label>
                        <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
                          <input type="checkbox" checked={activeEl.showDescription !== false} onChange={(e) => handleEventChange(activeEl.id, 'showDescription', e.target.checked)} className="rounded text-stone-900 focus:ring-stone-900 border-stone-300" /> Show
                        </label>
                      </div>
                      <textarea
                        value={activeEl.description || ''}
                        onChange={(e) => handleEventChange(activeEl.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-stone-800">Date</label>
                          <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
                            <input type="checkbox" checked={activeEl.showDate !== false} onChange={(e) => handleEventChange(activeEl.id, 'showDate', e.target.checked)} className="rounded text-stone-900 focus:ring-stone-900 border-stone-300" /> Show
                          </label>
                        </div>
                        <input
                          type="text"
                          value={activeEl.date || ''}
                          onChange={(e) => handleEventChange(activeEl.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        />
                      </div>
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-stone-800">Time</label>
                          <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
                            <input type="checkbox" checked={activeEl.showTime !== false} onChange={(e) => handleEventChange(activeEl.id, 'showTime', e.target.checked)} className="rounded text-stone-900 focus:ring-stone-900 border-stone-300" /> Show
                          </label>
                        </div>
                        <input
                          type="text"
                          value={activeEl.time || ''}
                          onChange={(e) => handleEventChange(activeEl.id, 'time', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-stone-800">Venue</label>
                        <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
                          <input type="checkbox" checked={activeEl.showVenue !== false} onChange={(e) => handleEventChange(activeEl.id, 'showVenue', e.target.checked)} className="rounded text-stone-900 focus:ring-stone-900 border-stone-300" /> Show
                        </label>
                      </div>
                      <input
                        type="text"
                        value={activeEl.venue || ''}
                        onChange={(e) => handleEventChange(activeEl.id, 'venue', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                      />
                    </div>
                    <div className="space-y-4 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                        <label className="block text-sm font-medium text-stone-800">Caricature Overlay</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={activeEl.showCaricature || false} onChange={(e) => handleEventChange(activeEl.id, 'showCaricature', e.target.checked)} className="sr-only peer" />
                          <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-900"></div>
                        </label>
                      </div>
                      
                      {activeEl.showCaricature && (
                        <>
                          <ImageUploadField
                            label="Upload Caricature (Transparent PNG)"
                            value={activeEl.caricatureUrl || ''}
                            onChange={(url) => handleEventChange(activeEl.id, 'caricatureUrl', url)}
                          />
                          <div className="space-y-2">
                            <label className="block text-xs font-medium text-stone-700">Size (Width %)</label>
                            <input type="range" min="10" max="150" value={activeEl.caricatureSize ?? 50} onChange={(e) => handleEventChange(activeEl.id, 'caricatureSize', parseInt(e.target.value))} className="w-full accent-stone-900" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-medium text-stone-700">Vertical Position (Bottom %)</label>
                            <input type="range" min="-50" max="100" value={activeEl.caricatureBottom ?? 0} onChange={(e) => handleEventChange(activeEl.id, 'caricatureBottom', parseInt(e.target.value))} className="w-full accent-stone-900" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-medium text-stone-700">Horizontal Position (Left %, 50=Center)</label>
                            <input type="range" min="-50" max="150" value={activeEl.caricatureLeft ?? 50} onChange={(e) => handleEventChange(activeEl.id, 'caricatureLeft', parseInt(e.target.value))} className="w-full accent-stone-900" />
                          </div>
                        </>
                      )}
                    </div>`;

// First remove the old hardcoded description/date/time/venue blocks that I injected earlier, so we can replace cleanly.
const blockToRemove1 = /<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Description<\/label>\s*<textarea[^>]+><\/textarea>\s*<\/div>\s*<div className="grid grid-cols-2 gap-4">\s*<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Date<\/label>\s*<input[^>]+>\s*<\/div>\s*<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Time<\/label>\s*<input[^>]+>\s*<\/div>\s*<\/div>\s*<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Venue<\/label>\s*<input[^>]+>\s*<\/div>/s;

if (content.match(blockToRemove1)) {
   content = content.replace(blockToRemove1, newVenueBlock);
} else {
   console.log("Could not find the block to replace. Maybe the regex is wrong.");
   // Let's replace right after ImageUploadField
   const imageUploadFieldRegex = /<ImageUploadField\s*label="Event Image"\s*value=\{activeEl.imageUrl\}\s*onChange=\{\(url\) => handleEventChange\(activeEl.id, 'imageUrl', url\)\}\s*\/>/;
   content = content.replace(imageUploadFieldRegex, `<ImageUploadField
                      label="Event Image"
                      value={activeEl.imageUrl}
                      onChange={(url) => handleEventChange(activeEl.id, 'imageUrl', url)}
                    />` + newVenueBlock);
}

fs.writeFileSync('src/components/AdminPanel.tsx', content);
