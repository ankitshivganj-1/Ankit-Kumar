export type Language = 'hi' | 'en';

export type GalleryCategoryId =
  | 'all'
  | 'photography'
  | 'streets'
  | 'agriculture'
  | 'nature'
  | 'temples'
  | 'festivals'
  | 'events'
  | 'people';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategoryId, 'all'>;
  titleHi: string;
  titleEn: string;
  captionHi: string;
  captionEn: string;
  locationTagHi: string;
  locationTagEn: string;
  dateLabel: string;
  imageUrl?: string; // Populated when user uploads actual village photos or adds to /assets/gallery/
  svgTheme: 'fields' | 'streets' | 'temple' | 'river' | 'festival' | 'chaupal' | 'sunrise' | 'community';
  isActualPhoto: boolean;
}

export interface DirectoryItem {
  id: string;
  sectionId: string;
  sectionNumber: string;
  categoryHi: string;
  categoryEn: string;
  nameHi: string;
  nameEn: string;
  detailHi: string;
  detailEn: string;
  distanceOrCode?: string;
  addressHi?: string;
  addressEn?: string;
  helplineLabelHi?: string;
  helplineLabelEn?: string;
  helplinePhone?: string;
  mapUrl?: string;
  sourceStatus: 'pdf-verified' | 'pdf-approximate' | 'pdf-check-current';
  statusNoteHi?: string;
  statusNoteEn?: string;
}

export interface AnnouncementItem {
  id: string;
  dateHi: string;
  dateEn: string;
  categoryHi: string;
  categoryEn: string;
  titleHi: string;
  titleEn: string;
  summaryHi: string;
  summaryEn: string;
  isImportant?: boolean;
}

export interface VillageConfig {
  identity: {
    nameHi: string;
    nameEn: string;
    taglineHi: string;
    taglineEn: string;
    gramPanchayatHi: string;
    gramPanchayatEn: string;
    blockHi: string;
    blockEn: string;
    districtHi: string;
    districtEn: string;
    divisionHi: string;
    divisionEn: string;
    stateHi: string;
    stateEn: string;
    countryHi: string;
    countryEn: string;
    elevationMeters: number;
    stdCode: string;
    languagesHi: string[];
    languagesEn: string[];
    pdfReferenceDateHi: string;
    pdfReferenceDateEn: string;
  };
  location: {
    // Verified Plus Code & coordinates: 6VF2+VH Ankit, Purab Dwara, Uttar Pradesh 227412 (Open Location Code 7RM36VF2+VH)
    lat: number;
    lng: number;
    zoom: number;
    plusCode: string;
    placeQuery: string;
    addressLineHi: string;
    addressLineEn: string;
    verificationNoteHi: string;
    verificationNoteEn: string;
  };
  contact: {
    // Editable configuration — No fake phone numbers or invented social media accounts
    officialEmail: string;
    whatsappNumber: string; // Leave empty string until village admin adds an official WhatsApp number (e.g. "9198XXXXXXXX")
    phoneDisplay: string; // Leave empty string until configured
    officeAddressHi: string;
    officeAddressEn: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      youtube: string;
      twitter: string;
    };
  };
}

export const VILLAGE_CONFIG: VillageConfig = {
  identity: {
    nameHi: 'शिवगंज',
    nameEn: 'Shivganj',
    taglineHi: 'हमारा गाँव, हमारी पहचान — संस्कृति, शांति, एकता और प्राकृतिक सुंदरता',
    taglineEn: 'Our Village, Our Identity — A Village of Culture, Peace, Unity and Natural Beauty',
    gramPanchayatHi: 'घाटमपुर (Ghatampur)',
    gramPanchayatEn: 'Ghatampur',
    blockHi: 'भेतुआ (Bhetua)',
    blockEn: 'Bhetua',
    districtHi: 'अमेठी (Amethi)',
    districtEn: 'Amethi',
    divisionHi: 'अयोध्या मंडल (Ayodhya Division)',
    divisionEn: 'Ayodhya Division',
    stateHi: 'उत्तर प्रदेश',
    stateEn: 'Uttar Pradesh',
    countryHi: 'भारत',
    countryEn: 'India',
    elevationMeters: 106,
    stdCode: '05368',
    languagesHi: ['अवधी (स्थानीय बोली)', 'हिंदी', 'उर्दू'],
    languagesEn: ['Awadhi (Local Mother Tongue)', 'Hindi', 'Urdu'],
    pdfReferenceDateHi: 'शिवगंज ग्राम अभिलेख',
    pdfReferenceDateEn: 'Shivganj Village Archive',
  },
  location: {
    lat: 26.2247,
    lng: 81.8514,
    zoom: 16,
    plusCode: '6VF2+VH',
    placeQuery: '6VF2+VH Ankit, Purab Dwara, Uttar Pradesh 227412',
    addressLineHi:
      '6VF2+VH Ankit, पूरब द्वारा (Purab Dwara), शिवगंज, भेतुआ ब्लॉक, अमेठी, उत्तर प्रदेश 227412, भारत',
    addressLineEn:
      '6VF2+VH Ankit, Purab Dwara, Shivganj, Bhetua Block, Amethi District, Uttar Pradesh 227412, India',
    verificationNoteHi:
      'सत्यापित Google Map Plus Code स्थान: 6VF2+VH Ankit, Purab Dwara, Uttar Pradesh 227412 (26.2247° N, 81.8514° E · भेतुआ ब्लॉक, अमेठी)।',
    verificationNoteEn:
      'Verified Google Map Plus Code Location: 6VF2+VH Ankit, Purab Dwara, Uttar Pradesh 227412 (26.2247° N, 81.8514° E · Bhetua Block, Amethi).',
  },
  contact: {
    officialEmail: 'shivganjankit@gmail.com',
    whatsappNumber: '', // Editable in src/data/villageConfig.ts — No fake phone number invented
    phoneDisplay: '',
    officeAddressHi:
      '6VF2+VH Ankit, पूरब द्वारा (Purab Dwara), ग्राम शिवगंज, विकास खंड भेतुआ, ज़िला अमेठी, उत्तर प्रदेश 227412',
    officeAddressEn:
      '6VF2+VH Ankit, Purab Dwara, Village Shivganj, Block Bhetua, District Amethi, Uttar Pradesh 227412',
    socialLinks: {
      instagram: 'https://www.instagram.com/hamara_shivganj?mdxt=OGJmMnN4NTNqMHM5',
      youtube: 'https://www.youtube.com/@Hamara_shivganj',
      twitter: 'https://x.com/Hamara_shivganj',
      facebook: 'https://www.facebook.com/share/19t4xk1k2B/',
    },
  },
};

export const GALLERY_CATEGORIES: {
  id: GalleryCategoryId;
  labelHi: string;
  labelEn: string;
}[] = [
  { id: 'all', labelHi: 'सभी श्रेणियाँ', labelEn: 'All Categories' },
  { id: 'photography', labelHi: 'ग्राम फ़ोटोग्राफ़ी', labelEn: 'Village Photography' },
  { id: 'streets', labelHi: 'गाँव की गलियाँ', labelEn: 'Village Streets' },
  { id: 'agriculture', labelHi: 'कृषि और खेत', labelEn: 'Agriculture & Fields' },
  { id: 'nature', labelHi: 'प्रकृति और दृश्य', labelEn: 'Nature & Landscapes' },
  { id: 'temples', labelHi: 'मंदिर और धार्मिक स्थल', labelEn: 'Temples & Religious Places' },
  { id: 'festivals', labelHi: 'त्योहार और उत्सव', labelEn: 'Festivals & Celebrations' },
  { id: 'events', labelHi: 'ग्राम आयोजन', labelEn: 'Village Events' },
  { id: 'people', labelHi: 'हमारे लोग और यादें', labelEn: 'People & Memories' },
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-photography',
    category: 'photography',
    titleHi: 'शिवगंज ग्राम चौपाल और आँगन',
    titleEn: 'Shivganj Village Courtyard & Chaupal',
    captionHi: 'ग्रामीण वास्तुकला, आँगन और शाम की चौपाल की झलक। अपनी असली ग्राम फोटो अपलोड करने के लिए ऊपर बटन दबाएँ।',
    captionEn: 'Glimpse of rural architecture and evening chaupal gatherings. Upload your actual village photo above.',
    locationTagHi: 'शिवगंज, भेतुआ',
    locationTagEn: 'Shivganj, Bhetua',
    dateLabel: 'ग्राम संग्रह · Collection',
    svgTheme: 'chaupal',
    isActualPhoto: false,
  },
  {
    id: 'gal-streets',
    category: 'streets',
    titleHi: 'गाँव की गलियाँ और पगडंडियाँ',
    titleEn: 'Village Lanes & Brick Pathways',
    captionHi: 'शिवगंज के शांत मोहल्ले, खड़ंजे/इंटरलॉकिंग रास्ते और पेड़ों की छाँव।',
    captionEn: 'Peaceful residential lanes, brick pathways, and shaded trees of Shivganj.',
    locationTagHi: 'मुख्य गली · शिवगंज',
    locationTagEn: 'Main Lane · Shivganj',
    dateLabel: 'ग्राम पथ · Pathways',
    svgTheme: 'streets',
    isActualPhoto: false,
  },
  {
    id: 'gal-agriculture',
    category: 'agriculture',
    titleHi: 'लहलहाते गेहूँ, धान और सरसों के खेत',
    titleEn: 'Lush Wheat, Paddy & Mustard Fields',
    captionHi: 'गोमती और सई नदी क्षेत्र की उपजाऊ मिट्टी में शिवगंज के किसानों की मेहनत।',
    captionEn: 'Fertile agricultural lands nourished by the Gomti and Sai river basin.',
    locationTagHi: 'कृषि क्षेत्र · घाटमपुर-शिवगंज',
    locationTagEn: 'Farmlands · Ghatampur-Shivganj',
    dateLabel: 'रबी व खरीफ · Harvest',
    svgTheme: 'fields',
    isActualPhoto: false,
  },
  {
    id: 'gal-nature',
    category: 'nature',
    titleHi: 'सुबह की सुनहरी धूप और आम के बाग',
    titleEn: 'Golden Sunrise & Mango Orchards',
    captionHi: 'शिवगंज में सूर्योदय की लालिमा, नीम-पीपल की छाँव और पक्षियों का कलरव।',
    captionEn: 'Dawn light over mango groves, neem and peepal trees in peaceful rural surroundings.',
    locationTagHi: 'प्रकृति · भेतुआ क्षेत्र',
    locationTagEn: 'Nature · Bhetua Region',
    dateLabel: 'प्रकृति · Nature',
    svgTheme: 'sunrise',
    isActualPhoto: false,
  },
  {
    id: 'gal-temples',
    category: 'temples',
    titleHi: 'माँ काली मंदिर एवं प्राचीन शिव मंदिर आस्था केंद्र',
    titleEn: 'Maa Kali Mandir & Ancient Shiva Shrines',
    captionHi: 'माँ काली मंदिर, शारदान मंदिर, प्राचीन शिव मंदिर मकूनपुर और भोला शंकर मंदिर बादरायपुर।',
    captionEn: 'Sacred heritage including Maa Kali Mandir, Shardan Mandir, Prachin Shiv Mandir Makunpur & Bhola Shankar Mandir.',
    locationTagHi: 'शिवगंज व समीपस्थ क्षेत्र',
    locationTagEn: 'Shivganj & Vicinity',
    dateLabel: 'आस्था · Heritage',
    svgTheme: 'temple',
    isActualPhoto: false,
  },
  {
    id: 'gal-festivals',
    category: 'festivals',
    titleHi: 'दीपावली, होली और महाशिवरात्रि उत्सव',
    titleEn: 'Diwali, Holi & Mahashivratri Celebrations',
    captionHi: 'अवधी लोकगीतों, फाग, दीपों और सामूहिक प्रसाद के साथ मनाए जाने वाले पारंपरिक पर्व।',
    captionEn: 'Traditional festivals celebrated with Awadhi folk songs, lamps, and community harmony.',
    locationTagHi: 'सामुदायिक उत्सव · शिवगंज',
    locationTagEn: 'Community Festivals · Shivganj',
    dateLabel: 'उत्सव · Festivals',
    svgTheme: 'festival',
    isActualPhoto: false,
  },
  {
    id: 'gal-events',
    category: 'events',
    titleHi: 'ग्राम सभा बैठक और सामाजिक आयोजन',
    titleEn: 'Gram Sabha & Community Gatherings',
    captionHi: 'घाटमपुर ग्राम पंचायत एवं शिवगंज में आयोजित होने वाले सामुदायिक, शैक्षिक व खेल कार्यक्रम।',
    captionEn: 'Educational, cultural, and sporting events organized by the village community.',
    locationTagHi: 'घाटमपुर पंचायत · शिवगंज',
    locationTagEn: 'Ghatampur Panchayat · Shivganj',
    dateLabel: 'आयोजन · Events',
    svgTheme: 'river',
    isActualPhoto: false,
  },
  {
    id: 'gal-people',
    category: 'people',
    titleHi: 'हमारे बुजुर्ग, किसान और युवा पीढ़ी',
    titleEn: 'Our Elders, Farmers & Youth Memories',
    captionHi: 'अपनापन, सादगी और पीढ़ियों से चली आ रही शिवगंज परिवारों की साझा यादें।',
    captionEn: 'Generations of warmth, elders’ wisdom, and youth aspirations of Shivganj.',
    locationTagHi: 'शिवगंज परिवार',
    locationTagEn: 'Shivganj Families',
    dateLabel: 'स्मृतियाँ · Memories',
    svgTheme: 'community',
    isActualPhoto: false,
  },
];

export const FOURTEEN_SECTIONS_METADATA: {
  number: string;
  id: string;
  titleHi: string;
  titleEn: string;
  summaryHi: string;
  summaryEn: string;
}[] = [
  {
    number: '01',
    id: 'about',
    titleHi: 'शिवगंज का परिचय (About Shivganj)',
    titleEn: 'About Shivganj',
    summaryHi: 'अमेठी ज़िले के भेतुआ ब्लॉक और घाटमपुर ग्राम पंचायत में स्थित हमारा गाँव।',
    summaryEn: 'Our village situated in Bhetua Block and Ghatampur Gram Panchayat of Amethi District.',
  },
  {
    number: '02',
    id: 'profile',
    titleHi: 'ग्राम प्रोफ़ाइल (Village Profile)',
    titleEn: 'Village Profile',
    summaryHi: 'प्रशासनिक विवरण, पंचायत, ब्लॉक, मंडल, STD कोड और भाषा।',
    summaryEn: 'Administrative profile, Gram Panchayat, Block, Division, STD code, and local languages.',
  },
  {
    number: '03',
    id: 'geography',
    titleHi: 'भौगोलिक स्थिति (Geography)',
    titleEn: 'Geography & Elevation',
    summaryHi: 'समुद्र तल से 106 मीटर ऊँचाई, आसपास के ब्लॉक और डाक पिन कोड विवरण।',
    summaryEn: '106m elevation above sea level, surrounding development blocks, and postal PIN codes.',
  },
  {
    number: '04',
    id: 'rivers',
    titleHi: 'समीपस्थ नदियाँ (Nearby Rivers)',
    titleEn: 'Nearby Rivers: Gomti & Sai',
    summaryHi: 'गोमती (Gomti) और सई (Sai) नदियाँ — ग्रामीण कृषि और जीवनरेखा।',
    summaryEn: 'Gomti and Sai rivers nourishing the agricultural landscape around Shivganj.',
  },
  {
    number: '05',
    id: 'reach',
    titleHi: 'शिवगंज कैसे पहुँचें (How to Reach)',
    titleEn: 'How to Reach Shivganj',
    summaryHi: 'SHIVGANJ बस स्टॉप (~0.0 KM, NH45 रायबरेली-सुल्तानपुर रोड), शारदान, HAL कोरवा व अमेठी रेलवे स्टेशन।',
    summaryEn: 'SHIVGANJ Bus Stop (~0.0 KM, NH45 Raebareli-Sultanpur Road), Shardan, HAL Korwa & Amethi Railway Station.',
  },
  {
    number: '06',
    id: 'schools',
    titleHi: 'स्कूल और कॉलेज (Schools & Colleges)',
    titleEn: 'Schools & Colleges',
    summaryHi: 'डॉ. पुष्पेंद्र सिंह स्मारक महाविद्यालय, गांधी इंटर कॉलेज, महात्मा शिव कुमार इंटर कॉलेज, सरस्वती शिक्षा मंदिर व प्राइमरी स्कूल शारदान।',
    summaryEn: 'Dr. Pushpendra Singh Smarak Mahavidyalaya, Gandhi Inter College, Mahatma Shiv Kumar Inter College, Saraswati Shiksha Mandir & Primary School Shardan.',
  },
  {
    number: '07',
    id: 'hospitals',
    titleHi: 'अस्पताल और स्वास्थ्य (Hospitals & Healthcare)',
    titleEn: 'Hospitals & Healthcare',
    summaryHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) शिवगंज, शारदान आयुर्वेदिक अस्पताल, HAL अस्पताल, आयुष मान अस्पताल व कृष्णा क्लिनिक।',
    summaryEn: 'Primary Health Centre (PHC) Shivganj, Shardan Ayurvedic Hospital, HAL Hospital, Ayushman Hospital & Krishna Clinic.',
  },
  {
    number: '08',
    id: 'temples',
    titleHi: 'मंदिर और धार्मिक स्थल (Temples & Religious Places)',
    titleEn: 'Temples & Religious Places',
    summaryHi: 'हनुमान जी मंदिर (बस स्टॉप व अस्पताल के पास), माँ काली मंदिर, शारदान मंदिर, प्राचीन शिव मंदिर मकूनपुर व भोला शंकर मंदिर।',
    summaryEn: 'Hanuman Ji Mandir (Near Bus Stop & Hospital), Maa Kali Mandir, Shardan Mandir, Prachin Shiv Mandir Makunpur & Bhola Shankar Mandir.',
  },
  {
    number: '09',
    id: 'banks',
    titleHi: 'बैंक और ATM (Banks & ATMs)',
    titleEn: 'Banks & ATMs',
    summaryHi: 'SBI ATM, SBI CDM, बैंक ऑफ बड़ौदा ATM और कॉर्पोरेशन बैंक ATM।',
    summaryEn: 'SBI ATM, SBI CDM, Bank of Baroda ATM, and Corporation Bank ATM.',
  },
  {
    number: '10',
    id: 'markets',
    titleHi: 'आसपास के बाज़ार (Nearby Markets)',
    titleEn: 'Nearby Markets',
    summaryHi: 'शारदान बाज़ार (Shardan Bazaar), भेतुआ ब्लॉक बाज़ार (Bhetua Block Bazaar) और स्थानीय जनरल स्टोर/दुकानें।',
    summaryEn: 'Shardan Bazaar, Bhetua Block Bazaar, and local general stores for daily essentials.',
  },
  {
    number: '11',
    id: 'parks',
    titleHi: 'पार्क और प्राकृतिक स्थान (Parks & Natural Places)',
    titleEn: 'Parks & Natural Places',
    summaryHi: 'HAL Lake, ECO Park और B-Type Park तथा ग्रामीण हरियाली।',
    summaryEn: 'HAL Lake, ECO Park, and B-Type Park along with serene rural greenery.',
  },
  {
    number: '12',
    id: 'nearby',
    titleHi: 'आसपास के शहर और ज़िले (Nearby Cities & Districts)',
    titleEn: 'Nearby Cities & Districts',
    summaryHi: 'सुल्तानपुर, अमेठी, गौरीगंज, जायस, रायबरेली, प्रतापगढ़ और फैज़ाबाद तथा दूरी तालिका।',
    summaryEn: 'Sultanpur, Amethi, Gauriganj, Jais, Raebareli, Pratapgarh, Faizabad & Distance Table.',
  },
  {
    number: '13',
    id: 'gallery',
    titleHi: 'ग्राम गैलरी (Village Gallery)',
    titleEn: 'Village Gallery',
    summaryHi: '8 श्रेणियों में शिवगंज की तस्वीरें, कैप्शन, लाइटबॉक्स और फोटो अपलोड सुविधा।',
    summaryEn: '8 categories of Shivganj photographs with captions, full-screen lightbox, and photo upload.',
  },
  {
    number: '14',
    id: 'contact',
    titleHi: 'संपर्क और समुदाय (Contact Us)',
    titleEn: 'Contact Us & Community',
    summaryHi: 'ग्राम जानकारी फ़ॉर्म, ईमेल, WhatsApp और सामुदायिक संदेश सुविधा।',
    summaryEn: 'Village contact form, direct email, configurable WhatsApp, and community feedback.',
  },
];

export const DIRECTORY_ITEMS: DirectoryItem[] = [
  // Section 4: Nearby Rivers
  {
    id: 'river-gomti',
    sectionId: 'rivers',
    sectionNumber: '04',
    categoryHi: 'समीपस्थ नदी',
    categoryEn: 'Nearby River',
    nameHi: 'गोमती नदी (Gomti River)',
    nameEn: 'Gomti River',
    detailHi: 'शिवगंज के समीप प्रवाहित होने वाली प्रमुख नदी गोमती, जो अवध क्षेत्र की कृषि और संस्कृति का आधार है।',
    detailEn: 'A major river flowing near Shivganj, central to Awadh agriculture and ecology.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'river-sai',
    sectionId: 'rivers',
    sectionNumber: '04',
    categoryHi: 'समीपस्थ नदी',
    categoryEn: 'Nearby River',
    nameHi: 'सई नदी (Sai River)',
    nameEn: 'Sai River',
    detailHi: 'गोमती के साथ सई (Sai) नदी भी शिवगंज के आसपास की प्रमुख नदियों में शामिल है।',
    detailEn: 'Flowing alongside the Gomti River basin as a nearby river system of the region.',
    sourceStatus: 'pdf-verified',
  },

  // Section 5: How to Reach (Railway & Bus Stops)
  {
    id: 'rail-amethi',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'रेलवे स्टेशन',
    categoryEn: 'Railway Station',
    nameHi: 'अमेठी रेलवे स्टेशन (Amethi Railway Station)',
    nameEn: 'Amethi Railway Station',
    detailHi: 'शिवगंज का निकटतम प्रमुख रेलवे स्टेशन।',
    detailEn: 'Nearest major railway station serving Shivganj.',
    distanceOrCode: '~10 KM',
    sourceStatus: 'pdf-approximate',
    statusNoteHi: 'लगभग 10 KM (अनुमानित)',
    statusNoteEn: 'Approx. 10 KM distance',
  },
  {
    id: 'rail-antu',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'रेलवे स्टेशन',
    categoryEn: 'Railway Station',
    nameHi: 'अंतू रेलवे स्टेशन (Antu Railway Station)',
    nameEn: 'Antu Railway Station',
    detailHi: 'क्षेत्र का दूसरा समीपस्थ रेलवे स्टेशन।',
    detailEn: 'Secondary nearby railway station in the region.',
    distanceOrCode: '~15 KM',
    sourceStatus: 'pdf-approximate',
    statusNoteHi: 'लगभग 15 KM (अनुमानित)',
    statusNoteEn: 'Approx. 15 KM distance',
  },
  {
    id: 'bus-shivganj',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'बस स्टॉप',
    categoryEn: 'Bus Stop',
    nameHi: 'SHIVGANJ बस स्टॉप (SHIVGANJ Bus Stop)',
    nameEn: 'SHIVGANJ Bus Stop (NH45 Raebareli Sultanpur Road)',
    detailHi:
      'शिवगंज का बस स्टॉप। NH45 RAIBARELI SULATANPUR ROAD — यात्रा से पूर्व स्थानीय बस उपलब्धता की पुष्टि करें।',
    detailEn:
      'Shivganj village bus stop on NH45 Raebareli–Sultanpur Road. Verify local bus timings before travel.',
    distanceOrCode: '~0.0 KM',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'bus-shardan',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'बस स्टॉप',
    categoryEn: 'Bus Stop',
    nameHi: 'शारदान बस स्टॉप (Shardan Bus Stop)',
    nameEn: 'Shardan Bus Stop',
    detailHi: 'शिवगंज के सबसे नज़दीकी बस स्टॉप में से एक। यात्रा से पूर्व स्थानीय बस उपलब्धता की पुष्टि करें।',
    detailEn: 'Closest local bus stop near Shivganj. Verify local bus timings before travel.',
    distanceOrCode: '~1.2 KM',
    sourceStatus: 'pdf-approximate',
  },
  {
    id: 'bus-hal',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'बस स्टेशन',
    categoryEn: 'Bus Station',
    nameHi: 'HAL बस स्टेशन, कोरवा (HAL Bus Station, Korwa)',
    nameEn: 'HAL Bus Station, Korwa',
    detailHi: 'हिंदुस्तान एयरोनॉटिक्स लिमिटेड (HAL) कोरवा परिसर के पास स्थित प्रमुख बस स्टॉप।',
    detailEn: 'Major bus stop situated near Hindustan Aeronautics Limited (HAL) Korwa township.',
    distanceOrCode: '~3.3 KM',
    sourceStatus: 'pdf-approximate',
  },
  {
    id: 'bus-munshiganj',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'बस स्टॉप',
    categoryEn: 'Bus Stop',
    nameHi: 'मुंशीगंज चौराहा बस स्टॉप (Munshiganj Chauraha)',
    nameEn: 'Munshiganj Chauraha Bus Stop',
    detailHi: 'सुल्तानपुर-अमेठी मार्ग पर प्रमुख चौराहा एवं बस ठहराव।',
    detailEn: 'Key intersection and bus transit point on the Sultanpur–Amethi corridor.',
    distanceOrCode: '~4.1 KM',
    sourceStatus: 'pdf-approximate',
  },
  {
    id: 'bus-ramnagar',
    sectionId: 'reach',
    sectionNumber: '05',
    categoryHi: 'बस स्टॉप',
    categoryEn: 'Bus Stop',
    nameHi: 'रामनगर बस स्टॉप (Ramnagar Bus Stop)',
    nameEn: 'Ramnagar Bus Stop',
    detailHi: 'समीपस्थ क्षेत्रीय बस स्टॉप।',
    detailEn: 'Regional bus stop serving the surrounding villages.',
    distanceOrCode: '~7.3 KM',
    sourceStatus: 'pdf-approximate',
  },

  // Section 6: Schools & Colleges
  {
    id: 'edu-pushpendra-mahavidyalaya',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'डिग्री कॉलेज (महाविद्यालय)',
    categoryEn: 'Degree College (Co-Educational)',
    nameHi: 'डॉ. पुष्पेंद्र सिंह स्मारक महाविद्यालय (Dr. Pushpendra Singh Smarak Mahavidyalaya)',
    nameEn: 'Dr. Pushpendra Singh Smarak Mahavidyalaya',
    detailHi:
      'घाटमपुर (पश्चिम द्वारा), अमेठी, उत्तर प्रदेश, भारत में स्थित एक निजी, सह-शिक्षा (Co-educational) डिग्री महाविद्यालय।',
    detailEn:
      'Dr. Pushpendra Singh Smarak Mahavidyalaya is a private, co-educational degree college located in Ghatampur (Paschim Dwara), Amethi, Uttar Pradesh, India.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'edu-gandhi',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'इंटर कॉलेज',
    categoryEn: 'Inter College',
    nameHi: 'गांधी इंटर कॉलेज (Gandhi Inter College)',
    nameEn: 'Gandhi Inter College',
    detailHi: 'शिवगंज के आसपास का प्रमुख माध्यमिक शिक्षण संस्थान।',
    detailEn: 'Prominent secondary educational institution near Shivganj.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'edu-msk',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'इंटर कॉलेज',
    categoryEn: 'Inter College',
    nameHi: 'महात्मा शिव कुमार इंटर कॉलेज (Mahatma Shiv Kumar Inter College)',
    nameEn: 'Mahatma Shiv Kumar Inter College',
    detailHi: 'क्षेत्र के विद्यार्थियों के लिए उच्च माध्यमिक विद्यालय।',
    detailEn: 'Senior secondary school serving students from Shivganj and neighboring villages.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'edu-ssm',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'विद्यालय',
    categoryEn: 'School',
    nameHi: 'सरस्वती शिक्षा मंदिर (Saraswati Shiksha Mandir)',
    nameEn: 'Saraswati Shiksha Mandir',
    detailHi: 'क्षेत्र का प्रमुख स्थानीय विद्यालय।',
    detailEn: 'Reputed local school serving village students.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'edu-brahmanand',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'जूनियर हाई स्कूल',
    categoryEn: 'Junior High School',
    nameHi: 'श्री स्वामी ब्रह्मानंद जूनियर हाई स्कूल वेद',
    nameEn: 'Sri Swami Brahmanand Junior High School Ved',
    detailHi: 'स्थानीय जूनियर हाई स्कूल शिक्षण संस्थान।',
    detailEn: 'Local junior high school educational institution.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'edu-ps-shardan',
    sectionId: 'schools',
    sectionNumber: '06',
    categoryHi: 'प्राथमिक विद्यालय',
    categoryEn: 'Primary School',
    nameHi: 'प्राइमरी स्कूल शारदान (Primary School Shardan)',
    nameEn: 'Primary School Shardan',
    detailHi: 'समीपस्थ प्राथमिक शिक्षा केंद्र।',
    detailEn: 'Nearby primary education school.',
    sourceStatus: 'pdf-verified',
  },

  // Section 7: Hospitals & Healthcare
  {
    id: 'hosp-phc-shivganj',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'सरकारी प्राथमिक चिकित्सा केंद्र (PHC)',
    categoryEn: 'Government Primary Health Centre (PHC)',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) शिवगंज, अमेठी',
    nameEn: 'Primary Health Centre (PHC) Shivganj, Amethi',
    detailHi:
      'प्राथमिक स्वास्थ्य केंद्र (PHC) शिवगंज, अमेठी उत्तर प्रदेश के अमेठी जिले में स्थित एक प्रमुख सरकारी प्राथमिक चिकित्सा केंद्र है। यह केंद्र स्थानीय ग्रामीण और कस्बाई आबादी को बुनियादी स्वास्थ्य सेवाएं प्रदान करता है।',
    detailEn:
      'Primary Health Centre (PHC) Shivganj, Amethi is a major government primary healthcare center located in Amethi district, Uttar Pradesh. It provides essential medical and healthcare services to the local rural and semi-urban population.',
    addressHi: '6VG2+HX9, पूरब द्वारा, सुल्तानपुर रोड, शिवगंज, जिला अमेठी, उत्तर प्रदेश - 227412',
    addressEn: '6VG2+HX9, Purab Dwara, Sultanpur Road, Shivganj, District Amethi, Uttar Pradesh - 227412',
    helplineLabelHi: 'PHC शिवगंज हेल्पलाइन',
    helplineLabelEn: 'PHC Shivganj Helpline',
    helplinePhone: '+91 9739317523',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=6VG2%2BHX9%2C+Purab+Dwara%2C+Sultanpur+Road%2C+Shivganj%2C+Amethi%2C+Uttar+Pradesh+227412',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'hosp-shardan',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'आयुर्वेदिक चिकित्सालय',
    categoryEn: 'Ayurvedic Hospital',
    nameHi: 'शारदान आयुर्वेदिक अस्पताल (Shardan Ayurvedic Hospital)',
    nameEn: 'Shardan Ayurvedic Hospital',
    detailHi: 'क्षेत्रीय आयुर्वेदिक चिकित्सा एवं स्वास्थ्य केंद्र।',
    detailEn: 'Local Ayurvedic healthcare and wellness center.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'hosp-hal',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'अस्पताल',
    categoryEn: 'Hospital',
    nameHi: 'HAL अस्पताल, कोरवा (HAL Hospital)',
    nameEn: 'HAL Hospital, Korwa',
    detailHi: 'HAL कोरवा टाउनशिप के पास स्थित प्रमुख चिकित्सा केंद्र।',
    detailEn: 'Major medical facility located near HAL Korwa township.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'hosp-ayushman',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'अस्पताल',
    categoryEn: 'Hospital',
    nameHi: 'आयुष मान अस्पताल (Ayushman Hospital)',
    nameEn: 'Ayushman Hospital',
    detailHi: 'आसपास के क्षेत्र में प्रमुख चिकित्सा एवं उपचार केंद्र।',
    detailEn: 'Nearby hospital for medical care and treatment.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'hosp-krishna',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'क्लिनिक',
    categoryEn: 'Clinic',
    nameHi: 'कृष्णा क्लिनिक (Krishna Clinic)',
    nameEn: 'Krishna Clinic',
    detailHi: 'प्राथमिक परामर्श एवं उपचार हेतु स्थानीय क्लिनिक।',
    detailEn: 'Local medical clinic for primary care and consultation.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'hosp-chc',
    sectionId: 'hospitals',
    sectionNumber: '07',
    categoryHi: 'सामुदायिक स्वास्थ्य केंद्र',
    categoryEn: 'Community Health Centre',
    nameHi: 'CHC गौरीगंज (CHC Gauriganj)',
    nameEn: 'CHC Gauriganj',
    detailHi: 'शासकीय सामुदायिक स्वास्थ्य केंद्र (Community Health Centre) गौरीगंज।',
    detailEn: 'Government Community Health Centre (CHC) at Gauriganj.',
    sourceStatus: 'pdf-verified',
  },

  // Section 8: Temples & Religious Places
  {
    id: 'temp-hanuman',
    sectionId: 'temples',
    sectionNumber: '08',
    categoryHi: 'प्रमुख ग्राम मंदिर',
    categoryEn: 'Village Temple',
    nameHi: 'हनुमान जी मंदिर (Hanuman Ji Mandir)',
    nameEn: 'Hanuman Ji Mandir (Near Bus Stop & Hospital)',
    detailHi:
      'शिवगंज बस स्टॉप और प्राथमिक स्वास्थ्य केंद्र (अस्पताल) के समीप स्थित प्रमुख एवं पूजनीय हनुमान जी मंदिर।',
    detailEn:
      'Revered Hanuman Ji Mandir located near Shivganj Bus Stop and Primary Health Centre (Hospital).',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'temp-kali',
    sectionId: 'temples',
    sectionNumber: '08',
    categoryHi: 'धार्मिक स्थल',
    categoryEn: 'Religious Place',
    nameHi: 'माँ काली मंदिर (Maa Kali Mandir)',
    nameEn: 'Maa Kali Mandir',
    detailHi: 'प्रमुख आस्था एवं उपासना केंद्र। नवरात्रि व पर्वों पर विशेष पूजन।',
    detailEn: 'Prominent shrine and focal point of devotion during Navratri and village festivals.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'temp-shardan',
    sectionId: 'temples',
    sectionNumber: '08',
    categoryHi: 'धार्मिक स्थल',
    categoryEn: 'Religious Place',
    nameHi: 'शारदान मंदिर (Shardan Mandir)',
    nameEn: 'Shardan Mandir',
    detailHi: 'शारदान क्षेत्र में स्थित पूजनीय मंदिर।',
    detailEn: 'Revered local temple in the Shardan area.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'temp-makunpur',
    sectionId: 'temples',
    sectionNumber: '08',
    categoryHi: 'शिव मंदिर',
    categoryEn: 'Shiva Temple',
    nameHi: 'प्राचीन शिव मंदिर, मकूनपुर (Prachin Shiv Mandir Makunpur)',
    nameEn: 'Prachin Shiv Mandir, Makunpur',
    detailHi: 'प्राचीन शिव मंदिर मकूनपुर, जहाँ सावन व महाशिवरात्रि पर श्रद्धालु एकत्र होते हैं।',
    detailEn: 'Ancient Shiva temple at Makunpur, visited widely during Sawan and Mahashivratri.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'temp-badraypur',
    sectionId: 'temples',
    sectionNumber: '08',
    categoryHi: 'शिव मंदिर',
    categoryEn: 'Shiva Temple',
    nameHi: 'भोला शंकर मंदिर, बादरायपुर (Bhola Shankar Mandir Badraypur)',
    nameEn: 'Bhola Shankar Mandir, Badraypur',
    detailHi: 'बादरायपुर में स्थित पूजनीय भोला शंकर मंदिर।',
    detailEn: 'Revered Bhola Shankar Mandir located at Badraypur.',
    sourceStatus: 'pdf-verified',
  },

  // Section 9: Banks & ATMs
  {
    id: 'bank-sbi-atm',
    sectionId: 'banks',
    sectionNumber: '09',
    categoryHi: 'बैंकिंग व ATM',
    categoryEn: 'Banking & ATM',
    nameHi: 'भारतीय स्टेट बैंक ATM (SBI ATM)',
    nameEn: 'State Bank of India ATM (SBI ATM)',
    detailHi: 'आसपास के क्षेत्र में प्रमुख बैंकिंग एवं ATM सुविधा।',
    detailEn: 'Nearby banking and cash withdrawal ATM facility.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'bank-sbi-cdm',
    sectionId: 'banks',
    sectionNumber: '09',
    categoryHi: 'कैश डिपॉजिट मशीन',
    categoryEn: 'Cash Deposit Machine',
    nameHi: 'SBI CDM (भारतीय स्टेट बैंक कैश डिपॉजिट मशीन)',
    nameEn: 'SBI CDM (Cash Deposit Machine)',
    detailHi: 'नकद जमा व लेनदेन सुविधा हेतु SBI CDM।',
    detailEn: 'SBI Cash Deposit Machine facility for instant cash deposits.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'bank-bob-atm',
    sectionId: 'banks',
    sectionNumber: '09',
    categoryHi: 'बैंकिंग व ATM',
    categoryEn: 'Banking & ATM',
    nameHi: 'बैंक ऑफ बड़ौदा ATM (Bank of Baroda ATM)',
    nameEn: 'Bank of Baroda ATM',
    detailHi: 'क्षेत्र में उपलब्ध प्रमुख बैंक ऑफ बड़ौदा ATM।',
    detailEn: 'Major public sector Bank of Baroda ATM available in the vicinity.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'bank-corp-atm',
    sectionId: 'banks',
    sectionNumber: '09',
    categoryHi: 'बैंकिंग व ATM (पुराना नाम)',
    categoryEn: 'Banking & ATM (Legacy Name)',
    nameHi: 'कॉर्पोरेशन बैंक ATM (Corporation Bank ATM)',
    nameEn: 'Corporation Bank ATM',
    detailHi: 'कॉर्पोरेशन बैंक ATM (नोट: कॉर्पोरेशन बैंक का विलय अब यूनियन बैंक ऑफ इंडिया में हो चुका है, वर्तमान स्थिति जांचें)।',
    detailEn: 'Corporation Bank ATM (Note: Corporation Bank merged into Union Bank of India; verify current signage).',
    sourceStatus: 'pdf-check-current',
    statusNoteHi: 'संभावित परिवर्तन: यूनियन बैंक में विलय',
    statusNoteEn: 'Potentially outdated name: Merged with Union Bank',
  },

  // Section 10: Nearby Markets
  {
    id: 'mkt-shardan',
    sectionId: 'markets',
    sectionNumber: '10',
    categoryHi: 'समीपस्थ प्रमुख बाज़ार',
    categoryEn: 'Nearby Primary Bazaar',
    nameHi: 'शारदान बाज़ार (Shardan Bazaar)',
    nameEn: 'Shardan Bazaar (शारदान बाज़ार)',
    detailHi: 'शिवगंज के समीप प्रमुख स्थानीय बाज़ार — दैनिक ज़रूरत की वस्तुओं, सब्ज़ी, किराना एवं ग्रामीण खरीदारी का मुख्य केंद्र।',
    detailEn: 'Primary nearby bazaar close to Shivganj for daily essentials, fresh produce, groceries, and local retail shopping.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'mkt-bhetua',
    sectionId: 'markets',
    sectionNumber: '10',
    categoryHi: 'ब्लॉक बाज़ार',
    categoryEn: 'Block Market',
    nameHi: 'भेतुआ ब्लॉक बाज़ार (Bhetua Block Bazaar)',
    nameEn: 'Bhetua Block Bazaar (भेतुआ ब्लॉक बाज़ार)',
    detailHi: 'भेतुआ विकास खंड (ब्लॉक) मुख्यालय के पास स्थित प्रमुख बाज़ार — कृषि सामग्री, व्यापारिक प्रतिष्ठानों और आवश्यक सेवाओं का केंद्र।',
    detailEn: 'Major market center at Bhetua Block headquarters offering agricultural supplies, commercial shops, and essential services.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'mkt-general',
    sectionId: 'markets',
    sectionNumber: '10',
    categoryHi: 'दैनिक सुविधा',
    categoryEn: 'Daily Essentials',
    nameHi: 'स्थानीय जनरल स्टोर एवं किराना दुकानें',
    nameEn: 'Local General Stores & Provision Shops',
    detailHi: 'गाँव और आसपास के चौराहों पर दैनिक उपयोग की वस्तुओं हेतु जनरल स्टोर।',
    detailEn: 'Neighborhood general stores and provision shops serving village households.',
    sourceStatus: 'pdf-verified',
  },

  // Section 11: Parks & Natural Places
  {
    id: 'park-hal-lake',
    sectionId: 'parks',
    sectionNumber: '11',
    categoryHi: 'सरोवर व प्राकृतिक स्थान',
    categoryEn: 'Lake & Nature Spot',
    nameHi: 'HAL Lake (एचएएल लेक)',
    nameEn: 'HAL Lake',
    detailHi: 'आसपास के क्षेत्र में शांत सरोवर और प्राकृतिक भ्रमण स्थल।',
    detailEn: 'Nearby scenic lake and open recreational nature spot.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'park-eco',
    sectionId: 'parks',
    sectionNumber: '11',
    categoryHi: 'पार्क',
    categoryEn: 'Park',
    nameHi: 'ECO Park (ईको पार्क)',
    nameEn: 'ECO Park',
    detailHi: 'हरियाली और भ्रमण के लिए समीपस्थ ईको पार्क।',
    detailEn: 'Nearby green park area for nature walks and recreation.',
    sourceStatus: 'pdf-verified',
  },
  {
    id: 'park-btype',
    sectionId: 'parks',
    sectionNumber: '11',
    categoryHi: 'पार्क',
    categoryEn: 'Park',
    nameHi: 'B-Type Park (बी-टाइप पार्क)',
    nameEn: 'B-Type Park',
    detailHi: 'स्थानीय खुले स्थान एवं सामुदायिक पार्क।',
    detailEn: 'Local park and open community green space.',
    sourceStatus: 'pdf-verified',
  },
];

export const DISTANCE_TABLE_ROWS = [
  {
    placeHi: 'भेतुआ (Bhetua Block)',
    placeEn: 'Bhetua (Block HQ)',
    distanceHi: '3 KM',
    distanceEn: '3 KM',
    noteHi: 'विकास खंड (ब्लॉक) मुख्यालय दूरी',
    noteEn: 'Development Block HQ distance',
    isApproximate: true,
  },
  {
    placeHi: 'शाहगढ़ (Shahgarh)',
    placeEn: 'Shahgarh',
    distanceHi: '8 KM',
    distanceEn: '8 KM',
    noteHi: 'समीपस्थ ब्लॉक व बाज़ार (PIN 227411)',
    noteEn: 'Nearby block & market (PIN 227411)',
    isApproximate: true,
  },
  {
    placeHi: 'अमेठी (Amethi)',
    placeEn: 'Amethi',
    distanceHi: '12 KM (रेलवे स्टेशन ~10 KM)',
    distanceEn: '12 KM (Railway Station ~10 KM)',
    noteHi: 'प्रमुख कस्बा एवं निकटतम रेलवे जंक्शन',
    noteEn: 'Major town & nearest railway station',
    isApproximate: true,
  },
  {
    placeHi: 'गौरीगंज (Gauriganj)',
    placeEn: 'Gauriganj',
    distanceHi: '16 KM',
    distanceEn: '16 KM',
    noteHi: 'प्रमुख प्रशासनिक नगर एवं CHC केंद्र',
    noteEn: 'Major administrative town & CHC center',
    isApproximate: true,
  },
  {
    placeHi: 'सुल्तानपुर (Sultanpur)',
    placeEn: 'Sultanpur',
    distanceHi: '25–27 KM',
    distanceEn: '25–27 KM',
    noteHi: 'ज़िला मुख्यालय दूरी (लगभग 25–27 KM)',
    noteEn: 'District Headquarters distance (approx. 25–27 KM)',
    isApproximate: true,
  },
  {
    placeHi: 'रायबरेली (Raebareli)',
    placeEn: 'Raebareli',
    distanceHi: '65–66 KM',
    distanceEn: '65–66 KM',
    noteHi: 'समीपस्थ प्रमुख ज़िला व शहर',
    noteEn: 'Nearby major city & district',
    isApproximate: true,
  },
];

export const NEARBY_PIN_CODES = [
  { pin: '227411', areaHi: 'शाहगढ़ (Shahgarh)', areaEn: 'Shahgarh' },
  { pin: '227408', areaHi: 'धम्मौर (Dhammaur)', areaEn: 'Dhammaur' },
  { pin: '227412', areaHi: 'HAL कोरवा (HAL Korwa)', areaEn: 'HAL Korwa' },
];

export const VILLAGE_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    dateHi: 'अक्टूबर 2026',
    dateEn: 'October 2026',
    categoryHi: 'ग्राम सूचना · Notice',
    categoryEn: 'Village Notice',
    titleHi: 'शिवगंज डिजिटल ग्राम पोर्टल एवं फोटो संग्रह अभियान',
    titleEn: 'Shivganj Digital Village Portal & Photo Archive Drive',
    summaryHi:
      'ग्रामवासियों से अनुरोध है कि शिवगंज की पुरानी व नई वास्तविक तस्वीरें (खेत, मंदिर, विद्यालय, उत्सव) ग्राम गैलरी में जोड़ें या ईमेल द्वारा भेजें।',
    summaryEn:
      'Villagers are invited to contribute authentic photographs of Shivganj (fields, temples, schools, festivals) to the Village Gallery or via email.',
    isImportant: true,
  },
  {
    id: 'ann-2',
    dateHi: 'सामुदायिक अपील',
    dateEn: 'Community Appeal',
    categoryHi: 'इतिहास संकलन · Heritage',
    categoryEn: 'History Documentation',
    titleHi: 'गाँव के प्रामाणिक इतिहास व बुजुर्गों के संस्मरण साझा करें',
    titleEn: 'Share Verified Village History & Elders’ Oral Chronicles',
    summaryHi:
      'हम बिना प्रमाण के कोई ऐतिहासिक तिथि नहीं लिखते। यदि आपके पास घाटमपुर पंचायत या शिवगंज से जुड़े प्रमाणित ऐतिहासिक दस्तावेज़ हैं, तो कृपया संपर्क अनुभाग से साझा करें।',
    summaryEn:
      'We do not publish unverified historical claims. If you hold verified records or elders’ accounts of Shivganj & Ghatampur Panchayat, please share via the Contact form.',
    isImportant: false,
  },
  {
    id: 'ann-3',
    dateHi: 'सार्वजनिक सत्यापन नोट',
    dateEn: 'Public Record Note',
    categoryHi: 'ग्राम अभिलेख · Data Accuracy',
    categoryEn: 'Official Record Note',
    titleHi: 'सरकारी रिकॉर्ड एवं परिवहन समय-सारणी की पुष्टि',
    titleEn: 'Verification of Official Records & Transit Timings',
    summaryHi:
      'इस पोर्टल में शिवगंज गाँव की सभी प्रामाणिक जानकारियाँ व्यवस्थित की गई हैं। यात्रा या प्रशासनिक कार्य से पूर्व वर्तमान सरकारी रिकॉर्ड एवं समय-सारणी अवश्य जांचें।',
    summaryEn:
      'All village directory details are carefully organized for community reference. Please verify mutable transit schedules or administrative info with current official records.',
    isImportant: false,
  },
];
