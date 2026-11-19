
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line, Legend, Cell, BarChart, PieChart, Pie } from 'recharts';
import { 
  TrendingUp, DollarSign, Clock, ShieldCheck, AlertTriangle, Filter, CheckCircle, 
  MoreHorizontal, MapPin, List, Edit3, Send, Trash2, RefreshCw, FileText, Users, X, ArrowUpRight, ArrowDownRight, AlignCenter, Search, GitMerge
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { rawMinistriesData, baseEfficiencyData, baseBudgetData, requestReasonsDef, rejectionReasonsDef } from '../data';

// Define the 13 specific statuses requested
const STATUS_DEFINITIONS = [
  { id: -1, code: 'Rejected', en: 'Rejected', ar: 'مرفوض', color: 'text-red-600', bg: 'bg-red-50', icon: 'reject' },
  { id: 0, code: 'Draft', en: 'Draft', ar: 'مسودة', color: 'text-gray-600', bg: 'bg-gray-50', icon: 'draft' },
  { id: 1, code: 'Submitted', en: 'Submitted for Approval', ar: 'تم الإرسال للموافقة', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'send' },
  { id: 2, code: 'InProgress', en: 'In-Progress', ar: 'تحت الإجراء', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'clock' },
  { id: 8, code: 'FinalApproval', en: 'Submitted for final Approval', ar: 'تم الارسال للإعتماد', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: 'shield' },
  { id: 10, code: 'Approved', en: 'Approved', ar: 'موافق عليه', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'check' },
  { id: 11, code: 'Updated', en: 'Updated', ar: 'معدلة', color: 'text-teal-600', bg: 'bg-teal-50', icon: 'update' },
  { id: 20, code: 'Deleted', en: 'Deleted', ar: 'ملغاة', color: 'text-slate-500', bg: 'bg-slate-100', icon: 'delete' },
  { id: 31, code: 'DraftMod', en: 'Draft Modifying', ar: 'مسودة - تعديل', color: 'text-gray-700', bg: 'bg-gray-100', icon: 'draft' },
  { id: 32, code: 'SubMod', en: 'Submitted for Approval - Modify', ar: 'مرسل للموافقة - تعديل', color: 'text-amber-700', bg: 'bg-amber-100', icon: 'send' },
  { id: 33, code: 'InProgMod', en: 'In Progress - Modify', ar: 'تحت الإجراء - تعديل', color: 'text-blue-700', bg: 'bg-blue-100', icon: 'clock' },
  { id: 34, code: 'FinalMod', en: 'For final approval - Modify', ar: 'مرسل للإعتماد النهائي - تعديل', color: 'text-indigo-700', bg: 'bg-indigo-100', icon: 'shield' },
  { id: 35, code: 'ModReject', en: 'Modify Rejected', ar: 'التعديل مرفوض', color: 'text-red-700', bg: 'bg-red-100', icon: 'reject' },
];

const getIcon = (type: string, size: number = 16) => {
  switch (type) {
    case 'reject': return <AlertTriangle size={size} />;
    case 'draft': return <Edit3 size={size} />;
    case 'send': return <Send size={size} />;
    case 'clock': return <Clock size={size} />;
    case 'shield': return <ShieldCheck size={size} />;
    case 'check': return <CheckCircle size={size} />;
    case 'update': return <RefreshCw size={size} />;
    case 'delete': return <Trash2 size={size} />;
    default: return <FileText size={size} />;
  }
};

// Map Styles (Clean/Silver)
const mapStyles = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
  { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
];

const KPICard: React.FC<{ title: string; value: number; iconType: string; color: string; bg: string }> = ({ title, value, iconType, color, bg }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full flex flex-col justify-between h-28 relative overflow-hidden group">
    
    {/* Decorative Circle */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${bg} opacity-50 group-hover:scale-110 transition-transform duration-500`}></div>
    
    <div className="relative z-10 flex justify-between items-start">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg} ${color} shadow-sm`}>
        {getIcon(iconType, 18)}
      </div>
    </div>

    <div className="relative z-10 mt-3">
      <h3 className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</h3>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight line-clamp-2 min-h-[2.5em]">{title}</p>
    </div>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; action?: React.ReactNode }> = ({ title, children, icon, action }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center shrink-0 bg-gray-50/50">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {icon && <span className="text-gray-400">{icon}</span>}
        <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">{title}</h3>
      </div>
      {action || <button className="text-gray-400 hover:text-qatar-maroon"><MoreHorizontal size={14} /></button>}
    </div>
    <div className="p-3 flex-1 min-h-0 relative">
      {children}
    </div>
  </div>
);

const MinistryMap: React.FC<{ highlightedId: string }> = ({ highlightedId }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const checkGoogleMaps = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
            clearInterval(checkGoogleMaps);
            setMapLoaded(true);
            initMap();
        }
    }, 100);
    return () => clearInterval(checkGoogleMaps);
  }, [t]); 

  useEffect(() => {
      if (!mapLoaded || markersRef.current.length === 0) return;
      
      markersRef.current.forEach(marker => {
          const isSelected = highlightedId === 'all' || marker.get('ministryId') === highlightedId;
          marker.setOpacity(isSelected ? 1.0 : 0.4);
          marker.setZIndex(isSelected ? 10 : 1);
      });
  }, [highlightedId, mapLoaded]);

  const initMap = () => {
    if (!mapRef.current || !(window as any).google) return;

    const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: 25.3000, lng: 51.5200 },
        zoom: 11,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    });

    const infoWindow = new (window as any).google.maps.InfoWindow({
        disableAutoPan: true
    });

    markersRef.current = [];

    rawMinistriesData.forEach((m) => {
        const marker = new (window as any).google.maps.Marker({
            position: { lat: m.lat, lng: m.lng },
            map,
            title: t(m.key),
            icon: {
                path: (window as any).google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: m.pending > 1 ? '#ef4444' : '#8a1538',
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: '#ffffff',
            },
        });
        
        marker.set('ministryId', m.id);
        markersRef.current.push(marker);

        const contentString = `
            <div style="font-family: 'Inter', sans-serif; padding: 4px; min-width: 120px;">
                <h3 style="font-weight: bold; color: #8a1538; margin-bottom: 6px; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;">${t(m.key)}</h3>
                <div style="font-size: 11px; color: #4b5563;">
                    <p style="margin-bottom: 2px;"><strong>${t('req_volume')}:</strong> ${m.requests}</p>
                    <p><strong>Budget:</strong> ${(m.budget / 1000000).toFixed(1)}M</p>
                </div>
            </div>
        `;

        marker.addListener("mouseover", () => {
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
    });
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-50 relative">
        {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-medium">
                Loading Map...
            </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

// Modal for Employee Details
const EmployeeDetailModal: React.FC<{ employee: any; onClose: () => void }> = ({ employee, onClose }) => {
  const { t, isRtl } = useLanguage();

  if (!employee) return null;

  // Mock data for graphs
  const trendData = [
    { month: 'Jan', volume: employee.volume * 0.1 },
    { month: 'Feb', volume: employee.volume * 0.15 },
    { month: 'Mar', volume: employee.volume * 0.2 },
    { month: 'Apr', volume: employee.volume * 0.12 },
    { month: 'May', volume: employee.volume * 0.23 },
    { month: 'Jun', volume: employee.volume * 0.2 },
  ];

  const pieData = [
    { name: t('decision_approved'), value: employee.approvalRate, fill: '#10b981' },
    { name: t('decision_rejected'), value: employee.rejectRate, fill: '#ef4444' },
    { name: t('decision_modified'), value: employee.reworkRate, fill: '#f59e0b' },
  ];

  const entitiesData = useMemo(() => {
     let data: any[] = [];
     if (employee.bias && employee.bias !== 'Mix') {
         // Primary
         data.push({ name: t(employee.bias), count: Math.round(employee.volume * 0.6) });
         // Others
         const others = rawMinistriesData.filter(m => m.key !== employee.bias).slice(0, 3);
         others.forEach(o => {
             data.push({ name: t(o.key), count: Math.round(employee.volume * 0.1) });
         });
     } else {
         // Mix
         const mix = rawMinistriesData.slice(0, 5);
         mix.forEach(m => {
             data.push({ name: t(m.key), count: Math.round(employee.volume * 0.15) });
         });
     }
     return data.sort((a, b) => b.count - a.count);
  }, [employee, t]);

  const collaborationData = useMemo(() => {
    return [
        { name: 'Mohammed Ali', role: 'Approver', volume: 42, time: 1.5, pattern: 'pattern_efficient', patternType: 'positive' },
        { name: 'Sarah Khan', role: 'Reviewer 2', volume: 28, time: 5.2, pattern: 'pattern_slow', patternType: 'negative' },
        { name: 'John Doe', role: 'Financial Officer', volume: 15, time: 2.1, pattern: 'pattern_high_reject', patternType: 'warning' },
        { name: 'Khalid Othman', role: 'Reviewer 1', volume: 12, time: 2.4, pattern: 'pattern_normal', patternType: 'neutral' },
    ];
  }, []);

  const getPatternBadge = (type: string, label: string) => {
      let styles = 'bg-gray-100 text-gray-600';
      if (type === 'positive') styles = 'bg-green-100 text-green-700';
      if (type === 'negative') styles = 'bg-red-100 text-red-700';
      if (type === 'warning') styles = 'bg-amber-100 text-amber-700';
      
      return (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${styles}`}>
              {t(label)}
          </span>
      );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="h-12 w-12 rounded-full bg-qatar-maroon text-white flex items-center justify-center font-bold text-lg">
                   {employee.displayName.charAt(0)}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900">{employee.displayName}</h2>
                   <p className="text-sm text-gray-500 font-medium">{employee.role} • {employee.bias} Specialist</p>
                </div>
             </div>
             <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">
                <X size={20} />
             </button>
          </div>

          <div className="p-6 space-y-6">
             {/* 1. Metric Snapshots */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: t('volume'), value: employee.volume, sub: 'Requests', color: 'text-blue-600', bg: 'bg-blue-50' },
                 { label: t('avg_time'), value: employee.time, sub: 'Days', color: employee.time > 5.5 ? 'text-red-600' : 'text-green-600', bg: employee.time > 5.5 ? 'bg-red-50' : 'bg-green-50' },
                 { label: t('approval_rate'), value: `${employee.approvalRate}%`, sub: 'Approval', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 { label: t('total_budget_reviewed'), value: '45.2M', sub: 'QAR', color: 'text-qatar-maroon', bg: 'bg-red-50/50' },
               ].map((m, i) => (
                 <div key={i} className={`p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center ${m.bg}`}>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{m.label}</p>
                    <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-[10px] text-gray-400">{m.sub}</p>
                 </div>
               ))}
             </div>

             {/* 2. Charts Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Workload Trend */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-xs font-bold text-gray-700 uppercase mb-4">{t('workload_trend')}</h3>
                   <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={trendData}>
                            <defs>
                              <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8a1538" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#8a1538" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                            <Area type="monotone" dataKey="volume" stroke="#8a1538" fillOpacity={1} fill="url(#colorVol)" strokeWidth={2} />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Decision Breakdown */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-xs font-bold text-gray-700 uppercase mb-4">{t('decision_breakdown')}</h3>
                   <div className="h-48 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie 
                              data={pieData} 
                              innerRadius={50} 
                              outerRadius={70} 
                              paddingAngle={5} 
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                            <Legend wrapperStyle={{fontSize: '10px'}} iconType="circle" />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </div>

             {/* 3. Bottom Row: Entities & Alignment */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-xs font-bold text-gray-700 uppercase mb-4">{t('entities_handled')}</h3>
                   <div className="h-32 overflow-y-auto pr-2 space-y-3">
                      {entitiesData.map((e: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                           <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <div className="w-2 h-2 rounded-full bg-qatar-maroon shrink-0"></div>
                              <span className="text-gray-700 font-medium truncate max-w-[200px]">{e.name}</span>
                           </div>
                           <span className="font-bold text-gray-900">{e.count}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-gray-700 uppercase">{t('reviewer_alignment')}</h3>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">92% Match</span>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed">{t('alignment_desc')}</p>
                   <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                   </div>
                   <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                      <span>0%</span>
                      <span>100%</span>
                   </div>
                </div>
             </div>

             {/* 4. Collaboration Insights (NEW) */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                     <GitMerge size={16} className="text-qatar-maroon" />
                     <h3 className="text-xs font-bold text-gray-700 uppercase">{t('collaboration_insights')}</h3>
                 </div>
                 <div className="overflow-x-auto">
                     <table className="w-full text-left rtl:text-right">
                         <thead>
                             <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                                 <th className="px-4 py-3">{t('collaborator')}</th>
                                 <th className="px-4 py-3">{t('joint_volume')}</th>
                                 <th className="px-4 py-3">{t('joint_avg_time')}</th>
                                 <th className="px-4 py-3">{t('outcome_pattern')}</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50 text-xs">
                             {collaborationData.map((col, idx) => (
                                 <tr key={idx} className="hover:bg-gray-50">
                                     <td className="px-4 py-3 font-medium text-gray-800">
                                         {col.name}
                                         <span className="block text-[10px] text-gray-400 font-normal">{col.role}</span>
                                     </td>
                                     <td className="px-4 py-3 text-gray-600 font-bold">{col.volume}</td>
                                     <td className="px-4 py-3 text-gray-600">{col.time}d</td>
                                     <td className="px-4 py-3">
                                         {getPatternBadge(col.patternType, col.pattern)}
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>

          </div>
       </div>
    </div>
  );
};

const KPIDashboard: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [selectedMinistry, setSelectedMinistry] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [employeeSearch, setEmployeeSearch] = useState('');

  const stats = useMemo(() => {
    // 1. Filter Base Data
    let filteredData = rawMinistriesData;
    if (selectedMinistry !== 'all') {
      filteredData = rawMinistriesData.filter(m => m.id === selectedMinistry);
    }

    const totalRequests = filteredData.reduce((acc, curr) => acc + curr.requests, 0);
    const totalBudget = filteredData.reduce((acc, curr) => acc + curr.budget, 0);

    // 2. KPI Data Generation
    const kpiData = STATUS_DEFINITIONS.map(status => {
        let weight = 0.05; 
        if (status.id === 10) weight = 0.20; 
        if (status.id === 1) weight = 0.15; 
        if (status.id === 2) weight = 0.15; 
        if (status.id === 0) weight = 0.10; 
        if (status.id === -1) weight = 0.05; 
        
        if (String(status.en).includes('Modify') || status.id === 20 || status.id === 11) {
            weight = 0.03;
        }

        return {
            ...status,
            name: isRtl ? status.ar : status.en,
            value: Math.max(0, Math.round(totalRequests * weight))
        };
    });

    const rejectedCount = kpiData.find(d => d.id === -1)?.value || 0;
    const rejectedModCount = kpiData.find(d => d.id === 35)?.value || 0;
    const totalRejected = rejectedCount + rejectedModCount;

    // 4. Other Chart Data
    const budgetScaleFactor = totalBudget / (200000000 || 1);
    const dynamicBudgetData = baseBudgetData.map(item => ({
        ...item,
        planned: Number((item.planned * budgetScaleFactor * 5).toFixed(1)),
        approved: Number((item.approved * budgetScaleFactor * 5).toFixed(1))
    }));

    const dynamicRequestReasons = requestReasonsDef.map(item => ({
        ...item,
        value: Math.max(1, Math.round(totalRequests * item.weight))
    }));

    const dynamicRejectionReasons = rejectionReasonsDef.map(item => ({
        ...item,
        value: Math.max(0, Math.round(totalRejected * item.weight))
    }));

    // 5. Efficiency Data
    const chartEfficiency = baseEfficiencyData.map(item => ({
        ...item,
        backlog: selectedMinistry === 'all' ? item.backlog : Math.max(1, Math.round(item.backlog * 0.3))
    }));
    
    // 6. Employee/Reviewer Analysis Data - Expanded
    const employeesRaw = [
      { id: '1', name: 'Ahmed Al-Sayed', nameAr: 'أحمد السيد', role: 'Reviewer 1', volume: 145, time: 4.5, rejectRate: 15, returnRate: 5, approvalRate: 80, reworkRate: 5, bias: 'MOI' }, // Fast guy
      { id: '2', name: 'Sarah Khan', nameAr: 'سارة خان', role: 'Reviewer 2', volume: 98, time: 5.2, rejectRate: 8, returnRate: 12, approvalRate: 80, reworkRate: 12, bias: 'MOPH' },
      { id: '3', name: 'Mohammed Ali', nameAr: 'محمد علي', role: 'Approver', volume: 210, time: 6.0, rejectRate: 40, returnRate: 2, approvalRate: 58, reworkRate: 2, bias: 'Mix' }, // Slow guy
      { id: '4', name: 'Fatima Hassan', nameAr: 'فاطمة حسن', role: 'Reviewer 1', volume: 132, time: 4.9, rejectRate: 12, returnRate: 8, approvalRate: 80, reworkRate: 8, bias: 'MOEHE' },
      { id: '5', name: 'John Doe', nameAr: 'جون دو', role: 'Reviewer 2', volume: 85, time: 5.1, rejectRate: 5, returnRate: 15, approvalRate: 80, reworkRate: 15, bias: 'MOCI' },
      { id: '6', name: 'Khalid Othman', nameAr: 'خالد عثمان', role: 'Approver', volume: 180, time: 5.4, rejectRate: 2, returnRate: 1, approvalRate: 97, reworkRate: 1, bias: 'Mix' },
      { id: '7', name: 'Noor Al-Thani', nameAr: 'نور آل ثاني', role: 'Reviewer 1', volume: 160, time: 5.0, rejectRate: 10, returnRate: 4, approvalRate: 86, reworkRate: 4, bias: 'MOT' },
      { id: '8', name: 'Omar Farooq', nameAr: 'عمر فاروق', role: 'Reviewer 2', volume: 110, time: 5.3, rejectRate: 7, returnRate: 10, approvalRate: 83, reworkRate: 10, bias: 'MECC' },
    ];

    const employees = employeesRaw.map(e => ({
       ...e,
       displayName: isRtl ? e.nameAr : e.name
    }));

    return {
        kpiData,
        chartBudget: dynamicBudgetData,
        chartRequestReasons: dynamicRequestReasons,
        chartRejectionReasons: dynamicRejectionReasons,
        chartEfficiency,
        employees
    };
  }, [selectedMinistry, isRtl]);

  const truncateLabel = (text: string) => {
     if (!text) return '';
     return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    let items = [...stats.employees];
    
    // 1. Filter by Search
    if (employeeSearch) {
        const lowerTerm = employeeSearch.toLowerCase();
        items = items.filter(e => e.displayName.toLowerCase().includes(lowerTerm));
    }

    // 2. Sort
    if (sortConfig !== null) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [stats.employees, sortConfig, employeeSearch]);

  return (
    <div className="flex flex-col space-y-6 pb-4">
      {/* 1. Top Bar: Filters */}
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
           <div className="flex items-center px-3 text-qatar-maroon font-bold text-xs">
             <Filter size={14} className={isRtl ? 'ml-2' : 'mr-2'} />
             <span>{t('filters')}</span>
           </div>
           <div className="h-5 w-px bg-gray-200"></div>
           <div className="flex space-x-2 rtl:space-x-reverse">
              {/* Ministry Filter */}
              <select 
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="bg-gray-50 border-none text-[10px] font-semibold text-gray-600 rounded-lg px-2 py-1 focus:ring-1 focus:ring-qatar-maroon cursor-pointer hover:bg-gray-100 transition-colors min-w-[120px]"
              >
                 <option value="all">{t('filter_all')}</option>
                 {rawMinistriesData.map(m => (
                   <option key={m.id} value={m.id}>{t(m.key)}</option>
                 ))}
              </select>
           </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
           {['7D', '30D', 'YTD'].map((p, i) => (
             <button key={p} className={`px-2 py-0.5 text-[9px] font-bold rounded-md transition-all ${i === 2 ? 'bg-white text-qatar-maroon shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
               {p}
             </button>
           ))}
        </div>
      </div>

      {/* 2. KPI Cards - Centered Flex Layout */}
      <div className="flex flex-wrap justify-center gap-3">
        {stats.kpiData.map((kpi) => (
            <div key={kpi.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-0.5rem)] md:w-40 flex-grow-0">
                <KPICard 
                    title={kpi.name} 
                    value={kpi.value} 
                    iconType={kpi.icon} 
                    color={kpi.color} 
                    bg={kpi.bg}
                />
            </div>
        ))}
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-4 auto-rows-min">
        
        {/* ROW 1: Process Efficiency (Large), Map */}
        
        {/* 1. Process Efficiency (Restored) */}
        <div className="col-span-12 lg:col-span-8 h-80">
          <ChartCard title={t('process_efficiency')} icon={<TrendingUp size={14} />}>
             <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={stats.chartEfficiency} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis 
                    dataKey={isRtl ? 'stageAr' : 'stage'} 
                    stroke="#9ca3af" 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    reversed={isRtl}
                 />
                 <YAxis yAxisId="left" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} orientation={isRtl ? 'right' : 'left'} />
                 <YAxis yAxisId="right" orientation={isRtl ? 'left' : 'right'} stroke="#f59e0b" fontSize={10} axisLine={false} tickLine={false} unit="d" />
                 <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
                 />
                 <Legend wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} />
                 <Bar yAxisId="left" dataKey="backlog" name={t('backlog_stage')} fill="#8a1538" barSize={32} radius={[4, 4, 0, 0]} />
                 <Line yAxisId="right" type="monotone" dataKey="time" name={t('avg_time_stage')} stroke="#f59e0b" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
               </ComposedChart>
             </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 2. Ministry Map */}
        <div className="col-span-12 lg:col-span-4 h-80">
          <ChartCard title={t('geo_distribution')} icon={<MapPin size={14} />} action={<div className="text-[9px] text-gray-400 font-bold">{t('ministries_map')}</div>}>
             <MinistryMap highlightedId={selectedMinistry} />
          </ChartCard>
        </div>

        {/* ROW 2: Budget (Left), Requests (Middle), Rejections (Right) */}

        {/* 4. Budget Trends */}
        <div className="col-span-12 lg:col-span-4 h-72">
          <ChartCard title={t('budget_utilization')} icon={<DollarSign size={14} />}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartBudget} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8a1538" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8a1538" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={9} axisLine={false} tickLine={false} reversed={isRtl} />
                <YAxis stroke="#9ca3af" fontSize={9} axisLine={false} tickLine={false} orientation={isRtl ? 'right' : 'left'} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                <Area type="monotone" dataKey="planned" stackId="1" stroke="#cbd5e1" fill="#f1f5f9" strokeWidth={2} name="Planned" />
                <Area type="monotone" dataKey="approved" stackId="2" stroke="#8a1538" fill="url(#colorApproved)" strokeWidth={2} name="Approved" />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '9px', fontWeight: 600}} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 5. Top 5 Request Reasons */}
        <div className="col-span-12 lg:col-span-4 h-72">
          <ChartCard title={isRtl ? 'أسباب الطلبات (أهم 5)' : 'Request Reasons (Top 5)'} icon={<List size={14} />}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={stats.chartRequestReasons} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={9} axisLine={false} tickLine={false} reversed={isRtl} />
                  <YAxis 
                    type="category" 
                    dataKey={isRtl ? "nameAr" : "name"} 
                    stroke="#6b7280" 
                    fontSize={9} 
                    fontWeight={500} 
                    width={140} 
                    axisLine={false} 
                    tickLine={false} 
                    orientation={isRtl ? 'right' : 'left'} 
                    tickFormatter={truncateLabel}
                    tick={{ textAnchor: 'end' }}
                  />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                  <Bar dataKey="value" fill="#8884d8" radius={isRtl ? [4, 0, 0, 4] : [0, 4, 4, 0]} barSize={16} name={t('req_volume')}>
                    {stats.chartRequestReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 6. Top 5 Rejection Reasons */}
        <div className="col-span-12 lg:col-span-4 h-72">
          <ChartCard title={isRtl ? 'أسباب الرفض (أهم 5)' : 'Rejection Reasons (Top 5)'} icon={<AlertTriangle size={14} />}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={stats.chartRejectionReasons} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={9} axisLine={false} tickLine={false} reversed={isRtl} />
                  <YAxis 
                    type="category" 
                    dataKey={isRtl ? "nameAr" : "name"} 
                    stroke="#6b7280" 
                    fontSize={9} 
                    fontWeight={500} 
                    width={140} 
                    axisLine={false} 
                    tickLine={false} 
                    orientation={isRtl ? 'right' : 'left'}
                    tickFormatter={truncateLabel}
                    tick={{ textAnchor: 'end' }}
                  />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                  <Bar dataKey="value" fill="#8884d8" radius={isRtl ? [4, 0, 0, 4] : [0, 4, 4, 0]} barSize={16} name={t('req_volume')}>
                    {stats.chartRejectionReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ROW 3: New Employee Analysis Table */}
        <div className="col-span-12 pt-4">
           <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 px-2">
             <Users size={20} className="text-qatar-maroon" />
             <h3 className="text-lg font-bold text-gray-800">{t('employee_analysis')}</h3>
           </div>
           
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             
             {/* Search Filter */}
             <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                 <div className="relative">
                    <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={14} />
                    <input 
                      type="text" 
                      placeholder={t('search_employee')} 
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      className={`bg-white border border-gray-200 rounded-lg ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-1.5 text-xs focus:ring-1 focus:ring-qatar-maroon outline-none w-64`}
                    />
                 </div>
                 {/* Placeholder for future controls */}
             </div>

             <div className="overflow-x-auto">
               <table className="w-full text-left rtl:text-right">
                 <thead>
                   <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                     {[
                       { key: 'displayName', label: t('employee_name') },
                       // Role removed
                       { key: 'volume', label: t('req_volume') },
                       { key: 'time', label: t('avg_time') },
                       { key: 'approvalRate', label: t('approval_rate') },
                       { key: 'rejectRate', label: t('rejection_rate') }, // Added Rejection Rate
                       { key: 'reworkRate', label: t('rework_rate') },
                     ].map((col) => (
                       <th key={col.key} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort(col.key)}>
                         <div className="flex items-center space-x-1 rtl:space-x-reverse">
                           <span>{col.label}</span>
                           {sortConfig?.key === col.key && (
                             sortConfig.direction === 'asc' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />
                           )}
                         </div>
                       </th>
                     ))}
                     <th className="px-6 py-4"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {sortedEmployees.map((emp) => (
                     <tr 
                      key={emp.id} 
                      onClick={() => setSelectedEmployee(emp)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                     >
                       <td className="px-6 py-4">
                         <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                              {emp.displayName.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-qatar-maroon transition-colors">{emp.displayName}</span>
                         </div>
                       </td>
                       {/* Role removed */}
                       <td className="px-6 py-4 text-sm font-bold text-gray-800">{emp.volume}</td>
                       <td className="px-6 py-4">
                         <span className={`text-sm font-bold ${emp.time > 5.5 ? 'text-red-600' : 'text-green-600'}`}>
                           {emp.time}d
                         </span>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                               <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${emp.approvalRate}%` }}></div>
                            </div>
                            <span className="text-xs font-medium text-gray-600">{emp.approvalRate}%</span>
                         </div>
                       </td>
                       {/* Rejection Rate Added */}
                       <td className="px-6 py-4">
                         <span className={`text-xs font-bold px-2 py-0.5 rounded ${emp.rejectRate > 15 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                           {emp.rejectRate}%
                         </span>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`text-xs font-bold px-2 py-0.5 rounded ${emp.reworkRate > 10 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                           {emp.reworkRate}%
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right rtl:text-left">
                         <button className="text-gray-400 hover:text-qatar-maroon">
                           <AlignCenter size={16} />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

      </div>

      {/* Drill-down Modal */}
      {selectedEmployee && (
        <EmployeeDetailModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};

export default KPIDashboard;
