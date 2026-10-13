const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const targetBlock = `                      <input
                        type="text"
                        value={activeEl.heading}
                        onChange={(e) => handleEventChange(activeEl.id, 'heading', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 mb-3"
                        placeholder="e.g. The Ceremony"
                      />
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                           <label className="block text-xs font-medium text-stone-500 mb-1">Heading Color</label>
                           <div className="flex items-center gap-2">
                             <input
                               type="color"
                               value={activeEl.headingColor || '#FAF5EA'}
                               onChange={(e) => handleEventChange(activeEl.id, 'headingColor', e.target.value)}
                               className="w-8 h-8 rounded cursor-pointer border border-stone-200"
                             />
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-stone-500 mb-1">Labels Color</label>
                           <div className="flex items-center gap-2">
                             <input
                               type="color"
                               value={activeEl.detailsColor || '#C9A15A'}
                               onChange={(e) => handleEventChange(activeEl.id, 'detailsColor', e.target.value)}
                               className="w-8 h-8 rounded cursor-pointer border border-stone-200"
                             />
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-stone-500 mb-1">Values Color</label>
                           <div className="flex items-center gap-2">
                             <input
                               type="color"
                               value={activeEl.textColor || '#FAF5EA'}
                               onChange={(e) => handleEventChange(activeEl.id, 'textColor', e.target.value)}
                               className="w-8 h-8 rounded cursor-pointer border border-stone-200"
                             />
                           </div>
                        </div>
                      </div>`;

const replaceBlock = `                      <input
                        type="text"
                        value={activeEl.heading}
                        onChange={(e) => handleEventChange(activeEl.id, 'heading', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 mb-3"
                        placeholder="e.g. The Ceremony"
                      />
                      <div>
                         <label className="block text-xs font-medium text-stone-500 mb-1">Labels Color (Date/Time/Venue)</label>
                         <div className="flex items-center gap-2">
                           <input
                             type="color"
                             value={activeEl.detailsColor || '#C9A15A'}
                             onChange={(e) => handleEventChange(activeEl.id, 'detailsColor', e.target.value)}
                             className="w-8 h-8 rounded cursor-pointer border border-stone-200"
                           />
                         </div>
                      </div>`;

code = code.replace(targetBlock, replaceBlock);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
