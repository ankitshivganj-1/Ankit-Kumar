import React from 'react';
import { GalleryItem } from '../data/villageConfig';

interface VillageArtSvgProps {
  theme: GalleryItem['svgTheme'] | 'hero';
  className?: string;
}

export const VillageArtSvg: React.FC<VillageArtSvgProps> = ({ theme, className = 'w-full h-full' }) => {
  switch (theme) {
    case 'temple':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="url(#darkGradTemple)" />
          <circle cx="240" cy="145" r="88" fill="#A8C628" fillOpacity="0.12" />
          <path d="M240 48 L295 190 H185 L240 48Z" fill="#272B33" stroke="#A8C628" strokeWidth="1.5" />
          <path d="M202 140 H278 M194 165 H286" stroke="#A1A1AA" strokeWidth="1.5" />
          <line x1="240" y1="24" x2="240" y2="48" stroke="#A8C628" strokeWidth="2.5" />
          <path d="M240 24 L266 33 L240 42 Z" fill="#D97706" />
          <rect x="170" y="190" width="140" height="82" fill="#181B20" stroke="#71717A" strokeWidth="1.5" />
          <path d="M222 272 V222 A18 18 0 0 1 258 222 V272" fill="#0F1114" stroke="#A8C628" strokeWidth="1.2" />
          <path d="M60 272 H420" stroke="#52525B" strokeWidth="1.5" />
          <defs>
            <linearGradient id="darkGradTemple" x1="0" y1="0" x2="480" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E2229" />
              <stop offset="100%" stopColor="#111317" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'fields':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="url(#darkGradFields)" />
          <circle cx="370" cy="92" r="42" fill="#A8C628" fillOpacity="0.22" />
          <path d="M0 190 Q150 160 310 185 T480 175 V340 H0 Z" fill="#272C33" />
          <path d="M0 235 Q190 205 350 235 T480 225 V340 H0 Z" fill="#1D2127" />
          <path d="M0 280 Q160 260 340 285 T480 275 V340 H0 Z" fill="#A8C628" fillOpacity="0.16" />
          <path d="M45 255 L195 232 M65 285 L235 260 M280 265 L430 245" stroke="#A8C628" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="darkGradFields" x1="0" y1="0" x2="480" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#23272F" />
              <stop offset="100%" stopColor="#121418" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'streets':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="#16191E" />
          <rect x="45" y="115" width="115" height="95" fill="#1F242B" stroke="#52525B" strokeWidth="1.5" />
          <polygon points="35,115 102,75 170,115" fill="#2C323B" stroke="#71717A" strokeWidth="1.2" />
          <rect x="320" y="125" width="115" height="85" fill="#1F242B" stroke="#52525B" strokeWidth="1.5" />
          <polygon points="310,125 377,88 445,125" fill="#272C35" stroke="#71717A" strokeWidth="1.2" />
          <path d="M215 210 L265 210 L355 340 L125 340 Z" fill="#23272E" stroke="#71717A" strokeWidth="1.5" />
          <path d="M195 245 H285 M175 280 H305 M150 315 H330" stroke="#A8C628" strokeOpacity="0.3" strokeWidth="1.5" />
        </svg>
      );

    case 'sunrise':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="#171A20" />
          <circle cx="240" cy="155" r="64" fill="#A8C628" fillOpacity="0.18" />
          <circle cx="240" cy="155" r="38" fill="#A8C628" fillOpacity="0.35" />
          <ellipse cx="110" cy="195" rx="65" ry="42" fill="#232830" />
          <ellipse cx="375" cy="190" rx="70" ry="45" fill="#2A303A" />
          <rect x="0" y="215" width="480" height="125" fill="#111317" />
          <path d="M195 250 H285 M210 272 H270 M222 294 H258" stroke="#A8C628" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'festival':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="#121418" />
          <path d="M40 55 Q140 95 240 55 Q340 95 440 55" stroke="#A8C628" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
          <path d="M180 215 Q240 265 300 215 Z" fill="#272B33" stroke="#A8C628" strokeWidth="1.5" />
          <path d="M240 145 C258 172 258 198 240 212 C222 198 222 172 240 145 Z" fill="#F59E0B" />
          <circle cx="120" cy="135" r="3.5" fill="#FDE68A" />
          <circle cx="360" cy="125" r="3.5" fill="#FDE68A" />
          <circle cx="240" cy="95" r="4.5" fill="#FDE68A" />
        </svg>
      );

    case 'river':
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="#16191F" />
          <path d="M0 175 Q140 145 280 175 T480 165 V340 H0 Z" fill="#21262E" />
          <path d="M260 170 C310 210 190 255 290 340 H155 C75 265 205 215 175 170 Z" fill="#38414E" />
          <circle cx="130" cy="110" r="32" fill="#A8C628" fillOpacity="0.16" />
        </svg>
      );

    case 'hero':
    case 'chaupal':
    case 'community':
    default:
      return (
        <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="480" height="340" fill="#171A20" />
          <ellipse cx="240" cy="120" rx="115" ry="62" fill="#262B34" stroke="#52525B" strokeWidth="1.2" />
          <ellipse cx="185" cy="135" rx="75" ry="44" fill="#2F3540" />
          <rect x="226" y="170" width="28" height="80" fill="#3F3F46" />
          <rect x="135" y="245" width="210" height="24" rx="4" fill="#27272A" stroke="#71717A" strokeWidth="1.5" />
          <path d="M70 269 H410" stroke="#52525B" strokeWidth="1.5" />
        </svg>
      );
  }
};
