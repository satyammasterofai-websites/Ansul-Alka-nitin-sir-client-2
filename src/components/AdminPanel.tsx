import React, { useState } from 'react';
import { runDiagnostics } from '../lib/diagnostics';
import { Settings2, Image as ImageIcon, LayoutTemplate, Link as LinkIcon, Upload, Loader2, Type, Copy, Check, ShieldCheck, GitFork, Sparkles, RotateCcw, Database } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getShareableUrl, saveToLocalStorage, getFromLocalStorage, isMasterTemplate, isOfficialWebsite, sanitizeCardIdForSave, MASTER_CARD_ID, REMIX_DEFAULT_CARD_ID, getWebsiteName, OFFICIAL_WEBSITE_NAME, REMIX_WEBSITE_NAME } from '../lib/cardInstance';
import { ECardSettings, TextElement, defaultSettings } from '../types';
import { OpeningPage } from './OpeningPage';
import { HeroSection } from './HeroSection';

interface Props {
  settings: ECardSettings;
  cardId: string;
  setCardId: (id: string) => void;
  setSettings: React.Dispatch<React.SetStateAction<ECardSettings>>;
  onExit: () => void;
  isExiting?: boolean;
}

const ImageUploadField = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string, 
  value: string, 
  onChange: (url: string) => void 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Max dimensions
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Preserve transparency for PNGs
        const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = file.type === 'image/png' ? undefined : 0.6;
        const dataUrl = canvas.toDataURL(outputFormat, quality);
        
        onChange(dataUrl);
      }
      URL.revokeObjectURL(objectUrl);
      setIsUploading(false);
    };

    img.onerror = () => {
      console.error("Error loading image for resize");
      alert("Failed to process image.");
      URL.revokeObjectURL(objectUrl);
      setIsUploading(false);
    };

    img.src = objectUrl;
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
      <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
        {label}
      </label>
      
      {value ? (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-stone-200 group bg-stone-100 flex items-center justify-center">
          <img 
            src={value} 
            className="w-full h-full object-cover" 
            alt="Preview"
             referrerPolicy="no-referrer" 
            
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/800x800/cccccc/666666?text=Invalid+Link';
            }}
            
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">Current Image</span>
          </div>
        </div>
      ) : null}

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          title="Upload an image"
        />
        <div className={`w-full px-4 py-4 border-2 border-dashed rounded-lg text-center transition-colors relative ${
          isUploading ? 'border-stone-300 bg-stone-50' : 'border-stone-300 hover:border-stone-400 hover:bg-stone-50'
        }`}>
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 text-stone-500 animate-spin" />
              <span className="text-sm font-medium text-stone-600">Processing...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-stone-500">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">Click to upload new image</span>
              <span className="text-xs text-stone-400">PNG, JPG (Saved as Base64)</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-stone-100"></div>
        <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">OR PASTE URL</span>
        <div className="h-px flex-1 bg-stone-100"></div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LinkIcon className="w-4 h-4 text-stone-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            let val = e.target.value;
            const gdriveMatch = val.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
            if (gdriveMatch) {
              val = `https://drive.google.com/uc?export=view&id=${gdriveMatch[1]}`;
            }
            const dropboxMatch = val.match(/dropbox\.com\/s\/([^\/]+\/[^?]+)/);
            if (dropboxMatch) {
              val = `https://dl.dropboxusercontent.com/s/${dropboxMatch[1]}`;
            }
            onChange(val);
          }}
          className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 transition-colors"
          placeholder="https://..."
        />
      </div>
    </div>
  );
};

const AudioUploadField = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string, 
  value: string, 
  onChange: (url: string) => void 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      console.error("Error reading file as Base64");
      alert("Failed to process audio.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
      <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
        {label}
      </label>
      
      {value ? (
        <div className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50">
          <audio controls src={value} className="w-full h-10" />
        </div>
      ) : null}

      <div className="relative">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          title="Upload audio"
        />
        <div className={`w-full px-4 py-4 border-2 border-dashed rounded-lg text-center transition-colors relative ${
          isUploading ? 'border-stone-300 bg-stone-50' : 'border-stone-300 hover:border-stone-400 hover:bg-stone-50'
        }`}>
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 text-stone-500 animate-spin" />
              <span className="text-sm font-medium text-stone-600">Processing...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-stone-500">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">Click to upload music</span>
              <span className="text-xs text-stone-400">MP3, WAV (Saved as Base64)</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-stone-100"></div>
        <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">OR PASTE URL</span>
        <div className="h-px flex-1 bg-stone-100"></div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LinkIcon className="w-4 h-4 text-stone-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            let val = e.target.value;
            const gdriveMatch = val.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
            if (gdriveMatch) {
              val = `https://drive.google.com/uc?export=view&id=${gdriveMatch[1]}`;
            }
            const dropboxMatch = val.match(/dropbox\.com\/s\/([^\/]+\/[^?]+)/);
            if (dropboxMatch) {
              val = `https://dl.dropboxusercontent.com/s/${dropboxMatch[1]}`;
            }
            onChange(val);
          }}
          className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 transition-colors"
          placeholder="https://..."
        />
      </div>
    </div>
  );
};

export function AdminPanel({ settings, setSettings, onExit, isExiting, cardId, setCardId }: Props) {
  const [activeTab, setActiveTab] = useState<'images' | 'layout' | 'text' | 'events' | 'content' | 'advanced'>('images');
  const [previewView, setPreviewView] = useState<'opening' | 'hero'>('opening');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isForking, setIsForking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-ecard-${cardId}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const handleCopyLink = () => {
    const shareUrl = getShareableUrl(cardId);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }).catch(() => {
        prompt("Copy your shareable invitation link:", shareUrl);
      });
    } else {
      prompt("Copy your shareable invitation link:", shareUrl);
    }
  };

  const handleForkRemix = async () => {
    const defaultNewName = `remix-${Math.random().toString(36).substring(2, 8)}`;
    const input = window.prompt(
      "Create a New Isolated Remix:\n\nEnter a unique name for your remix (e.g. 'rahul-priya' or 'wedding-2027').\n\nAll current images, text, events, and settings will be copied to this new database so nothing is lost, and all future edits will be 100% separate!",
      defaultNewName
    );
    if (!input || input.trim() === "") return;
    const sanitized = input.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (sanitized === cardId) {
      alert("You are already on this database ID.");
      return;
    }
    if (!isOfficialWebsite() && (sanitized === MASTER_CARD_ID || sanitized === 'official-wedding-card')) {
      alert("Cannot overwrite the official website template name. Please pick a custom remix name.");
      return;
    }

    setIsForking(true);
    try {
      // 1. Save settings to new card ID in Firestore
      const targetId = sanitizeCardIdForSave(sanitized);
      const cleanSettings = JSON.parse(JSON.stringify(settings));
      await setDoc(doc(db, 'wedding_invitations', targetId), cleanSettings);
      
      // 2. Save to isolated localStorage
      saveToLocalStorage(targetId, cleanSettings);
      
      // 3. Update state and URL
      setCardId(targetId);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('id', targetId);
      window.history.pushState({}, '', newUrl.toString());
      
      alert(`🎉 New Remix created successfully!\n\nDatabase ID: '${targetId}'\n\nYour website is now running on its own dedicated database. All changes will be saved to '${targetId}' and will never overlap with the master template or any other website.`);
    } catch (err: any) {
      console.error("Error creating remix:", err);
      alert("Error creating remix database: " + err.message);
    } finally {
      setIsForking(false);
    }
  };

  const [isRestoringOfficial, setIsRestoringOfficial] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSwitchToOfficialData = async () => {
    setIsRestoringOfficial(true);
    try {
      // 1. Fetch fresh official master data from Firestore 'remix-v1' or fall back to defaultSettings
      let officialData = defaultSettings;
      try {
        const snap = await getDoc(doc(db, 'wedding_invitations', MASTER_CARD_ID));
        if (snap.exists()) {
          officialData = { ...defaultSettings, ...snap.data() };
        }
      } catch (err) {
        console.warn("Could not load from Firestore, using bundled defaultSettings:", err);
      }

      // 2. Set settings in state
      setSettings(officialData);

      // 3. Save to current cardId document in Firestore so this instance updates immediately
      const targetCardId = sanitizeCardIdForSave(cardId);
      const cleanData = JSON.parse(JSON.stringify(officialData));
      cleanData.clientName = 'nitin sir client -2';
      cleanData.clientId = 'nitin-sir-client-2';
      cleanData.savedAs = 'nitin sir client -2';
      cleanData.isOfficial = false;
      cleanData.isRemix = true;
      cleanData.remixName = 'nitin sir client -2';
      cleanData.lastSaved = new Date().toISOString();

      await setDoc(doc(db, 'wedding_invitations', targetCardId), cleanData);
      if (targetCardId === 'nitin-sir-client-2') {
        await setDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'), cleanData);
      }
      saveToLocalStorage(targetCardId, cleanData);
      saveToLocalStorage('nitin sir client -2', cleanData);

      // 4. Save preference in localStorage so subsequent page reloads stay on this official data
      localStorage.setItem('wedding_custom_card_id', targetCardId);

      setStatusMessage({
        text: `🎉 Cloned Official Data into '${REMIX_WEBSITE_NAME}'! All data is saved to isolated database fields in the name of 'nitin sir client -2'.`,
        type: 'success'
      });
      setTimeout(() => setStatusMessage(null), 6000);
    } catch (error: any) {
      console.error("Error switching to official data:", error);
      setStatusMessage({ text: `Failed to switch to official data: ${error.message}`, type: 'error' });
      setTimeout(() => setStatusMessage(null), 6000);
    } finally {
      setIsRestoringOfficial(false);
    }
  };

  const handleSwitchToOfficialDatabase = async () => {
    if (!isOfficialWebsite()) {
      setStatusMessage({
        text: `🛡️ Database isolated! This remix is running as '${REMIX_WEBSITE_NAME}'. All changes save to dedicated database '${cardId}' and cannot alter the official master template.`,
        type: 'error'
      });
      setTimeout(() => setStatusMessage(null), 6000);
      return;
    }

    try {
      localStorage.setItem('wedding_custom_card_id', MASTER_CARD_ID);
      setCardId(MASTER_CARD_ID);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('id', MASTER_CARD_ID);
      window.history.pushState({}, '', newUrl.toString());

      let officialData = defaultSettings;
      try {
        const snap = await getDoc(doc(db, 'wedding_invitations', MASTER_CARD_ID));
        if (snap.exists()) {
          officialData = { ...defaultSettings, ...snap.data() };
        }
      } catch (err) {}
      setSettings(officialData);
      saveToLocalStorage(MASTER_CARD_ID, officialData);

      setStatusMessage({
        text: `🎉 Connected to Official Master Database '${MASTER_CARD_ID}'! Your website now directly uses the official template.`,
        type: 'success'
      });
      setTimeout(() => setStatusMessage(null), 6000);
    } catch (error: any) {
      setStatusMessage({ text: `Failed to connect to official database: ${error.message}`, type: 'error' });
      setTimeout(() => setStatusMessage(null), 6000);
    }
  };

  const handleCardIdChange = () => {
    const newId = window.prompt(
      "Switch to another Database Name:\n\nEnter the database ID you want to load or switch to:", 
      cardId
    );
    if (newId && newId.trim() !== "" && newId.trim() !== cardId) {
      const sanitized = sanitizeCardIdForSave(newId.trim());
      saveToLocalStorage(cardId, settings);
      localStorage.setItem('wedding_custom_card_id', sanitized);
      setCardId(sanitized);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('id', sanitized);
      window.history.pushState({}, '', newUrl.toString());
      setStatusMessage({
        text: `Switched to Database '${sanitized}'. The website will now load and save changes to this database.`,
        type: 'success'
      });
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const [activeTextId, setActiveTextId] = useState<string | null>(
    settings.textElements && settings.textElements.length > 0 ? settings.textElements[0].id : null
  );
  const [activeEventId, setActiveEventId] = useState<string | null>(
    settings.eventDetails && settings.eventDetails.length > 0 ? settings.eventDetails[0].id : null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'range' ? Number(value) : value,
    }));
  };

  const handleImageChange = (name: keyof ECardSettings) => (url: string) => {
    setSettings(prev => ({ ...prev, [name]: url }));
  };

  const handleTextChange = (id: string, field: keyof TextElement, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      textElements: prev.textElements.map(el => el.id === id ? { ...el, [field]: value } : el)
    }));
  };

  const addNewText = () => {
    const newId = `text-${Date.now()}`;
    setSettings(prev => ({
      ...prev,
      textElements: [
        ...(prev.textElements || []),
        {
          id: newId,
          text: 'New Text',
          top: 50,
          left: 50,
          color: '#831843',
          fontFamily: 'Playfair Display',
          fontSize: 2,
          textAlign: 'center',
        }
      ]
    }));
    setActiveTextId(newId);
  };

  const removeText = (id: string) => {
    const newElements = (settings.textElements || []).filter(el => el.id !== id);
    if (activeTextId === id) {
      setActiveTextId(newElements.length > 0 ? newElements[0].id : null);
    }
    setSettings(prev => ({ ...prev, textElements: (prev.textElements || []).filter(el => el.id !== id) }));
  };

  const handleEventChange = (id: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      eventDetails: (prev.eventDetails || []).map(el => el.id === id ? { ...el, [field]: value } : el)
    }));
  };

  const addNewEvent = () => {
    const newId = `event-${Date.now()}`;
    setSettings(prev => ({
      ...prev,
      eventDetails: [
        ...(prev.eventDetails || []),
        {
          id: newId,
          heading: 'New Event',
          imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
        }
      ]
    }));
    setActiveEventId(newId);
  };

  const removeEvent = (id: string) => {
    const newElements = (settings.eventDetails || []).filter(el => el.id !== id);
    if (activeEventId === id) {
      setActiveEventId(newElements.length > 0 ? newElements[0].id : null);
    }
    setSettings(prev => ({ ...prev, eventDetails: (prev.eventDetails || []).filter(el => el.id !== id) }));
  };

  const moveEventUp = (id: string | null) => {
    if (!id || !settings.eventDetails) return;
    const index = settings.eventDetails.findIndex(el => el.id === id);
    if (index <= 0) return;
    const newEvents = [...settings.eventDetails];
    const temp = newEvents[index - 1];
    newEvents[index - 1] = newEvents[index];
    newEvents[index] = temp;
    setSettings(prev => ({ ...prev, eventDetails: newEvents }));
  };

  const moveEventDown = (id: string | null) => {
    if (!id || !settings.eventDetails) return;
    const index = settings.eventDetails.findIndex(el => el.id === id);
    if (index === -1 || index >= settings.eventDetails.length - 1) return;
    const newEvents = [...settings.eventDetails];
    const temp = newEvents[index + 1];
    newEvents[index + 1] = newEvents[index];
    newEvents[index] = temp;
    setSettings(prev => ({ ...prev, eventDetails: newEvents }));
  };

  return (
    <div className="flex w-full h-full bg-stone-50 overflow-hidden font-sans">
      {/* Sidebar Controls */}
      <div className="w-96 bg-white border-r border-stone-200 h-full flex flex-col shadow-xl z-20 flex-shrink-0">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <h1 className="text-xl font-serif font-semibold text-stone-800 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-stone-500" />
            E-Card Builder
          </h1>
          <button
            onClick={onExit}
            disabled={isExiting}
            className="text-sm px-4 py-1.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {isExiting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save & Exit'
            )}
          </button>
        </div>

        {/* Status Toast Notification */}
        {statusMessage && (
          <div className={`px-4 py-2.5 text-xs flex items-center gap-2 border-b ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}>
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <span className="text-rose-600 font-bold shrink-0">!</span>
            )}
            <span className="flex-1 leading-tight">{statusMessage.text}</span>
          </div>
        )}

        {/* Quick Action: Switch to Official Data */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/80 px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-amber-950 truncate">
                {isOfficialWebsite() ? 'Official Master Template' : 'Remix Project'}
              </p>
              <p className="text-[10px] text-amber-700 truncate">
                {isOfficialWebsite() ? 'Riyansh & Priyanshi (Template-3)' : `${REMIX_WEBSITE_NAME} (Isolated DB)`}
              </p>
            </div>
          </div>
          <button
            onClick={handleSwitchToOfficialData}
            disabled={isRestoringOfficial}
            className="text-[11px] font-medium px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded shadow-xs transition-colors whitespace-nowrap flex items-center gap-1 shrink-0 disabled:opacity-50"
            title={isOfficialWebsite() ? "Restore official Riyansh & Priyanshi data" : `Clone official template into ${REMIX_WEBSITE_NAME}`}
          >
            {isRestoringOfficial ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Restoring...</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3 h-3" />
                <span>{isOfficialWebsite() ? 'Switch to Official Data' : 'Clone Template Data'}</span>
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-stone-100 p-2 gap-2 bg-stone-50">
          <button
            onClick={() => { setActiveTab('images'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'images' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Images
          </button>
          <button
            onClick={() => { setActiveTab('layout'); setPreviewView('opening'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'layout' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            Layout
          </button>
          <button
            onClick={() => { setActiveTab('text'); setPreviewView('opening'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'text' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Type className="w-4 h-4" />
            Text
          </button>
          <button
            onClick={() => { setActiveTab('events'); setPreviewView('hero'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'events' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            Events
          </button>
          <button
            onClick={() => { setActiveTab('content'); setPreviewView('hero'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'content' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Type className="w-4 h-4" />
            Content
          </button>
          <button
            onClick={() => { setActiveTab('advanced'); }}
            className={`flex-1 min-w-fit whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeTab === 'advanced' ? 'bg-white shadow-sm border border-stone-200 text-stone-900' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Advanced
          </button>
        </div>

        {/* Controls Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-stone-50/50">
          {activeTab === 'text' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <select
                  value={activeTextId || ''}
                  onChange={(e) => setActiveTextId(e.target.value)}
                  className="px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600 flex-1 mr-3"
                >
                  {settings.textElements?.map((el, i) => (
                    <option key={el.id} value={el.id}>Text {i + 1}: {el.text.substring(0, 15) || 'Empty'}</option>
                  ))}
                  {(!settings.textElements || settings.textElements.length === 0) && (
                    <option value="" disabled>No text elements</option>
                  )}
                </select>
                <button
                  onClick={addNewText}
                  className="px-3 py-2 bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  + Add New
                </button>
              </div>

              {activeTextId && settings.textElements?.find(el => el.id === activeTextId) && (() => {
                const activeEl = settings.textElements.find(el => el.id === activeTextId)!;
                return (
                  <div className="space-y-6">
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm relative">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-stone-800">
                          Text Content
                        </label>
                        <button
                          onClick={() => removeText(activeEl.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors"
                        >
                          Remove Element
                        </button>
                      </div>
                      <textarea
                        value={activeEl.text}
                        onChange={(e) => handleTextChange(activeEl.id, 'text', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 resize-none"
                        placeholder="Enter text..."
                      />
                    </div>

                    <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                      <h3 className="text-sm font-medium text-stone-800 mb-2">Typography & Style</h3>
                      
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider">Font Family</label>
                        <select
                          value={activeEl.fontFamily}
                          onChange={(e) => handleTextChange(activeEl.id, 'fontFamily', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600"
                        >
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Dancing Script">Dancing Script</option>
                          <option value="Great Vibes">Great Vibes</option>
                          <option value="Cinzel">Cinzel</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Pacifico">Pacifico</option>
                          <option value="Sacramento">Sacramento</option>
                          <option value="sans-serif">Sans Serif</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider">Font Size (rem)</label>
                          <span className="text-xs font-medium px-2 py-0.5 bg-stone-100 rounded text-stone-600">{activeEl.fontSize}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.1"
                          value={activeEl.fontSize}
                          onChange={(e) => handleTextChange(activeEl.id, 'fontSize', parseFloat(e.target.value))}
                          className="w-full accent-stone-900 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider">Text Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={activeEl.color}
                            onChange={(e) => handleTextChange(activeEl.id, 'color', e.target.value)}
                            className="h-8 w-16 cursor-pointer rounded border border-stone-200"
                          />
                          <input
                            type="text"
                            value={activeEl.color}
                            onChange={(e) => handleTextChange(activeEl.id, 'color', e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-stone-200 rounded-md sm:text-sm text-stone-600 uppercase"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider">Alignment</label>
                        <div className="flex bg-stone-100 rounded-md p-1 gap-1">
                          {['left', 'center', 'right'].map(align => (
                            <button
                              key={align}
                              onClick={() => handleTextChange(activeEl.id, 'textAlign', align)}
                              className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-colors ${
                                activeEl.textAlign === align ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'
                              }`}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          ) : activeTab === 'events' ? (
            <div className="space-y-6">
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Events Section Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="eventsBgColor"
                    value={settings.eventsBgColor || '#0a4226'}
                    onChange={handleChange}
                    className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    name="eventsBgColor"
                    value={settings.eventsBgColor || '#0a4226'}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Events Section Details Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="eventsSectionHeadingColor"
                    value={settings.eventsSectionHeadingColor || settings.eventsHeadingColor || '#be185d'}
                    onChange={handleChange}
                    className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    name="eventsSectionHeadingColor"
                    value={settings.eventsSectionHeadingColor || settings.eventsHeadingColor || '#be185d'}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Events Section Heading Font
                </label>
                <select
                  name="eventsSectionHeadingFont"
                  value={settings.eventsSectionHeadingFont || 'Cinzel'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Great Vibes">Great Vibes</option>
                  <option value="Cinzel">Cinzel</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Pacifico">Pacifico</option>
                  <option value="Sacramento">Sacramento</option>
                  <option value="sans-serif">Sans Serif</option>
                </select>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Events Image Details Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="eventsImageHeadingColor"
                    value={settings.eventsImageHeadingColor || settings.eventsHeadingColor || '#be185d'}
                    onChange={handleChange}
                    className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    name="eventsImageHeadingColor"
                    value={settings.eventsImageHeadingColor || settings.eventsHeadingColor || '#be185d'}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm gap-2">
                <select
                  value={activeEventId || ''}
                  onChange={(e) => setActiveEventId(e.target.value)}
                  className="px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600 flex-1 min-w-0"
                >
                  {settings.eventDetails?.map((el, i) => (
                    <option key={el.id} value={el.id}>Event {i + 1}: {el.heading || 'Empty'}</option>
                  ))}
                  {(!settings.eventDetails || settings.eventDetails.length === 0) && (
                    <option value="" disabled>No event elements</option>
                  )}
                </select>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveEventUp(activeEventId)}
                    title="Move event up in order"
                    className="px-2.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs font-bold transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveEventDown(activeEventId)}
                    title="Move event down in order"
                    className="px-2.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs font-bold transition-colors"
                  >
                    ↓
                  </button>
                </div>
                <button
                  onClick={addNewEvent}
                  className="px-3 py-2 bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
                >
                  + Add Event
                </button>
              </div>

              {activeEventId && settings.eventDetails?.find(el => el.id === activeEventId) && (() => {
                const activeEl = settings.eventDetails.find(el => el.id === activeEventId)!;
                return (
                  <div className="space-y-6">
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm relative">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-stone-800">
                          Event Heading
                        </label>
                        <button
                          onClick={() => removeEvent(activeEl.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors"
                        >
                          Remove Event
                        </button>
                      </div>
                      <input
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
                      </div>
                    </div>
                    <ImageUploadField
                      label="Event Image"
                      value={activeEl.imageUrl}
                      onChange={(url) => handleEventChange(activeEl.id, 'imageUrl', url)}
                    /><div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
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
                    </div>
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                      <label className="block text-sm font-medium text-stone-800">
                        Direction URL (Map Link)
                      </label>
                      <input
                        type="text"
                        value={activeEl.directionUrl || ''}
                        onChange={(e) => handleEventChange(activeEl.id, 'directionUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Map Settings */}
              <div className="pt-6 mt-6 border-t border-stone-200 space-y-6">
                <h3 className="text-lg font-medium text-stone-800">Map Integration</h3>
                
                <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex items-center justify-between">
                  <label className="text-sm font-medium text-stone-800">Show Map Section</label>
                  <input
                    type="checkbox"
                    name="showMap"
                    checked={settings.showMap !== false}
                    onChange={(e) => setSettings(prev => ({ ...prev, showMap: e.target.checked }))}
                    className="h-4 w-4 text-stone-900 border-stone-300 rounded focus:ring-stone-900"
                  />
                </div>

                <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                  <label className="block text-sm font-medium text-stone-800">Map Heading</label>
                  <input
                    type="text"
                    name="mapHeading"
                    value={settings.mapHeading || 'Where we Celebrate'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                  />
                </div>

                <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                  <label className="block text-sm font-medium text-stone-800">Map Sub-Heading (e.g. Hotel Name)</label>
                  <input
                    type="text"
                    name="mapSubHeading"
                    value={settings.mapSubHeading || 'Grand Banquet Hall'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                  />
                </div>

                <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                  <label className="block text-sm font-medium text-stone-800">Map Address (Search Query)</label>
                  <input
                    type="text"
                    name="mapAddress"
                    value={settings.mapAddress || 'Grand Banquet Hall, New York'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                    placeholder="Enter the full address to show on the map"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === 'content' ? (
            <div className="space-y-6">
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

              <div className="space-y-4 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <h4 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">Groom &amp; Bride Typography &amp; Visibility</h4>
                
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-stone-700">Font Style</label>
                  <select
                    name="heroGroomBrideFont"
                    value={settings.heroGroomBrideFont || 'Playfair Display'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600"
                  >
                    <option value="Playfair Display">Playfair Display (Slightly Visible Serif - Recommended)</option>
                    <option value="Dancing Script">Dancing Script (Elegant Calligraphy)</option>
                    <option value="Cinzel">Cinzel (Regal Classic)</option>
                    <option value="Great Vibes">Great Vibes (Fine Cursive)</option>
                    <option value="Sacramento">Sacramento (Delicate Script)</option>
                    <option value="Montserrat">Montserrat (Clean Sans)</option>
                    <option value="Pacifico">Pacifico (Friendly Script)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-stone-700">Font Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="heroGroomBrideColor"
                      value={settings.heroGroomBrideColor || '#7a103c'}
                      onChange={handleChange}
                      className="h-9 w-16 cursor-pointer rounded border border-stone-200"
                    />
                    <input
                      type="text"
                      name="heroGroomBrideColor"
                      value={settings.heroGroomBrideColor || '#7a103c'}
                      onChange={handleChange}
                      className="flex-1 px-3 py-1.5 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="block text-xs font-medium text-stone-700">Text Visibility (Opacity)</label>
                    <span className="text-xs text-stone-500 font-mono">{settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity : 90}%</span>
                  </div>
                  <input
                    type="range"
                    name="heroGroomBrideOpacity"
                    min="40"
                    max="100"
                    value={settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity : 90}
                    onChange={handleChange}
                    className="w-full accent-stone-900 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Invitation Message Section</h3>
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
          ) : activeTab === 'advanced' ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-stone-800 border-b pb-2 flex items-center justify-between">
                <span>Data Management & Remixing</span>
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck size={13} /> Zero Overlap Guaranteed
                </span>
              </h3>

              {/* Data Isolation Status Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-sm">
                    {isOfficialWebsite() ? 'Official Website Master Instance' : 'Remix Data Isolation Active'}
                  </span>
                  <span className="ml-auto text-[11px] font-mono bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">
                    {isOfficialWebsite() ? 'Official Master' : 'Isolated Remix'}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {isOfficialWebsite() 
                    ? `This is the official master website running on database ID "${cardId}". All initial wedding data is safely recovered and protected. Any remix created from this site will save to its own database and can never overwrite this website.`
                    : `This remix is running on dedicated database ID "${cardId}" for '${REMIX_WEBSITE_NAME}'. All changes and files are saved in separate fields/documents and will never overlap with the official website.`
                  }
                </p>
              </div>

              {/* Official Template & Hosting Sync Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-950">Clone Base Template Assets</h4>
                      <p className="text-[11px] text-amber-800">Premium Template Design</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-medium">
                    Permanent
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Use this option to clone the original template design assets (backgrounds, music, ceremonies, and 4 caricatures) into this remix database without ever affecting the master website.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleSwitchToOfficialData}
                    disabled={isRestoringOfficial}
                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isRestoringOfficial ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Restoring Official Data...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span>Switch to Official Data</span>
                      </>
                    )}
                  </button>
                  <div className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-medium flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Data Isolation Active: 100% separate from official website</span>
                  </div>
                </div>
              </div>

              {/* Active Database & Fork Section */}
              <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-stone-900">Current Database ID (Card ID)</label>
                  <p className="text-xs text-stone-500 mt-1 mb-2">Each database ID stores its own completely independent data and chunked file storage.</p>
                  <div className="flex items-center gap-2">
                     <input type="text" readOnly value={cardId} className="flex-1 px-3 py-2 border border-stone-200 rounded-md bg-stone-50 font-mono text-stone-700 sm:text-sm" />
                     <button 
                       onClick={handleCardIdChange} 
                       className="px-3 py-2 border border-stone-300 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors font-medium whitespace-nowrap"
                     >
                       Switch Database
                     </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleForkRemix}
                    disabled={isForking}
                    className="flex-1 px-4 py-2.5 bg-stone-900 text-white rounded-md text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
                  >
                    {isForking ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Remix...</span>
                      </>
                    ) : (
                      <>
                        <GitFork className="w-4 h-4" />
                        <span>Fork / Create New Remix</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Shareable Link */}
                <div className="pt-3 border-t border-stone-100 space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Direct Shareable Link</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={getShareableUrl(cardId)} 
                      className="flex-1 px-3 py-1.5 border border-stone-200 rounded-md bg-stone-50 text-stone-500 text-xs font-mono truncate" 
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <label className="block text-sm font-medium text-stone-900 mb-2">Backup & Restore</label>
                  <button onClick={handleExport} className="w-full mb-3 px-4 py-2 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-50 transition-colors text-center">Export Data (JSON)</button>
                  
                  <div 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${isDragging ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}
                  >
                    <Upload className="w-6 h-6 text-stone-400 mb-2" />
                    <p className="text-sm text-stone-600 mb-1">Drag and drop backup JSON</p>
                    <p className="text-xs text-stone-400 mb-3">or</p>
                    <label className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-md text-sm hover:bg-stone-200 transition-colors cursor-pointer font-medium">
                      Browse Files
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={async () => {
                         const report = await runDiagnostics(cardId);
                         alert("DIAGNOSTIC REPORT:\n\n" + report.join("\n"));
                      }}
                      className="w-full px-4 py-2 mb-2 bg-stone-900 text-white rounded-md text-sm hover:bg-stone-800 transition-colors text-center font-medium"
                    >
                      Run System Diagnostics
                    </button>
                    <button 
                      onClick={() => {
                        const saved = getFromLocalStorage(cardId);
                        if (saved) {
                           setSettings(saved);
                           alert(`Successfully recovered data for '${cardId}' from local browser storage!`);
                        } else {
                           alert(`No local storage data found for '${cardId}'.`);
                        }
                      }}
                      className="w-full px-4 py-2 bg-stone-100 border border-stone-300 text-stone-700 rounded-md text-sm hover:bg-stone-200 transition-colors text-center font-medium"
                    >
                      Recover from Local Browser Storage
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Custom Database Columns (Fields)</h3>
              <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                <p className="text-xs text-stone-500 mb-2">Add custom database fields to save specific details.</p>
                {Object.entries(settings.customFields || {}).map(([key, value], idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Column Name"
                      value={key}
                      onChange={(e) => {
                         const newFields = { ...settings.customFields };
                         const oldVal = newFields[key];
                         delete newFields[key];
                         newFields[e.target.value] = oldVal;
                         setSettings(prev => ({ ...prev, customFields: newFields }));
                      }}
                      className="w-1/3 px-3 py-2 border border-stone-200 rounded-md sm:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={value}
                      onChange={(e) => {
                         setSettings(prev => ({ ...prev, customFields: { ...prev.customFields, [key]: e.target.value } }));
                      }}
                      className="flex-1 px-3 py-2 border border-stone-200 rounded-md sm:text-sm"
                    />
                    <button
                      onClick={() => {
                        const newFields = { ...settings.customFields };
                        delete newFields[key];
                        setSettings(prev => ({ ...prev, customFields: newFields }));
                      }}
                      className="px-2 py-1 bg-red-50 text-red-600 rounded-md text-xs hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newKey = `column_${Object.keys(settings.customFields || {}).length + 1}`;
                    setSettings(prev => ({ ...prev, customFields: { ...prev.customFields, [newKey]: '' } }));
                  }}
                  className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-700 rounded-md text-sm hover:bg-stone-200 transition-colors"
                >
                  + Add New Column
                </button>
              </div>

              <h3 className="text-lg font-medium text-stone-800 border-b pb-2">Advanced Settings</h3>
              <div className="space-y-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-stone-900">Lock Website</label>
                    <p className="text-xs text-stone-500 mt-1">Hide the website and show a holding page (Admin panel button remains visible)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={settings.paymentPending || false}
                      onChange={(e) => setSettings(prev => ({ ...prev, paymentPending: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-900"></div>
                  </label>
                </div>
                
                {settings.paymentPending && (
                  <div className="pt-4 border-t border-stone-100 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-800 mb-2">Holding Page Text</label>
                      <textarea
                        value={settings.paymentPendingText || "'Pranay weds Alisha' wedding Invitation website didn't purchase yet"}
                        onChange={(e) => setSettings(prev => ({ ...prev, paymentPendingText: e.target.value }))}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'images' ? (
            <div className="space-y-6">
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Opening Page Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="openingBgColor"
                    value={settings.openingBgColor || '#DCE8D3'}
                    onChange={handleChange}
                    className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    name="openingBgColor"
                    value={settings.openingBgColor || '#DCE8D3'}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase"
                  />
                </div>
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  All Sections Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="sectionsBgColor"
                    value={settings.sectionsBgColor || '#fdf2f8'}
                    onChange={handleChange}
                    className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                  />
                  <input
                    type="text"
                    name="sectionsBgColor"
                    value={settings.sectionsBgColor || '#fdf2f8'}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600 uppercase"
                  />
                </div>
              </div>
              <ImageUploadField
                label="Embedded Clickable Image (Center)"
                value={settings.embeddedImageUrl}
                onChange={handleImageChange('embeddedImageUrl')}
              />
              <ImageUploadField
                label="Hero Section Background Image (9:16)"
                value={settings.heroImageUrl}
                onChange={handleImageChange('heroImageUrl')}
              />
              <ImageUploadField
                label="Ganesha Icon Image (Top Center)"
                value={settings.ganeshaIconUrl || ''}
                onChange={handleImageChange('ganeshaIconUrl')}
              />
              <ImageUploadField
                label="WhatsApp / Social Share Preview Image (OG Image)"
                value={settings.ogImageUrl || ''}
                onChange={handleImageChange('ogImageUrl')}
              />
              <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <label className="block text-sm font-medium text-stone-800 flex items-center gap-2">
                  Target Date (For Countdown)
                </label>
                <input
                  type="date"
                  name="targetDate"
                  value={settings.targetDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 focus:border-stone-900 sm:text-sm text-stone-600"
                />
              </div>
              <AudioUploadField
                label="Background Music"
                value={settings.musicUrl}
                onChange={handleImageChange('musicUrl')}
              />
            </div>
          ) : (
            <div className="space-y-8 bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
              <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
                Adjust the position and size of the embedded image on the Opening Page. Changes are saved automatically.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-stone-700">Size (Width %)</label>
                  <span className="text-xs font-medium px-2 py-1 bg-stone-100 rounded text-stone-600">{settings.embeddedImageWidth}%</span>
                </div>
                <input
                  type="range"
                  name="embeddedImageWidth"
                  min="10"
                  max="100"
                  value={settings.embeddedImageWidth}
                  onChange={handleChange}
                  className="w-full accent-stone-900 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Mini Live Preview */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-stone-700 mb-3">Live Adjustment View</h3>
                <div className="relative w-full aspect-[9/16] bg-white rounded-xl shadow-inner border border-stone-200 overflow-hidden">
                  <OpeningPage settings={settings} onClickEmbedded={() => {}} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-8 flex flex-col h-full bg-stone-200/50">
        <div className="flex justify-between items-center mb-6 max-w-[400px] mx-auto w-full">
          <h2 className="text-sm font-medium text-stone-600 uppercase tracking-wider">Live Preview</h2>
          <div className="flex bg-white rounded-lg shadow-sm border border-stone-200 p-1">
            <button
              onClick={() => setPreviewView('opening')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                previewView === 'opening' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Opening Page
            </button>
            <button
              onClick={() => setPreviewView('hero')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                previewView === 'hero' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Hero Section
            </button>
          </div>
        </div>

        {/* Mobile Device Simulation Frame */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0">
          <div className="relative w-[375px] h-[812px] max-h-full bg-white rounded-[2.5rem] shadow-2xl border-[12px] border-stone-800 overflow-hidden shrink-0 transition-all">
            {previewView === 'opening' ? (
              <OpeningPage settings={settings} onClickEmbedded={() => setPreviewView('hero')} />
            ) : (
              <HeroSection settings={settings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

