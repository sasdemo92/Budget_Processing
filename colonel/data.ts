
// Shared Mock Data

export const rawMinistriesData = [
  { id: 'MOI', key: 'MOI', lat: 25.2954, lng: 51.5310, requests: 8, approved: 6, rejected: 1, pending: 1, budget: 15000000, avgTime: 3.2 },
  { id: 'MOPH', key: 'MOPH', lat: 25.2916, lng: 51.5033, requests: 6, approved: 4, rejected: 1, pending: 1, budget: 10000000, avgTime: 4.1 },
  { id: 'MOEHE', key: 'MOEHE', lat: 25.3195, lng: 51.4938, requests: 10, approved: 8, rejected: 1, pending: 1, budget: 18000000, avgTime: 2.9 },
  { id: 'MOT', key: 'MOT', lat: 25.3500, lng: 51.5200, requests: 4, approved: 3, rejected: 0, pending: 1, budget: 8000000, avgTime: 5.2 },
  { id: 'MM', key: 'MM', lat: 25.2860, lng: 51.5360, requests: 5, approved: 4, rejected: 1, pending: 0, budget: 5000000, avgTime: 3.5 },
  { id: 'MECC', key: 'MECC', lat: 25.3150, lng: 51.5180, requests: 3, approved: 2, rejected: 0, pending: 1, budget: 3000000, avgTime: 4.8 },
  { id: 'MSDF', key: 'MSDF', lat: 25.3800, lng: 51.5300, requests: 4, approved: 2, rejected: 1, pending: 1, budget: 4000000, avgTime: 3.9 },
  { id: 'MOL', key: 'MOL', lat: 25.3250, lng: 51.5250, requests: 5, approved: 4, rejected: 0, pending: 1, budget: 6000000, avgTime: 3.1 },
  { id: 'MOCI', key: 'MOCI', lat: 25.4000, lng: 51.5100, requests: 7, approved: 5, rejected: 1, pending: 1, budget: 11000000, avgTime: 3.6 },
];

export const baseEfficiencyData = [
  { stage: 'Submission', time: 1.2, backlog: 3, stageAr: 'التقديم' },
  { stage: 'Reviewer 1', time: 2.0, backlog: 8, stageAr: 'المراجع ١' },
  { stage: 'Reviewer 2', time: 1.0, backlog: 5, stageAr: 'المراجع ٢' },
  { stage: 'Final', time: 2.0, backlog: 1, stageAr: 'النهائي' },
];

export const baseBudgetData = [
  { year: 'Q1', planned: 22, approved: 20 },
  { year: 'Q2', planned: 28, approved: 25 },
  { year: 'Q3', planned: 25, approved: 20 },
  { year: 'Q4', planned: 30, approved: 15 },
];

export const requestReasonsDef = [
  { name: 'Unforeseen Cost Escalation', nameAr: 'ارتفاع تكاليف غير متوقع', weight: 0.35, color: '#8a1538' },
  { name: 'Mandated Scope Change', nameAr: 'تغيير النطاق الإلزامي', weight: 0.25, color: '#a6824a' },
  { name: 'Risk Mitigation', nameAr: 'تخفيف المخاطر', weight: 0.20, color: '#6b7280' },
  { name: 'Procurement', nameAr: 'المشتريات', weight: 0.15, color: '#10b981' },
  { name: 'Acceleration', nameAr: 'تسريع التنفيذ', weight: 0.05, color: '#ef4444' }
];

export const rejectionReasonsDef = [
  { name: 'Insufficient Justification', nameAr: 'تبرير غير كاف', weight: 0.40, color: '#ef4444' },
  { name: 'Non-Compliance', nameAr: 'عدم الامتثال', weight: 0.25, color: '#f59e0b' },
  { name: 'Estimation Deficiency', nameAr: 'نقص في التقدير', weight: 0.20, color: '#8a1538' },
  { name: 'High Risk', nameAr: 'مخاطر عالية', weight: 0.10, color: '#6b7280' },
  { name: 'Incomplete Documents', nameAr: 'وثائق غير مكتملة', weight: 0.05, color: '#a6824a' }
];

export const casesData = [
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
