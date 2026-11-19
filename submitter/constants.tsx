
import React from 'react';
import { FileText, BarChart3, Briefcase } from 'lucide-react';
import { TabType, NavItem } from './types';

export const MOF_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Emblem_of_Qatar-2022.svg/360px-Emblem_of_Qatar-2022.svg.png";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: TabType.DIGITAL_FORM,
    label: 'Digital Form',
    icon: <FileText size={20} />
  },
  {
    id: TabType.KPI_DASHBOARD,
    label: 'KPI Dashboard',
    icon: <BarChart3 size={20} />
  },
  {
    id: TabType.CASE_MANAGEMENT,
    label: 'Case Management',
    icon: <Briefcase size={20} />
  }
];
