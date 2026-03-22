/**
 * Technical business data — NOT editable via Keystatic
 * For editable content, see src/content/ (managed via Keystatic)
 */

// Legal info (not client-editable)
export const legal = {
  siret: '', // ⚠️ À compléter avec le SIRET réel
  rcs: '',
  tva: '',
} as const;

// Geo coordinates (for Schema.org — not client-editable)
// ⚠️ À vérifier sur Google Maps avec "135C Rue Violette, 38140 Rives" avant mise en production
export const geo = {
  lat: 0,
  lon: 0,
} as const;

// Web3Forms API key (for contact form)
export const web3formsKey = import.meta.env.WEB3FORMS_KEY || '';

// Umami Analytics
export const umamiWebsiteId = import.meta.env.UMAMI_WEBSITE_ID || '';
