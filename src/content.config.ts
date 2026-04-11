// Content collections — schemas Astro Zod
// Miroir fidèle de cms.config.ts et src/content/*.json
// Tous les champs sont .optional() par tolerance du CMS
// (le client peut sauvegarder un JSON partiel sans casser le build).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const siteInfo = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/site-info' }),
  schema: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    siteUrl: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/hero' }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    ctaSecondaryText: z.string().optional(),
    ctaSecondaryLink: z.string().optional(),
    ctaWhatsappText: z.string().optional(),
    reassurance: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/about' }),
  schema: z.object({
    sectionTitle: z.string().optional(),
    paragraphs: z.array(z.string()).optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/contact' }),
  schema: z.object({
    sectionTitle: z.string().optional(),
    subtitle: z.string().optional(),
    buttonText: z.string().optional(),
    rgpdText: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    context: z.string().optional(),
    quote: z.string(),
    order: z.number().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  'site-info': siteInfo,
  hero,
  about,
  contact,
  services,
  testimonials,
  faq,
};
