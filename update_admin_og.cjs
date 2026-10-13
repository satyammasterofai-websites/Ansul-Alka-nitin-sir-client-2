const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const ganeshaBlock = `<ImageUpload
                label="Ganesha Icon Image (Top Center)"
                value={settings.ganeshaIconUrl || ''}
                onChange={handleImageChange('ganeshaIconUrl')}
              />`;

const ogImageBlock = `<ImageUpload
                label="Social Sharing Preview (OG Thumbnail Image)"
                value={settings.ogImageUrl || ''}
                onChange={handleImageChange('ogImageUrl')}
              />`;

content = content.replace(ganeshaBlock, ganeshaBlock + '\n              ' + ogImageBlock);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
