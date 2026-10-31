import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Globe,
  Image as ImageIcon,
  Layers,
  MapPin,
  Sparkles,
  Waves,
  X,
} from 'lucide-react';
import { Language } from '../data/villageConfig';

interface WelcomePopupModalProps {
  isOpen: boolean;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onClose: () => void;
  onNavigateSection: (sectionHash: string) => void;
}

export const WelcomePopupModal: React.FC<WelcomePopupModalProps> = ({
  isOpen,
  lang,
  onSelectLang,
  onClose,
  onNavigateSection,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const pillars = [
    {
      id: 'rivers',
      icon: Waves,
      kickerHi: 'नदियाँ व प्रकृति',
      kickerEn: 'Rivers & Nature',
      titleHi: 'गोमती और सई नदी क्षेत्र',
      titleEn: 'Gomti & Sai River Belt',
      descHi: 'उपजाऊ कृषि भूमि, शांत हरियाली और 106m समुद्र तल ऊँचाई।',
      descEn: 'Fertile agricultural plains and lush greenery at 106m ASL.',
      href: '#rivers',
    },
    {
      id: 'profile',
      icon: Compass,
      kickerHi: 'प्रशासनिक पहचान',
      kickerEn: 'Administration',
      titleHi: 'घाटमपुर · भेटुआ ब्लॉक, अमेठी',
      titleEn: 'Ghatampur · Bhetua Block, Amethi',
      descHi: 'अयोध्या मंडल के अंतर्गत भेटुआ विकास खंड (3 KM) का आदर्श गाँव।',
      descEn: 'Situated in Bhetua Block (3 KM), Amethi District, Ayodhya Division.',
      href: '#profile',
    },
    {
      id: 'facilities',
      icon: Layers,
      kickerHi: 'शिक्षा, स्वास्थ्य व आस्था',
      kickerEn: 'Heritage & Institutions',
      titleHi: 'हनुमान जी मंदिर, महाविद्यालय व PHC',
      titleEn: 'Temples, College & PHC Shivganj',
      descHi: 'डॉ. पुष्पेंद्र सिंह स्मारक महाविद्यालय, PHC शिवगंज व प्राचीन मंदिर।',
      descEn: 'Dr. Pushpendra Singh Smarak Mahavidyalaya, PHC & sacred temples.',
      href: '#facilities',
    },
    {
      id: 'map',
      icon: MapPin,
      kickerHi: 'सत्यापित लोकेशन',
      kickerEn: 'Verified Location',
      titleHi: '6VF2+VH पूरब द्वारा (227412)',
      titleEn: '6VF2+VH Purab Dwara (227412)',
      descHi: '26.2247° N, 81.8514° E · लाइव मौसम और Google Map नेविगेशन।',
      descEn: '26.2247° N, 81.8514° E · Live weather & Google Maps directions.',
      href: '#map-section',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="welcome-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07110B]/80 backdrop-blur-xl overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Ambient Cinematic Light Orbs Behind Modal */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
          >
            <div className="cinematic-aurora-orb absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#8CA617]/25 blur-3xl" />
            <div className="cinematic-aurora-orb-delayed absolute -bottom-24 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[#2E6F54]/30 blur-3xl" />
          </div>

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            data-testid="welcome-popup-dialog"
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[880px] rounded-3xl glass-cinema-modal overflow-hidden text-zinc-100 my-auto"
          >
            {/* Subtle Village Landscape Header Backdrop with Frosted Gradient Scrim */}
            <div className="relative">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_12.48.14_AM_d6adbe71.jpeg"
                  alt="Shivganj Village pastoral landscape in Bhetua Block, Amethi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-35 cinematic-ken-burns"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-[#0E1912]/70 via-[#121D16]/85 to-[#101A14]/98"
                />
              </div>

              {/* Top Utility Row inside Welcome Modal */}
              <div className="relative z-10 px-6 sm:px-8 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold tracking-wider text-[#9AB51A]">
                    Shiv
                  </span>
                  <span className="text-lg font-bold tracking-wider text-white">
                    ganj
                  </span>
                  <span className="text-xs text-zinc-300">
                    · {lang === 'hi' ? 'आधिकारिक ग्राम पोर्टल' : 'Official Village Portal'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Language Selector inside Popup */}
                  <div
                    role="group"
                    aria-label="Popup Language Selector"
                    className="inline-flex items-center p-0.5 glass-panel rounded-full"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#A8C628] ml-2 mr-1" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={() => onSelectLang('hi')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'hi'
                          ? 'bg-[#7B9212] text-white'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      हिंदी
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectLang('en')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'en'
                          ? 'bg-[#7B9212] text-white'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={
                      lang === 'hi'
                        ? 'स्वागत पॉपअप बंद करें (Close welcome popup)'
                        : 'Close welcome popup'
                    }
                    className="p-2 rounded-full glass-pill-btn text-zinc-200 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hero Greeting Content */}
              <div className="relative z-10 px-6 sm:px-8 pt-6 pb-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.32 }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#C6E23A] mb-3"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {lang === 'hi'
                      ? 'हमारा गाँव, हमारी पहचान · अमेठी (उत्तर प्रदेश)'
                      : 'OUR VILLAGE, OUR IDENTITY · AMETHI (UTTAR PRADESH)'}
                  </span>
                </motion.div>

                <motion.h2
                  id="welcome-popup-title"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.36 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-white tracking-tight leading-tight"
                >
                  {lang === 'hi'
                    ? 'नमस्कार! हमारे गाँव शिवगंज के डिजिटल पोर्टल में आपका स्वागत है'
                    : 'Welcome to the Official Digital Portal of Shivganj Village'}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.36 }}
                  className="mt-3 text-sm sm:text-base text-zinc-200 max-w-2xl leading-relaxed"
                >
                  {lang === 'hi'
                    ? 'गोमती और सई नदियों के आंचल में बसा अमेठी ज़िले के भेटुआ विकास खंड का हमारा गाँव शिवगंज — समृद्ध कृषि, अवधी संस्कृति और शांत प्राकृतिक सौंदर्य की पहचान।'
                    : 'Nestled near the Gomti and Sai rivers in Bhetua Block of Amethi District — celebrating rich agriculture, Awadhi culture, and serene natural heritage.'}
                </motion.p>

                {/* 4 Animated Frosted Glass Highlight Cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {pillars.map((pillar, idx) => {
                    const IconComponent = pillar.icon;
                    return (
                      <motion.button
                        key={pillar.id}
                        type="button"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + idx * 0.06, duration: 0.32 }}
                        onClick={() => onNavigateSection(pillar.href)}
                        className="group text-left p-4 rounded-2xl glass-panel glass-sheen-card hover:border-[#A8C628]/70 transition-all flex items-start gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#8CA617]/20 border border-[#A8C628]/40 flex items-center justify-center shrink-0 text-[#C6E23A] group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-medium text-[#A8C628]">
                            {lang === 'hi' ? pillar.kickerHi : pillar.kickerEn}
                          </div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#D5EC63] transition-colors truncate">
                            {lang === 'hi' ? pillar.titleHi : pillar.titleEn}
                          </div>
                          <p className="mt-0.5 text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                            {lang === 'hi' ? pillar.descHi : pillar.descEn}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Action Footer inside Welcome Modal */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.32 }}
                  className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateSection('#map-section')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium glass-pill-btn rounded-xl text-zinc-100 whitespace-nowrap shrink-0"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
                      <span>{lang === 'hi' ? 'मानचित्र देखें' : 'View Map'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateSection('#directory')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium glass-pill-btn rounded-xl text-zinc-100 whitespace-nowrap shrink-0"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
                      <span>{lang === 'hi' ? '14 ग्राम अनुभाग' : '14 Sections'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateSection('#gallery')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium glass-pill-btn rounded-xl text-zinc-100 whitespace-nowrap shrink-0"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
                      <span>{lang === 'hi' ? 'ग्राम गैलरी' : 'Village Gallery'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    data-testid="welcome-enter-btn"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white olive-cta-btn rounded-xl whitespace-nowrap shrink-0"
                  >
                    <span>
                      {lang === 'hi'
                        ? 'पोर्टल में प्रवेश करें (Enter Portal)'
                        : 'Enter Shivganj Portal'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
