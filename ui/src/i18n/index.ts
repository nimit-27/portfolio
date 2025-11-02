import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        experience: 'Experience',
        contact: 'Contact',
        language: 'Language',
      },
      hero: {
        intro: "Hi, I'm Nimit — I make data dance and pixels shine.",
        viewProjects: 'View Projects',
        downloadResume: 'Download Resume',
        contact: 'Contact',
      },
      about: {
        title: 'Story so far',
        whatIBelieve: 'What I believe',
        belief: 'Design should explain the system.',
        cards: {
          frontend: 'Frontend Craft',
          backend: 'Backend Systems',
          visual: 'Visual Thinking',
        },
        subtitle: 'I build AI-powered dashboards and custom visualizations at Incedo and love mixing engineering with UI magic.',
      },
      projects: {
        title: 'What I build',
        filters: {
          all: 'All',
          dashboards: 'Dashboards',
          backend: 'Backend',
          fun: 'Fun',
        },
        problem: 'Problem',
        techUsed: 'Tech used',
        depth: 'Tech depth',
      },
      skills: {
        title: 'Stuff I care about',
        creative: 'Creative',
        logical: 'Logical',
        architectural: 'Architectural',
      },
      experience: {
        title: "Where I've worked",
        add: '+ Add Experience',
        adminMode: 'Admin mode',
      },
      contact: {
        title: 'Let’s collaborate',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send it',
        alt: 'Prefer WhatsApp or LinkedIn? Tap here.',
        success: 'Thanks! Your message is on its way.',
      },
    },
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        about: 'परिचय',
        projects: 'प्रोजेक्ट्स',
        experience: 'अनुभव',
        contact: 'संपर्क',
        language: 'भाषा',
      },
      hero: {
        intro: 'नमस्ते, मैं निमित हूँ — डेटा को नचाता हूँ और पिक्सल्स को चमकाता हूँ।',
        viewProjects: 'प्रोजेक्ट देखें',
        downloadResume: 'रिज़्यूमे डाउनलोड करें',
        contact: 'संपर्क करें',
      },
      about: {
        title: 'मेरी कहानी',
        whatIBelieve: 'मेरा विश्वास',
        belief: 'डिज़ाइन को सिस्टम समझाना चाहिए।',
        cards: {
          frontend: 'फ्रंटएंड क्राफ्ट',
          backend: 'बैकएंड सिस्टम्स',
          visual: 'विज़ुअल थिंकिंग',
        },
        subtitle: 'इंसीडो में मैं AI डैशबोर्ड और कस्टम विज़ुअलाइज़ेशन बनाता हूँ और इंजीनियरिंग व UI का मेल पसंद करता हूँ।',
      },
      projects: {
        title: 'मैं क्या बनाता हूँ',
        filters: {
          all: 'सभी',
          dashboards: 'डैशबोर्ड्स',
          backend: 'बैकएंड',
          fun: 'मज़ेदार',
        },
        problem: 'चुनौती',
        techUsed: 'टेक',
        depth: 'टेक गहराई',
      },
      skills: {
        title: 'मुझे क्या पसंद है',
        creative: 'क्रिएटिव',
        logical: 'लॉजिकल',
        architectural: 'आर्किटेक्चरल',
      },
      experience: {
        title: 'जहां मैंने काम किया',
        add: '+ अनुभव जोड़ें',
        adminMode: 'एडमिन मोड',
      },
      contact: {
        title: 'चलो सहयोग करें',
        name: 'नाम',
        email: 'ईमेल',
        message: 'संदेश',
        submit: 'भेजें',
        alt: 'व्हाट्सऐप या लिंक्डइन पसंद है? यहाँ टैप करें।',
        success: 'धन्यवाद! आपका संदेश भेज दिया गया है।',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
