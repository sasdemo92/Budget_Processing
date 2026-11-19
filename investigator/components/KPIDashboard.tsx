
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, ComposedChart, Line } from 'recharts';
// Added CheckCircle to imports from lucide-react
import { ArrowUpRight, TrendingUp, Users, DollarSign, Activity, Clock, ShieldCheck, AlertTriangle, FileText, Filter, Calendar, Building2, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const COLORS = ['#8a1538', '#a6824a', '#6b7280', '#10b981', '#ef4444', '#f59e0b'];

const efficiencyData = [
  { stage: 'Submission', time: 1.2, backlog: 45, stageAr: 'التقديم' },
  { stage: 'Officer', time: 2.5, backlog: 120, stageAr: 'المسؤول' },
  { stage: 'Financial', time: 3.8, backlog: 85, stageAr: 'المالي' },
  { stage: 'Legal', time: 4.1, backlog: 30, stageAr: 'القانوني' },
  { stage: 'Final', time: 1.5, backlog: 15, stageAr: 'النهائي' },
];

const budgetData = [
  { year: '2024', planned: 500, approved: 420 },
  { year: '2025', planned: 550, approved: 480 },
  { year: '2026', planned: 600, approved: 510 },
  { year: '2027', planned: 650, approved: 590 },
  { year: '2028', planned: 700, approved: 640 },
];

const complianceData = [
  { name: 'Approved', value: 75, nameAr: 'معتمد' },
  { name: 'Rejected', value: 25, nameAr: 'مرفوض' },
];

const rejectionReasons = [
  { reason: 'Missing Docs', value: 40, reasonAr: 'نقص مستندات' },
  { reason: 'Budget Ceiling', value: 30, reasonAr: 'سقف الميزانية' },
  { reason: 'Scope Mismatch', value: 20, reasonAr: 'عدم توافق النطاق' },
  { reason: 'Policy Exception', value: 10, reasonAr: 'استثناء سياسة' },
];

const officerWorkload = [
  { name: 'Ali', volume: 85, time: 2.1 },
  { name: 'Khalid', volume: 92, time: 1.8 },
  { name: 'Fatima', volume: 78, time: 2.5 },
  { name: 'Sarah', volume: 65, time: 2.2 },
  { name: 'Ahmed', volume: 110, time: 1.9 },
];

const KPICard: React.FC<{ title: string; value: string; sub: string; icon: React.ReactNode; color: string; isRtl: boolean }> = ({ title, value, sub, icon, color, isRtl }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl transition-colors ${color} bg-opacity-10 group-hover:bg-opacity-20`}>
        {icon}
      </div>
      <div className="flex items-center space-x-1 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full uppercase tracking-wider">
        <TrendingUp size={10} className={isRtl ? 'ml-1' : 'mr-1'} />
        Live
      </div>
    </div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
    <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-[10px] font-medium text-gray-500">{sub}</p>
  </div>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-1">
      <div className="p-1.5 bg-qatar-maroon/5 text-qatar-maroon rounded-lg">{icon}</div>
      <h4 className="text-lg font-bold text-gray-800">{title}</h4>
    </div>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

const KPIDashboard: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-2 z-20">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-qatar-maroon bg-red-50 px-3 py-1.5 rounded-xl font-bold text-sm">
            <Filter size={16} />
            <span>{t('filters')}</span>
          </div>
          <select className="bg-gray-50 border-none text-xs font-bold text-gray-600 rounded-xl px-4 py-2 focus:ring-1 focus:ring-qatar-maroon">
            <option>{t('filter_dept')}</option>
          </select>
          <select className="bg-gray-50 border-none text-xs font-bold text-gray-600 rounded-xl px-4 py-2 focus:ring-1 focus:ring-qatar-maroon">
            <option>{t('filter_type')}</option>
          </select>
          <select className="bg-gray-50 border-none text-xs font-bold text-gray-600 rounded-xl px-4 py-2 focus:ring-1 focus:ring-qatar-maroon">
            <option>{t('filter_status')}</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-50 p-1 rounded-xl">
           <button className="px-3 py-1.5 text-[10px] font-bold bg-white text-qatar-maroon shadow-sm rounded-lg uppercase tracking-wider">7D</button>
           <button className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">30D</button>
           <button className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">90D</button>
           <button className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">ALL</button>
        </div>
      </div>

      {/* 1. Executive Overview */}
      <section>
        <SectionTitle icon={<Activity size={18} />} title={t('executive_overview')} desc="High-level performance metrics and throughput." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title={t('total_requests')} value="2,482" sub="+12% from last month" icon={<FileText size={20} />} color="text-blue-600" isRtl={isRtl} />
          <KPICard title={t('total_approved')} value="1,842" sub="74.2% Success rate" icon={<CheckCircle size={20} />} color="text-green-600" isRtl={isRtl} />
          <KPICard title={t('total_rejected')} value="640" sub="25.8% Refusal rate" icon={<AlertTriangle size={20} />} color="text-red-600" isRtl={isRtl} />
          <KPICard title={t('avg_cycle_time')} value="4.2" sub="-0.5 days improvement" icon={<Clock size={20} />} color="text-orange-500" isRtl={isRtl} />
          <KPICard title={t('sla_compliance')} value="92.4%" sub="Target: >90%" icon={<ShieldCheck size={20} />} color="text-indigo-600" isRtl={isRtl} />
          <KPICard title={t('total_value_ytd')} value={isRtl ? '٢٤٥ م' : '245.2M'} sub="QAR Approved" icon={<DollarSign size={20} />} color="text-qatar-maroon" isRtl={isRtl} />
        </div>
      </section>

      {/* 2. Process Efficiency & 3. Budget Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Efficiency */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <SectionTitle icon={<TrendingUp size={18} />} title={t('process_efficiency')} desc={t('avg_time_stage')} />
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={efficiencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey={isRtl ? "stageAr" : "stage"} type="category" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} width={80} orientation={isRtl ? 'right' : 'left'} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="time" fill="#8a1538" radius={[0, 4, 4, 0]} barSize={20} name="Days" />
                <Line type="monotone" dataKey="backlog" stroke="#a6824a" strokeWidth={2} name="Backlog" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-orange-50 rounded-xl flex items-center space-x-4 rtl:space-x-reverse">
             <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm"><AlertTriangle size={20} /></div>
             <div>
                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">{t('sla_delays')}</p>
                <p className="text-sm font-medium text-orange-700">14 {isRtl ? 'طلبات تجاوزت المدة (٥.٦٪)' : 'Requests delayed beyond SLA (5.6%)'}</p>
             </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <SectionTitle icon={<DollarSign size={18} />} title={t('budget_utilization')} desc={t('planned_vs_approved')} />
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetData}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8a1538" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8a1538" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} reversed={isRtl} />
                <YAxis hide orientation={isRtl ? 'right' : 'left'} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="planned" stroke="#6b7280" fillOpacity={1} fill="url(#colorPlanned)" strokeWidth={2} name="Planned (M)" />
                <Area type="monotone" dataKey="approved" stroke="#8a1538" fillOpacity={1} fill="url(#colorApproved)" strokeWidth={2} name="Approved (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t('utilization_rate')}</p>
                <p className="text-lg font-bold text-gray-900">84.2%</p>
             </div>
             <div className="p-4 bg-qatar-maroon text-white rounded-xl shadow-lg shadow-maroon-900/10">
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">{t('risk_indicators')}</p>
                <p className="text-sm font-bold">3 {t('exceeding_threshold')}</p>
             </div>
          </div>
        </div>
      </div>

      {/* 4. Approval Quality & 5. Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quality & Compliance */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <SectionTitle icon={<ShieldCheck size={18} />} title={t('approval_compliance')} desc={t('rejection_reasons')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={complianceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {rejectionReasons.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                    <span>{isRtl ? item.reasonAr : item.reason}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-qatar-gold h-full rounded-full" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2">
             {[
               { label: t('change_orders'), val: '42' },
               { label: t('returned_requests'), val: '128' },
               { label: t('policy_exceptions'), val: '12' }
             ].map((m, i) => (
               <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1 leading-tight h-6 flex items-center justify-center">{m.label}</p>
                  <p className="text-base font-bold text-gray-800">{m.val}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Workload */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <SectionTitle icon={<Users size={18} />} title={t('workload_accountability')} desc={t('requests_per_officer')} />
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={officerWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} orientation={isRtl ? 'right' : 'left'} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="volume" fill="#a6824a" radius={[0, 4, 4, 0]} barSize={20} name="Vol" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center justify-between p-4 bg-qatar-light rounded-xl">
             <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="p-2 bg-white rounded-lg text-qatar-maroon shadow-sm"><Building2 size={20} /></div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('volume_by_dept')}</p>
                   <p className="text-sm font-bold text-gray-800">{isRtl ? 'شؤون الخزانة' : 'Treasury Affairs'} (34%)</p>
                </div>
             </div>
             <button className="text-[10px] font-bold text-qatar-maroon hover:underline uppercase tracking-widest">
                Drill Down
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
