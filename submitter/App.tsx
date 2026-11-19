
import React from 'react';
import Header from './components/Header';
import DigitalForm from './components/DigitalForm';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { isRtl } = useLanguage();

  return (
    <div className="min-h-screen bg-qatar-light flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header now contains the branding and global controls */}
      <Header />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <DigitalForm />
        </div>
      </main>
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
