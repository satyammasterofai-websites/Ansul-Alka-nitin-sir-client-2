/**
 * cardInstance.ts
 * Manages unique database identification, remix isolation, and URL synchronization.
 * Guarantees that remixed websites in AI Studio never overlap or overwrite data from the official website.
 */

export const MASTER_CARD_ID = 'official-wedding-card';
export const OFFICIAL_APPLET_ID = 'a96df12c-9a53-491f-9834-0d2693a3ab95';
export const OFFICIAL_SUBDOMAIN = 'zu6oj4k573mqstevuaebw5';
export const OFFICIAL_WEBSITE_NAME = 'Riyansh & Priyanshi Premium Template-3';

export const REMIX_DEFAULT_CARD_ID = 'nitin-sir-client-2';
export const REMIX_WEBSITE_NAME = 'Anshul & Alka Wedding Invitation';

/**
 * Returns true only if the running code is in the official template container.
 * In this project, this codebase is the dedicated remix for "Nitin sir client -2",
 * so this is guaranteed to return false to completely prevent overlapping with official data.
 */
export function isOfficialWebsite(): boolean {
  return false;
}

/**
 * Returns the website name for this remix
 */
export function getWebsiteName(): string {
  return REMIX_WEBSITE_NAME;
}

/**
 * List of document keys representing this client in Firestore
 */
export const CLIENT_DOCUMENT_IDS = ['nitin-sir-client-2', 'nitin sir client -2'];

/**
 * Detects the AI Studio applet subdomain from window.location.hostname
 * e.g. "ais-dev-lc7jhw2xiplwcbu564m46i-18224007398.asia-east1.run.app"
 */
export function detectAppletSubdomain(): string | null {
  if (typeof window === 'undefined' || !window.location) return null;
  const hostname = window.location.hostname || '';
  const match = hostname.match(/^ais-(?:dev|pre)-([a-zA-Z0-9]+)/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Generates or retrieves a unique isolated database ID for a remix container
 */
export function getRemixDefaultId(): string {
  return REMIX_DEFAULT_CARD_ID;
}

/**
 * Determines the appropriate card/database ID for the current instance.
 * Follows strict isolation:
 * Always defaults to isolated REMIX_DEFAULT_CARD_ID ('nitin-sir-client-2')
 * and strictly prevents loading or writing to official template.
 */
export function determineInitialCardId(): string {
  if (typeof window !== 'undefined') {
    // 1. Explicit URL parameter
    try {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('id') || params.get('remix') || params.get('card');
      if (queryId && queryId.trim() !== '') {
        const trimmed = queryId.trim();
        // A remix is strictly forbidden from accessing or overwriting the master card
        if (
          trimmed === MASTER_CARD_ID || 
          trimmed === 'official-wedding-card' || 
          trimmed === 'remix-v1' ||
          trimmed.toLowerCase().includes('official')
        ) {
          return REMIX_DEFAULT_CARD_ID;
        }
        if (trimmed === 'nitin sir client -2' || trimmed === 'nitin-sir-client-2') {
          return REMIX_DEFAULT_CARD_ID;
        }
        return trimmed;
      }
    } catch (e) {
      console.warn('Error reading URL search params:', e);
    }

    // 2. Saved card ID preference from localStorage
    try {
      const savedCardId = localStorage.getItem('wedding_custom_card_id');
      if (savedCardId && savedCardId.trim() !== '') {
        const trimmed = savedCardId.trim();
        // Disallow remix from reading master card ID from legacy storage
        if (
          trimmed !== MASTER_CARD_ID && 
          trimmed !== 'official-wedding-card' && 
          trimmed !== 'remix-v1' &&
          !trimmed.toLowerCase().includes('official')
        ) {
          if (trimmed === 'nitin sir client -2' || trimmed === 'nitin-sir-client-2') {
            return REMIX_DEFAULT_CARD_ID;
          }
          return trimmed;
        }
      }
    } catch (e) {}
  }

  // Default isolated database document
  return REMIX_DEFAULT_CARD_ID;
}

/**
 * Security guard: ensures this remix CAN NEVER write to the official master documents
 */
export function sanitizeCardIdForSave(targetCardId: string): string {
  if (
    !targetCardId || 
    targetCardId === MASTER_CARD_ID || 
    targetCardId === 'official-wedding-card' || 
    targetCardId === 'remix-v1' ||
    targetCardId.toLowerCase().includes('official')
  ) {
    console.warn(`[DATA ISOLATION] Blocked remix from writing to official template '${targetCardId}'. Redirected to '${REMIX_DEFAULT_CARD_ID}'.`);
    return REMIX_DEFAULT_CARD_ID;
  }
  return targetCardId;
}

/**
 * Returns isolated localStorage key for a specific card ID
 */
export function getStorageKey(cardId: string): string {
  return `wedding-ecard-settings-${cardId}`;
}

/**
 * Saves settings to localStorage with card isolation
 */
export function saveToLocalStorage(cardId: string, settings: any): void {
  try {
    const safeCardId = sanitizeCardIdForSave(cardId);
    const dataStr = JSON.stringify(settings);
    localStorage.setItem(getStorageKey(safeCardId), dataStr);
    if (safeCardId === REMIX_DEFAULT_CARD_ID) {
      localStorage.setItem(getStorageKey('nitin sir client -2'), dataStr);
    }
  } catch (e) {
    console.warn(`Local storage quota exceeded or blocked for ${cardId}:`, e);
  }
}

/**
 * Gets settings from localStorage with fallback to client alias
 */
export function getFromLocalStorage(cardId: string): any | null {
  try {
    const scoped = localStorage.getItem(getStorageKey(cardId));
    if (scoped) return JSON.parse(scoped);
    if (cardId === REMIX_DEFAULT_CARD_ID) {
      const alias = localStorage.getItem(getStorageKey('nitin sir client -2'));
      if (alias) return JSON.parse(alias);
    }
  } catch (e) {
    console.warn(`Error reading localStorage for ${cardId}:`, e);
  }
  return null;
}

/**
 * Generates the full shareable URL with the card ID query param
 */
export function getShareableUrl(cardId: string): string {
  if (typeof window === 'undefined' || !window.location) return `?id=${cardId}`;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('id', cardId);
    return url.toString();
  } catch (e) {
    return `${window.location.origin}${window.location.pathname}?id=${cardId}`;
  }
}

/**
 * Returns true if this card is the original master template
 */
export function isMasterTemplate(cardId: string): boolean {
  return cardId === MASTER_CARD_ID || cardId === 'official-wedding-card';
}
