
import React from 'react';
import { FileText, Activity, Briefcase } from 'lucide-react';
import { TabType } from './types';

export const MOF_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Emblem_of_Qatar-2022.svg/360px-Emblem_of_Qatar-2022.svg.png";

export const NAVIGATION_ITEMS = [
  {
    id: TabType.DIGITAL_FORM,
    icon: <FileText size={20} />,
  },
  {
    id: TabType.KPI_DASHBOARD,
    icon: <Activity size={20} />,
  },
  {
    id: TabType.CASE_MANAGEMENT,
    icon: <Briefcase size={20} />,
  }
];
