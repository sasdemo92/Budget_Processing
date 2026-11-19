
import React from 'react';
import { Bell, Search, User, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, isRtl, language, setLanguage } = useLanguage();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <h2 className="text-xl font-bold text-gray-800">
          {t('case_management')}
        </h2>
      </div>

      <div className="flex items-center space-x-6 rtl:space-x-reverse">
        {/* Language Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
           <button 
             onClick={() => setLanguage('en')}
             className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white text-qatar-maroon shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
           >
             EN
           </button>
           <button 
             onClick={() => setLanguage('ar')}
             className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === 'ar' ? 'bg-white text-qatar-maroon shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
           >
             عربي
           </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 focus-within:border-qatar-maroon focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={t('search_records')} 
            className="bg-transparent border-none focus:ring-0 text-sm mx-2 w-48 outline-none text-gray-600"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
