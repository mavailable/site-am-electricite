# TODO — AM Electricite (post-audit SA)

Audit realise le 2026-03-25. Score global : **82/100**

## P1 — Critique (bloquant pour production)

- [ ] **SIRET manquant** — Renseigner le numero SIRET reel dans `src/data/business.ts` (legal.siret). Obligatoire pour les mentions legales.
- [ ] **Coordonnees GPS manquantes** — Renseigner latitude/longitude reelles dans `src/data/business.ts` (geo.lat, geo.lon) pour le Schema.org LocalBusiness. Verifier sur Google Maps : "135C Rue Violette, 38140 Rives".
- [ ] **Cle Web3Forms** — Verifier que WEB3FORMS_KEY est configure dans l'environnement de production (.env / Cloudflare). Sans cette cle, le formulaire de contact ne fonctionne pas.
- [ ] **Umami Analytics** — Verifier que UMAMI_WEBSITE_ID est configure en production.

## P2 — Important

- [ ] **Image trop lourde** — `public/images/clim-lg-residentiel.jpeg` pese 320 Ko. Recompresser a ~100-150 Ko max (utiliser squoosh.app ou sharp). Les autres images sont correctes.
- [ ] **Logo surdimensionne** — `public/images/logo.jpeg` est 1024x1024 (62 Ko) mais affiche a 48x48. Creer une version optimisee de 96x96 ou 128x128 pour reduire le poids.
- [ ] **RCS et TVA manquants** — Completer `legal.rcs` et `legal.tva` dans `src/data/business.ts` si applicable (auto-entrepreneur = pas de TVA, a verifier).
- [ ] **Email de copie formulaire** — `ccemail` dans `Contact.astro` envoie une copie a `marc@muller.im`. Verifier si cela doit rester en production ou etre retire.
- [ ] **Conversion images en WebP/AVIF** — Les images JPEG fonctionnent mais du WebP/AVIF reduirait le poids de 30-50%. Envisager Astro Image ou un pipeline de build.

## P3 — Ameliorations

- [ ] **Ajouter plus de temoignages** — Seulement 3 actuellement. 5-6 renforceraient la preuve sociale et le Schema.org AggregateRating.
- [ ] **Ajouter un numero RGE/QualiPAC** — Si Anthony possede une certification RGE ou QualiPAC pour la climatisation, l'ajouter aux mentions legales et au Schema.org (sameAs, hasCredential).
- [ ] **Enrichir llms.txt** — Ajouter les pages mentions legales et politique de confidentialite dans la section "Pages principales".
- [ ] **Page Realisations dedicee** — A terme, creer une page /realisations avec plus de photos et descriptions detaillees (bon pour le SEO long-tail).
- [ ] **Microformat LocalBusiness : numero de TVA** — Si TVA intracommunautaire applicable, l'ajouter au Schema.org (vatID).

## Corrections appliquees dans cet audit

- [x] Gallery : captions toujours visibles sur mobile (avant : uniquement au hover, inaccessible tactile)
- [x] Gallery : ajout width/height sur les images (prevention CLS)
- [x] Hero : ajout width/height + fetchpriority="high" sur le portrait (LCP)
- [x] Hero : ajout width/height sur l'image de fond
- [x] About : ajout width/height + decoding="async" sur le portrait
- [x] Mentions legales : ajout canonicalUrl (evite duplicate content avec homepage)
- [x] Politique confidentialite : ajout canonicalUrl
- [x] BaseLayout : preload de la police DM Sans 400 (body text, critique pour FCP)
- [x] Services : ajout data-track="cta" sur le bouton devis (coherence analytics)
- [x] Footer : ajout aria-label sur liens tel/email + aria-hidden sur SVG decoratifs
- [x] Web manifest : ajout start_url et lang
