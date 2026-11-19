
import React from 'react';
import { Bell, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { isRtl, language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Branding Section Removed */}
      <div></div>

      {/* Right Controls */}
      <div className="flex items-center space-x-6 rtl:space-x-reverse">
        
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-100 transition-colors"
        >
          <Globe size={16} className="text-qatar-maroon" />
          <span className="text-xs font-bold uppercase">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-qatar-maroon hover:bg-red-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className={`absolute top-2 ${isRtl ? 'left-2' : 'right-2'} w-2 h-2 bg-qatar-maroon rounded-full border-2 border-white`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
