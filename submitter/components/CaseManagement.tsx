
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ExternalLink, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Chatbot from './Chatbot';

// Enriched mock data focused on Technical Projects and Funding Requests
const cases = [
  { 
    id: 'REQ-TECH-2024-089', 
    applicantEn: 'Min. of Comm. & IT (MCIT)', applicantAr: 'وزارة الاتصالات وتكنولوجيا المعلومات', 
    typeEn: 'Budget Variation', typeAr: 'تعديل الميزانية', 
    statusEn: 'Pending', statusAr: 'قيد الانتظار', 
    date: '2024-02-14', priorityEn: 'High', priorityAr: 'عالية',
    details: {
      approvalType: 'Extension',
      category: 'Goods & Services',
      subject: 'HPC & GPU Cluster for National LLM',
      requestingEntity: 'MCIT - AI Dept',
      executingEntity: 'NVIDIA / Ooredoo Data Center',
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      totalValue: 45000000,
      projNameEn: 'Project Falcon: National Arabic LLM',
      projNameAr: 'مشروع فالكون: النموذج اللغوي العربي الوطني',
      description: 'Request for additional funding to procure 128 H100 Tensor Core GPUs and associated HPC infrastructure. This is critical to accelerate the training phase of the National Arabic Large Language Model (Falcon-AR) to meet the Q4 launch deadline.',
      scope: '1. Procurement of H100 GPU Clusters\n2. High-speed InfiniBand Networking setup\n3. 12-month Enterprise Support & Maintenance',
      economicImpact: 'Est. 120M QAR annual efficiency gains across gov services via AI automation.',
      socialImpact: 'Preservation of Arabic heritage in digital space; improved citizen services.',
      budget: [
        { year: '2024', amount: 35000000 },
        { year: '2025', amount: 10000000 }
      ]
    }
  },
  { 
    id: 'REQ-INFRA-2024-112', 
    applicantEn: 'Ashghal (Public Works)', applicantAr: 'أشغال (هيئة الأشغال العامة)', 
    typeEn: 'Additional Funding', typeAr: 'تمويل إضافي', 
    statusEn: 'In Review', statusAr: 'قيد المراجعة', 
    date: '2024-02-12', priorityEn: 'Medium', priorityAr: 'متوسطة',
    details: {
      approvalType: 'New',
      category: 'Consultancy',
      subject: 'Digital Twin for West Bay Infrastructure',
      requestingEntity: 'Ashghal - Smart City Unit',
      executingEntity: 'Siemens / Bentley Systems',
      startDate: '2024-06-01',
      endDate: '2026-05-31',
      totalValue: 28500000,
      projNameEn: 'West Bay Digital Twin Pilot',
      projNameAr: 'التوأم الرقمي لمنطقة الخليج الغربي',
      description: 'Implementation of a real-time 3D Digital Twin for the West Bay drainage and traffic network. Requires funding for IoT sensor deployment and cloud simulation software licenses not covered in original fiscal budget.',
      scope: '1. IoT Sensor Grid deployment (5000 nodes)\n2. 3D Lidar Scanning of West Bay\n3. Predictive Maintenance AI Module',
      economicImpact: 'Reduction of maintenance costs by 15% annually; flood risk mitigation.',
      socialImpact: 'Minimized traffic disruptions during maintenance; improved public safety.',
      budget: [
        { year: '2024', amount: 10000000 },
        { year: '2025', amount: 12000000 },
        { year: '2026', amount: 6500000 }
      ]
    }
  },
  { 
    id: 'REQ-SEC-2024-045', 
    applicantEn: 'National Cyber Security Agency', applicantAr: 'الوكالة الوطنية للأمن السيبراني', 
    typeEn: 'Emergency Grant', typeAr: 'منحة طارئة', 
    statusEn: 'Approved', statusAr: 'تمت الموافقة', 
    date: '2024-02-10', priorityEn: 'High', priorityAr: 'عالية',
    details: {
      approvalType: 'New',
      category: 'Service',
      subject: 'AI-Driven Threat Detection Platform',
      requestingEntity: 'NCSA',
      executingEntity: 'DarkTrace / Palo Alto',
      startDate: '2024-03-01',
      endDate: '2027-02-28',
      totalValue: 18200000,
      projNameEn: 'Cyber Shield AI Upgrade',
      projNameAr: 'تحديث درع السايبر بالذكاء الاصطناعي',
      description: 'Immediate requirement for autonomous AI response capabilities to counter increasing sophisticated ransomware attacks on government financial systems. Existing budget covers only standard firewalls.',
      scope: '1. Autonomous Response AI Agents\n2. 24/7 SOC Automation Tools\n3. Cross-agency threat intel sharing feed',
      economicImpact: 'Prevention of potential data breaches estimated at 500M+ QAR liability.',
      socialImpact: 'Ensures trust in digital government services and data privacy.',
      budget: [
        { year: '2024', amount: 8200000 },
        { year: '2025', amount: 5000000 },
        { year: '2026', amount: 5000000 }
      ]
    }
  },
  { 
    id: 'REQ-HLTH-2024-201', 
    applicantEn: 'Min. of Public Health', applicantAr: 'وزارة الصحة العامة', 
    typeEn: 'Budget Variation', typeAr: 'تعديل الميزانية', 
    statusEn: 'Pending', statusAr: 'قيد الانتظار', 
    date: '2024-02-08', priorityEn: 'Low', priorityAr: 'منخفضة',
    details: {
      approvalType: 'Extension',
      category: 'Service',
      subject: 'Genomic Data Lake Expansion',
      requestingEntity: 'MOPH - Research',
      executingEntity: 'Google Cloud / Oracle',
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      totalValue: 7500000,
      projNameEn: 'Qatar Genome Cloud Storage',
      projNameAr: 'التخزين السحابي لجينوم قطر',
      description: 'Request to increase cloud storage budget due to higher than expected sequencing data volume (Big Data).',
      scope: 'Additional 5PB of Hot Storage and 20PB of Cold Archive Storage.',
      economicImpact: 'Supports biotech research commercialization.',
      socialImpact: 'Accelerates personalized medicine initiatives.',
      budget: [
        { year: '2024', amount: 7500000 }
      ]
    }
  },
  { 
    id: 'REQ-TRN-2024-099', 
    applicantEn: 'Ministry of Transport', applicantAr: 'وزارة المواصلات', 
    typeEn: 'Project Funding', typeAr: 'تمويل مشروع', 
    statusEn: 'Rejected', statusAr: 'تم الرفض', 
    date: '2024-02-05', priorityEn: 'Medium', priorityAr: 'متوسطة',
    details: {
      approvalType: 'New',
      category: 'Works',
      subject: 'Edge Computing for Smart Signals',
      requestingEntity: 'MOT - Road Affairs',
      executingEntity: 'Cisco / Local Contractor',
      startDate: '2024-09-01',
      endDate: '2025-08-31',
      totalValue: 12000000,
      projNameEn: 'Autonomous Traffic Management',
      projNameAr: 'إدارة المرور الذاتي',
      description: 'Deployment of Edge Compute nodes at 200 intersections for AI-based traffic signal optimization.',
      scope: 'Hardware procurement and installation.',
      economicImpact: 'Reduces commute time by 20%, saving fuel and productivity.',
      socialImpact: 'Lower carbon footprint.',
      budget: [
        { year: '2024', amount: 6000000 },
        { year: '2025', amount: 6000000 }
      ]
    }
  }
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Approved': case 'تمت الموافقة': return 'bg-green-100 text-green-700';
    case 'Pending': case 'قيد الانتظار': return 'bg-yellow-100 text-yellow-700';
    case 'In Review': case 'قيد المراجعة': return 'bg-blue-100 text-blue-700';
    case 'Rejected': case 'تم الرفض': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityStyles = (priority: string) => {
  if (priority === 'High' || priority === 'عالية') return 'text-qatar-maroon';
  return 'text-gray-500';
};

const ReadOnlyField: React.FC<{ labelKey: string; value: string | number | undefined }> = ({ labelKey, value }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t(labelKey)}</span>
        <span className="text-sm font-semibold text-gray-800 mt-1">{value || '-'}</span>
      </div>
    </div>
  );
};

const CaseManagement: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<any | null>(null);

  if (selectedCase) {
    // Detail View with Executive Page + Chatbot
    return (
      <div className="animate-fade-in h-[calc(100vh-8rem)] flex flex-col">
        <button 
          onClick={() => setSelectedCase(null)}
          className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500 hover:text-qatar-maroon mb-4 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{t('back_to_list')}</span>
        </button>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Left: Executive Summary / Full Form Data */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-100">
               <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCase.details?.projNameEn || selectedCase.typeEn}</h2>
                  <p className="text-sm text-gray-500 font-mono mt-1">{selectedCase.id}</p>
               </div>
               <span className={`px-4 py-2 rounded-lg font-bold text-xs uppercase ${getStatusStyles(isRtl ? selectedCase.statusAr : selectedCase.statusEn)}`}>
                  {isRtl ? selectedCase.statusAr : selectedCase.statusEn}
               </span>
            </div>

            {/* Section 1 */}
            <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec1_title')}</h4>
            <div className="grid grid-cols-2 gap-4 mb-8">
               <ReadOnlyField labelKey="approval_type" value={selectedCase.details?.approvalType} />
               <ReadOnlyField labelKey="contract_category" value={selectedCase.details?.category} />
               <ReadOnlyField labelKey="requesting_entity" value={selectedCase.details?.requestingEntity} />
               <ReadOnlyField labelKey="total_value" value={selectedCase.details?.totalValue?.toLocaleString() + ' QAR'} />
               <div className="col-span-2">
                 <ReadOnlyField labelKey="contract_subject" value={selectedCase.details?.subject} />
               </div>
            </div>

            {/* Section 2 */}
            <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec2_title')}</h4>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <ReadOnlyField labelKey="detailed_desc" value={selectedCase.details?.description} />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <ReadOnlyField labelKey="scope_work" value={selectedCase.details?.scope} />
              </div>
            </div>

            {/* Section 3 */}
            <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec3_title')}</h4>
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <ReadOnlyField labelKey="economic_impact" value={selectedCase.details?.economicImpact} />
               </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <ReadOnlyField labelKey="social_impact" value={selectedCase.details?.socialImpact} />
               </div>
            </div>

            {/* Section 4 - Approvals */}
            <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec4_title')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['req_dept', 'fin_officer', 'legal_contracts', 'final_approver'].map((key) => (
                <div key={key} className="p-3 bg-white border border-green-100 rounded-xl text-center">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-[10px]">✓</div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{t(key)}</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">--/--/----</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right: AI Chatbot */}
          <div className="lg:col-span-1 h-full">
            <Chatbot caseData={selectedCase} />
          </div>
        </div>
      </div>
    );
  }

  // List View (Default)
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('case_records')}</h3>
          <p className="text-gray-500">{t('case_desc')}</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative">
            <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={16} />
            <input 
              type="text" 
              placeholder={isRtl ? 'تصفية حسب الرقم...' : 'Filter by ID...'} 
              className={`bg-white border border-gray-200 rounded-xl ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 text-sm focus:ring-2 focus:ring-qatar-maroon outline-none transition-all w-64`}
            />
          </div>
          <button className="flex items-center space-x-2 rtl:space-x-reverse bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span>{t('filters')}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('case_id')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('applicant')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('type')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('date')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('priority')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('status')}</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cases.map((c) => (
                <tr 
                  key={c.id} 
                  onClick={() => setSelectedCase(c)}
                  className="hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 font-bold text-sm text-gray-900 group-hover:text-qatar-maroon">{c.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{isRtl ? c.applicantAr : c.applicantEn}</span>
                      <span className="text-[10px] text-gray-400">{isRtl ? 'جهة حكومية' : 'Public Sector Agency'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{isRtl ? c.typeAr : c.typeEn}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{c.date}</td>
                  <td className="px-6 py-4">
                     <span className={`text-xs font-bold ${getPriorityStyles(isRtl ? c.priorityAr : c.priorityEn)}`}>{isRtl ? c.priorityAr : c.priorityEn}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusStyles(isRtl ? c.statusAr : c.statusEn)}`}>
                      {isRtl ? c.statusAr : c.statusEn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="p-1.5 text-gray-400 hover:text-qatar-maroon transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {isRtl ? 'عرض ١ إلى ٥ من أصل ٢٤٥٠ مدخل' : 'Showing 1 to 5 of 2,450 entries'}
          </p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-qatar-maroon">
              {isRtl ? 'السابق' : 'Previous'}
            </button>
            <button className="w-8 h-8 rounded-lg bg-qatar-maroon text-white text-xs font-bold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg text-gray-400 text-xs font-bold flex items-center justify-center hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-lg text-gray-400 text-xs font-bold flex items-center justify-center hover:bg-gray-100">3</button>
            <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-qatar-maroon">
              {isRtl ? 'التالي' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseManagement;
