import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  singletons: {
    siteInfo: singleton({
      label: 'Informations générales',
      path: 'src/content/site-info/index',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nom commercial' }),
        phone: fields.text({ label: 'Téléphone' }),
        whatsapp: fields.text({ label: 'WhatsApp' }),
        email: fields.text({ label: 'Email' }),
        address: fields.text({ label: 'Adresse' }),
        postalCode: fields.text({ label: 'Code postal' }),
        city: fields.text({ label: 'Ville' }),
        region: fields.text({ label: 'Région' }),
        siteUrl: fields.text({ label: 'URL du site' }),
        metaTitle: fields.text({ label: 'Meta title' }),
        metaDescription: fields.text({ label: 'Meta description', multiline: true }),
      },
    }),

    hero: singleton({
      label: 'Section Hero',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Titre H1' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        ctaText: fields.text({ label: 'Texte bouton CTA principal' }),
        ctaLink: fields.text({ label: 'Lien CTA principal' }),
        ctaSecondaryText: fields.text({ label: 'Texte bouton secondaire' }),
        ctaSecondaryLink: fields.text({ label: 'Lien bouton secondaire' }),
        ctaWhatsappText: fields.text({ label: 'Texte bouton WhatsApp' }),
        reassurance: fields.text({ label: 'Texte de réassurance' }),
      },
    }),

    about: singleton({
      label: 'Section À Propos',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
        sectionTitle: fields.text({ label: 'Titre de section' }),
        paragraphs: fields.array(fields.text({ label: 'Paragraphe', multiline: true }), {
          label: 'Paragraphes',
          itemLabel: (props) => props.value?.substring(0, 50) + '...' || 'Paragraphe',
        }),
      },
    }),

    contact: singleton({
      label: 'Section Contact',
      path: 'src/content/contact/index',
      format: { data: 'json' },
      schema: {
        sectionTitle: fields.text({ label: 'Titre de section' }),
        subtitle: fields.text({ label: 'Sous-titre', multiline: true }),
        buttonText: fields.text({ label: 'Texte du bouton' }),
        rgpdText: fields.text({ label: 'Mention RGPD', multiline: true }),
      },
    }),
  },

  collections: {
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du service' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        icon: fields.text({ label: 'Nom de l\'icône (Lucide)' }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    testimonials: collection({
      label: 'Témoignages',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom du client' } }),
        context: fields.text({ label: 'Contexte (type de travaux, ville)' }),
        quote: fields.text({ label: 'Citation', multiline: true }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),

    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Réponse', multiline: true }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
      },
    }),
  },
});
