import {
  DIRECTORY_ITEMS,
  DISTANCE_TABLE_ROWS,
  FOURTEEN_SECTIONS_METADATA,
  GalleryCategoryId,
  GalleryItem,
  VILLAGE_ANNOUNCEMENTS,
} from '../data/villageConfig';

export interface SearchResultItem {
  id: string;
  sectionId: string;
  sectionNumber: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  badgeText?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

/**
 * Searches across all 14 village sections, directory items, distance rows, and announcements
 * in both Hindi and English.
 */
export function searchVillageContent(query: string): SearchResultItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const results: SearchResultItem[] = [];

  // 1. Search the 14 main sections
  for (const sec of FOURTEEN_SECTIONS_METADATA) {
    const haystack = `${sec.number} ${sec.titleHi} ${sec.titleEn} ${sec.summaryHi} ${sec.summaryEn}`.toLowerCase();
    if (haystack.includes(normalized)) {
      results.push({
        id: `sec-${sec.id}`,
        sectionId: sec.id,
        sectionNumber: sec.number,
        titleHi: sec.titleHi,
        titleEn: sec.titleEn,
        subtitleHi: sec.summaryHi,
        subtitleEn: sec.summaryEn,
        badgeText: `Section ${sec.number}`,
      });
    }
  }

  // 2. Search directory items (rivers, schools, hospitals, temples, banks, markets, parks, transit)
  for (const item of DIRECTORY_ITEMS) {
    const haystack = `${item.nameHi} ${item.nameEn} ${item.categoryHi} ${item.categoryEn} ${item.detailHi} ${item.detailEn} ${item.distanceOrCode || ''} ${item.addressHi || ''} ${item.addressEn || ''} ${item.helplinePhone || ''}`.toLowerCase();
    if (haystack.includes(normalized)) {
      results.push({
        id: item.id,
        sectionId: item.sectionId,
        sectionNumber: item.sectionNumber,
        titleHi: item.nameHi,
        titleEn: item.nameEn,
        subtitleHi: item.detailHi,
        subtitleEn: item.detailEn,
        badgeText: item.distanceOrCode || item.categoryEn,
      });
    }
  }

  // 3. Search distance table rows
  for (const row of DISTANCE_TABLE_ROWS) {
    const haystack = `${row.placeHi} ${row.placeEn} ${row.distanceHi} ${row.noteHi} ${row.noteEn}`.toLowerCase();
    if (haystack.includes(normalized)) {
      results.push({
        id: `dist-${row.placeEn}`,
        sectionId: 'nearby',
        sectionNumber: '12',
        titleHi: `${row.placeHi} — ${row.distanceHi}`,
        titleEn: `${row.placeEn} — ${row.distanceEn}`,
        subtitleHi: row.noteHi,
        subtitleEn: row.noteEn,
        badgeText: row.distanceEn,
      });
    }
  }

  // 4. Search announcements
  for (const ann of VILLAGE_ANNOUNCEMENTS) {
    const haystack = `${ann.titleHi} ${ann.titleEn} ${ann.summaryHi} ${ann.summaryEn}`.toLowerCase();
    if (haystack.includes(normalized)) {
      results.push({
        id: ann.id,
        sectionId: 'announcements',
        sectionNumber: 'News',
        titleHi: ann.titleHi,
        titleEn: ann.titleEn,
        subtitleHi: ann.summaryHi,
        subtitleEn: ann.summaryEn,
        badgeText: ann.dateEn,
      });
    }
  }

  return results;
}

/**
 * Filters gallery items by category and optional search text.
 */
export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategoryId,
  searchQuery = ''
): GalleryItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;
    const text = `${item.titleHi} ${item.titleEn} ${item.captionHi} ${item.captionEn} ${item.locationTagHi} ${item.locationTagEn}`.toLowerCase();
    return text.includes(normalizedQuery);
  });
}

/**
 * Validates the Contact Us form inputs without silently substituting fallback values.
 */
export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};

  const trimmedName = input.name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर) / Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = input.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.email = 'कृपया मान्य ईमेल पता दर्ज करें / Please enter a valid email address.';
  }

  const trimmedPhone = input.phone.trim();
  const digitsOnly = trimmedPhone.replace(/[\s\-+()]/g, '');
  if (!trimmedPhone || !/^\d{10,13}$/.test(digitsOnly)) {
    errors.phone = 'कृपया 10 अंकों का मान्य फ़ोन नंबर दर्ज करें / Please enter a valid 10-digit phone number.';
  }

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = 'कृपया अपना संदेश विस्तार से लिखें (कम से कम 10 अक्षर) / Please write a message of at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates verified Google Maps embed, directions, and external view URLs
 * using the exact Plus Code query and geographic coordinates.
 */
export function buildGoogleMapsUrls(lat: number, lng: number, zoom: number, query: string) {
  const encodedQuery = encodeURIComponent(query);
  return {
    embedUrl: `https://maps.google.com/maps?q=${encodedQuery}&ll=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`,
    openMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
  };
}

/**
 * Hero highlight carousel auto-play interval (5 seconds) and circular index stepper.
 */
export const HERO_AUTOPLAY_INTERVAL_MS = 5000;

export function getNextCarouselIndex(
  currentIndex: number,
  totalSlides: number,
  direction: 'next' | 'prev' = 'next'
): number {
  if (totalSlides <= 0) return 0;
  if (direction === 'prev') {
    return (currentIndex - 1 + totalSlides) % totalSlides;
  }
  return (currentIndex + 1) % totalSlides;
}

/**
 * Determines whether the Welcome Popup should appear on initial load.
 * Skips automatically if `?autostart=1` or `?skipWelcome=1` is present in the URL,
 * or if the user has already dismissed the popup in the current session.
 */
export function shouldShowWelcomePopup(
  searchParamsString: string,
  dismissedSessionValue: string | null
): boolean {
  if (dismissedSessionValue === 'true') {
    return false;
  }
  const normalized = searchParamsString.startsWith('?')
    ? searchParamsString.slice(1)
    : searchParamsString;
  const params = new URLSearchParams(normalized);
  if (params.get('autostart') === '1' || params.get('skipWelcome') === '1') {
    return false;
  }
  return true;
}

export interface HeroCinematicSlide {
  id: string;
  slideNumber: string;
  titleHi: string;
  titleEn: string;
  badgeHi: string;
  badgeEn: string;
  descriptionHi: string;
  descriptionEn: string;
  href: string;
  gradient: string;
  accentColor: string;
  auraGlow: string;
  svgType: 'waterfall' | 'valley' | 'meadow' | 'canyon';
}

export const HERO_CINEMATIC_SLIDES: HeroCinematicSlide[] = [
  {
    id: 'rivers',
    slideNumber: '01',
    titleHi: 'गोमती और सई नदी क्षेत्र',
    titleEn: 'Gomti & Sai River Belt',
    badgeHi: 'नदियाँ व प्रकृति',
    badgeEn: 'Rivers & Nature',
    descriptionHi:
      'गोमती और सई नदियों की उपजाऊ दोआब भूमि, हरियाली और शांत ग्रामीण वातावरण शिवगंज की कृषि समृद्धि का आधार है।',
    descriptionEn:
      'Fertile plains nourished by the Gomti and Sai river belt, lush green pastures, and tranquil rural ecology.',
    href: '#rivers',
    gradient: 'linear-gradient(180deg, #9DB3C1 0%, #3E5868 55%, #1D2D36 100%)',
    accentColor: '#CFE4F2',
    auraGlow: 'radial-gradient(circle at 75% 40%, rgba(125, 195, 232, 0.24) 0%, transparent 65%)',
    svgType: 'waterfall',
  },
  {
    id: 'geography',
    slideNumber: '02',
    titleHi: 'भेटुआ (3 KM) · घाटमपुर',
    titleEn: 'Bhetua (3 KM) · Ghatampur',
    badgeHi: '106m समुद्र तल ऊँचाई',
    badgeEn: '106m Elevation',
    descriptionHi:
      'घाटमपुर ग्राम पंचायत एवं भेटुआ विकास खंड (ज़िला अमेठी, अयोध्या मंडल) के अंतर्गत समुद्र तल से 106 मीटर की ऊँचाई पर स्थित।',
    descriptionEn:
      'Part of Ghatampur Gram Panchayat and Bhetua Block in Amethi District (Ayodhya Division) at 106m ASL.',
    href: '#geography',
    gradient: 'linear-gradient(180deg, #B9C8D2 0%, #3F6A34 50%, #1C3518 100%)',
    accentColor: '#98B822',
    auraGlow: 'radial-gradient(circle at 75% 40%, rgba(154, 181, 26, 0.26) 0%, transparent 65%)',
    svgType: 'valley',
  },
  {
    id: 'facilities',
    slideNumber: '03',
    titleHi: 'प्राचीन मंदिर एवं विद्यालय',
    titleEn: 'Temples & Schools',
    badgeHi: 'संस्कृति व शिक्षा',
    badgeEn: 'Culture & Education',
    descriptionHi:
      'हनुमान जी मंदिर, काली मंदिर, डॉ. पुष्पेंद्र सिंह स्मारक महाविद्यालय और PHC शिवगंज जैसी प्रमुख संस्थाएँ।',
    descriptionEn:
      'Home to Hanuman Ji Mandir, Kali Mandir, Dr. Pushpendra Singh Smarak Mahavidyalaya, and PHC Shivganj.',
    href: '#facilities',
    gradient: 'linear-gradient(180deg, #5A8AD2 0%, #5F7630 55%, #6B8E23 100%)',
    accentColor: '#A8C82A',
    auraGlow: 'radial-gradient(circle at 75% 40%, rgba(184, 216, 46, 0.25) 0%, transparent 65%)',
    svgType: 'meadow',
  },
  {
    id: 'map-section',
    slideNumber: '04',
    titleHi: '6VF2+VH पूरब द्वारा मैप',
    titleEn: '6VF2+VH Purab Dwara Map',
    badgeHi: 'अमेठी · 227412',
    badgeEn: 'Amethi · 227412',
    descriptionHi:
      'सत्यापित Google Map Plus Code (6VF2+VH Ankit, Purab Dwara, UP 227412) और लाइव मौसम डैशबोर्ड।',
    descriptionEn:
      'Verified Google Map Plus Code (6VF2+VH Ankit, Purab Dwara, UP 227412) and live weather telemetry.',
    href: '#map-section',
    gradient: 'linear-gradient(180deg, #C6B299 0%, #2C5342 52%, #14334A 100%)',
    accentColor: '#7DC3E8',
    auraGlow: 'radial-gradient(circle at 75% 40%, rgba(96, 185, 154, 0.25) 0%, transparent 65%)',
    svgType: 'canyon',
  },
];

