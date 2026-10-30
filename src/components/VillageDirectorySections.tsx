import React, { useState } from 'react';
import {
  AlertCircle,
  Building2,
  Bus,
  GraduationCap,
  HeartPulse,
  Landmark,
  Map,
  ShoppingBag,
  Sparkles,
  Train,
  Trees,
  Waves,
} from 'lucide-react';
import {
  DIRECTORY_ITEMS,
  DISTANCE_TABLE_ROWS,
  FOURTEEN_SECTIONS_METADATA,
  Language,
  NEARBY_PIN_CODES,
  VILLAGE_CONFIG,
} from '../data/villageConfig';

interface VillageDirectorySectionsProps {
  lang: Language;
  activeSectionFilter: string;
  onSelectSectionFilter: (sectionId: string) => void;
}

export const VillageDirectorySections: React.FC<VillageDirectorySectionsProps> = ({
  lang,
  activeSectionFilter,
  onSelectSectionFilter,
}) => {
  const [showAllSections, setShowAllSections] = useState(true);

  const getItemsBySection = (sectionId: string) =>
    DIRECTORY_ITEMS.filter((item) => item.sectionId === sectionId);

  const shouldRenderSection = (sectionId: string) => {
    if (showAllSections || activeSectionFilter === 'all') return true;
    return activeSectionFilter === sectionId;
  };

  return (
    <div id="directory" className="dark-grey-section">
      {/* Complete 14-Section Directory Navigator Bar */}
      <section
        aria-label={lang === 'hi' ? '14 ग्राम जानकारी अनुभाग सूचकांक' : '14 Village Information Sections Index'}
        className="py-14 border-b border-white/10 dark-grey-alt"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-1">
                {lang === 'hi' ? 'संपूर्ण ग्राम निर्देशिका (14 अनुभाग)' : 'COMPLETE 14-SECTION VILLAGE DIRECTORY'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                {lang === 'hi'
                  ? 'शिवगंज ग्राम सूचना कोष (1 से 14 अनुभाग)'
                  : 'Shivganj Village Information Encyclopedia (Sections 01–14)'}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowAllSections(true);
                  onSelectSectionFilter('all');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                  showAllSections || activeSectionFilter === 'all'
                    ? 'bg-[#A8C628] text-zinc-950'
                    : 'glass-pill-btn text-zinc-200'
                }`}
              >
                {lang === 'hi' ? 'सभी 14 अनुभाग एक साथ देखें' : 'Show All 14 Sections'}
              </button>
            </div>
          </div>

          {/* 14 Section Quick Jump & Filter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {FOURTEEN_SECTIONS_METADATA.map((sec) => {
              const isSelected = !showAllSections && activeSectionFilter === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => {
                    setShowAllSections(false);
                    onSelectSectionFilter(sec.id);
                  }}
                  className={`group p-3.5 rounded-xl text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#A8C628] text-zinc-950 shadow-lg'
                      : 'glass-panel text-zinc-200 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isSelected ? 'text-zinc-900' : 'text-[#A8C628]'
                    }`}
                  >
                    {sec.number}
                  </span>
                  <span className="mt-1 text-xs font-semibold leading-snug line-clamp-2">
                    {lang === 'hi' ? sec.titleHi.split(' (')[0] : sec.titleEn}
                  </span>
                </a>
              );
            })}
          </div>

          {!showAllSections && activeSectionFilter !== 'all' && (
            <div className="mt-4 flex items-center justify-between glass-panel rounded-xl px-4 py-2.5 text-xs text-zinc-300">
              <span>
                {lang === 'hi'
                  ? 'केवल चयनित अनुभाग प्रदर्शित है। सभी 14 अनुभाग देखने के लिए दाईं ओर बटन दबाएँ।'
                  : 'Filtering by selected section. Click "View All 14 Sections" to restore full page.'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAllSections(true);
                  onSelectSectionFilter('all');
                }}
                className="font-semibold text-[#A8C628] underline whitespace-nowrap ml-4"
              >
                {lang === 'hi' ? 'सभी 14 अनुभाग दिखाएँ' : 'View All 14 Sections'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 01, 02 & 03: About Shivganj, Village Profile & Geography */}
      {(shouldRenderSection('about') ||
        shouldRenderSection('profile') ||
        shouldRenderSection('geography')) && (
        <section
          id="profile"
          aria-labelledby="profile-heading"
          className="py-16 lg:py-20 border-b border-white/10"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div id="about" className="mb-10">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
                {lang === 'hi'
                  ? 'अनुभाग 01, 02 एवं 03 · परिचय, ग्राम प्रोफ़ाइल और भूगोल'
                  : 'SECTIONS 01, 02 & 03 · ABOUT, VILLAGE PROFILE & GEOGRAPHY'}
              </p>
              <h2
                id="profile-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white"
              >
                {lang === 'hi'
                  ? 'गाँव की मुख्य जानकारी और भौगोलिक प्रोफ़ाइल'
                  : 'Village Profile, Administration & Geographical Identity'}
              </h2>
              <p className="mt-3 text-base text-zinc-300 max-w-3xl leading-relaxed">
                {lang === 'hi'
                  ? 'शिवगंज एक छोटा गाँव/बसावट है, जो भेतुआ ब्लॉक और अमेठी ज़िले के अंतर्गत आता है। यह घाटमपुर ग्राम पंचायत से जुड़ा है और अयोध्या मंडल (Ayodhya Division) में स्थित है।'
                  : 'Shivganj is a serene village/settlement under Bhetua Block and Amethi District. It belongs to Ghatampur Gram Panchayat and is under Ayodhya Division.'}
              </p>
            </div>

            <div id="geography" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 01: Administrative Profile */}
              <article className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#A8C628]">02 · VILLAGE PROFILE</span>
                  <Landmark className="w-4 h-4 text-[#A8C628]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {lang === 'hi' ? 'प्रशासनिक परिचय' : 'Administrative Details'}
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'स्थानीय नाम:' : 'Local Name:'}</dt>
                    <dd className="font-semibold text-white">शिवगंज (Shivganj)</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'ग्राम पंचायत:' : 'Gram Panchayat:'}</dt>
                    <dd className="font-semibold text-white">{VILLAGE_CONFIG.identity.gramPanchayatHi}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'विकास खंड (ब्लॉक):' : 'Block:'}</dt>
                    <dd className="font-semibold text-white">{VILLAGE_CONFIG.identity.blockHi}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'ज़िला:' : 'District:'}</dt>
                    <dd className="font-semibold text-white">{VILLAGE_CONFIG.identity.districtHi}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'मंडल:' : 'Division:'}</dt>
                    <dd className="font-semibold text-white text-right">
                      {VILLAGE_CONFIG.identity.divisionHi}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'राज्य:' : 'State:'}</dt>
                    <dd className="font-semibold text-white">उत्तर प्रदेश (Uttar Pradesh)</dd>
                  </div>
                </dl>
              </article>

              {/* Card 02: Geography & Surrounding Blocks */}
              <article className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#A8C628]">03 · GEOGRAPHY</span>
                  <Map className="w-4 h-4 text-[#A8C628]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {lang === 'hi' ? 'भौगोलिक स्थिति व आसपास के ब्लॉक' : 'Geography & Surrounding Blocks'}
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'समुद्र तल से ऊँचाई:' : 'Elevation:'}</dt>
                    <dd className="font-tabular font-semibold text-white">106 meters</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{lang === 'hi' ? 'STD टेलीफ़ोन कोड:' : 'STD Code:'}</dt>
                    <dd className="font-tabular font-semibold text-white">05368</dd>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <dt className="text-zinc-400 text-xs uppercase tracking-wider mb-1">
                      {lang === 'hi' ? 'आसपास के ब्लॉक:' : 'Surrounding Blocks:'}
                    </dt>
                    <dd className="font-medium text-zinc-200">
                      {lang === 'hi'
                        ? 'शाहगढ़ (Shahgarh) · अमेठी (Amethi) · गौरीगंज (Gauriganj) · कुड़वार (Kurwar)'
                        : 'Shahgarh · Amethi · Gauriganj · Kurwar'}
                    </dd>
                  </div>
                </dl>
              </article>

              {/* Card 03: Language, Culture & Source Transparency */}
              <article className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#A8C628]">LANGUAGE & CULTURE</span>
                  <AlertCircle className="w-4 h-4 text-[#A8C628]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {lang === 'hi' ? 'भाषा और सांस्कृतिक विवरण' : 'Languages & Cultural Note'}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {lang === 'hi'
                    ? 'शिवगंज में स्थानीय भाषा के रूप में अवधी (Awadhi) बोली जाती है। साथ ही शिक्षा व दैनिक संवाद में अवधी, हिंदी और उर्दू भी प्रचलित हैं।'
                    : 'Awadhi is spoken as the primary local language in Shivganj, alongside Hindi and Urdu in regional education and daily conversation.'}
                </p>
                <div className="bg-black/35 border border-white/10 rounded-xl p-3 text-xs text-zinc-300">
                  <strong className="text-[#A8C628] block mb-0.5">
                    {lang === 'hi' ? 'डेटा पारदर्शिता नोट:' : 'Data Transparency Note:'}
                  </strong>
                  {lang === 'hi'
                    ? 'यह वेबसाइट शिवगंज के प्रमाणित ग्राम विवरण पर आधारित है। बदलने वाली प्रशासनिक या परिवहन जानकारी को वर्तमान सरकारी रिकॉर्ड से अवश्य जाँचें।'
                    : 'Compiled from verified Shivganj village records. Verify mutable administrative or transit schedules with current official records.'}
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 04: Nearby Rivers (Gomti & Sai) */}
      {shouldRenderSection('rivers') && (
        <section
          id="rivers"
          aria-labelledby="rivers-heading"
          className="py-16 border-b border-white/10 dark-grey-alt"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
                  {lang === 'hi' ? 'अनुभाग 04 · जलस्रोत और नदियाँ' : 'SECTION 04 · NEARBY RIVERS'}
                </p>
                <h2
                  id="rivers-heading"
                  className="text-2xl sm:text-3xl font-editorial font-semibold text-white"
                >
                  {lang === 'hi'
                    ? 'गोमती (Gomti) और सई (Sai) नदियाँ'
                    : 'Nearby Rivers: Gomti & Sai River Basin'}
                </h2>
              </div>
              <Waves className="w-8 h-8 text-[#A8C628] shrink-0" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getItemsBySection('rivers').map((river) => (
                <article
                  key={river.id}
                  className="glass-panel-strong rounded-2xl p-6"
                >
                  <div className="text-xs font-mono text-[#A8C628] mb-1">
                    {lang === 'hi' ? river.categoryHi : river.categoryEn}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {lang === 'hi' ? river.nameHi : river.nameEn}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {lang === 'hi' ? river.detailHi : river.detailEn}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 05: How to Reach Shivganj (Rail & Bus Stops) */}
      {shouldRenderSection('reach') && (
        <section
          id="reach"
          aria-labelledby="reach-heading"
          className="py-16 lg:py-20 border-b border-white/10 dark-grey-section"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
                {lang === 'hi' ? 'अनुभाग 05 · यातायात और मार्गदर्शिका' : 'SECTION 05 · GETTING HERE & TRANSIT'}
              </p>
              <h2
                id="reach-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white"
              >
                {lang === 'hi' ? 'शिवगंज कैसे पहुँचें? (How to Reach Shivganj)' : 'How to Reach Shivganj (Rail & Road)'}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                {lang === 'hi'
                  ? 'नोट: दूरियाँ अनुमानित (Approximate) हैं। यात्रा से पूर्व मार्ग और बस/ट्रेन उपलब्धता की पुष्टि कर लें।'
                  : 'Note: Distances are approximate. Please verify active bus/train schedules before travelling.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Railway Stations (Left 5 cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-4">
                  <Train className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'hi' ? 'रेल मार्ग (Railway Stations)' : 'By Rail (Nearest Railway Stations)'}</span>
                </div>
                <div className="space-y-4">
                  {getItemsBySection('reach')
                    .filter((i) => i.id.startsWith('rail-'))
                    .map((station) => (
                      <div
                        key={station.id}
                        className="bg-black/35 border border-white/10 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-white">
                            {lang === 'hi' ? station.nameHi : station.nameEn}
                          </h3>
                          <span className="font-tabular text-xs font-semibold text-[#A8C628] shrink-0">
                            {station.distanceOrCode}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-zinc-300">
                          {lang === 'hi' ? station.detailHi : station.detailEn}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Bus Stops (Right 7 cols) */}
              <div className="lg:col-span-7 glass-panel rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-4">
                  <Bus className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'hi' ? 'सड़क मार्ग और बस स्टॉप (Bus Stops)' : 'By Road (Nearby Bus Stops)'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getItemsBySection('reach')
                    .filter((i) => i.id.startsWith('bus-'))
                    .map((bus, idx) => (
                      <div
                        key={bus.id}
                        className="bg-black/35 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-1">
                            <span>0{idx + 1} · BUS STOP</span>
                            <span className="font-semibold text-[#A8C628]">{bus.distanceOrCode}</span>
                          </div>
                          <h3 className="font-semibold text-white text-sm">
                            {lang === 'hi' ? bus.nameHi : bus.nameEn}
                          </h3>
                        </div>
                        <p className="mt-2 text-xs text-zinc-300">
                          {lang === 'hi' ? bus.detailHi : bus.detailEn}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTIONS 06, 07, 08, 09, 10, 11: Schools, Hospitals, Temples, Banks, Markets, Parks */}
      {(shouldRenderSection('schools') ||
        shouldRenderSection('hospitals') ||
        shouldRenderSection('temples') ||
        shouldRenderSection('banks') ||
        shouldRenderSection('markets') ||
        shouldRenderSection('parks')) && (
        <section
          id="facilities"
          aria-labelledby="facilities-heading"
          className="py-16 lg:py-24 border-b border-white/10 dark-grey-alt"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
                {lang === 'hi'
                  ? 'अनुभाग 06 से 11 · शिक्षा, स्वास्थ्य, मंदिर, बैंक, बाज़ार और पार्क'
                  : 'SECTIONS 06 TO 11 · LOCAL INSTITUTIONS & COMMUNITY AMENITIES'}
              </p>
              <h2
                id="facilities-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white"
              >
                {lang === 'hi'
                  ? 'शिक्षा, स्वास्थ्य, धार्मिक स्थल और दैनिक सुविधाएँ'
                  : 'Schools, Healthcare, Temples, Banks, Markets & Parks'}
              </h2>
            </div>

            {/* 06. Schools & Colleges */}
            {shouldRenderSection('schools') && (
              <div id="schools" className="scroll-mt-24">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-white/10">
                  <GraduationCap className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                  <h3 className="text-xl font-editorial font-semibold text-white">
                    06. {lang === 'hi' ? 'स्कूल और कॉलेज (Schools & Colleges)' : 'Schools & Colleges'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getItemsBySection('schools').map((school) => (
                    <article key={school.id} className="glass-panel rounded-2xl p-5">
                      <div className="text-xs text-zinc-400 mb-1">
                        {lang === 'hi' ? school.categoryHi : school.categoryEn}
                      </div>
                      <h4 className="font-semibold text-white text-base">
                        {lang === 'hi' ? school.nameHi : school.nameEn}
                      </h4>
                      <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                        {lang === 'hi' ? school.detailHi : school.detailEn}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 07. Hospitals & Healthcare */}
            {shouldRenderSection('hospitals') && (
              <div id="hospitals" className="scroll-mt-24">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-white/10">
                  <HeartPulse className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                  <h3 className="text-xl font-editorial font-semibold text-white">
                    07. {lang === 'hi' ? 'अस्पताल और स्वास्थ्य सेवाएँ (Hospitals & Healthcare)' : 'Hospitals & Healthcare'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getItemsBySection('hospitals').map((hosp) => (
                    <article
                      key={hosp.id}
                      className="glass-panel rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs text-zinc-400 mb-1">
                          {lang === 'hi' ? hosp.categoryHi : hosp.categoryEn}
                        </div>
                        <h4 className="font-semibold text-white text-base">
                          {lang === 'hi' ? hosp.nameHi : hosp.nameEn}
                        </h4>
                        <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                          {lang === 'hi' ? hosp.detailHi : hosp.detailEn}
                        </p>
                      </div>

                      {(hosp.addressHi || hosp.helplinePhone || hosp.mapUrl) && (
                        <div className="mt-3.5 pt-3 border-t border-white/15 space-y-2 text-xs">
                          {(hosp.addressHi || hosp.addressEn) && (
                            <div className="text-zinc-200 leading-snug">
                              <span className="font-semibold text-[#A8C628] block mb-0.5">
                                📍 {lang === 'hi' ? 'पता (Address):' : 'Address (Location):'}
                              </span>
                              <span>{lang === 'hi' ? hosp.addressHi : hosp.addressEn}</span>
                            </div>
                          )}

                          {hosp.helplinePhone && (
                            <div className="text-zinc-200">
                              <span className="font-semibold text-[#A8C628]">
                                📞{' '}
                                {lang === 'hi'
                                  ? hosp.helplineLabelHi || 'हेल्पलाइन नंबर'
                                  : hosp.helplineLabelEn || 'Helpline Number'}
                                :{' '}
                              </span>
                              <a
                                href={`tel:${hosp.helplinePhone.replace(/\s+/g, '')}`}
                                className="font-tabular font-semibold text-white underline hover:text-[#A8C628]"
                              >
                                {hosp.helplinePhone}
                              </a>
                            </div>
                          )}

                          {hosp.mapUrl && (
                            <div className="pt-1">
                              <a
                                href={hosp.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white olive-cta-btn"
                              >
                                <span>
                                  {lang === 'hi'
                                    ? 'सटीक दिशा-निर्देश (Google Maps लिंक) →'
                                    : 'Get Exact Directions on Google Maps →'}
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 08. Temples & Religious Places */}
            {shouldRenderSection('temples') && (
              <div id="temples" className="scroll-mt-24">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-white/10">
                  <Sparkles className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                  <h3 className="text-xl font-editorial font-semibold text-white">
                    08. {lang === 'hi' ? 'मंदिर और धार्मिक स्थल (Temples & Religious Places)' : 'Temples & Religious Places'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getItemsBySection('temples').map((temple) => (
                    <article key={temple.id} className="glass-panel rounded-2xl p-5">
                      <div className="text-xs text-[#A8C628] font-medium mb-1">
                        {lang === 'hi' ? temple.categoryHi : temple.categoryEn}
                      </div>
                      <h4 className="font-semibold text-white text-base">
                        {lang === 'hi' ? temple.nameHi : temple.nameEn}
                      </h4>
                      <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                        {lang === 'hi' ? temple.detailHi : temple.detailEn}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 09, 10, 11: Banks & ATMs, Markets, Parks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 09. Banks & ATMs */}
              {shouldRenderSection('banks') && (
                <div id="banks" className="scroll-mt-24 glass-panel rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                    <Building2 className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                    <h3 className="text-lg font-editorial font-semibold text-white">
                      09. {lang === 'hi' ? 'बैंक और ATM' : 'Banks & ATMs'}
                    </h3>
                  </div>
                  <div className="space-y-3.5">
                    {getItemsBySection('banks').map((bank) => (
                      <div key={bank.id} className="pb-3 border-b border-white/10 last:border-0 last:pb-0">
                        <div className="font-semibold text-sm text-white">
                          {lang === 'hi' ? bank.nameHi : bank.nameEn}
                        </div>
                        <p className="text-xs text-zinc-300 mt-0.5">
                          {lang === 'hi' ? bank.detailHi : bank.detailEn}
                        </p>
                        {bank.sourceStatus === 'pdf-check-current' && (
                          <p className="text-[11px] font-medium text-[#A8C628] mt-1">
                            ⚠ {lang === 'hi' ? bank.statusNoteHi : bank.statusNoteEn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. Nearby Markets */}
              {shouldRenderSection('markets') && (
                <div id="markets" className="scroll-mt-24 glass-panel rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                    <ShoppingBag className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                    <h3 className="text-lg font-editorial font-semibold text-white">
                      10. {lang === 'hi' ? 'आसपास के बाज़ार' : 'Nearby Markets'}
                    </h3>
                  </div>
                  <div className="space-y-3.5">
                    {getItemsBySection('markets').map((mkt) => (
                      <div key={mkt.id} className="pb-3 border-b border-white/10 last:border-0 last:pb-0">
                        <div className="font-semibold text-sm text-white">
                          {lang === 'hi' ? mkt.nameHi : mkt.nameEn}
                        </div>
                        <p className="text-xs text-zinc-300 mt-0.5">
                          {lang === 'hi' ? mkt.detailHi : mkt.detailEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Parks & Natural Places */}
              {shouldRenderSection('parks') && (
                <div id="parks" className="scroll-mt-24 glass-panel rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                    <Trees className="w-5 h-5 text-[#A8C628]" aria-hidden="true" />
                    <h3 className="text-lg font-editorial font-semibold text-white">
                      11. {lang === 'hi' ? 'पार्क और खुले स्थान' : 'Parks & Natural Places'}
                    </h3>
                  </div>
                  <div className="space-y-3.5">
                    {getItemsBySection('parks').map((park) => (
                      <div key={park.id} className="pb-3 border-b border-white/10 last:border-0 last:pb-0">
                        <div className="font-semibold text-sm text-white">
                          {lang === 'hi' ? park.nameHi : park.nameEn}
                        </div>
                        <p className="text-xs text-zinc-300 mt-0.5">
                          {lang === 'hi' ? park.detailHi : park.detailEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12: Nearby Cities, Districts, PIN Codes & Distance Table */}
      {shouldRenderSection('nearby') && (
        <section
          id="nearby"
          aria-labelledby="nearby-heading"
          className="py-16 lg:py-20 border-b border-white/10 dark-grey-section"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
                {lang === 'hi'
                  ? 'अनुभाग 12 · आसपास के शहर, ज़िले, पिन कोड और दूरी तालिका'
                  : 'SECTION 12 · NEARBY CITIES, DISTRICTS, PIN CODES & DISTANCE TABLE'}
              </p>
              <h2
                id="nearby-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white"
              >
                {lang === 'hi' ? 'आसपास के स्थान और दूरी विवरण' : 'Surrounding Cities, Districts & Distances'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <article className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono uppercase text-[#A8C628] mb-1">NEARBY CITIES</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {lang === 'hi' ? 'शहर और कस्बे' : 'Cities & Towns'}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {lang === 'hi'
                    ? 'सुल्तानपुर · जायस · रायबरेली · रुदौली · अमेठी · गौरीगंज'
                    : 'Sultanpur · Jais · Raebareli · Rudauli · Amethi · Gauriganj'}
                </p>
              </article>

              <article className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono uppercase text-[#A8C628] mb-1">NEARBY DISTRICTS</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {lang === 'hi' ? 'समीपस्थ ज़िले' : 'Neighboring Districts'}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {lang === 'hi'
                    ? 'सुल्तानपुर · प्रतापगढ़ · रायबरेली · फैज़ाबाद (अयोध्या)'
                    : 'Sultanpur · Pratapgarh · Raebareli · Faizabad (Ayodhya)'}
                </p>
              </article>

              <article className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-mono uppercase text-[#A8C628] mb-1">POSTAL DETAILS</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {lang === 'hi' ? 'आसपास के PIN Code' : 'Nearby Postal PIN Codes'}
                </h3>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  {NEARBY_PIN_CODES.map((p) => (
                    <li key={p.pin} className="flex justify-between">
                      <span className="font-tabular font-semibold text-[#A8C628]">{p.pin}</span>
                      <span>{lang === 'hi' ? p.areaHi : p.areaEn}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Distance Table */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-semibold text-white text-base">
                  {lang === 'hi'
                    ? 'प्रमुख नगरों की अनुमानित दूरी तालिका (Approximate Distance Table)'
                    : 'Distance Reference Table (Approximate)'}
                </h3>
                <span className="text-xs text-zinc-400">
                  {lang === 'hi'
                    ? '* सुल्तानपुर की दूरी विभिन्न मार्गों से लगभग 25 KM से 27 KM है'
                    : '* Sultanpur distance is approximately 25 KM to 27 KM depending on route'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase text-zinc-400 bg-black/25">
                      <th className="py-3.5 px-6 font-semibold">
                        {lang === 'hi' ? 'स्थान / नगर' : 'Location / Town'}
                      </th>
                      <th className="py-3.5 px-6 font-semibold">
                        {lang === 'hi' ? 'लगभग दूरी' : 'Approx. Distance'}
                      </th>
                      <th className="py-3.5 px-6 font-semibold">
                        {lang === 'hi' ? 'विवरण और संदर्भ' : 'Reference Context'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {DISTANCE_TABLE_ROWS.map((row) => (
                      <tr key={row.placeEn} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-white">
                          {lang === 'hi' ? row.placeHi : row.placeEn}
                        </td>
                        <td className="py-3.5 px-6 font-tabular font-semibold text-[#A8C628]">
                          {lang === 'hi' ? row.distanceHi : row.distanceEn}
                        </td>
                        <td className="py-3.5 px-6 text-zinc-300">
                          {lang === 'hi' ? row.noteHi : row.noteEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
