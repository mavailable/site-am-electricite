import type { CmsConfig } from './cms.types';

// ============================================================
// Configuration CMS — AM Électricité
// ============================================================
// Définit les singletons et collections éditables par le client
// via /admin. Miroir fidèle de src/content/*.json existants.
// Toute modification ici doit rester cohérente avec :
//   - src/content.config.ts (schemas Astro Zod)
//   - src/data/content.ts (helpers lecture fs)
//   - src/content/*.json (données)
// ============================================================

const cmsConfig: CmsConfig = {
  repo: 'mavailable/site-am-electricite',
  branch: 'dev',
  siteName: 'AM Électricité',

  site: {
    ownerName: 'Anthony Marques',
    siteUrl: 'https://am-electricite.fr',
    previewUrl: 'https://site-am-electricite.pages.dev',
    clientType: 'entreprise-locale',
    umamiSiteId: '162eaba8-7992-41eb-869d-08d2ded6ef48',
    umamiShareUrl: 'https://cloud.umami.is/share/75a86a9a20b76321/site-am-electricite.pages.dev',
    contactMarc: {
      phone: '06 88 76 66 48',
      whatsapp: '33688766648',
      email: 'marc@muller.im',
    },
  },

  singletons: {
    'site-info': {
      label: 'Informations générales',
      description: 'Nom commercial, téléphone, email, adresse, SEO',
      path: 'src/content/site-info/index.json',
      fields: {
        name: { type: 'text', label: 'Nom commercial' },
        phone: { type: 'text', label: 'Téléphone (affichage)' },
        whatsapp: { type: 'text', label: 'WhatsApp (format international sans +)' },
        email: { type: 'text', label: 'Email' },
        address: { type: 'text', label: 'Adresse (rue)' },
        postalCode: { type: 'text', label: 'Code postal' },
        city: { type: 'text', label: 'Ville' },
        region: { type: 'text', label: 'Région' },
        siteUrl: { type: 'text', label: 'URL du site' },
        metaTitle: { type: 'text', label: 'Meta title' },
        metaDescription: { type: 'text', label: 'Meta description', multiline: true },
        openingHours: { type: 'text', label: 'Horaires', multiline: true },
      },
    },

    hero: {
      label: 'Section Hero (bannière d\'accueil)',
      description: 'Titre H1, sous-titre et boutons d\'appel à l\'action',
      path: 'src/content/hero/index.json',
      fields: {
        title: { type: 'text', label: 'Titre principal (H1)' },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        ctaText: { type: 'text', label: 'Bouton principal — texte' },
        ctaLink: { type: 'text', label: 'Bouton principal — lien (ancre ou URL)' },
        ctaSecondaryText: { type: 'text', label: 'Bouton secondaire — texte' },
        ctaSecondaryLink: { type: 'text', label: 'Bouton secondaire — lien (ex: tel:...)' },
        ctaWhatsappText: { type: 'text', label: 'Bouton WhatsApp — texte' },
        reassurance: { type: 'text', label: 'Texte de réassurance' },
        image: { type: 'image', label: 'Photo de fond' },
        portraitImage: { type: 'image', label: 'Photo portrait' },
      },
    },

    about: {
      label: 'Section À Propos',
      description: 'Présentation d\'Anthony Marques et d\'AM Électricité',
      path: 'src/content/about/index.json',
      fields: {
        sectionTitle: { type: 'text', label: 'Titre de la section' },
        paragraphs: {
          type: 'array',
          label: 'Paragraphes de présentation',
          itemLabel: 'value',
          item: { type: 'text', label: 'Paragraphe', multiline: true },
        },
      },
    },

    contact: {
      label: 'Section Contact',
      description: 'Titre, sous-titre, bouton et mention RGPD du formulaire',
      path: 'src/content/contact/index.json',
      fields: {
        sectionTitle: { type: 'text', label: 'Titre de la section' },
        subtitle: { type: 'text', label: 'Sous-titre', multiline: true },
        buttonText: { type: 'text', label: 'Texte du bouton' },
        web3formsKey: { type: 'text', label: 'Cle Web3Forms (formulaire)', description: 'Collez votre cle pour recevoir vos formulaires directement. Guide : marcm.fr/aide/web3forms' },
      },
    },
  },

  collections: {
    services: {
      label: 'Services',
      description: 'Prestations proposées (installation, rénovation, climatisation...)',
      path: 'src/content/services',
      slugField: 'title',
      labelField: 'title',
      fields: {
        title: { type: 'text', label: 'Titre du service' },
        description: { type: 'text', label: 'Description', multiline: true },
        icon: { type: 'text', label: 'Icône Lucide (ex: Zap, Thermometer, Wrench)' },
        order: { type: 'number', label: 'Ordre d\'affichage', defaultValue: 0 },
      },
    },

    testimonials: {
      label: 'Témoignages',
      description: 'Avis et retours clients',
      path: 'src/content/testimonials',
      slugField: 'name',
      labelField: 'name',
      fields: {
        name: { type: 'text', label: 'Nom du client' },
        context: { type: 'text', label: 'Contexte (type de travaux, ville)' },
        quote: { type: 'text', label: 'Citation', multiline: true },
        order: { type: 'number', label: 'Ordre d\'affichage', defaultValue: 0 },
      },
    },

    faq: {
      label: 'Questions fréquentes',
      description: 'FAQ affichée en bas de page',
      path: 'src/content/faq',
      slugField: 'question',
      labelField: 'question',
      fields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'text', label: 'Réponse', multiline: true },
        order: { type: 'number', label: 'Ordre d\'affichage', defaultValue: 0 },
      },
    },
  },
};

export default cmsConfig;
