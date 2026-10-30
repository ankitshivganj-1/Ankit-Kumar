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
