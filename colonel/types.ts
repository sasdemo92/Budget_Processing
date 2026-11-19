
import React from 'react';

export type Language = 'en' | 'ar';

export enum TabType {
  DIGITAL_FORM = 'digital-form',
  KPI_DASHBOARD = 'kpi-dashboard',
  CASE_MANAGEMENT = 'case-management'
}

export interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}
