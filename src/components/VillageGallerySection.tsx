import React, { useEffect, useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GalleryCategoryId,
  GalleryItem,
  INITIAL_GALLERY_ITEMS,
  Language,
} from '../data/villageConfig';
import { filterGalleryItems } from '../utils/villageLogic';
import { VillageArtSvg } from './VillageArtSvg';

interface VillageGallerySectionProps {
  lang: Language;
}

const STORAGE_KEY = 'shivganj_custom_gallery_photos_v1';

export const VillageGallerySection: React.FC<VillageGallerySectionProps> = ({ lang }) => {
  const [customPhotos, setCustomPhotos] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>('all');
  const [gallerySearch, setGallerySearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Add Photo Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<GalleryCategoryId, 'all'>>('photography');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');

  const allGalleryItems = [...customPhotos, ...INITIAL_GALLERY_ITEMS];
  const filteredItems = filterGalleryItems(allGalleryItems, selectedCategory, gallerySearch);

  const saveCustomPhotos = (updated: GalleryItem[]) => {
    setCustomPhotos(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota errors
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError(
        lang === 'hi' ? 'कृपया केवल इमेज फ़ाइल (.jpg, .png, .webp) चुनें।' : 'Please select a valid image file.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewDataUrl(reader.result);
        if (!newTitle) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setNewTitle(cleanName);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setUploadError(
        lang === 'hi' ? 'कृपया तस्वीर का शीर्षक लिखें।' : 'Please enter a title for the photograph.'
      );
      return;
    }

    const createdItem: GalleryItem = {
      id: `user-photo-${Date.now()}`,
      category: newCategory,
      titleHi: newTitle.trim(),
      titleEn: newTitle.trim(),
      captionHi:
        newCaption.trim() ||
        'शिवगंज ग्रामवासी द्वारा जोड़ी गई वास्तविक ग्राम तस्वीर।',
      captionEn:
        newCaption.trim() ||
        'Authentic village photograph contributed by a Shivganj resident.',
      locationTagHi: 'शिवगंज · ग्राम संग्रह',
      locationTagEn: 'Shivganj · Community Upload',
      dateLabel: new Date().getFullYear().toString(),
      imageUrl: previewDataUrl || undefined,
      svgTheme: 'chaupal',
      isActualPhoto: Boolean(previewDataUrl),
    };

    saveCustomPhotos([createdItem, ...customPhotos]);
    setNewTitle('');
    setNewCaption('');
    setPreviewDataUrl('');
    setUploadError('');
    setIsAddModalOpen(false);
  };

  const handleRemoveCustomPhoto = (id: string) => {
    const updated = customPhotos.filter((item) => item.id !== id);
    saveCustomPhotos(updated);
    if (lightboxIndex !== null) {
      setLightboxIndex(null);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-16 lg:py-24 border-b border-white/10 dark-grey-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
              {lang === 'hi'
                ? 'अनुभाग 13 · क्षण और स्मृतियाँ (8 श्रेणियाँ)'
                : 'SECTION 13 · MOMENTS & MEMORIES (8 CATEGORIES)'}
            </p>
            <h2
              id="gallery-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white tracking-tight"
            >
              Village Gallery · {lang === 'hi' ? 'शिवगंज ग्राम गैलरी' : 'Visual Archive'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl">
              {lang === 'hi'
                ? 'हमारे गाँव की गलियाँ, खेत, मंदिर, त्योहार, प्रकृति और यादगार पल। हम किसी भी बाहरी स्टॉक फोटो को शिवगंज की असली तस्वीर के रूप में नहीं दिखाते।'
                : 'Our village streets, fields, temples, festivals, nature, and cherished memories. We never pass off generic stock photos as actual Shivganj photographs.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-zinc-950 bg-[#A8C628] rounded-full hover:bg-[#f0d9a3] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'hi' ? 'ग्राम फोटो जोड़ें' : 'Add Village Photo'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div
            role="tablist"
            aria-label={lang === 'hi' ? 'गैलरी श्रेणी फ़िल्टर' : 'Gallery Category Filters'}
            className="flex flex-wrap items-center gap-1.5"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#A8C628] text-zinc-950 font-semibold'
                      : 'glass-panel text-zinc-300 hover:text-white hover:border-white/25'
                  }`}
                >
                  {lang === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search inside gallery */}
          <div className="w-full lg:w-60 shrink-0">
            <input
              type="search"
              value={gallerySearch}
              onChange={(e) => setGallerySearch(e.target.value)}
              placeholder={lang === 'hi' ? 'गैलरी में खोजें...' : 'Filter gallery captions...'}
              aria-label={lang === 'hi' ? 'गैलरी में खोजें' : 'Filter gallery captions'}
              className="w-full px-4 py-2 text-xs glass-panel rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#A8C628]"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center">
            <p className="text-base text-white font-medium">
              {lang === 'hi'
                ? 'इस श्रेणी या खोज शब्द में कोई तस्वीर नहीं मिली।'
                : 'No gallery items match the current category or filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setGallerySearch('');
              }}
              className="mt-4 px-5 py-2 text-xs font-semibold bg-[#A8C628] text-zinc-950 rounded-full"
            >
              {lang === 'hi' ? 'सभी श्रेणियाँ दिखाएँ' : 'Reset Gallery Filter'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => {
              const catMeta = GALLERY_CATEGORIES.find((c) => c.id === item.category);
              const isUserItem = item.id.startsWith('user-photo-');
              return (
                <article
                  key={item.id}
                  className="group glass-panel rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Visual Container */}
                    <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={lang === 'hi' ? item.titleHi : item.titleEn}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <VillageArtSvg theme={item.svgTheme} className="w-full h-full object-cover" />
                      )}

                      {/* Lightbox Trigger Overlay Button */}
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        aria-label={`${lang === 'hi' ? 'बड़ा करके देखें:' : 'Open full screen:'} ${
                          lang === 'hi' ? item.titleHi : item.titleEn
                        }`}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors flex items-center justify-center"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity glass-panel-strong text-white px-3.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{lang === 'hi' ? 'फुल-स्क्रीन देखें' : 'View Fullscreen'}</span>
                        </span>
                      </button>
                    </div>

                    {/* Card Caption & Clean Unboxed Metadata */}
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
                        <span>{lang === 'hi' ? catMeta?.labelHi : catMeta?.labelEn}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {item.isActualPhoto
                            ? lang === 'hi'
                              ? 'असली ग्राम फोटो'
                              : 'Actual Photo'
                            : lang === 'hi'
                            ? 'प्रतीकात्मक चित्रण'
                            : 'Symbolic Art'}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white leading-snug">
                        {lang === 'hi' ? item.titleHi : item.titleEn}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {lang === 'hi' ? item.captionHi : item.captionEn}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs text-zinc-400">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="text-[#A8C628] hover:underline font-medium whitespace-nowrap"
                    >
                      {lang === 'hi' ? 'विवरण व लाइटबॉक्स →' : 'Inspect in Lightbox →'}
                    </button>
                    {isUserItem && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomPhoto(item.id)}
                        aria-label={`${lang === 'hi' ? 'फोटो हटाएँ' : 'Remove photo'} ${item.titleEn}`}
                        className="text-red-300 hover:text-red-200 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{lang === 'hi' ? 'हटाएँ' : 'Remove'}</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Instructions Note for Permanent Photo Addition */}
        <div className="mt-8 glass-panel rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-[#A8C628] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              {lang === 'hi'
                ? 'स्थायी रूप से असली ग्राम तस्वीरें जोड़ने के लिए अपनी फ़ाइलें public/assets/gallery/ फ़ोल्डर में रखें या ऊपर "ग्राम फोटो जोड़ें" बटन से तुरंत अपलोड और प्रीव्यू करें।'
                : 'To permanently bundle village photographs, place image files in public/assets/gallery/ or click "Add Village Photo" above to upload & preview in your browser.'}
            </p>
          </div>
        </div>
      </div>

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-photo-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="glass-panel-strong text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 id="add-photo-modal-title" className="text-lg font-editorial font-semibold">
                {lang === 'hi' ? 'शिवगंज ग्राम गैलरी में फोटो जोड़ें' : 'Add Photo to Shivganj Village Gallery'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                aria-label={lang === 'hi' ? 'मोडल बंद करें' : 'Close modal'}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="photo-file-input" className="block text-xs font-semibold text-zinc-200 mb-1">
                  {lang === 'hi' ? '1. ग्राम की तस्वीर चुनें (वैकल्पिक यदि केवल स्मृति कार्ड जोड़ रहे हैं):' : '1. Select Village Image File:'}
                </label>
                <label className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/25 rounded-xl bg-black/30 cursor-pointer hover:bg-black/50 transition-colors text-xs font-medium text-[#A8C628]">
                  <Upload className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {previewDataUrl
                      ? lang === 'hi'
                        ? '✓ फोटो चुनी गई (बदलने के लिए क्लिक करें)'
                        : '✓ Image Selected (Click to change)'
                      : lang === 'hi'
                      ? 'डिवाइस से ग्राम फोटो चुनें (.JPG, .PNG, .WEBP)'
                      : 'Choose Village Photo from Device (.JPG, .PNG, .WEBP)'}
                  </span>
                  <input
                    id="photo-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="photo-category-select" className="block text-xs font-semibold text-zinc-200 mb-1">
                  {lang === 'hi' ? '2. श्रेणी चुनें (Category):' : '2. Select Gallery Category:'}
                </label>
                <select
                  id="photo-category-select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Exclude<GalleryCategoryId, 'all'>)}
                  className="w-full rounded-xl border border-white/15 bg-zinc-900 px-3 py-2 text-sm text-white"
                >
                  {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {lang === 'hi' ? cat.labelHi : cat.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="photo-title-input" className="block text-xs font-semibold text-zinc-200 mb-1">
                  {lang === 'hi' ? '3. तस्वीर का शीर्षक (Title) *:' : '3. Photograph Title *:'}
                </label>
                <input
                  id="photo-title-input"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={
                    lang === 'hi' ? 'उदाहरण: शिवगंज का पंचायत भवन या सरसों के खेत' : 'e.g. Morning view of Shivganj fields'
                  }
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500"
                />
              </div>

              <div>
                <label htmlFor="photo-caption-input" className="block text-xs font-semibold text-zinc-200 mb-1">
                  {lang === 'hi' ? '4. विवरण / कैप्शन (Caption):' : '4. Caption / Description:'}
                </label>
                <textarea
                  id="photo-caption-input"
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'स्थान, अवसर या तस्वीर की जानकारी लिखें...'
                      : 'Describe the place, festival, or moment in Shivganj...'
                  }
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500"
                />
              </div>

              {uploadError && (
                <p role="alert" className="text-xs font-medium text-red-400">
                  {uploadError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-zinc-950 bg-[#A8C628] rounded-full hover:bg-[#f0d9a3]"
                >
                  {lang === 'hi' ? 'गैलरी में जोड़ें' : 'Save to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'hi' ? activeLightboxItem.titleHi : activeLightboxItem.titleEn}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 text-white">
            <div className="text-xs font-mono text-zinc-400">
              {(lightboxIndex ?? 0) + 1} / {filteredItems.length} ·{' '}
              {lang === 'hi' ? activeLightboxItem.locationTagHi : activeLightboxItem.locationTagEn}
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label={lang === 'hi' ? 'लाइटबॉक्स बंद करें' : 'Close Lightbox'}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold glass-pill-btn text-white rounded-full"
            >
              <X className="w-4 h-4" />
              <span>ESC</span>
            </button>
          </div>

          {/* Center Media + Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-h-[70vh]">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
                )
              }
              aria-label={lang === 'hi' ? 'पिछली तस्वीर' : 'Previous image'}
              className="p-2.5 rounded-full glass-pill-btn text-white mr-3 shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-zinc-950 border border-white/15">
              {activeLightboxItem.imageUrl ? (
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={lang === 'hi' ? activeLightboxItem.titleHi : activeLightboxItem.titleEn}
                  className="max-h-[68vh] w-auto object-contain"
                />
              ) : (
                <div className="w-full max-w-2xl aspect-[4/3]">
                  <VillageArtSvg theme={activeLightboxItem.svgTheme} className="w-full h-full" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? null : (prev + 1) % filteredItems.length
                )
              }
              aria-label={lang === 'hi' ? 'अगली तस्वीर' : 'Next image'}
              className="p-2.5 rounded-full glass-pill-btn text-white ml-3 shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="max-w-3xl mx-auto text-center text-white">
            <h3 className="text-lg sm:text-xl font-editorial font-semibold">
              {lang === 'hi' ? activeLightboxItem.titleHi : activeLightboxItem.titleEn}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300">
              {lang === 'hi' ? activeLightboxItem.captionHi : activeLightboxItem.captionEn}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
