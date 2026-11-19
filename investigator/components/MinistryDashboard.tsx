
import React from 'react';
import { ArrowLeft, Building2, TrendingUp, AlertTriangle, PieChart as PieIcon, DollarSign, Activity, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface MinistryDashboardProps {
  ministryNameEn: string;
  ministryNameAr: string;
  onClose: () => void;
}

const COLORS = ['#8a1538', '#a6824a', '#6b7280', '#10b981'];

const MinistryDashboard: React.FC<MinistryDashboardProps> = ({ ministryNameEn, ministryNameAr, onClose }) => {
  const { t, isRtl } = useLanguage();

  // Mock data tailored for the ministry view
  const budgetTrend = [
    { year: '2020', budget: 120, spent: 115 },
    { year: '2021', budget: 135, spent: 130 },
    { year: '2022', budget: 150, spent: 148 },
    { year: '2023', budget: 160, spent: 155 },
    { year: '2024', budget: 180, spent: 140 }, // Current year gap
  ];

  const projectStatus = [
    { name: 'On Track', value: 45 },
    { name: 'Delayed', value: 15 },
    { name: 'Completed', value: 30 },
    { name: 'At Risk', value: 10 },
  ];

  const requestReasons = [
    { name: 'Maintenance', value: 45, nameAr: 'صيانة' },
    { name: 'Licenses', value: 38, nameAr: 'تراخيص' },
    { name: 'Consulting', value: 32, nameAr: 'استشارات' },
    { name: 'Equipment', value: 28, nameAr: 'معدات' },
    { name: 'Staffing', value: 20, nameAr: 'توظيف' },
  ];

  const rejectionReasons = [
    { name: 'Budget Cap', value: 25, nameAr: 'سقف الميزانية' },
    { name: 'Missing Docs', value: 20, nameAr: 'نقص مستندات' },
    { name: 'Policy', value: 15, nameAr: 'سياسة' },
    { name: 'Info Needed', value: 12, nameAr: 'معلومات ناقصة' },
    { name: 'Duplicate', value: 8, nameAr: 'تكرار' },
  ];

  return (
    <div className="bg-gray-50 min-h-full flex flex-col animate-fade-in absolute inset-0 z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 size={20} className="text-qatar-maroon" />
              {isRtl ? ministryNameAr : ministryNameEn}
            </h2>
            <p className="text-xs text-gray-500 font-medium">{t('ministry_overview')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
             <Activity size={14} />
             {t('ministry_health')}: 94%
           </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieIcon size={18} /></div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">+5%</span>
               </div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('total_projects')}</p>
               <p className="text-2xl font-bold text-gray-900 mt-1">124</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><DollarSign size={18} /></div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">YTD</span>
               </div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('budget_utilized')}</p>
               <p className="text-2xl font-bold text-gray-900 mt-1">78.2%</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={18} /></div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">High</span>
               </div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('critical_risks')}</p>
               <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><TrendingUp size={18} /></div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Avg</span>
               </div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('avg_cycle_time')}</p>
               <p className="text-2xl font-bold text-gray-900 mt-1">12 Days</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Trend */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-gray-400" />
                {t('budget_performance')}
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={budgetTrend}>
                    <defs>
                      <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8a1538" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#8a1538" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a6824a" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#a6824a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" orientation={isRtl ? 'right' : 'left'} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="budget" stroke="#8a1538" fillOpacity={1} fill="url(#colorBudget)" strokeWidth={3} name="Allocated" />
                    <Area type="monotone" dataKey="spent" stroke="#a6824a" fillOpacity={1} fill="url(#colorSpent)" strokeWidth={3} name="Spent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Project Status */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                <PieIcon size={16} className="text-gray-400" />
                {t('project_status_dist')}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Graphs: Request Reasons & Rejection Reasons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Request Reasons */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                {t('top_request_reasons')}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={requestReasons} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f3f4f6" />
                     <XAxis type="number" hide reversed={isRtl} />
                     <YAxis dataKey={isRtl ? "nameAr" : "name"} type="category" width={100} tick={{fontSize: 10, fill: '#6b7280'}} axisLine={false} tickLine={false} orientation={isRtl ? "right" : "left"} />
                     <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="value" fill="#8a1538" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Rejection Reasons */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                <AlertTriangle size={16} className="text-gray-400" />
                {t('top_rejection_reasons')}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rejectionReasons} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f3f4f6" />
                     <XAxis type="number" hide reversed={isRtl} />
                     <YAxis dataKey={isRtl ? "nameAr" : "name"} type="category" width={100} tick={{fontSize: 10, fill: '#6b7280'}} axisLine={false} tickLine={false} orientation={isRtl ? "right" : "left"} />
                     <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MinistryDashboard;
