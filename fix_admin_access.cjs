const fs = require('fs');

// 1. Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');

const oldHandleOpenAdmin = `  const handleOpenAdmin = () => {
    setCurrentView('admin');
  };`;

const newHandleOpenAdmin = `  const handleOpenAdmin = () => {
    const pwd = window.prompt("Enter admin password:");
    if (pwd === "6396") {
      setCurrentView('admin');
    } else if (pwd !== null) {
      alert("Incorrect password");
    }
  };`;

appContent = appContent.replace(oldHandleOpenAdmin, newHandleOpenAdmin);
fs.writeFileSync('src/App.tsx', appContent);

// 2. Update HeroSection.tsx
let heroContent = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

const oldButton = `{onOpenAdmin && (
            <button
              onClick={() => onOpenAdmin()}
              className="fixed bottom-6 right-6 z-[60] p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-[#FAF5EA] rounded-full shadow-lg border border-white/20 transition-all"
              aria-label="Open Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}`;
          
const newButton = `{onOpenAdmin && (
            <button
              onClick={() => onOpenAdmin()}
              className="mt-6 mb-2 p-2 bg-white/5 hover:bg-white/10 text-[#FAF5EA]/50 hover:text-[#FAF5EA] rounded-full transition-all flex items-center justify-center"
              aria-label="Open Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}`;

heroContent = heroContent.replace(oldButton, newButton);
fs.writeFileSync('src/components/HeroSection.tsx', heroContent);

