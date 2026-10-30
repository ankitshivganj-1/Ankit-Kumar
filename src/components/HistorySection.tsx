import React, { useState } from 'react';
import { BookOpen, Edit3, Check, RotateCcw } from 'lucide-react';
import { Language } from '../data/villageConfig';

interface HistorySectionProps {
  lang: Language;
}

const DEFAULT_HISTORY_NOTE_HI =
  'स्थानीय इतिहास की जानकारी जल्द जोड़ी जाएगी। (यदि आपके पास घाटमपुर ग्राम पंचायत या शिवगंज के बुजुर्गों द्वारा साझा की गई प्रमाणित ऐतिहासिक जानकारी, स्वतंत्रता संग्राम से जुड़े प्रसंग या वंशावली/दस्तावेज़ हैं, तो आप यहाँ लिखकर सुरक्षित कर सकते हैं।)';

const DEFAULT_HISTORY_NOTE_EN =
  'स्थानीय इतिहास की जानकारी जल्द जोड़ी जाएगी — Verified local historical milestones will be added soon. (We do not invent historical dates, founders, or legends. Villagers and elders can record verified historical notes here.)';

export const HistorySection: React.FC<HistorySectionProps> = ({ lang }) => {
  const [customHistoryNote, setCustomHistoryNote] = useState<string>(() => {
    try {
      return localStorage.getItem('shivganj_verified_history_note') || '';
    } catch {
      return '';
    }
  });
  const [isEditingHistory, setIsEditingHistory] = useState(false);
  const [draftNote, setDraftNote] = useState(customHistoryNote);
  const [savedToast, setSavedToast] = useState(false);

  const handleSaveHistory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftNote.trim();
    setCustomHistoryNote(cleaned);
    try {
      if (cleaned) {
        localStorage.setItem('shivganj_verified_history_note', cleaned);
      } else {
        localStorage.removeItem('shivganj_verified_history_note');
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
    setIsEditingHistory(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleResetHistory = () => {
    setDraftNote('');
    setCustomHistoryNote('');
    try {
      localStorage.removeItem('shivganj_verified_history_note');
    } catch {
      // Ignore
    }
    setIsEditingHistory(false);
  };

  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="py-16 lg:py-24 border-b border-white/10 dark-grey-section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Kicker & Title */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
            {lang === 'hi' ? 'अध्याय 01 · हमारी विरासत और जड़ें' : 'CHAPTER 01 · HERITAGE & ROOTS'}
          </p>
          <h2
            id="history-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white tracking-tight"
          >
            इतिहास और हमारी पहचान – History of Shivganj
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            {lang === 'hi'
              ? 'उत्तर प्रदेश के अमेठी ज़िले के भेतुआ विकास खंड और घाटमपुर ग्राम पंचायत में स्थित शिवगंज अपनी अवधी संस्कृति, कृषि परंपरा, गोमती व सई नदियों की समीपता और सामुदायिक एकता के लिए जाना जाता है।'
              : 'Situated within Ghatampur Gram Panchayat of Bhetua Block in Amethi District, Uttar Pradesh, Shivganj embodies Awadhi cultural warmth, agrarian resilience, proximity to the Gomti and Sai rivers, and enduring community harmony.'}
          </p>
        </div>

        {/* Asymmetric Editorial Grid (70% Narrative Columns / 30% Archival Chronicle Box) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 8 Columns: Structured Thematic Chapters */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Introduction & Geographical Identity */}
            <article className="glass-panel rounded-2xl p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                01 · {lang === 'hi' ? 'भौगोलिक और प्रशासनिक पहचान' : 'Geographical Identity'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {lang === 'hi' ? 'शिवगंज और घाटमपुर ग्राम पंचायत' : 'Shivganj & Ghatampur Panchayat'}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lang === 'hi'
                  ? 'शिवगंज अमेठी ज़िले के भेतुआ ब्लॉक (दूरी लगभग 3 KM) में स्थित एक शांत बसावट है। यह घाटमपुर ग्राम पंचायत से जुड़ा है, समुद्र तल से इसकी ऊँचाई 106 मीटर है और इसका STD कोड 05368 है।'
                  : 'Shivganj is a serene settlement in Bhetua Block (~3 KM distance) of Amethi District. Linked with Ghatampur Gram Panchayat at an elevation of 106 meters above sea level, its regional STD code is 05368.'}
              </p>
            </article>

            {/* Card 2: Awadhi Language & Lifestyle */}
            <article className="glass-panel rounded-2xl p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                02 · {lang === 'hi' ? 'अवधी भाषा और जीवनशैली' : 'Awadhi Language & Lifestyle'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {lang === 'hi' ? 'मधुर अवधी बोली और चौपाल संस्कृति' : 'Sweetness of Awadhi & Rural Ethos'}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lang === 'hi'
                  ? 'शिवगंज के लोगों की मुख्य मातृभाषा अवधी (Awadhi) है, जबकि शिक्षा व संवाद में हिंदी और उर्दू का भी प्रयोग होता है। बड़ों का आदर, शाम की चौपाल और अतिथि सत्कार यहाँ की पहचान है।'
                  : 'Awadhi is the primary mother tongue of Shivganj residents, alongside Hindi and Urdu. Respect for elders, evening chaupal conversations, and warm hospitality define daily village life.'}
              </p>
            </article>

            {/* Card 3: Agriculture & Rivers (Gomti & Sai) */}
            <article className="glass-panel rounded-2xl p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                03 · {lang === 'hi' ? 'कृषि जीवन और नदियाँ' : 'Agriculture & Local Rivers'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {lang === 'hi' ? 'गोमती और सई नदियों का आशीर्वाद' : 'Gomti & Sai River Basin Farming'}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lang === 'hi'
                  ? 'शिवगंज के समीप गोमती (Gomti) और सई (Sai) नदियाँ प्रवाहित होती हैं। इस दोआब क्षेत्र की उपजाऊ जलोढ़ मिट्टी में गेहूँ, धान, सरसों, दलहन और आम के बागों की समृद्ध खेती होती है।'
                  : 'The Gomti and Sai rivers flow near Shivganj. Their fertile alluvial basin supports thriving cultivation of wheat, paddy, mustard, pulses, and traditional mango orchards.'}
              </p>
            </article>

            {/* Card 4: Community, Festivals & Traditions */}
            <article className="glass-panel rounded-2xl p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                04 · {lang === 'hi' ? 'समुदाय, पर्व और परंपराएँ' : 'Community, Festivals & Traditions'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {lang === 'hi' ? 'सांस्कृतिक समरसता और लोक-उत्सव' : 'Shared Festivals & Sacred Heritage'}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lang === 'hi'
                  ? 'माँ काली मंदिर, शारदान मंदिर, प्राचीन शिव मंदिर मकूनपुर और भोला शंकर मंदिर बादरायपुर आस्था के केंद्र हैं। होली के फाग, दीपावली, महाशिवरात्रि, रामनवमी और फसलों के पर्व पूरे गाँव को एक सूत्र में पिरोते हैं।'
                  : 'Centered around revered shrines like Maa Kali Mandir, Shardan Mandir, Prachin Shiv Mandir Makunpur, and Bhola Shankar Mandir Badraypur, villagers celebrate Holi, Diwali, Mahashivratri, and harvest festivals in unity.'}
              </p>
            </article>
          </div>

          {/* Right 4 Columns: Editable Verified Historical Archive Box */}
          <aside className="lg:col-span-4 glass-panel-strong rounded-2xl p-6">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8C628]">
                <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{lang === 'hi' ? 'प्रामाणिक इतिहास अभिलेख' : 'Verified History Archive'}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDraftNote(customHistoryNote);
                  setIsEditingHistory((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-100 glass-pill-btn rounded-full whitespace-nowrap shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEditingHistory ? (lang === 'hi' ? 'बंद करें' : 'Cancel') : lang === 'hi' ? 'इतिहास जोड़ें/संपादित करें' : 'Edit History'}</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-medium text-[#A8C628] mb-2">
                {lang === 'hi'
                  ? 'सत्यनिष्ठा नीति: बिना प्रमाण के काल्पनिक तिथियाँ या कथाएँ नहीं जोड़ी गई हैं।'
                  : 'Editorial Integrity: No unverified dates, founders, or legends have been invented.'}
              </div>

              {!isEditingHistory ? (
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-zinc-200 leading-relaxed">
                  {customHistoryNote ? (
                    <>
                      <p className="font-medium text-[#A8C628] mb-1">
                        {lang === 'hi' ? 'ग्रामीण इतिहास नोट:' : 'Recorded Village History Note:'}
                      </p>
                      <p className="whitespace-pre-line">{customHistoryNote}</p>
                    </>
                  ) : (
                    <p className="italic text-zinc-300">
                      {lang === 'hi' ? DEFAULT_HISTORY_NOTE_HI : DEFAULT_HISTORY_NOTE_EN}
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSaveHistory} className="space-y-3">
                  <label htmlFor="history-note-input" className="block text-xs font-medium text-zinc-200">
                    {lang === 'hi'
                      ? 'शिवगंज का प्रमाणित स्थानीय इतिहास लिखें:'
                      : 'Enter verified historical details of Shivganj:'}
                  </label>
                  <textarea
                    id="history-note-input"
                    rows={4}
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    placeholder={
                      lang === 'hi'
                        ? 'उदाहरण: बुजुर्गों के अनुसार हमारे गाँव में कुआँ, चौपाल या विद्यालय की स्थापना का प्रमाणित विवरण...'
                        : 'Example: Verified community chronicle shared by village elders...'
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#A8C628]"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-zinc-950 bg-[#A8C628] rounded-full hover:bg-[#f0d9a3] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{lang === 'hi' ? 'इतिहास सुरक्षित करें' : 'Save History Note'}</span>
                    </button>
                    {customHistoryNote && (
                      <button
                        type="button"
                        onClick={handleResetHistory}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{lang === 'hi' ? 'डिफ़ॉल्ट पर रीसेट' : 'Reset'}</span>
                      </button>
                    )}
                  </div>
                </form>
              )}

              {savedToast && (
                <p role="status" className="mt-2 text-xs font-medium text-[#A8C628]">
                  {lang === 'hi'
                    ? '✓ स्थानीय इतिहास विवरण सुरक्षित कर लिया गया है।'
                    : '✓ Local history note saved successfully.'}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
