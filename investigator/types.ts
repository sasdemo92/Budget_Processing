import React from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

export enum TabType {
  DIGITAL_FORM = 'digital_form',
  KPI_DASHBOARD = 'kpi_dashboard',
  CASE_MANAGEMENT = 'case_management',
}