
import type { Language, ContentType } from '../types';

type TranslationSet = {
    [key: string]: string | { [key: string]: string };
};

export const translations: Record<Language, TranslationSet> = {
    en: {
        header_title: "IndiArt",
        header_subtitle: "Your Creative Marketing Partner",
        
        language_selector_title: "Choose Your Language",

        step1_title: "Step 1: Describe Your Craft",
        step1_subtitle: "Tell us about your creation. Be as detailed as you like!",
        step1_placeholder: "e.g., A hand-carved wooden bowl made from reclaimed mango wood, polished with natural beeswax...",
        step1_voice_language_label: "Select voice input language",
        step1_mic_start: "Start voice input",
        step1_mic_stop: "Stop recording",

        step2_title: "Step 2: Add an Image",
        step2_subtitle: "A picture is worth a thousand words. An image helps our AI understand your craft better.",
        step2_image_alt: "Product preview",
        step2_remove_button: "Remove image",
        step2_upload_button: "Upload a file",
        step2_drag_drop: "or drag and drop",
        step2_file_types: "PNG, JPG, GIF up to 10MB",

        step3_title: "Step 3: Choose Your Content",
        step3_subtitle: "Select the marketing materials you need. Pick as many as you like.",

        step4_title: "Step 4: Translate (Optional)",
        step4_subtitle: "Reach a wider audience by translating your content.",

        back_button: "Back",
        next_button: "Next",
        generate_button: "Create My Content",
        generate_button_loading: "Generating...",
        start_over_button: "Start Over",

        output_main_title: "Your Results",
        output_generating_title: "Generating Your Content...",
        output_generating_subtitle: "Our AI is hard at work. This might take a moment.",
        output_error_title: "An Error Occurred",
        output_analysis_title: "Strategic Analysis",
        output_analysis_unavailable: "Analysis not available for the selected language.",
        output_analysis_audience: "Target Audience",
        output_analysis_selling_points: "Key Selling Points",
        output_analysis_sentiment: "Overall Sentiment",
        output_page_indicator: "Viewing {current} of {total}",

        copy_button_copy: "Copy",
        copy_button_copied: "Copied!",
        read_aloud_start: "Read content aloud",
        read_aloud_stop: "Stop reading",

        content_types: {
            social: 'Social Media Post (e.g., Instagram, Facebook)',
            description: 'Product Description (for e-commerce sites)',
            email: 'Email Newsletter Announcement',
            blog: 'Short Blog Post',
            seo: 'SEO Keywords & Meta Description',
        },
        languages: {
            en: 'English',
            hi: 'Hindi (हिन्दी)',
            bn: 'Bengali (বাংলা)',
            ta: 'Tamil (தமிழ்)',
            te: 'Telugu (తెలుగు)',
            mr: 'Marathi (मराठी)',
        }
    },
    hi: {
        header_title: "IndiArt",
        header_subtitle: "आपका रचनात्मक विपणन साथी",

        language_selector_title: "अपनी भाषा चुनें",

        step1_title: "चरण 1: अपनी कला का वर्णन करें",
        step1_subtitle: "हमें अपनी रचना के बारे में बताएं। आप जितना चाहें उतना विस्तृत हो सकते हैं!",
        step1_placeholder: "जैसे, आम की लकड़ी से बनी हाथ से नक्काशीदार लकड़ी का कटोरा, जिसे प्राकृतिक मोम से पॉलिश किया गया है...",
        step1_voice_language_label: "आवाज इनपुट भाषा चुनें",
        step1_mic_start: "आवाज इनपुट शुरू करें",
        step1_mic_stop: "रिकॉर्डिंग बंद करें",

        step2_title: "चरण 2: एक छवि जोड़ें",
        step2_subtitle: "एक तस्वीर हज़ार शब्दों के बराबर होती है। छवि हमारे AI को आपके शिल्प को बेहतर ढंग से समझने में मदद करती है।",
        step2_image_alt: "उत्पाद का पूर्वावलोकन",
        step2_remove_button: "छवि हटाएं",
        step2_upload_button: "एक फ़ाइल अपलोड करें",
        step2_drag_drop: "या खींचें और छोड़ें",
        step2_file_types: "PNG, JPG, GIF 10MB तक",

        step3_title: "चरण 3: अपनी सामग्री चुनें",
        step3_subtitle: "आपको जिन विपणन सामग्रियों की आवश्यकता है, उनका चयन करें। जितनी चाहें उतनी चुनें।",
        
        step4_title: "चरण 4: अनुवाद करें (वैकल्पिक)",
        step4_subtitle: "अपनी सामग्री का अनुवाद करके व्यापक दर्शकों तक पहुंचें।",

        back_button: "वापस",
        next_button: "अगला",
        generate_button: "मेरी सामग्री बनाएं",
        generate_button_loading: "बनाया जा रहा है...",
        start_over_button: "फिर से शुरू करें",

        output_main_title: "आपके परिणाम",
        output_generating_title: "आपकी सामग्री बनाई जा रही है...",
        output_generating_subtitle: "हमारा AI कड़ी मेहनत कर रहा है। इसमें कुछ समय लग सकता है।",
        output_error_title: "एक त्रुटि हुई",
        output_analysis_title: "रणनीतिक विश्लेषण",
        output_analysis_unavailable: "चुनी गई भाषा के लिए विश्लेषण उपलब्ध नहीं है।",
        output_analysis_audience: "लक्षित दर्शक",
        output_analysis_selling_points: "मुख्य विक्रय बिंदु",
        output_analysis_sentiment: "समग्र भावना",
        output_page_indicator: "{total} में से {current} देख रहे हैं",

        copy_button_copy: "कॉपी करें",
        copy_button_copied: "कॉपी किया गया!",
        read_aloud_start: "सामग्री को जोर से पढ़ें",
        read_aloud_stop: "पढ़ना बंद करें",
        
        content_types: {
            social: 'सोशल मीडिया पोस्ट (जैसे, इंस्टाग्राम, फेसबुक)',
            description: 'उत्पाद विवरण (ई-कॉमर्स साइटों के लिए)',
            email: 'ईमेल न्यूज़लेटर घोषणा',
            blog: 'संक्षिप्त ब्लॉग पोस्ट',
            seo: 'एसईओ कीवर्ड और मेटा विवरण',
        },
        languages: {
            en: 'अंग्रेजी (English)',
            hi: 'हिन्दी',
            bn: 'बंगाली (বাংলা)',
            ta: 'तमिल (தமிழ்)',
            te: 'तेलुगु (తెలుగు)',
            mr: 'मराठी (मराठी)',
        }
    },
    bn: {
        header_title: "IndiArt",
        header_subtitle: "আপনার সৃজনশীল বিপণন সঙ্গী",

        language_selector_title: "আপনার ভাষা নির্বাচন করুন",

        step1_title: "ধাপ ১: আপনার শিল্পের বর্ণনা দিন",
        step1_subtitle: "আপনার সৃষ্টি সম্পর্কে আমাদের বলুন। আপনি যতটা বিস্তারিত হতে পারেন!",
        step1_placeholder: "যেমন, পুনরুদ্ধার করা আমের কাঠ থেকে তৈরি হাতে খোদাই করা কাঠের বাটি, প্রাকৃতিক মোম দিয়ে পালিশ করা...",
        step1_voice_language_label: "ভয়েস ইনপুট ভাষা নির্বাচন করুন",
        step1_mic_start: "ভয়েস ইনপুট শুরু করুন",
        step1_mic_stop: "রেকর্ডিং বন্ধ করুন",
        
        step2_title: "ধাপ ২: একটি ছবি যোগ করুন",
        step2_subtitle: "একটি ছবি হাজার শব্দের সমান। একটি ছবি আমাদের AI-কে আপনার শিল্প আরও ভালভাবে বুঝতে সাহায্য করে।",
        step2_image_alt: "পণ্যের পূর্বরূপ",
        step2_remove_button: "ছবি সরান",
        step2_upload_button: "একটি ফাইল আপলোড করুন",
        step2_drag_drop: "অথবা টেনে আনুন",
        step2_file_types: "PNG, JPG, GIF 10MB পর্যন্ত",

        step3_title: "ধাপ ৩: আপনার বিষয়বস্তু চয়ন করুন",
        step3_subtitle: "আপনার প্রয়োজনীয় বিপণন সামগ্রী নির্বাচন করুন। যত খুশি বাছাই করুন।",

        step4_title: "ধাপ ৪: অনুবাদ করুন (ঐচ্ছিক)",
        step4_subtitle: "আপনার বিষয়বস্তু অনুবাদ করে বৃহত্তর দর্শকদের কাছে পৌঁছান।",

        back_button: "পেছনে",
        next_button: "পরবর্তী",
        generate_button: "আমার সামগ্রী তৈরি করুন",
        generate_button_loading: "তৈরি হচ্ছে...",
        start_over_button: "আবার শুরু করুন",

        output_main_title: "আপনার ফলাফল",
        output_generating_title: "আপনার সামগ্রী তৈরি করা হচ্ছে...",
        output_generating_subtitle: "আমাদের AI কঠোর পরিশ্রম করছে। এতে কিছুক্ষণ সময় লাগতে পারে।",
        output_error_title: "একটি ত্রুটি ঘটেছে",
        output_analysis_title: "কৌশলগত বিশ্লেষণ",
        output_analysis_unavailable: "নির্বাচিত ভাষার জন্য বিশ্লেষণ উপলব্ধ নেই।",
        output_analysis_audience: "লক্ষ্য দর্শক",
        output_analysis_selling_points: "মূল বিক্রয় পয়েন্ট",
        output_analysis_sentiment: "সামগ্রিক অনুভূতি",
        output_page_indicator: "{total} এর মধ্যে {current} দেখছেন",

        copy_button_copy: "কপি",
        copy_button_copied: "কপি করা হয়েছে!",
        read_aloud_start: "বিষয়বস্তু জোরে পড়ুন",
        read_aloud_stop: "পড়া বন্ধ করুন",
        
        content_types: {
            social: 'সোশ্যাল মিডিয়া পোস্ট (যেমন, ইনস্টাগ্রাম, ফেসবুক)',
            description: 'পণ্যের বিবরণ (ই-কমার্স সাইটের জন্য)',
            email: 'ইমেল নিউজলেটার ঘোষণা',
            blog: 'সংক্ষিপ্ত ব্লগ পোস্ট',
            seo: 'এসইও কীওয়ার্ড এবং মেটা বিবরণ',
        },
        languages: {
            en: 'ইংরেজি (English)',
            hi: 'হিন্দি (हिन्दी)',
            bn: 'বাংলা',
            ta: 'তামিল (தமிழ்)',
            te: 'তেলুগు (తెలుగు)',
            mr: 'মারাঠি (মরাঠি)',
        }
    },
    ta: {
        header_title: "IndiArt",
        header_subtitle: "உங்கள் படைப்பு சந்தைப்படுத்தல் பங்குதாரர்",
        
        language_selector_title: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",

        step1_title: "படி 1: உங்கள் கைவினையை விவரிக்கவும்",
        step1_subtitle: "உங்கள் படைப்பைப் பற்றி எங்களிடம் கூறுங்கள். நீங்கள் விரும்பும் அளவுக்கு விரிவாக இருங்கள்!",
        step1_placeholder: "எ.கா., மாம்பழ மரத்திலிருந்து கையால் செதுக்கப்பட்ட மரக் கிண்ணம், இயற்கை தேன் மெழுகு கொண்டு மெருகூட்டப்பட்டது...",
        step1_voice_language_label: "குரல் உள்ளீட்டு மொழியைத் தேர்ந்தெடுக்கவும்",
        step1_mic_start: "குரல் உள்ளீட்டைத் தொடங்கவும்",
        step1_mic_stop: "பதிவு செய்வதை நிறுத்தவும்",

        step2_title: "படி 2: ஒரு படத்தைச் சேர்க்கவும்",
        step2_subtitle: "ஒரு படம் ஆயிரம் வார்த்தைகளுக்குச் சமம். ஒரு படம் எங்கள் AI உங்கள் கைவினையை நன்றாகப் புரிந்துகொள்ள உதவுகிறது.",
        step2_image_alt: "தயாரிப்பு முன்னோட்டம்",
        step2_remove_button: "படத்தை அகற்று",
        step2_upload_button: "ஒரு கோப்பை பதிவேற்றவும்",
        step2_drag_drop: "அல்லது இழுத்து விடவும்",
        step2_bit_file_types: "PNG, JPG, GIF 10MB வரை",

        step3_title: "படி 3: உங்கள் உள்ளடக்கத்தைத் தேர்ந்தெடுக்கவும்",
        step3_subtitle: "உங்களுக்குத் தேவையான சந்தைப்படுத்தல் பொருட்களைத் தேர்ந்தெடுக்கவும். நீங்கள் விரும்பும் பலவற்றைத் தேர்ந்தெடுக்கவும்.",
        
        step4_title: "படி 4: மொழிபெயர்க்கவும் (விருப்பத்தேர்வு)",
        step4_subtitle: "உங்கள் உள்ளடக்கத்தை மொழிபெயர்ப்பதன் மூலம் பரந்த பார்வையாளர்களை அடையுங்கள்.",

        back_button: "பின்செல்",
        next_button: "அடுத்து",
        generate_button: "எனது உள்ளடக்கத்தை உருவாக்கு",
        generate_button_loading: "உருவாக்குகிறது...",
        start_over_button: "மீண்டும் தொடங்கு",

        output_main_title: "உங்கள் முடிவுகள்",
        output_generating_title: "உங்கள் உள்ளடக்கம் உருவாக்கப்படுகிறது...",
        output_generating_subtitle: "எங்கள் AI கடுமையாக உழைக்கிறது. இதற்கு சிறிது நேரம் ஆகலாம்.",
        output_error_title: "ஒரு பிழை ஏற்பட்டது",
        output_analysis_title: "തന്ത്രപരമായ பகுப்பாய்வு",
        output_analysis_unavailable: "தேர்ந்தெடுக்கப்பட்ட மொழிக்கு பகுப்பாய்வு கிடைக்கவில்லை.",
        output_analysis_audience: "இலக்கு பார்வையாளர்கள்",
        output_analysis_selling_points: "முக்கிய விற்பனை புள்ளிகள்",
        output_analysis_sentiment: "ஒட்டுமொத்த உணர்வு",
        output_page_indicator: "{total} இல் {current} பார்க்கப்படுகிறது",

        copy_button_copy: "நகலெடு",
        copy_button_copied: "நகலெடுக்கப்பட்டது!",
        read_aloud_start: "உள்ளடக்கத்தை உரக்கப் படிக்கவும்",
        read_aloud_stop: "படிப்பதை நிறுத்து",

        content_types: {
            social: 'சமூக ஊடக இடுகை (எ.கா., Instagram, Facebook)',
            description: 'தயாரிப்பு விளக்கம் (மின்-வணிக தளங்களுக்கு)',
            email: 'மின்னஞ்சல் செய்திமடல் அறிவிப்பு',
            blog: 'குறுகிய வலைப்பதிவு இடுகை',
            seo: 'எஸ்சிஓ முக்கிய வார்த்தைகள் & மெட்டா விளக்கம்',
        },
        languages: {
            en: 'ஆங்கிலம் (English)',
            hi: 'இந்தி (हिन्दी)',
            bn: 'பெங்காலி (বাংলা)',
            ta: 'தமிழ்',
            te: 'தெலுங்கு (తెలుగు)',
            mr: 'மராத்தி (மராத்தி)',
        }
    },
    te: {
        header_title: "IndiArt",
        header_subtitle: "మీ సృజనాత్మక మార్కెటింగ్ భాగస్వామి",

        language_selector_title: "మీ భాషను ఎంచుకోండి",

        step1_title: "దశ 1: మీ కళను వివరించండి",
        step1_subtitle: "మీ సృష్టి గురించి మాకు చెప్పండి. మీకు నచ్చినంత వివరంగా ఉండండి!",
        step1_placeholder: "ఉదా., మామిడి చెక్కతో చేతితో చేక్కబడిన చెక్క గిన్నె, సహజమైన తేనెటీగ మైనంతో పాలిష్ చేయబడింది...",
        step1_voice_language_label: "వాయిస్ ఇన్‌పుట్ భాషను ఎంచుకోండి",
        step1_mic_start: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
        step1_mic_stop: "రికార్డింగ్ ఆపండి",

        step2_title: "దశ 2: చిత్రాన్ని జోడించండి",
        step2_subtitle: "ఒక చిత్రం వెయ్యి పదాలకు సమానం. మా AI మీ కళను బాగా అర్థం చేసుకోవడానికి చిత్రం సహాయపడుతుంది.",
        step2_image_alt: "ఉత్పత్తి ప్రివ్యూ",
        step2_remove_button: "చిత్రాన్ని తీసివేయండి",
        step2_upload_button: "ఫైల్‌ను అప్‌లోడ్ చేయండి",
        step2_drag_drop: "లేదా లాగి వదలండి",
        step2_file_types: "PNG, JPG, GIF 10MB వరకు",

        step3_title: "దశ 3: మీ కంటెంట్‌ను ఎంచుకోండి",
        step3_subtitle: "మీకు అవసరమైన మార్కెటింగ్ సామగ్రిని ఎంచుకోండి. మీకు నచ్చినన్ని ఎంచుకోండి.",
        
        step4_title: "దశ 4: అనువదించండి (ఐచ్ఛికం)",
        step4_subtitle: "మీ కంటెంట్‌ను అనువదించడం ద్వారా విస్తృత ప్రేక్షకులను చేరుకోండి.",

        back_button: "వెనుకకు",
        next_button: "తదుపరి",
        generate_button: "నా కంటెంట్‌ను సృష్టించండి",
        generate_button_loading: "సృష్టిస్తోంది...",
        start_over_button: "మళ్లీ ప్రారంభించండి",

        output_main_title: "మీ ఫలితాలు",
        output_generating_title: "మీ కంటెంట్ సృష్టించబడుతోంది...",
        output_generating_subtitle: "మా AI కష్టపడి పనిచేస్తోంది. దీనికి కొంత సమయం పట్టవచ్చు.",
        output_error_title: "ఒక లోపం సంభవించింది",
        output_analysis_title: "వ్యూహాత్మక విశ్లేషణ",
        output_analysis_unavailable: "ఎంచుకున్న భాషకు విశ్లేషణ అందుబాటులో లేదు.",
        output_analysis_audience: "లక్ష్య ప్రేక్షకులు",
        output_analysis_selling_points: "కీలక అమ్మకపు పాయింట్లు",
        output_analysis_sentiment: "మొత్తం భావన",
        output_page_indicator: "{total}లో {current} చూస్తున్నారు",

        copy_button_copy: "కాపీ",
        copy_button_copied: "కాపీ చేయబడింది!",
        read_aloud_start: "కంటెంట్‌ను గట్టిగా చదవండి",
        read_aloud_stop: "చదవడం ఆపండి",

        content_types: {
            social: 'సోషల్ మీడియా పోస్ట్ (ఉదా., ఇన్‌స్టాగ్రామ్, ఫేస్‌బుక్)',
            description: 'ఉత్పత్తి వివరణ (ఇ-కామర్స్ సైట్‌ల కోసం)',
            email: 'ఇమెయిల్ వార్తాలేఖ ప్రకటన',
            blog: 'చిన్న బ్లాగ్ పోస్ట్',
            seo: 'SEO కీవర్డ్‌లు & మెటా వివరణ',
        },
        languages: {
            en: 'ఆంగ్లం (English)',
            hi: 'హిందీ (हिन्दी)',
            bn: 'బెంగాలీ (বাংলা)',
            ta: 'తమిళం (தமிழ்)',
            te: 'తెలుగు',
            mr: 'మరాఠీ (మరాఠీ)',
        }
    },
    mr: {
        header_title: "IndiArt",
        header_subtitle: "तुमचा सर्जनशील विपणन भागीदार",

        language_selector_title: "तुमची भाषा निवडा",

        step1_title: "पायरी १: तुमच्या कलेचे वर्णन करा",
        step1_subtitle: "तुमच्या निर्मितीबद्दल आम्हाला सांगा. तुम्हाला आवडेल तितके तपशीलवार सांगा!",
        step1_placeholder: "उदा., आंब्याच्या लाकडापासून हाताने कोरलेली लाकडी वाटी, नैसर्गिक मेणाने पॉलिश केलेली...",
        step1_voice_language_label: "व्हॉइस इनपुट भाषा निवडा",
        step1_mic_start: "व्हॉइस इनपुट सुरू करा",
        step1_mic_stop: "रेकॉर्डिंग थांबवा",

        step2_title: "पायरी २: एक प्रतिमा जोडा",
        step2_subtitle: "एक चित्र हजार शब्दांच्या बरोबरीचे असते. आमचे AI तुमची कला अधिक चांगल्या प्रकारे समजून घेण्यास मदत करते.",
        step2_image_alt: "उत्पादन पूर्वावलोकन",
        step2_remove_button: "प्रतिमा काढा",
        step2_upload_button: "एक फाईल अपलोड करा",
        step2_drag_drop: "किंवा ड्रॅग आणि ड्रॉप करा",
        step2_file_types: "PNG, JPG, GIF 10MB पर्यंत",

        step3_title: "पायरी ३: तुमची सामग्री निवडा",
        step3_subtitle: "तुम्हाला आवश्यक असलेली विपणन सामग्री निवडा. तुम्हाला पाहिजे तितके निवडा.",
        
        step4_title: "पायरी ४: भाषांतर करा (पर्यायी)",
        step4_subtitle: "तुमच्या सामग्रीचे भाषांतर करून व्यापक प्रेक्षकांपर्यंत पोहोचा.",

        back_button: "मागे",
        next_button: "पुढे",
        generate_button: "माझी सामग्री तयार करा",
        generate_button_loading: "तयार करत आहे...",
        start_over_button: "पुन्हा सुरू करा",
        
        output_main_title: "तुमचे परिणाम",
        output_generating_title: "तुमची सामग्री तयार केली जात आहे...",
        output_generating_subtitle: "आमचे AI कठोर परिश्रम करत आहे. यास थोडा वेळ लागू शकतो.",
        output_error_title: "एक त्रुटी आली",
        output_analysis_title: "रणनीतिक विश्लेषण",
        output_analysis_unavailable: "निवडलेल्या भाषेसाठी विश्लेषण उपलब्ध नाही.",
        output_analysis_audience: "लक्ष्यित प्रेक्षक",
        output_analysis_selling_points: "मुख्य विक्री मुद्दे",
        output_analysis_sentiment: "एकूण भावना",
        output_page_indicator: "{total} पैकी {current} पाहत आहात",

        copy_button_copy: "कॉपी करा",
        copy_button_copied: "कॉपी केले!",
        read_aloud_start: "सामग्री मोठ्याने वाचा",
        read_aloud_stop: "वाचणे थांबवा",

        content_types: {
            social: 'सोशल मीडिया पोस्ट (उदा., इंस्टाग्राम, फेसबुक)',
            description: 'उत्पादन वर्णन (ई-कॉमर्स साइटसाठी)',
            email: 'ईमेल वृत्तपत्र घोषणा',
            blog: 'लहान ब्लॉग पोस्ट',
            seo: 'एसईओ कीवर्ड आणि मेटा वर्णन',
        },
        languages: {
            en: 'इंग्रजी (English)',
            hi: 'हिंदी (हिन्दी)',
            bn: 'बंगाली (বাংলা)',
            ta: 'तमिळ (தமிழ்)',
            te: 'तेलुगु (తెలుగు)',
            mr: 'मराठी',
        }
    }
};

export const getTranslator = (lang: Language) => {
    const t = (key: string, replacements?: { [key: string]: string | number }): string => {
        const value = translations[lang][key] || translations.en[key];
        if (typeof value !== 'string') return key;

        if (replacements) {
            return Object.entries(replacements).reduce((acc, [k, v]) => {
                return acc.replace(`{${k}}`, String(v));
            }, value);
        }
        return value;
    };

    const tContentType = (key: ContentType): string => {
        const contentTypes = translations[lang].content_types as Record<ContentType, string>;
        const fallback = translations.en.content_types as Record<ContentType, string>;
        return contentTypes[key] || fallback[key];
    }
    
    const tLanguage = (key: Language): string => {
        const languages = translations[lang].languages as Record<Language, string>;
        const fallback = translations.en.languages as Record<Language, string>;
        return languages[key] || fallback[key];
    }

    return { t, tContentType, tLanguage };
};
