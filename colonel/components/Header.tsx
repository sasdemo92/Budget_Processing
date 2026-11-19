
import React, { useState } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOF_LOGO_URL, NAVIGATION_ITEMS } from '../constants';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const getTranslatedLabel = (tabId: TabType) => {
    switch (tabId) {
      case TabType.DIGITAL_FORM: return t('digital_form');
      case TabType.KPI_DASHBOARD: return t('kpi_dashboard');
      case TabType.CASE_MANAGEMENT: return t('case_management');
      default: return '';
    }
  };

  const handleTabClick = (tabId: TabType) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm flex-shrink-0 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            
            {/* Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 rtl:-mr-2 mr-2 rtl:ml-2 text-gray-500 hover:text-qatar-maroon hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          <div className="flex items-center gap-4">
             {/* Search Bar - Compact */}
            <div className="hidden lg:flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 focus-within:border-qatar-maroon transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder={t('search_records')} 
                className="bg-transparent border-none focus:ring-0 text-xs mx-2 w-32 outline-none text-gray-600 placeholder-gray-400"
              />
            </div>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 hover:text-qatar-maroon transition-colors px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 group"
            >
              <Globe size={16} className="group-hover:text-qatar-maroon transition-colors" />
              <span className="text-xs font-bold uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full md:w-72 bg-white border-b border-r border-gray-200 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
           <div className="p-2 space-y-1">
             {NAVIGATION_ITEMS.map((item) => (
               <button
                 key={item.id}
                 onClick={() => handleTabClick(item.id)}
                 className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all ${
                   activeTab === item.id 
                     ? 'bg-qatar-maroon text-white shadow-md shadow-maroon-900/10' 
                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                 }`}
               >
                 <span className={`${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>
                   {item.icon}
                 </span>
                 <span className="font-medium text-sm">{getTranslatedLabel(item.id)}</span>
               </button>
             ))}
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
