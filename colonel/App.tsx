
import React, { useState } from 'react';
import Header from './components/Header';
import DigitalForm from './components/DigitalForm';
import KPIDashboard from './components/KPIDashboard';
import CaseManagement from './components/CaseManagement';
import GlobalAssistant from './components/GlobalAssistant';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TabType } from './types';

const AppContent: React.FC = () => {
  const { isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.KPI_DASHBOARD);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6 relative max-w-7xl mx-auto w-full">
        {activeTab === TabType.DIGITAL_FORM && <DigitalForm />}
        {activeTab === TabType.KPI_DASHBOARD && <KPIDashboard />}
        {activeTab === TabType.CASE_MANAGEMENT && <CaseManagement />}
      </main>
      <GlobalAssistant />
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
