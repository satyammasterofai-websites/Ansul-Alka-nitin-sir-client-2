/**
 * cardInstance.ts
 * Manages unique database identification, remix isolation, and URL synchronization.
 * Guarantees that remixed websites in AI Studio never overlap or overwrite data from other websites.
 */

export const MASTER_CARD_ID = 'official-wedding-card';
export const OFFICIAL_APPLET_ID = 'a96df12c-9a53-491f-9834-0d2693a3ab95';
export const OFFICIAL_SUBDOMAIN = 'zu6oj4k573mqstevuaebw5';
export const OFFICIAL_WEBSITE_NAME = 'Riyansh & Priyanshi Premium Template-3';

// Original Website Details
export const ORIGINAL_APPLET_SUBDOMAIN = 'lc7jhw2xiplwcbu564m46i';
export const ORIGINAL_CARD_ID = 'nitin-sir-client-2';
export const ORIGINAL_WEBSITE_NAME = 'Anshul & Alka Wedding Invitation';

// Upcoming Remix Website Details ("Anshul & Alka 2")
export const REMIX_DEFAULT_CARD_ID = 'anshul-alka-2';
export const REMIX_WEBSITE_NAME = 'Anshul & Alka 2';

/**
 * Returns true only if the running code is in the official template container.
 */
export function isOfficialWebsite(): boolean {
  return false;
}

/**
 * Returns the website name based on active cardId or detected remix state
 */
export function getWebsiteName(targetCardId?: string): string {
  const effectiveId = targetCardId || (typeof window !== 'undefined' ? determineInitialCardId() : REMIX_DEFAULT_CARD_ID);
  if (effectiveId === 'anshul-alka-2' || effectiveId.toLowerCase().includes('alka-2') || effectiveId.toLowerCase().includes('alka 2')) {
    return REMIX_WEBSITE_NAME;
  }
  if (effectiveId === ORIGINAL_CARD_ID || effectiveId === 'nitin sir client -2') {
    return ORIGINAL_WEBSITE_NAME;
  }
  return REMIX_WEBSITE_NAME;
}

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
 * Checks if the current app is running in the original parent applet or in a new remix
 */
export function isOriginalAppletInstance(): boolean {
  const subdomain = detectAppletSubdomain();
  if (!subdomain) return false;
  return subdomain === ORIGINAL_APPLET_SUBDOMAIN;
}

/**
 * Generates or retrieves a unique isolated database ID for a remix container
 */
export function getRemixDefaultId(): string {
  return REMIX_DEFAULT_CARD_ID;
}

/**
 * Determines the appropriate card/database ID for the current instance.
 * Strict Isolation Rules:
 * 1. URL search parameter (?id=, ?card=, ?remix=) takes precedence if specified.
 * 2. Saved preference in localStorage (wedding_custom_card_id) if specified.
 * 3. Subdomain detection:
 *    - If running on original subdomain 'lc7jhw2xiplwcbu564m46i', default to 'nitin-sir-client-2'.
 *    - If running on ANY newly created remix applet, default automatically to 'anshul-alka-2'
 *      with 100% separate fields and zero data overlap.
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
        if (trimmed === 'anshul-alka-2' || trimmed === 'anshul & alka 2' || trimmed === 'anshul-alka 2') {
          return REMIX_DEFAULT_CARD_ID;
        }
        if (trimmed === 'nitin sir client -2' || trimmed === 'nitin-sir-client-2') {
          return ORIGINAL_CARD_ID;
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
        if (
          trimmed !== MASTER_CARD_ID && 
          trimmed !== 'official-wedding-card' && 
          trimmed !== 'remix-v1' &&
          !trimmed.toLowerCase().includes('official')
        ) {
          if (trimmed === 'anshul-alka-2' || trimmed === 'anshul & alka 2') {
            return REMIX_DEFAULT_CARD_ID;
          }
          if (trimmed === 'nitin sir client -2' || trimmed === 'nitin-sir-client-2') {
            return ORIGINAL_CARD_ID;
          }
          return trimmed;
        }
      }
    } catch (e) {}

    // 3. Subdomain check: if running in the original applet container, keep original card
    if (isOriginalAppletInstance()) {
      return ORIGINAL_CARD_ID;
    }
  }

  // In any new remix container, default to 'anshul-alka-2'
  return REMIX_DEFAULT_CARD_ID;
}

/**
 * Security guard: ensures remix CAN NEVER write to official master documents
 * and keeps card IDs sanitized.
 */
export function sanitizeCardIdForSave(targetCardId: string): string {
  if (
    !targetCardId || 
    targetCardId === MASTER_CARD_ID || 
    targetCardId === 'official-wedding-card' || 
    targetCardId === 'remix-v1' ||
    targetCardId.toLowerCase().includes('official')
  ) {
    console.warn(`[DATA ISOLATION] Blocked write to official template '${targetCardId}'. Redirected to '${REMIX_DEFAULT_CARD_ID}'.`);
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
    // Only maintain alias if specifically operating on original client
    if (safeCardId === ORIGINAL_CARD_ID) {
      localStorage.setItem(getStorageKey('nitin sir client -2'), dataStr);
    }
  } catch (e) {
    console.warn(`Local storage quota exceeded or blocked for ${cardId}:`, e);
  }
}

/**
 * Gets settings from localStorage with fallback to client alias if applicable
 */
export function getFromLocalStorage(cardId: string): any | null {
  try {
    const scoped = localStorage.getItem(getStorageKey(cardId));
    if (scoped) return JSON.parse(scoped);
    if (cardId === ORIGINAL_CARD_ID) {
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

