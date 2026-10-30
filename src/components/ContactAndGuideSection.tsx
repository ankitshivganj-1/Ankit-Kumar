import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  Send,
  Share2,
} from 'lucide-react';
import { Language, VILLAGE_CONFIG } from '../data/villageConfig';
import { ContactFormInput, validateContactForm } from '../utils/villageLogic';

interface ContactAndGuideSectionProps {
  lang: Language;
}

interface SubmittedMessage extends ContactFormInput {
  id: string;
  submittedAt: string;
}

export const ContactAndGuideSection: React.FC<ContactAndGuideSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [submittedList, setSubmittedList] = useState<SubmittedMessage[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const newEntry: SubmittedMessage = {
      ...formData,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSubmittedList((prev) => [newEntry, ...prev]);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: 'general',
      message: '',
    });
  };

  const { officialEmail, officeAddressHi, officeAddressEn, socialLinks } =
    VILLAGE_CONFIG.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 lg:py-24 border-b border-white/10 dark-grey-alt"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#A8C628] mb-2">
            {lang === 'hi' ? 'अनुभाग 14 · संपर्क और ग्राम समुदाय' : 'SECTION 14 · CONTACT & COMMUNITY'}
          </p>
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-white tracking-tight"
          >
            {lang === 'hi' ? 'संपर्क करें और गाँव से जुड़ें (Contact Us)' : 'Contact Shivganj & Community Portal'}
          </h2>
          <p className="mt-3 text-base text-zinc-300 leading-relaxed">
            {lang === 'hi'
              ? 'गाँव की जानकारी अपडेट करने, प्रमाणित इतिहास भेजने, अपनी ग्राम तस्वीरें साझा करने या किसी सुझाव के लिए नीचे दिए गए फ़ॉर्म का उपयोग करें।'
              : 'Use the form below to submit village updates, share verified local history, contribute photographs, or connect with the Shivganj community.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 Columns: Validated Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-editorial font-semibold text-white mb-5">
              {lang === 'hi' ? 'ग्राम सूचना एवं सुझाव फ़ॉर्म' : 'Village Information & Feedback Form'}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-200 mb-1">
                    {lang === 'hi' ? 'आपका नाम (Full Name) *' : 'Your Full Name *'}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदाहरण: अंकित कुमार' : 'e.g. Ankit Kumar'}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 bg-black/40 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#A8C628] ${
                      errors.name ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 text-xs text-red-400 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-200 mb-1">
                    {lang === 'hi' ? 'ईमेल पता (Email Address) *' : 'Email Address *'}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 bg-black/40 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#A8C628] ${
                      errors.email ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-xs text-red-400 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-zinc-200 mb-1">
                    {lang === 'hi' ? 'फ़ोन / मोबाइल नंबर (Phone) *' : 'Phone / Mobile Number *'}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 bg-black/40 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#A8C628] ${
                      errors.phone ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs text-red-400 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-category" className="block text-xs font-semibold text-zinc-200 mb-1">
                    {lang === 'hi' ? 'विषय (Topic)' : 'Message Topic'}
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/15 px-3.5 py-2.5 text-sm text-white bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#A8C628]"
                  >
                    <option value="general">
                      {lang === 'hi' ? 'सामान्य ग्राम जानकारी / सुझाव' : 'General Village Inquiry / Suggestion'}
                    </option>
                    <option value="history">
                      {lang === 'hi' ? 'प्रामाणिक इतिहास / बुजुर्गों के संस्मरण' : 'Verified History Contribution'}
                    </option>
                    <option value="photo">
                      {lang === 'hi' ? 'ग्राम गैलरी फोटो योगदान' : 'Village Photo Contribution'}
                    </option>
                    <option value="correction">
                      {lang === 'hi' ? 'डेटा सुधार / अपडेट अनुरोध' : 'Directory Data Correction'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-200 mb-1">
                  {lang === 'hi' ? 'आपका संदेश (Message) *' : 'Your Message *'}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    lang === 'hi'
                      ? 'शिवगंज गाँव से जुड़ा अपना संदेश, सुझाव या जानकारी यहाँ विस्तार से लिखें...'
                      : 'Write your message, village update, or inquiry in detail...'
                  }
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 bg-black/40 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#A8C628] ${
                    errors.message ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs text-red-400 font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-zinc-950 bg-[#A8C628] rounded-full hover:bg-[#f0d9a3] transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'hi' ? 'संदेश भेजें (Submit Message)' : 'Submit Message'}</span>
                </button>
              </div>

              {submitSuccess && (
                <div
                  role="status"
                  className="mt-4 p-4 rounded-xl bg-black/45 border border-[#A8C628]/50 flex items-start gap-3 text-sm text-white"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#A8C628] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#A8C628]">
                      {lang === 'hi'
                        ? 'धन्यवाद! आपका संदेश सफलतापूर्वक दर्ज कर लिया गया है।'
                        : 'Thank you! Your message has been recorded successfully.'}
                    </p>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      {lang === 'hi'
                        ? 'आप नीचे दिए गए सीधे ईमेल बटन से भी ग्राम एडमिन को संदेश भेज सकते हैं।'
                        : 'You can also send a direct email using the button on the right.'}
                    </p>
                  </div>
                </div>
              )}
            </form>

            {/* Recent Session Submissions */}
            {submittedList.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8C628] mb-3">
                  {lang === 'hi' ? 'हाल ही में भेजे गए सामुदायिक संदेश' : 'Recent Community Submissions'}
                </h4>
                <div className="space-y-3">
                  {submittedList.map((msg) => (
                    <div key={msg.id} className="p-3.5 rounded-xl bg-black/35 border border-white/10 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{msg.name}</span>
                        <span className="font-tabular text-zinc-400">{msg.submittedAt}</span>
                      </div>
                      <p className="mt-1 text-zinc-300">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Direct Contact Channels (Email, WhatsApp, Config Notice) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-editorial font-semibold text-white mb-2">
                {lang === 'hi' ? 'प्रत्यक्ष संपर्क माध्यम' : 'Direct Contact Channels'}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {lang === 'hi'
                  ? 'शिवगंज ग्राम समुदाय के आधिकारिक ईमेल और सोशल मीडिया चैनलों (@hamara_shivganj) से सीधे जुड़ें।'
                  : 'Connect directly with the Shivganj village community via official email and verified social media channels (@hamara_shivganj).'}
              </p>

              <div className="space-y-3">
                {/* Email Contact Button */}
                <a
                  href={`mailto:${officialEmail}?subject=${encodeURIComponent('Shivganj Village Portal Inquiry')}`}
                  className="w-full inline-flex items-center justify-between px-4 py-3 text-sm font-semibold text-zinc-950 bg-[#A8C628] rounded-xl hover:bg-[#f0d9a3] transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {lang === 'hi' ? 'ईमेल भेजें:' : 'Email:'} {officialEmail}
                    </span>
                  </span>
                  <span className="text-xs text-zinc-800 ml-2 shrink-0">→</span>
                </a>
              </div>

              {/* Postal Address */}
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="font-semibold text-white mb-1">
                  {lang === 'hi' ? 'ग्राम का डाक पता:' : 'Village Postal Address:'}
                </div>
                <p>{lang === 'hi' ? officeAddressHi : officeAddressEn}</p>
              </div>

              {/* Official Social Media Links with Logos */}
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="font-semibold text-white mb-3 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#A8C628]" aria-hidden="true" />
                  <span>{lang === 'hi' ? 'आधिकारिक सोशल मीडिया लिंक' : 'Official Social Media Links'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram (@hamara_shivganj)"
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/15 hover:border-[#E1306C]/70 hover:bg-black/60 transition-all"
                    >
                      <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-xs truncate">Instagram</div>
                        <div className="text-[11px] text-zinc-400 truncate">@hamara_shivganj</div>
                      </div>
                    </a>
                  )}

                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube (@Hamara_shivganj)"
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/15 hover:border-[#FF0000]/70 hover:bg-black/60 transition-all"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-xs truncate">YouTube</div>
                        <div className="text-[11px] text-zinc-400 truncate">@Hamara_shivganj</div>
                      </div>
                    </a>
                  )}

                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter (X) (@Hamara_shivganj)"
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/15 hover:border-white/50 hover:bg-black/60 transition-all"
                    >
                      <span className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/25 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-xs truncate">Twitter (X)</div>
                        <div className="text-[11px] text-zinc-400 truncate">@Hamara_shivganj</div>
                      </div>
                    </a>
                  )}

                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook (Hamara Shivganj)"
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/15 hover:border-[#1877F2]/70 hover:bg-black/60 transition-all"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-xs truncate">Facebook</div>
                        <div className="text-[11px] text-zinc-400 truncate">Hamara Shivganj</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
