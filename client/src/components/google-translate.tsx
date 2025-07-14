import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Initialize Google Translate
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'hi',
            includedLanguages: 'hi,en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            gaTrack: true,
          },
          'google_translate_element'
        );
      }
    };

    // Set up the callback
    window.googleTranslateElementInit = initializeGoogleTranslate;

    // Load Google Translate script if not already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      // If script is already loaded, initialize directly
      initializeGoogleTranslate();
    }

    // Store language preference in localStorage
    const handleLanguageChange = () => {
      const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (translateElement) {
        translateElement.addEventListener('change', (e) => {
          const target = e.target as HTMLSelectElement;
          localStorage.setItem('preferredLanguage', target.value);
        });
      }
    };

    // Set up language change listener after a short delay
    setTimeout(handleLanguageChange, 1000);

    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setTimeout(() => {
        const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (translateElement && translateElement.value !== savedLanguage) {
          translateElement.value = savedLanguage;
          translateElement.dispatchEvent(new Event('change'));
        }
      }, 1500);
    }

    return () => {
      // Cleanup
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element" className="text-sm"></div>
    </div>
  );
}
