/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe,
  Image as ImageIcon,
  Mail,
  MapPin,
  Menu,
  Play,
  Search,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Language,
  VILLAGE_ANNOUNCEMENTS,
  VILLAGE_CONFIG,
} from './data/villageConfig';
import {
  getNextCarouselIndex,
  HERO_AUTOPLAY_INTERVAL_MS,
  searchVillageContent,
} from './utils/villageLogic';
import { HistorySection } from './components/HistorySection';
import { VillageDirectorySections } from './components/VillageDirectorySections';
import { MapAndWeatherSection } from './components/MapAndWeatherSection';
import { VillageGallerySection } from './components/VillageGallerySection';
import { ContactAndGuideSection } from './components/ContactAndGuideSection';

interface HeroSliceItem {
  id: string;
  titleHi: string;
  titleEn: string;
  badgeHi: string;
  badgeEn: string;
  href: string;
  gradient: string;
  accentColor: string;
  svgType: 'waterfall' | 'valley' | 'meadow' | 'canyon';
}

const HERO_SLICE_ITEMS: HeroSliceItem[] = [
  {
    id: 'rivers',
    titleHi: 'गोमती और सई नदी क्षेत्र',
    titleEn: 'Gomti & Sai River Belt',
    badgeHi: 'नदियाँ व प्रकृति',
    badgeEn: 'Rivers & Nature',
    href: '#rivers',
    gradient: 'linear-gradient(180deg, #9DB3C1 0%, #3E5868 55%, #1D2D36 100%)',
    accentColor: '#CFE4F2',
    svgType: 'waterfall',
  },
  {
    id: 'geography',
    titleHi: 'भेतुआ (3 KM) · घाटमपुर',
    titleEn: 'Bhetua (3 KM) · Ghatampur',
    badgeHi: '106m समुद्र तल ऊँचाई',
    badgeEn: '106m Elevation',
    href: '#geography',
    gradient: 'linear-gradient(180deg, #B9C8D2 0%, #3F6A34 50%, #1C3518 100%)',
    accentColor: '#98B822',
    svgType: 'valley',
  },
  {
    id: 'facilities',
    titleHi: 'प्राचीन मंदिर एवं विद्यालय',
    titleEn: 'Temples & Schools',
    badgeHi: 'संस्कृति व शिक्षा',
    badgeEn: 'Culture & Education',
    href: '#facilities',
    gradient: 'linear-gradient(180deg, #5A8AD2 0%, #5F7630 55%, #6B8E23 100%)',
    accentColor: '#A8C82A',
    svgType: 'meadow',
  },
  {
    id: 'map-section',
    titleHi: '6VF2+VH पूरब द्वारा मैप',
    titleEn: '6VF2+VH Purab Dwara Map',
    badgeHi: 'अमेठी · 227412',
    badgeEn: 'Amethi · 227412',
    href: '#map-section',
    gradient: 'linear-gradient(180deg, #C6B299 0%, #2C5342 52%, #14334A 100%)',
    accentColor: '#7DC3E8',
    svgType: 'canyon',
  },
];

export default function App() {
  const [lang, setLang] = useState<Language>('hi');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('all');
  const [shareCopied, setShareCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeHeroSlice, setActiveHeroSlice] = useState<number>(0);
  const [isHeroCarouselPaused, setIsHeroCarouselPaused] = useState<boolean>(false);

  const searchResults = searchVillageContent(searchQuery);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-playing Hero Highlight Carousel: cycles every 5 seconds, pauses on hover
  useEffect(() => {
    if (isHeroCarouselPaused) {
      return;
    }
    const timerId = window.setInterval(() => {
      setActiveHeroSlice((prev) =>
        getNextCarouselIndex(prev, HERO_SLICE_ITEMS.length, 'next')
      );
    }, HERO_AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [isHeroCarouselPaused]);

  const handleSharePortal = async () => {
    const shareUrl = window.location.href;
    const shareTitle = 'शिवगंज (Shivganj Village) – हमारा गाँव, हमारी पहचान | Bhetua, Amethi, UP';
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: 'उत्तर प्रदेश के अमेठी ज़िले के भेतुआ क्षेत्र में बसे हमारे गाँव शिवगंज का आधिकारिक पोर्टल देखें।',
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handlePrevSlice = () => {
    setActiveHeroSlice((prev) =>
      getNextCarouselIndex(prev, HERO_SLICE_ITEMS.length, 'prev')
    );
  };

  const handleNextSlice = () => {
    setActiveHeroSlice((prev) =>
      getNextCarouselIndex(prev, HERO_SLICE_ITEMS.length, 'next')
    );
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#121D16] text-zinc-100">
      {/* Strict 3-Zone Top Navigation Bar Contract — Translucent Misty Forest Glass Header */}
      <header className="sticky top-0 z-40 bg-[#121D16]/80 backdrop-blur-xl border-b border-white/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Two-Tone Brand Wordmark matching "GreenHaven" in Reference */}
          <a
            href="#top"
            className="text-xl tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span className="font-extrabold text-[#8CA617]">Shiv</span>
            <span className="font-bold text-white">ganj</span>
            <span className="text-sm font-medium text-white/85 ml-1.5 tracking-normal">
              · शिवगंज
            </span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Text Navigation Links */}
          <nav
            aria-label={lang === 'hi' ? 'मुख्य नेविगेशन' : 'Primary Navigation'}
            className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-200"
          >
            <a
              href="#history"
              className="hover:text-[#9AB51A] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'इतिहास व पहचान' : 'About'}
            </a>
            <a
              href="#directory"
              className="hover:text-[#9AB51A] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'ग्राम निर्देशिका' : 'Explore'}
            </a>
            <a
              href="#map-section"
              className="hover:text-[#9AB51A] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'मानचित्र' : 'Map'}
            </a>
            <a
              href="#gallery"
              className="hover:text-[#9AB51A] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'ग्राम गैलरी' : 'Gallery'}
            </a>
            <a
              href="#contact"
              className="hover:text-[#9AB51A] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'संपर्क' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: 1 Solid Olive-Chartreuse Primary Action CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#map-section"
              className="hidden sm:inline-flex items-center px-5 py-2 text-xs font-semibold text-white olive-cta-btn rounded-xl whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'मानचित्र पर देखें' : 'Explore Map'}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={lang === 'hi' ? 'मोबाइल मेन्यू खोलें या बंद करें' : 'Toggle mobile navigation menu'}
              className="md:hidden p-2 rounded-lg glass-panel text-zinc-100 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/15 bg-[#121D16]/95 backdrop-blur-xl px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-100">
              <a
                href="#history"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9AB51A]"
              >
                {lang === 'hi' ? 'इतिहास और हमारी पहचान' : 'History & Identity'}
              </a>
              <a
                href="#directory"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9AB51A]"
              >
                {lang === 'hi' ? 'ग्राम निर्देशिका (14 अनुभाग)' : 'Village Directory (14 Sections)'}
              </a>
              <a
                href="#map-section"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9AB51A]"
              >
                {lang === 'hi' ? 'मानचित्र पर शिवगंज (Find on Map)' : 'Find Shivganj on Map'}
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9AB51A]"
              >
                {lang === 'hi' ? 'Village Gallery (ग्राम गैलरी)' : 'Village Gallery'}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9AB51A]"
              >
                {lang === 'hi' ? 'संपर्क करें (Contact Us)' : 'Contact Us'}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Operational Utility & Search Toolbar (Language Toggle, Content Search, Breadcrumb & Share) */}
        <div className="bg-[#15221A]/90 backdrop-blur-md border-b border-white/15">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Semantic Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs text-zinc-300 flex flex-wrap items-center gap-1.5">
              <span>{lang === 'hi' ? 'भारत' : 'India'}</span>
              <span aria-hidden="true">/</span>
              <span>{lang === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh'}</span>
              <span aria-hidden="true">/</span>
              <a href="#profile" className="hover:underline text-white font-medium">
                {lang === 'hi' ? 'अमेठी ज़िला' : 'Amethi District'}
              </a>
              <span aria-hidden="true">/</span>
              <a href="#geography" className="hover:underline text-white font-medium">
                {lang === 'hi' ? 'भेतुआ ब्लॉक' : 'Bhetua Block'}
              </a>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#A8C628]">
                {lang === 'hi' ? 'घाटमपुर पंचायत · शिवगंज' : 'Ghatampur · Shivganj'}
              </span>
            </nav>

            {/* Right Controls: Search Bar + Bilingual Toggle + Social Share */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Instant Website Content Search Bar */}
              <div className="relative flex-1 sm:w-80">
                <Search
                  className="w-3.5 h-3.5 text-zinc-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'गाँव की जानकारी खोजें (गोमती, स्कूल, HAL)...'
                      : 'Search village info (Gomti, School, HAL)...'
                  }
                  aria-label={lang === 'hi' ? 'वेबसाइट सामग्री खोजें' : 'Search website content'}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs glass-panel rounded-full text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#8CA617]"
                />
              </div>

              {/* Hindi / English Language Toggle */}
              <div
                role="group"
                aria-label="Language Selector"
                className="inline-flex items-center p-0.5 glass-panel rounded-full shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-[#A8C628] ml-2.5 mr-1" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'hi'
                      ? 'bg-[#7B9212] text-white'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'en'
                      ? 'bg-[#7B9212] text-white'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Social Share Button */}
              <button
                type="button"
                onClick={handleSharePortal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium glass-pill-btn rounded-full text-white whitespace-nowrap shrink-0"
              >
                <Share2 className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
                <span>
                  {shareCopied
                    ? lang === 'hi'
                      ? 'लिंक कॉपी हुआ!'
                      : 'Link Copied!'
                    : lang === 'hi'
                    ? 'शेयर करें'
                    : 'Share'}
                </span>
              </button>
            </div>
          </div>

          {/* Instant Search Results Panel */}
          {searchQuery.trim() !== '' && (
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <div className="glass-panel-strong rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/15">
                  <span className="text-xs font-semibold text-[#A8C628]">
                    {lang === 'hi'
                      ? `"${searchQuery}" के लिए ${searchResults.length} परिणाम मिले`
                      : `Found ${searchResults.length} results for "${searchQuery}"`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-medium text-zinc-200 hover:text-white underline"
                  >
                    {lang === 'hi' ? 'खोज साफ़ करें (Clear)' : 'Clear Search'}
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <p className="text-xs text-zinc-300 py-2">
                    {lang === 'hi'
                      ? 'कोई परिणाम नहीं मिला। कृपया "गोमती", "सई", "गांधी इंटर कॉलेज", "HAL", "अमेठी" या "मंदिर" खोजें।'
                      : 'No matching entries found. Try searching "Gomti", "Sai", "Gandhi Inter College", "HAL", "Amethi", or "Mandir".'}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                    {searchResults.map((res) => (
                      <a
                        key={res.id}
                        href={`#${res.sectionId}`}
                        onClick={() => {
                          setActiveSectionFilter('all');
                          setSearchQuery('');
                        }}
                        className="p-3 rounded-xl bg-black/35 border border-white/15 hover:border-[#8CA617] transition-colors block"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#A8C628] mb-0.5">
                          <span>SEC {res.sectionNumber}</span>
                          {res.badgeText && <span>{res.badgeText}</span>}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {lang === 'hi' ? res.titleHi : res.titleEn}
                        </div>
                        <p className="text-xs text-zinc-200 line-clamp-2 mt-0.5">
                          {lang === 'hi' ? res.subtitleHi : res.subtitleEn}
                        </p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* =====================================================================
            HERO SECTION: FRAMED WHITE-BORDERED SPLIT-FROST GLASS WINDOW
            (Exact Theme & Layout of Attached GreenHaven / Iceland Escape Image)
           ===================================================================== */}
        <section
          id="home"
          className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/15"
        >
          {/* Full-Bleed Attached Shivganj Village Photograph Backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_12.48.14_AM_d6adbe71.jpeg"
              alt="Shivganj Village pastoral landscape and cattle in Bhetua Block, Sultanpur"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#121D16]/45 via-[#121D16]/25 to-[#121D16]/65"
            />
          </div>

          {/* FLOATING WHITE-BORDERED GLASS WINDOW (Matching Reference Frame) */}
          <div className="relative z-10 max-w-[1220px] mx-auto hero-glass-frame overflow-hidden min-h-[590px] flex flex-col justify-between">
            {/* LEFT-HALF FROSTED GLASS BLUR LAYER (Covers left ~52% of the framed window) */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-full lg:w-[53%] hero-left-frost z-0 border-r border-white/15"
            />

            {/* Top Internal Glass Frame Bar (Brand + Quick Status Pill) */}
            <div className="relative z-10 px-6 sm:px-10 pt-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-widest text-[#8CA617]">
                  Shiv
                </span>
                <span className="text-lg sm:text-xl font-bold tracking-widest text-white">
                  ganj
                </span>
                <span className="text-xs font-medium text-white/90 ml-2 px-2.5 py-0.5 rounded-full bg-black/25 border border-white/25">
                  {lang === 'hi'
                    ? 'हमारा गाँव, हमारी पहचान · अमेठी (UP)'
                    : 'Our Village, Our Identity · Amethi (UP)'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-xs font-medium text-white/90 drop-shadow">
                  6VF2+VH Ankit, Purab Dwara, UP 227412
                </span>
                <a
                  href="#contact"
                  className="olive-cta-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                >
                  {lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                </a>
              </div>
            </div>

            {/* Center Split Content: Monumental Typography on Left + 4 Slanted 3D Accordion Slice Cards on Right */}
            <div className="relative z-10 px-6 sm:px-10 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
              {/* Left 6 Columns: Monumental Split-Contrast Display Title & Olive CTA */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-[#142619] bg-white/75 px-3 py-1 rounded-md shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#6D830E]" aria-hidden="true" />
                  <span>
                    {lang === 'hi'
                      ? 'घाटमपुर ग्राम पंचायत · भेतुआ ब्लॉक'
                      : 'GHATAMPUR PANCHAYAT · BHETUA BLOCK'}
                  </span>
                </div>

                {/* Monumental Split-Contrast Headline matching "ICELAND / ESCAPE" */}
                <h1 className="font-extrabold uppercase leading-[0.95] select-none">
                  <span className="block text-5xl sm:text-6xl xl:text-7xl tracking-[0.2em]">
                    <span className="text-[#1A2E20] drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]">
                      SHIV
                    </span>
                    <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      GANJ
                    </span>
                  </span>
                  <span className="block mt-2 text-3xl sm:text-5xl xl:text-[3.35rem] tracking-[0.14em] text-[#172A1D] drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                    {lang === 'hi' ? 'शिवगंज · हमारा गाँव' : 'VILLAGE PORTAL'}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-white font-medium max-w-md leading-relaxed drop-shadow">
                  {lang === 'hi'
                    ? 'गोमती और सई नदियों के आंचल में बसा अमेठी ज़िले के भेटुआ विकास खंड का हमारा गाँव शिवगंज — समृद्ध कृषि, अवधी संस्कृति और शांत प्राकृतिक सौंदर्य की पहचान।'
                    : 'Discover serene rural landscapes, Awadhi cultural heritage, and community life near the Gomti & Sai rivers in Bhetua Block, Amethi.'}
                </p>

                {/* Primary Solid Olive Button + Circular Play/Tour Button (Exact Reference Match) */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#directory"
                    className="olive-cta-btn px-7 py-3.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap shrink-0"
                  >
                    {lang === 'hi' ? 'गाँव की निर्देशिका (14 अनुभाग)' : 'Explore 14 Sections'}
                  </a>

                  <a
                    href="#map-section"
                    className="inline-flex items-center gap-3 group text-sm font-medium text-white hover:text-[#D5EC63] transition-colors"
                  >
                    <span className="w-11 h-11 rounded-full border-2 border-white/85 bg-black/20 flex items-center justify-center group-hover:scale-105 group-hover:border-[#9AB51A] transition-transform">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="drop-shadow">
                      {lang === 'hi' ? '6VF2+VH मानचित्र देखें' : 'View Village Map'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Right 6 Columns: 4 Interactive 3D Perspective Slanted Slice Cards + Right Diamond Indicator */}
              <div
                id="hero-highlight-carousel"
                aria-roledescription="carousel"
                aria-label={lang === 'hi' ? 'शिवगंज प्रमुख आकर्षण कैरोसेल' : 'Shivganj Highlight Slides Carousel'}
                onMouseEnter={() => setIsHeroCarouselPaused(true)}
                onMouseLeave={() => setIsHeroCarouselPaused(false)}
                className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pr-4 sm:pr-8"
              >
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-[490px] py-4">
                  {HERO_SLICE_ITEMS.map((slice, idx) => {
                    const isSelected = activeHeroSlice === idx;
                    return (
                      <a
                        key={slice.id}
                        href={slice.href}
                        data-slide-index={idx}
                        data-active={isSelected ? 'true' : 'false'}
                        onMouseEnter={() => {
                          setIsHeroCarouselPaused(true);
                          setActiveHeroSlice(idx);
                        }}
                        onClick={() => setActiveHeroSlice(idx)}
                        className={`slanted-slice-card relative h-56 sm:h-64 rounded-lg overflow-hidden flex flex-col justify-end p-2.5 group ${
                          isSelected ? 'ring-2 ring-[#9AB51A] -translate-y-2' : 'opacity-90'
                        }`}
                        style={{ background: slice.gradient }}
                      >
                        {/* Custom Scenic Artwork inside each vertical slice */}
                        <svg
                          viewBox="0 0 120 260"
                          preserveAspectRatio="xMidYMid slice"
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          {slice.svgType === 'waterfall' && (
                            <>
                              <rect width="120" height="260" fill="#526978" />
                              {/* Cascading river waterfall */}
                              <path
                                d="M35,0 L85,0 L95,220 L25,220 Z"
                                fill="#DCE8EF"
                                opacity="0.75"
                              />
                              <path
                                d="M48,0 L72,0 L78,220 L42,220 Z"
                                fill="#FFFFFF"
                                opacity="0.85"
                              />
                              <rect y="215" width="120" height="45" fill="#1B2830" />
                              {/* Tiny observer silhouette in yellow jacket like reference */}
                              <circle cx="60" cy="204" r="3.5" fill="#F59E0B" />
                              <rect x="57" y="208" width="6" height="9" rx="2" fill="#F59E0B" />
                            </>
                          )}
                          {slice.svgType === 'valley' && (
                            <>
                              <rect width="120" height="100" fill="#D5E3EC" />
                              <polygon points="0,95 65,35 120,85 120,260 0,260" fill="#2E5A27" />
                              <polygon points="0,120 85,75 120,130 120,260 0,260" fill="#1F421B" />
                              <path
                                d="M52,70 Q68,140 88,240"
                                stroke="#E2F1F8"
                                strokeWidth="6"
                                fill="none"
                                opacity="0.85"
                              />
                            </>
                          )}
                          {slice.svgType === 'meadow' && (
                            <>
                              <rect width="120" height="120" fill="#4E82C4" />
                              <polygon points="10,120 65,65 115,120" fill="#4D5D2B" />
                              <rect y="118" width="120" height="142" fill="#6F8C28" />
                              <rect y="165" width="120" height="95" fill="#88A825" />
                            </>
                          )}
                          {slice.svgType === 'canyon' && (
                            <>
                              <rect width="120" height="90" fill="#DEC8B0" />
                              <polygon points="0,55 48,95 42,260 0,260" fill="#3B493F" />
                              <polygon points="120,45 68,95 78,260 120,260" fill="#2A3A33" />
                              <path
                                d="M45,115 Q62,175 58,260"
                                stroke="#2978A0"
                                strokeWidth="26"
                                fill="none"
                              />
                            </>
                          )}
                        </svg>

                        {/* Dark gradient footer inside slice card */}
                        <div className="inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-2 pt-8 relative z-10">
                          <span className="block text-[9px] uppercase tracking-wider font-bold text-[#B8D82E]">
                            {lang === 'hi' ? slice.badgeHi : slice.badgeEn}
                          </span>
                          <span className="block text-[11px] font-semibold text-white leading-tight mt-0.5">
                            {lang === 'hi' ? slice.titleHi : slice.titleEn}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Far-Right Vertical Diamond Stepper reflecting all 4 slides */}
                <div
                  role="tablist"
                  aria-label={lang === 'hi' ? 'कैरोसेल स्लाइड संकेतक' : 'Carousel slide indicators'}
                  className="hidden sm:flex flex-col items-center gap-2.5 ml-3"
                >
                  <div className="w-px h-8 bg-white/40" />
                  {HERO_SLICE_ITEMS.map((slice, idx) => {
                    const isSelected = activeHeroSlice === idx;
                    return (
                      <button
                        key={slice.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`${lang === 'hi' ? 'स्लाइड' : 'Slide'} ${idx + 1}: ${
                          lang === 'hi' ? slice.titleHi : slice.titleEn
                        }`}
                        onClick={() => setActiveHeroSlice(idx)}
                        className={`w-2.5 h-2.5 rotate-45 transition-all ${
                          isSelected
                            ? 'bg-[#B8D82E] scale-125 border border-white'
                            : 'border border-white/80 bg-transparent hover:bg-white/50'
                        }`}
                      />
                    );
                  })}
                  <div className="w-px h-8 bg-white/40" />
                </div>
              </div>
            </div>

            {/* Bottom Internal Bar: Left Quick-Action White Icons + Right Square Carousel Buttons (< and Olive >) */}
            <div
              onMouseEnter={() => setIsHeroCarouselPaused(true)}
              onMouseLeave={() => setIsHeroCarouselPaused(false)}
              className="relative z-10 px-6 sm:px-10 pb-6 pt-2 flex flex-wrap items-center justify-between gap-4"
            >
              {/* Bottom-Left White Circular Community & Section Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#history"
                  aria-label="History of Shivganj"
                  title={lang === 'hi' ? 'इतिहास और पहचान' : 'History of Shivganj'}
                  className="w-8 h-8 rounded-full bg-white text-[#18291E] flex items-center justify-center hover:bg-[#9AB51A] hover:text-white transition-colors shadow"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
                <a
                  href="#map-section"
                  aria-label="Find Shivganj on Map"
                  title="6VF2+VH Ankit, Purab Dwara Map"
                  className="w-8 h-8 rounded-full bg-white text-[#18291E] flex items-center justify-center hover:bg-[#9AB51A] hover:text-white transition-colors shadow"
                >
                  <MapPin className="w-4 h-4" />
                </a>
                <a
                  href="#gallery"
                  aria-label="Village Gallery"
                  title={lang === 'hi' ? 'ग्राम गैलरी' : 'Village Gallery'}
                  className="w-8 h-8 rounded-full bg-white text-[#18291E] flex items-center justify-center hover:bg-[#9AB51A] hover:text-white transition-colors shadow"
                >
                  <ImageIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  aria-label="Contact Shivganj"
                  title={lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                  className="w-8 h-8 rounded-full bg-white text-[#18291E] flex items-center justify-center hover:bg-[#9AB51A] hover:text-white transition-colors shadow"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <span
                  aria-live="polite"
                  className="hidden md:inline-block text-xs text-white/95 ml-2 font-medium drop-shadow"
                >
                  {lang === 'hi'
                    ? `सक्रिय दृश्य (${activeHeroSlice + 1}/${HERO_SLICE_ITEMS.length}): ${
                        HERO_SLICE_ITEMS[activeHeroSlice].titleHi
                      }${isHeroCarouselPaused ? ' · रुका हुआ (Paused)' : ''}`
                    : `Featured (${activeHeroSlice + 1}/${HERO_SLICE_ITEMS.length}): ${
                        HERO_SLICE_ITEMS[activeHeroSlice].titleEn
                      }${isHeroCarouselPaused ? ' · Paused' : ''}`}
                </span>
              </div>

              {/* Bottom-Right Frosted Grey `<` and Olive-Chartreuse `>` Square Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrevSlice}
                  aria-label={lang === 'hi' ? 'पिछला दृश्य' : 'Previous highlight'}
                  className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlice}
                  aria-label={lang === 'hi' ? 'अगला दृश्य' : 'Next highlight'}
                  className="w-10 h-10 rounded-lg bg-[#8FA824]/85 backdrop-blur-md border border-white/60 flex items-center justify-center text-white hover:bg-[#8CA617] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 4-Column Frosted Glass KPI Strip Below Framed Window */}
          <div className="relative z-10 max-w-[1220px] mx-auto mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="glass-panel-strong rounded-2xl p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-tabular font-bold text-[#A8C628]">106 m</div>
              <div className="mt-1 text-xs font-medium text-zinc-200">
                {lang === 'hi' ? 'समुद्र तल से ऊँचाई' : 'Elevation Above Sea Level'}
              </div>
            </article>

            <article className="glass-panel-strong rounded-2xl p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-tabular font-bold text-[#A8C628]">3 KM</div>
              <div className="mt-1 text-xs font-medium text-zinc-200">
                {lang === 'hi' ? 'भेतुआ ब्लॉक मुख्यालय से दूरी' : 'Distance from Bhetua Block'}
              </div>
            </article>

            <article className="glass-panel-strong rounded-2xl p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-tabular font-bold text-[#A8C628]">25–27 KM</div>
              <div className="mt-1 text-xs font-medium text-zinc-200">
                {lang === 'hi' ? 'सुल्तानपुर ज़िला मुख्यालय से' : 'From Sultanpur District HQ'}
              </div>
            </article>

            <article className="glass-panel-strong rounded-2xl p-4 sm:p-5">
              <div className="text-2xl sm:text-3xl font-tabular font-bold text-[#A8C628]">05368</div>
              <div className="mt-1 text-xs font-medium text-zinc-200">
                {lang === 'hi' ? 'क्षेत्रीय STD कोड' : 'Regional STD Telephone Code'}
              </div>
            </article>
          </div>
        </section>

        {/* LATEST VILLAGE NEWS, ANNOUNCEMENTS & COMMUNITY NOTICE BOARD */}
        <section
          id="announcements"
          aria-labelledby="announcements-heading"
          className="py-14 border-b border-white/15 dark-grey-alt"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                <h2
                  id="announcements-heading"
                  className="text-xl sm:text-2xl font-editorial font-semibold text-white"
                >
                  {lang === 'hi'
                    ? 'ग्राम सूचना पट्ट एवं नवीनतम समाचार (Village Announcements & News)'
                    : 'Village Announcements, News & Community Updates'}
                </h2>
              </div>
              <span className="text-xs text-zinc-300">
                {lang === 'hi' ? 'घाटमपुर ग्राम पंचायत · शिवगंज' : 'Ghatampur Gram Panchayat · Shivganj'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VILLAGE_ANNOUNCEMENTS.map((ann) => (
                <article
                  key={ann.id}
                  className="glass-panel rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300 mb-2">
                      <span className="font-semibold text-[#A8C628]">
                        {lang === 'hi' ? ann.categoryHi : ann.categoryEn}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{lang === 'hi' ? ann.dateHi : ann.dateEn}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {lang === 'hi' ? ann.titleHi : ann.titleEn}
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      {lang === 'hi' ? ann.summaryHi : ann.summaryEn}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* REQUIREMENT 3: ABOUT SHIVGANJ & VILLAGE HISTORY ("इतिहास और हमारी पहचान – History of Shivganj") */}
        <HistorySection lang={lang} />

        {/* REQUIREMENT 7: ALL 14 VILLAGE INFORMATION SECTIONS FROM SUPPLIED PDF */}
        <VillageDirectorySections
          lang={lang}
          activeSectionFilter={activeSectionFilter}
          onSelectSectionFilter={setActiveSectionFilter}
        />

        {/* REQUIREMENT 2: GOOGLE MAPS LOCATION ("Find Shivganj on Map") & LIVE WEATHER */}
        <MapAndWeatherSection lang={lang} />

        {/* REQUIREMENT 4: ADVANCED VILLAGE GALLERY (8 CATEGORIES, LIGHTBOX, UPLOAD) */}
        <VillageGallerySection lang={lang} />

        {/* REQUIREMENT 5: CONTACT & COMMUNITY + ADMIN GUIDE */}
        <ContactAndGuideSection lang={lang} />

        {/* CLOSING HERITAGE BANNER */}
        <section className="py-16 dark-grey-section border-b border-white/15 text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#A8C628] mb-2">
              OUR VILLAGE · OUR PRIDE · SHIVGANJ
            </p>
            <h2 className="text-2xl sm:text-4xl font-editorial font-semibold text-white">
              {lang === 'hi'
                ? 'शिवगंज — हमारी जड़ें, हमारा गर्व।'
                : 'Shivganj — A Village of Culture, Peace, Unity & Natural Beauty.'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-200 leading-relaxed">
              {lang === 'hi'
                ? 'इस वेबसाइट को गाँव के लोगों की यादों, वास्तविक तस्वीरों और प्रमाणित जानकारी से मिलकर और बेहतर बनाया जा सकता है।'
                : 'Built to preserve and celebrate the verified heritage, institutions, and community spirit of Shivganj, Bhetua Block, Sultanpur.'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#top"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white olive-cta-btn rounded-xl"
              >
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
                <span>{lang === 'hi' ? 'वापस ऊपर जाएँ ↑' : 'Back to Top ↑'}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#0C140F] text-zinc-300 py-12 border-t border-white/15">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/15">
            <div className="md:col-span-2">
              <a
                href="#top"
                className="text-xl font-bold tracking-tight inline-flex items-center gap-1"
              >
                <span className="text-[#8CA617]">Shiv</span>
                <span className="text-white">ganj</span>
                <span className="text-white ml-1">· शिवगंज ग्राम पोर्टल</span>
              </a>
              <p className="mt-2 text-xs text-zinc-300 max-w-md leading-relaxed">
                {lang === 'hi'
                  ? 'शिवगंज (6VF2+VH Ankit, पूरब द्वारा, ग्राम पंचायत घाटमपुर, विकास खंड भेतुआ, ज़िला अमेठी, उत्तर प्रदेश 227412) की आधिकारिक सामुदायिक जानकारी, इतिहास, भूगोल और ग्राम गैलरी वेबसाइट।'
                  : 'Official community information, history, geography, and visual archive portal for Shivganj (6VF2+VH Ankit, Purab Dwara, Ghatampur Gram Panchayat, Bhetua Block, Amethi District, Uttar Pradesh 227412).'}
              </p>
              <p className="mt-3 text-xs font-tabular text-zinc-300">
                PIN: 227411 (Shahgarh) · 227408 (Dhammaur) · 227412 (HAL Korwa / Purab Dwara) · STD: {VILLAGE_CONFIG.identity.stdCode}
              </p>

              {/* Official Social Media Logo Links in Footer */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {VILLAGE_CONFIG.contact.socialLinks.instagram && (
                  <a
                    href={VILLAGE_CONFIG.contact.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram (@hamara_shivganj)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:border-[#E1306C]/70 hover:bg-white/10 text-xs text-white transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#E1306C]" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                )}
                {VILLAGE_CONFIG.contact.socialLinks.youtube && (
                  <a
                    href={VILLAGE_CONFIG.contact.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube (@Hamara_shivganj)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:border-[#FF0000]/70 hover:bg-white/10 text-xs text-white transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#FF0000]" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>YouTube</span>
                  </a>
                )}
                {VILLAGE_CONFIG.contact.socialLinks.twitter && (
                  <a
                    href={VILLAGE_CONFIG.contact.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter (X)"
                    title="Twitter (X) (@Hamara_shivganj)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:border-white/50 hover:bg-white/10 text-xs text-white transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter (X)</span>
                  </a>
                )}
                {VILLAGE_CONFIG.contact.socialLinks.facebook && (
                  <a
                    href={VILLAGE_CONFIG.contact.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook (Hamara Shivganj)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:border-[#1877F2]/70 hover:bg-white/10 text-xs text-white transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#1877F2]" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-3">
                {lang === 'hi' ? 'प्रमुख अनुभाग' : 'Quick Links'}
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li><a href="#history" className="hover:text-white">इतिहास और हमारी पहचान (History)</a></li>
                <li><a href="#profile" className="hover:text-white">ग्राम प्रोफ़ाइल (Village Profile)</a></li>
                <li><a href="#reach" className="hover:text-white">शिवगंज कैसे पहुँचें (How to Reach)</a></li>
                <li><a href="#facilities" className="hover:text-white">शिक्षा, स्वास्थ्य व मंदिर (Facilities)</a></li>
                <li><a href="#map-section" className="hover:text-white">Google Map Location</a></li>
                <li><a href="#gallery" className="hover:text-white">Village Gallery</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-3">
                {lang === 'hi' ? 'स्थैतिक पृष्ठ व SEO (Static Pages)' : 'SEO & Static Pages'}
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li><a href="/about.html" className="hover:text-white">about.html (History Page)</a></li>
                <li><a href="/gallery.html" className="hover:text-white">gallery.html (Gallery Page)</a></li>
                <li><a href="/contact.html" className="hover:text-white">contact.html (Contact Page)</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
            <p>
              © {new Date().getFullYear()} Shivganj Village (Bhetua Block, Amethi, Uttar Pradesh) · हमारा गाँव, हमारी पहचान
            </p>
            <p className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
              <span>Map: 6VF2+VH Ankit, Purab Dwara, UP 227412 (26.2247° N, 81.8514° E)</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <a
          href="#top"
          aria-label={lang === 'hi' ? 'पृष्ठ के शीर्ष पर वापस जाएँ' : 'Scroll back to top'}
          className="fixed bottom-5 right-5 z-30 p-3 rounded-full olive-cta-btn text-white shadow-lg"
        >
          <ArrowUp className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
