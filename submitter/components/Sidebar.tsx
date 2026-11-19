
import React from 'react';
import { TabType } from '../types';
import { NAVIGATION_ITEMS, MOF_LOGO_URL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { language, setLanguage, t, isRtl } = useLanguage();

  const getTranslatedLabel = (tabId: TabType) => {
    switch (tabId) {
      case TabType.DIGITAL_FORM: return t('digital_form');
      case TabType.KPI_DASHBOARD: return t('kpi_dashboard');
      case TabType.CASE_MANAGEMENT: return t('case_management');
      default: return '';
    }
  };

  return (
    <div className={`w-64 bg-white border-${isRtl ? 'l' : 'r'} border-gray-200 flex flex-col h-full`}>
      {/* Brand Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-gray-100">
        <img 
          src={MOF_LOGO_URL} 
          alt="MoF Qatar Logo" 
          className="h-20 w-auto mb-4"
        />
        <div className="text-center">
          <h1 className="text-sm font-bold text-qatar-maroon uppercase tracking-wider">{t('ministry_name')}</h1>
          <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">{t('state_of_qatar')}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-qatar-maroon text-white shadow-lg shadow-maroon-900/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-qatar-maroon'}`}>
              {item.icon}
            </span>
            <span className="font-semibold text-sm">{getTranslatedLabel(item.id)}</span>
          </button>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t('language')}</p>
          <div className="flex justify-between items-center">
            <span 
              onClick={() => setLanguage('en')}
              className={`text-xs font-semibold cursor-pointer transition-colors ${language === 'en' ? 'text-qatar-maroon' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t('english')}
            </span>
            <span 
              onClick={() => setLanguage('ar')}
              className={`text-xs font-bold cursor-pointer transition-colors ${language === 'ar' ? 'text-qatar-maroon' : 'text-gray-400 hover:text-gray-900'}`}
            >
              {t('arabic')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
