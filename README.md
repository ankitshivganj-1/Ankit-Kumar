# शिवगंज (Shivganj Village) — हमारा गाँव, हमारी पहचान

**Official Village Information, Cultural Heritage & Community Portal**  
*Shivganj · Ghatampur Gram Panchayat · Bhetua Block · Sultanpur District · Uttar Pradesh, India*

---

## 1. Project Overview

This repository powers the upgraded **Shivganj Village Portal** (`शिवगंज – हमारा गाँव, हमारी पहचान`), preserving 100% of the verified village profile data from the supplied Shivganj PDF while upgrading the user experience with:
- **Bilingual Support (हिंदी / English):** Instant toggle across all 14 village sections, history, gallery, and contact pages.
- **14 Complete Village Information Sections:** About Shivganj, Village Profile, Geography, Nearby Rivers (Gomti & Sai), How to Reach Shivganj, Schools & Colleges, Hospitals & Healthcare, Temples & Religious Places, Banks & ATMs, Nearby Markets, Parks & Natural Places, Nearby Cities & Districts, Village Gallery, and Contact Us.
- **Interactive Google Maps & Live Weather:** Verified coordinates for Shivganj / Ghatampur Gram Panchayat (`26.2278° N, 81.8327° E`) in Bhetua Block, Sultanpur District, UP, with direct **Get Directions** and **Open in Google Maps** actions, plus live Open-Meteo weather telemetry.
- **Honest Historical Documentation:** Dedicated *"इतिहास और हमारी पहचान – History of Shivganj"* section featuring verified cultural, linguistic (Awadhi), and geographical roots, plus an editable community chronicle marked `"स्थानीय इतिहास की जानकारी जल्द जोड़ी जाएगी"` without fabricated legends or unverified dates.
- **Authentic Village Gallery (8 Categories):** Supports actual village photo uploads (persisted locally in browser + configurable via `/public/assets/gallery/`), category filtering, full-screen Lightbox inspection, and captions—never passing off stock photos as Shivganj.
- **Configurable Contact & Community Portal:** All contact details (Email, WhatsApp, Social links) are centrally managed in `src/data/villageConfig.ts` with zero fake phone numbers or invented social accounts.
- **Standalone Multi-Page HTML Bundle + React App:** Alongside the main Vite/React application (`index.html` + `src/`), standalone static HTML pages (`public/about.html`, `public/gallery.html`, `public/contact.html`, `public/style.css`, `public/script.js`, `public/robots.txt`, `public/sitemap.xml`) are included for direct static hosting if needed.

---

## 2. How to Add Actual Village Photographs (`assets/gallery/`)

1. Place your real photographs of Shivganj (`.jpg`, `.jpeg`, `.png`, `.webp`) into the `/public/assets/gallery/` directory (for example: `/public/assets/gallery/shiv-mandir.jpg`).
2. Open `src/data/villageConfig.ts` and locate the `INITIAL_GALLERY_ITEMS` array.
3. Add an entry pointing to your image path:
   ```ts
   {
     id: 'photo-1',
     category: 'temples', // 'photography' | 'streets' | 'agriculture' | 'nature' | 'temples' | 'festivals' | 'events' | 'people'
     titleHi: 'प्राचीन शिव मंदिर परिसर',
     titleEn: 'Ancient Shiv Mandir Courtyard',
     captionHi: 'महाशिवरात्रि के अवसर पर ग्रामवासियों द्वारा सजाया गया मंदिर।',
     captionEn: 'Temple decorated by villagers during Mahashivratri.',
     imageUrl: '/assets/gallery/shiv-mandir.jpg', // Your real uploaded photo
     dateLabel: '2026',
     isActualPhoto: true
   }
   ```
4. Visitors and administrators can also click **"+ ग्राम फोटो जोड़ें / Add Village Photo"** directly in the Village Gallery UI to upload and preview photos immediately in the browser.

---

## 3. How to Configure Contact Details & Google Maps

Open `src/data/villageConfig.ts` and edit `VILLAGE_CONFIG`:
- **Contact Details (`contactConfig`):**
  - Set `officialEmail` (pre-configured with `shivganjankit@gmail.com` or update anytime).
  - Set `whatsappNumber` (in international format without `+`, e.g., `'9198XXXXXXXX'`) to enable direct WhatsApp messaging.
  - Add real URLs to `socialLinks` (`facebook`, `instagram`, `youtube`, `twitter`) when official village pages are created.
- **Google Maps Coordinates (`locationConfig`):**
  - Default verified coordinates point to **Ghatampur Gram Panchayat / Shivganj, Bhetua Block, Sultanpur (`26.2278, 81.8327`)**.
  - To refine to a specific landmark or house cluster inside Shivganj, right-click the exact spot in Google Maps, copy the `latitude, longitude`, and update `lat` and `lng` in `VILLAGE_CONFIG.location`.

---

## 4. How to Publish the Website

- **Option A — AI Studio / Cloud Run Deployment:** Click the **Deploy / Share** button in the top-right corner of Google AI Studio to publish the live full-stack application.
- **Option B — Static Hosting (GitHub Pages / Netlify / Vercel):**
  1. Run `npm run build` to generate the production bundle in `dist/`.
  2. Upload the `dist/` directory to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.

---

## 5. How to Submit the Sitemap to Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) and add your deployed domain or URL prefix.
2. Copy the HTML meta verification token provided by Google Search Console and paste it into `<meta name="google-site-verification" content="YOUR_TOKEN" />` inside `index.html`.
3. Once verified, open **Sitemaps** in the left sidebar of Google Search Console.
4. Enter `sitemap.xml` (e.g., `https://your-domain.com/sitemap.xml`) and click **Submit**.
