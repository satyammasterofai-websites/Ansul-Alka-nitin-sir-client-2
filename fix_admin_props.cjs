const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  `interface Props {
  settings: ECardSettings;
  setSettings: React.Dispatch<React.SetStateAction<ECardSettings>>;
  onExit: () => void;
}`,
  `interface Props {
  settings: ECardSettings;
  setSettings: React.Dispatch<React.SetStateAction<ECardSettings>>;
  onExit: () => void;
  isExiting?: boolean;
}`
);

content = content.replace(
  `export function AdminPanel({ settings, setSettings, onExit }: Props) {`,
  `export function AdminPanel({ settings, setSettings, onExit, isExiting }: Props) {`
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
