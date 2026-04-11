/**
 * Schema.org helpers — doctrine C1 wf-00-cms §7 + schemas centralises.
 *
 * Pattern : chaque helper construit un bloc Schema.org a partir de :
 *  - business (immuables techniques)
 *  - schemaData (donnees SEO non editables client)
 *  - getSiteInfo/getServices/getFaq/getTestimonials (CMS editables client)
 *
 * Le BaseLayout ou les pages importent ces helpers et injectent le JSON-LD.
 * Aucun litteral metier ne doit rester dans pages/*.astro ou BaseLayout.astro.
 *
 * Pour am-electricite : schemas injectes depuis pages/index.astro via slot="head"
 * (pattern C — schemas dans la page). Reste a aligner sur pattern BaseLayout
 * dans une etape ulterieure.
 */

import { business, geo, schemaData } from '@data/business';
import { getSiteInfo, getServices, getFaq } from '@data/content';

export interface Breadcrumb {
  name: string;
  url: string;
}

// ============================================================
// getLocalBusinessSchema — Electrician (type depuis business.schemaType)
// ============================================================

export function getLocalBusinessSchema(): object {
  const siteInfo = getSiteInfo();

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': business.schemaType,
    name: siteInfo.name,
    image: `${siteInfo.siteUrl}/images/og-image.jpg`,
    description: siteInfo.metaDescription,
    url: siteInfo.siteUrl,
    telephone: `+${siteInfo.whatsapp}`,
    email: siteInfo.email,
  };

  // Adresse depuis siteInfo (CMS editable client)
  schema.address = {
    '@type': 'PostalAddress',
    streetAddress: siteInfo.address,
    addressLocality: siteInfo.city,
    postalCode: siteInfo.postalCode,
    addressRegion: siteInfo.region,
    addressCountry: 'FR',
  };

  // Geo (immuable, depuis business.ts — omis si non configure)
  if (geo.lat !== 0) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: String(geo.lat),
      longitude: String(geo.lon),
    };
  }

  // Founder (immuable)
  schema.founder = {
    '@type': 'Person',
    name: business.owner,
    jobTitle: 'Électricien',
  };
  schema.foundingDate = String(business.foundingYear);

  // schemaData (non editable client)
  if (schemaData.openingHours.length > 0) {
    schema.openingHoursSpecification = schemaData.openingHours;
  }
  if (schemaData.areaServed.length > 0) {
    schema.areaServed = schemaData.areaServed;
  }
  if (schemaData.priceRange) {
    schema.priceRange = schemaData.priceRange;
  }
  if (schemaData.paymentAccepted.length > 0) {
    schema.paymentAccepted = schemaData.paymentAccepted;
  }
  if (schemaData.sameAs.length > 0) {
    schema.sameAs = schemaData.sameAs;
  }
  if (schemaData.knowsAbout.length > 0) {
    schema.knowsAbout = schemaData.knowsAbout;
  }

  // Services depuis CMS (getServices — sync readCollection)
  const services = getServices();
  if (services.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Prestations AM Électricité',
      itemListElement: services.map((s: any) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    };
  }

  // AggregateRating — OMIS tant que le business n'a pas de source d'avis
  // verifiable (GBP scrape via wf-reviews-gbp ou collection testimonials
  // avec champ `rating` reel). Doctrine C1 : jamais de valeur hardcodee
  // dans le code, jamais de fraude SEO.
  //
  // A reinjecter via wf-maintenance quand Anthony aura accumule des avis
  // Google Business Profile (business fonde en 2024, pas encore de GBP
  // actif au 2026-04-11).

  return schema;
}

// ============================================================
// getWebsiteSchema — WebSite (pour SearchAction, sitelinks)
// ============================================================

export function getWebsiteSchema(): object {
  const siteInfo = getSiteInfo();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteInfo.name,
    url: siteInfo.siteUrl,
    description: siteInfo.metaDescription,
    inLanguage: 'fr',
  };
}

// ============================================================
// getFAQPageSchema — FAQPage (null si pas de faq)
// ============================================================

export function getFAQPageSchema(): object | null {
  const faqs = getFaq();
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================
// getBreadcrumbSchema — BreadcrumbList (pur)
// ============================================================

export function getBreadcrumbSchema(items: Breadcrumb[]): object {
  const siteInfo = getSiteInfo();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `${siteInfo.siteUrl}${item.url}`,
    })),
  };
}

// ============================================================
// getSpeakableSchema — Speakable (pur, selecteurs CSS standards)
// Necessite title/description/url pour etre un WebPage valide Schema.org
// ============================================================

export function getSpeakableSchema(
  title: string,
  description: string,
  url: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: 'fr',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.intro-text', '.faq-answer'],
    },
  };
}
