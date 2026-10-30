import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleMapsUrls,
  filterGalleryItems,
  getNextCarouselIndex,
  HERO_AUTOPLAY_INTERVAL_MS,
  searchVillageContent,
  validateContactForm,
} from './villageLogic';
import { DIRECTORY_ITEMS, INITIAL_GALLERY_ITEMS, VILLAGE_CONFIG } from '../data/villageConfig';

test('searchVillageContent finds rivers, schools (including Dr. Pushpendra Singh Smarak Mahavidyalaya first), hospitals (PHC Shivganj first), and railway stations in Hindi and English', () => {
  const schoolItems = DIRECTORY_ITEMS.filter((item) => item.sectionId === 'schools');
  assert.equal(
    schoolItems[0].nameEn,
    'Dr. Pushpendra Singh Smarak Mahavidyalaya',
    'Dr. Pushpendra Singh Smarak Mahavidyalaya should be the first item in Schools & Colleges'
  );

  const hospitalItems = DIRECTORY_ITEMS.filter((item) => item.sectionId === 'hospitals');
  assert.equal(
    hospitalItems[0].id,
    'hosp-phc-shivganj',
    'PHC Shivganj should be the first item in Hospitals & Healthcare'
  );
  assert.equal(hospitalItems[0].helplinePhone, '+91 9739317523');

  const busItems = DIRECTORY_ITEMS.filter(
    (item) => item.sectionId === 'reach' && item.id.startsWith('bus-')
  );
  assert.equal(
    busItems[0].id,
    'bus-shivganj',
    'SHIVGANJ Bus Stop should be the first item in Bus Stops'
  );
  assert.equal(busItems[0].distanceOrCode, '~0.0 KM');
  assert.equal(busItems[0].nameHi, 'SHIVGANJ बस स्टॉप (SHIVGANJ Bus Stop)');

  const templeItems = DIRECTORY_ITEMS.filter((item) => item.sectionId === 'temples');
  assert.equal(
    templeItems[0].id,
    'temp-hanuman',
    'Hanuman Ji Mandir should be the first item in Temples & Religious Places'
  );
  assert.equal(templeItems[0].nameHi, 'हनुमान जी मंदिर (Hanuman Ji Mandir)');

  const marketItems = DIRECTORY_ITEMS.filter((item) => item.sectionId === 'markets');
  assert.equal(
    marketItems[0].id,
    'mkt-shardan',
    'Shardan Bazaar should be the first item in Nearby Markets'
  );
  assert.equal(marketItems[0].nameHi, 'शारदान बाज़ार (Shardan Bazaar)');
  assert.equal(
    marketItems[1].id,
    'mkt-bhetua',
    'Bhetua Block Bazaar should be the second item in Nearby Markets'
  );
  assert.equal(marketItems[1].nameHi, 'भेतुआ ब्लॉक बाज़ार (Bhetua Block Bazaar)');

  const collegeResults = searchVillageContent('Pushpendra Singh Smarak Mahavidyalaya');
  assert.ok(collegeResults.length > 0, 'Should find Dr. Pushpendra Singh Smarak Mahavidyalaya');

  const gomtiResults = searchVillageContent('Gomti');
  assert.ok(gomtiResults.length > 0, 'Should find Gomti river results');
  assert.ok(gomtiResults.some((r) => r.sectionId === 'rivers'));

  const hindiResults = searchVillageContent('गोमती');
  assert.ok(hindiResults.length > 0, 'Should find गोमती in Hindi');

  const halResults = searchVillageContent('HAL');
  assert.ok(halResults.length >= 2, 'Should find HAL Bus Station, HAL Hospital, and HAL Lake');

  const emptyResults = searchVillageContent('   ');
  assert.equal(emptyResults.length, 0, 'Blank query should return empty array');
});

test('filterGalleryItems filters accurately by category and search query', () => {
  const allItems = filterGalleryItems(INITIAL_GALLERY_ITEMS, 'all');
  assert.equal(allItems.length, INITIAL_GALLERY_ITEMS.length);

  const templeItems = filterGalleryItems(INITIAL_GALLERY_ITEMS, 'temples');
  assert.equal(templeItems.length, 1);
  assert.equal(templeItems[0].category, 'temples');

  const queryItems = filterGalleryItems(INITIAL_GALLERY_ITEMS, 'all', 'काली मंदिर');
  assert.equal(queryItems.length, 1);
  assert.equal(queryItems[0].id, 'gal-temples');
});

test('validateContactForm rejects empty or invalid inputs and accepts valid submission', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.message);

  const invalidPhoneAndEmail = validateContactForm({
    name: 'Ankit Kumar',
    email: 'invalid-email',
    phone: '12345',
    category: 'history',
    message: 'Too short',
  });
  assert.equal(invalidPhoneAndEmail.valid, false);
  assert.ok(invalidPhoneAndEmail.errors.email);
  assert.ok(invalidPhoneAndEmail.errors.phone);
  assert.ok(invalidPhoneAndEmail.errors.message);

  const validSubmission = validateContactForm({
    name: 'अंकित कुमार (शिवगंज)',
    email: 'shivganjankit@gmail.com',
    phone: '9876543210',
    category: 'photo',
    message: 'मैं शिवगंज के प्राचीन मंदिर और खेतों की तस्वीरें साझा करना चाहता हूँ।',
  });
  assert.equal(validSubmission.valid, true);
  assert.equal(Object.keys(validSubmission.errors).length, 0);
});

test('buildGoogleMapsUrls constructs accurate coordinates and directions links for 6VF2+VH Ankit, Purab Dwara, Uttar Pradesh 227412', () => {
  const urls = buildGoogleMapsUrls(
    VILLAGE_CONFIG.location.lat,
    VILLAGE_CONFIG.location.lng,
    VILLAGE_CONFIG.location.zoom,
    VILLAGE_CONFIG.location.placeQuery
  );
  assert.ok(urls.embedUrl.includes('26.2247,81.8514'));
  assert.ok(urls.embedUrl.includes('6VF2%2BVH'));
  assert.ok(urls.directionsUrl.includes('6VF2%2BVH'));
  assert.ok(urls.openMapsUrl.includes('6VF2%2BVH'));
});

test('getNextCarouselIndex cycles cleanly across all 4 hero highlight slides with 5000ms interval', () => {
  assert.equal(HERO_AUTOPLAY_INTERVAL_MS, 5000);
  assert.equal(getNextCarouselIndex(0, 4, 'next'), 1);
  assert.equal(getNextCarouselIndex(1, 4, 'next'), 2);
  assert.equal(getNextCarouselIndex(2, 4, 'next'), 3);
  assert.equal(getNextCarouselIndex(3, 4, 'next'), 0);
  assert.equal(getNextCarouselIndex(0, 4, 'prev'), 3);
  assert.equal(getNextCarouselIndex(2, 4, 'prev'), 1);
});

test('VILLAGE_CONFIG.contact.socialLinks and identity administrative details are accurately configured', () => {
  const { socialLinks } = VILLAGE_CONFIG.contact;
  assert.equal(
    socialLinks.instagram,
    'https://www.instagram.com/hamara_shivganj?mdxt=OGJmMnN4NTNqMHM5'
  );
  assert.equal(socialLinks.youtube, 'https://www.youtube.com/@Hamara_shivganj');
  assert.equal(socialLinks.twitter, 'https://x.com/Hamara_shivganj');
  assert.equal(socialLinks.facebook, 'https://www.facebook.com/share/19t4xk1k2B/');

  assert.equal(VILLAGE_CONFIG.identity.districtHi, 'अमेठी (Amethi)');
  assert.equal(VILLAGE_CONFIG.identity.districtEn, 'Amethi');
  assert.equal(VILLAGE_CONFIG.identity.divisionHi, 'अयोध्या मंडल (Ayodhya Division)');
  assert.equal(VILLAGE_CONFIG.identity.divisionEn, 'Ayodhya Division');
});
