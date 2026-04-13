/**
 * Technical business data — NOT editable by the client.
 * For editable content (name, phone, email, address), see src/content/site-info/
 * (JSON flat files, CMS maison).
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

// ============================================================
// Business metadata — fallbacks immuables (doctrine wf-00-cms §7, C1 SEO)
// Le client edite name/phone/email/address via /admin (src/content/site-info/).
// Ces valeurs servent de fallback si le CMS est vide et exposent les champs
// non editables client (schemaType, owner, foundingYear).
// ============================================================

export const business = {
  owner: 'Anthony Marques',
  foundingYear: 2024,
  schemaType: 'Electrician',
} as const;

// ============================================================
// Data SEO technique (non editable par le client — doctrine wf-00-cms §7)
// Extrait du pages/index.astro pre-C1 pour centralisation dans schemas.ts.
// Modification = Marc uniquement via wf-11 (nouvelle zone, nouveaux horaires,
// nouveau moyen de paiement, nouvelle competence).
// ============================================================

export const schemaData = {
  openingHours: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Grenoble' },
    { '@type': 'AdministrativeArea', name: 'Nord Isère' },
  ],
  priceRange: '€ à €€',
  paymentAccepted: [] as string[],
  sameAs: [] as string[],
  // Compétences Electrician (spécifique Electrician — extension C1 par rapport
  // à proxi qui n'en a pas)
  knowsAbout: [
    'Installation électrique',
    'Rénovation tableau électrique',
    'Mise aux normes NFC 15-100',
    'Climatisation réversible',
    'Courant faible',
    'Vidéosurveillance',
    'Alarme',
    'Réseau informatique',
    'Dépannage électrique',
    'Maintenance électrique tertiaire',
  ],
} as const;

// Web3Forms API key — cascade: CMS content → env var → cle Marc (defaut agence)
const WEB3FORMS_DEFAULT = '9667fcf8-c7da-4b7a-8432-0ec25215c75e';
export const web3formsDefault = WEB3FORMS_DEFAULT;
export const web3formsKey = import.meta.env.WEB3FORMS_KEY || WEB3FORMS_DEFAULT;

// Umami Analytics
export const umamiWebsiteId = import.meta.env.UMAMI_WEBSITE_ID || '';
