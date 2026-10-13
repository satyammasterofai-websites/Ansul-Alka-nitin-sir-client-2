const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const eventImageBlock = `<ImageUploadField
                      label="Event Image"
                      value={activeEl.imageUrl}
                      onChange={(url) => handleEventChange(activeEl.id, 'imageUrl', url)}
                    />`;

const eventNewFields = `<ImageUploadField
                      label="Event Image"
                      value={activeEl.imageUrl}
                      onChange={(url) => handleEventChange(activeEl.id, 'imageUrl', url)}
                    />
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <label className="block text-sm font-medium text-stone-800">Description</label>
                      <textarea
                        value={activeEl.description || ''}
                        onChange={(e) => handleEventChange(activeEl.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                        <label className="block text-sm font-medium text-stone-800">Date</label>
                        <input
                          type="text"
                          value={activeEl.date || ''}
                          onChange={(e) => handleEventChange(activeEl.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        />
                      </div>
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                        <label className="block text-sm font-medium text-stone-800">Time</label>
                        <input
                          type="text"
                          value={activeEl.time || ''}
                          onChange={(e) => handleEventChange(activeEl.id, 'time', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <label className="block text-sm font-medium text-stone-800">Venue</label>
                      <input
                        type="text"
                        value={activeEl.venue || ''}
                        onChange={(e) => handleEventChange(activeEl.id, 'venue', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                      />
                    </div>`;

content = content.replace(eventImageBlock, eventNewFields);

const sectionsBlockRegex = /<h3 className="text-lg font-medium text-stone-800 border-b pb-2">Family Invite Section<\/h3>.*?<\/div>\s*<\/div>\s*\)\s*:\s*activeTab\s*===\s*'advanced'/s;

const newSectionsBlock = `<h3 className="text-lg font-medium text-stone-800 border-b pb-2">Invitation Message Section</h3>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Heading</label>
                <input type="text" name="invitationMessageHeading" value={settings.invitationMessageHeading || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Body</label>
                <textarea name="invitationMessageBody" value={settings.invitationMessageBody || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" rows={3}></textarea>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2 mt-8">Family Invite Section</h3>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Top Heading</label>
                <input type="text" name="familyInviteHeading" value={settings.familyInviteHeading || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Main Heading</label>
                <input type="text" name="familyInviteSubHeading1" value={settings.familyInviteSubHeading1 || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Sub Heading</label>
                <input type="text" name="familyInviteSubHeading2" value={settings.familyInviteSubHeading2 || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Family Names</label>
                <textarea name="familyNames" value={settings.familyNames || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" rows={3}></textarea>
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" name="familyInviteBgColor" value={settings.familyInviteBgColor || '#DCE8D3'} onChange={handleChange} className="h-10 w-20 cursor-pointer rounded border border-stone-200" />
                  <input type="text" name="familyInviteBgColor" value={settings.familyInviteBgColor || ''} onChange={handleChange} className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase" />
                </div>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2 mt-8">Footer Section</h3>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Heading</label>
                <input type="text" name="footerInviteHeading" value={settings.footerInviteHeading || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Names</label>
                <input type="text" name="footerInviteNames" value={settings.footerInviteNames || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Date</label>
                <input type="text" name="footerInviteDate" value={settings.footerInviteDate || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800">Hashtag</label>
                <input type="text" name="footerHashtag" value={settings.footerHashtag || ''} onChange={handleChange} className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600" />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" name="footerInviteBgColor" value={settings.footerInviteBgColor || '#3B291F'} onChange={handleChange} className="h-10 w-20 cursor-pointer rounded border border-stone-200" />
                  <input type="text" name="footerInviteBgColor" value={settings.footerInviteBgColor || ''} onChange={handleChange} className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase" />
                </div>
              </div>
            </div>
          ) : activeTab === 'advanced'`;

content = content.replace(sectionsBlockRegex, newSectionsBlock);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
