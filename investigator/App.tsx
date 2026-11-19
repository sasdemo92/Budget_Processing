
import React from 'react';
import Header from './components/Header';
import CaseManagement from './components/CaseManagement';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { isRtl } = useLanguage();

  return (
    <div className="flex h-screen bg-qatar-light" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar removed as requested */}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <CaseManagement />
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
