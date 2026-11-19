
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ExternalLink, ArrowLeft, FileText, Download, MessageSquare, X, AlertTriangle, CheckCircle, Shield, Briefcase, Lock, Cpu, Server, Network, Scale, BarChart3, Clock, Check, XCircle, LayoutDashboard, Calendar, User, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Chatbot from './Chatbot';
import MinistryDashboard from './MinistryDashboard';

// Enriched mock data with full bilingual support
const initialCases = [
  { 
    id: 'REQ-OPS-2025-042', 
    applicantEn: 'Ministry of Transport', applicantAr: 'وزارة المواصلات', 
    typeEn: 'Maintenance (Ch 2)', typeAr: 'صيانة (باب 2)', 
    statusEn: 'Submitted for approval', statusAr: 'قيد المراجعة', 
    date: '2026-02-08', priorityEn: 'Low', priorityAr: 'منخفضة',
    alerts: 0,
    detailsEn: {
      approvalType: 'Renewal',
      category: 'Services',
      subject: 'HQ Vehicle Fleet Maintenance',
      requestingEntity: 'MOT - General Services',
      executingEntity: 'NBK Automotive',
      startDate: '2025-04-01',
      endDate: '2026-03-31',
      totalValue: 73000,
      projName: 'Admin Fleet Annual Maintenance',
      description: 'Renewal of the annual service contract for 12 administrative vehicles (Toyota Land Cruisers & Sedans) used by the West Bay headquarters staff.',
      scope: '1. Scheduled maintenance (5k, 10k, 20k services)\n2. Emergency roadside assistance\n3. Spare parts replacement',
      economicImpact: 'Ensuring operational continuity for inspection teams.',
      socialImpact: 'N/A',
      budget: [{ year: '2025', amount: 73000 }]
    },
    detailsAr: {
      approvalType: 'تجديد',
      category: 'خدمات',
      subject: 'صيانة مركبات المقر الرئيسي',
      requestingEntity: 'وزارة المواصلات - الخدمات العامة',
      executingEntity: 'ناصر بن خالد للسيارات',
      startDate: '2025-04-01',
      endDate: '2026-03-31',
      totalValue: 73000,
      projName: 'الصيانة السنوية للأسطول الإداري',
      description: 'تجديد عقد الخدمة السنوي لـ 12 مركبة إدارية (تويوتا لاند كروزر وسيارات صالون) تستخدمها طواقم المقر الرئيسي في الخليج الغربي.',
      scope: '1. الصيانة الدورية (خدمات 5 آلاف، 10 آلاف، 20 ألف)\n2. المساعدة على الطريق في حالات الطوارئ\n3. استبدال قطع الغيار',
      economicImpact: 'ضمان استمرارية العمل لفرق التفتيش.',
      socialImpact: 'غير منطبق',
      budget: [{ year: '2025', amount: 73000 }]
    },
    longSummaryEn: {
      isStructured: true,
      businessCase: {
        problem: "The current maintenance contract expires on March 31st, 2025. Without renewal, official vehicles will be uninsured for service repairs.",
        solution: "Direct renewal with the authorized dealer (NBK Automotive) to maintain warranty validity.",
        strategicAlignment: "Operational Necessity."
      },
      scopeOfWork: [
        { phase: "Annual Coverage", details: "12 Months comprehensive mechanical coverage.", timeline: "Apr '25 - Mar '26" }
      ],
      technicalSpecs: [
        { category: "Parts", requirement: "OEM Genuine Parts only.", critical: true },
        { category: "Location", requirement: "Service centers must be within 10km of West Bay.", critical: false }
      ],
      procurementStrategy: {
        method: "Direct Agreement",
        evaluationCriteria: [
          { name: "Price", weight: "100%" }
        ],
        vendorQualification: "Exclusive Distributor."
      },
      financialAnalysis: {
        capex: "N/A",
        opex: "QAR 73,000",
        roi: "N/A",
        benchmarking: "Quote is within 10% of previous contract value, complying with renewal regulations."
      },
      risks: [
        { name: "Price Increase", prob: "Low", impact: "Low", mitigation: "Rates locked for 12 months." }
      ],
      procurementStatus: {
        method: "Direct",
        status: "Pending Finance Review",
        compliance: "Standard Low Value"
      },
      phasingJustification: "Cannot be phased. Annual contract."
    },
    longSummaryAr: {
      isStructured: true,
      businessCase: {
        problem: "ينتهي عقد الصيانة الحالي في 31 مارس 2025. بدون التجديد، ستكون المركبات الرسمية غير مغطاة لإصلاحات الخدمة.",
        solution: "تجديد مباشر مع الوكيل المعتمد (ناصر بن خالد) للحفاظ على صلاحية الضمان.",
        strategicAlignment: "ضرورة تشغيلية."
      },
      scopeOfWork: [
        { phase: "التغطية السنوية", details: "تغطية ميكانيكية شاملة لمدة 12 شهرًا.", timeline: "أبريل 25 - مارس 26" }
      ],
      technicalSpecs: [
        { category: "قطع الغيار", requirement: "قطع غيار أصلية (OEM) فقط.", critical: true },
        { category: "الموقع", requirement: "يجب أن تكون مراكز الخدمة في نطاق 10 كم من الخليج الغربي.", critical: false }
      ],
      procurementStrategy: {
        method: "اتفاق مباشر",
        evaluationCriteria: [
          { name: "السعر", weight: "100%" }
        ],
        vendorQualification: "موزع حصري."
      },
      financialAnalysis: {
        capex: "غير منطبق",
        opex: "73,000 ر.ق",
        roi: "غير منطبق",
        benchmarking: "العرض في حدود 10% من قيمة العقد السابق، مما يتوافق مع لوائح التجديد."
      },
      risks: [
        { name: "زيادة السعر", prob: "منخفض", impact: "منخفض", mitigation: "تثبيت الأسعار لمدة 12 شهرًا." }
      ],
      procurementStatus: {
        method: "مباشر",
        status: "بانتظار المراجعة المالية",
        compliance: "قيمة منخفضة قياسية"
      },
      phasingJustification: "لا يمكن تجزئتها. عقد سنوي."
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2026-02-07 09:00", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2026-02-08 10:15", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "تحت الإجراء", stepEn: "Pending Approval", date: "2026-02-08 10:15", actor: "Direct Manager", statusAr: "قيد المراجعة", statusEn: "Pending" }
    ],
    documents: [
      { name: 'Quotation_Fleet_2025.pdf', typeEn: 'Quote', typeAr: 'عرض سعر', size: '0.5 MB', date: '2025-02-15' },
      { name: 'Prev_Contract_Ref.pdf', typeEn: 'Contract', typeAr: 'عقد سابق', size: '2.1 MB', date: '2024-03-01' }
    ]
  },
  { 
    id: 'REQ-CAP-2025-089', 
    applicantEn: 'Ministry of Municipality', applicantAr: 'وزارة البلدية', 
    typeEn: 'Strategic Project (Ch 3)', typeAr: 'مشروع استراتيجي (باب 3)', 
    statusEn: 'In progress', statusAr: 'قيد الدراسة', 
    date: '2025-12-03', priorityEn: 'Critical', priorityAr: 'حرج',
    alerts: 6000,
    detailsEn: {
      approvalType: 'New Project',
      category: 'Technology',
      subject: 'Smart Crisis Management Platform',
      requestingEntity: 'MOM - Disaster Management Unit',
      executingEntity: 'TBD (Tender)',
      startDate: '2025-06-01',
      endDate: '2026-12-31',
      totalValue: 10000000,
      projName: 'National Municipal Crisis Response System',
      description: 'Development of a centralized AI-powered platform for real-time monitoring and response to municipal emergencies, specifically flash floods, rain drainage management, and large-scale waste crises.',
      scope: '1. IoT Sensor Integration (Drainage network)\n2. AI Prediction Engine for Flood Risks\n3. Central Command Dashboard',
      economicImpact: 'Preventing infrastructure damage estimated at 50M+ per severe weather event.',
      socialImpact: 'Ensuring public safety during rain season and rapid response to citizen reports.',
      budget: [{ year: '2025', amount: 5000000 }, { year: '2026', amount: 5000000 }]
    },
    detailsAr: {
      approvalType: 'مشروع جديد',
      category: 'تكنولوجيا',
      subject: 'منصة إدارة الأزمات الذكية',
      requestingEntity: 'وزارة البلدية - وحدة إدارة الكوارث',
      executingEntity: 'قيد التحديد (مناقصة)',
      startDate: '2025-06-01',
      endDate: '2026-12-31',
      totalValue: 10000000,
      projName: 'النظام الوطني للاستجابة للأزمات البلدية',
      description: 'تطوير منصة مركزية مدعومة بالذكاء الاصطناعي للمراقبة والاستجابة الفورية لحالات الطوارئ البلدية، وتحديداً الفيضانات المفاجئة، وإدارة تصريف الأمطار، وأزمات النفايات واسعة النطاق.',
      scope: '1. تكامل مستشعرات إنترنت الأشياء (شبكة الصرف)\n2. محرك تنبؤ بالذكاء الاصطناعي لمخاطر الفيضانات\n3. لوحة تحكم القيادة المركزية',
      economicImpact: 'منع أضرار البنية التحتية المقدرة بأكثر من 50 مليون لكل حدث جوي قاسي.',
      socialImpact: 'ضمان السلامة العامة خلال موسم الأمطار والاستجابة السريعة لبلاغات المواطنين.',
      budget: [{ year: '2025', amount: 5000000 }, { year: '2026', amount: 5000000 }]
    },
    longSummaryEn: {
      isStructured: true,
      businessCase: {
        problem: "Recent rainy seasons revealed coordination gaps between weather forecasts and drainage tanker deployment. Current manual dispatch is too slow.",
        solution: "An automated Command & Control Center that predicts water accumulation spots using AI and auto-dispatches resources.",
        strategicAlignment: "Directly aligns with 'Sustainable Infrastructure' and QNV 2030 Environment pillar."
      },
      scopeOfWork: [
        { phase: "Phase 1: Sensor Deployment", details: "Install 500 IoT water level sensors in critical tunnels and low points.", timeline: "Q3 2025" },
        { phase: "Phase 2: Platform Dev", details: "Custom software development for the dispatch algorithm.", timeline: "Q4 2025" },
        { phase: "Phase 3: Integration", details: "Linking with MOI and Metrology Department APIs.", timeline: "Q1 2026" }
      ],
      technicalSpecs: [
        { category: "Connectivity", requirement: "NB-IoT / 5G Dedicated Network.", critical: true },
        { category: "Hosting", requirement: "Meeza Cloud (Gov Tenant).", critical: true },
        { category: "Latency", requirement: "Real-time updates < 30 seconds.", critical: false }
      ],
      procurementStrategy: {
        method: "Public Tender",
        evaluationCriteria: [
          { name: "Tech Solution", weight: "60%" },
          { name: "Price", weight: "40%" }
        ],
        vendorQualification: "Grade A Software Integrators."
      },
      financialAnalysis: {
        capex: "QAR 10,000,000",
        opex: "QAR 500,000/year (Maintenance after warranty)",
        roi: "Cost recovered in 1 major flood event prevention.",
        benchmarking: "Comparable to Singapore's PUB Smart Water Grid cost per sensor."
      },
      risks: [
        { name: "Sensor Vandalism", prob: "Medium", impact: "Low", mitigation: "Ruggedized housing and tamper alerts." },
        { name: "Data Integration", prob: "High", impact: "High", mitigation: "Pre-agreement signed with data providers." }
      ],
      procurementStatus: {
        method: "Tender",
        status: "RFP Review",
        compliance: "Strategic Project"
      },
      phasingJustification: "Can be phased by municipality zone, but central platform is needed upfront."
    },
    longSummaryAr: {
      isStructured: true,
      businessCase: {
        problem: "كشفت مواسم الأمطار الأخيرة عن فجوات في التنسيق بين التنبؤات الجوية ونشر صهاريج الصرف. التوجيه اليدوي الحالي بطيء للغاية.",
        solution: "مركز قيادة وسيطرة آلي يتنبأ باماكن تجمع المياه باستخدام الذكاء الاصطناعي ويقوم بتوجيه الموارد تلقائياً.",
        strategicAlignment: "يتماشى مباشرة مع 'البنية التحتية المستدامة' وركيزة البيئة في رؤية قطر 2030."
      },
      scopeOfWork: [
        { phase: "المرحلة 1: نشر المستشعرات", details: "تركيب 500 مستشعر لمستوى المياه بتقنية إنترنت الأشياء في الأنفاق والنقاط المنخفضة.", timeline: "الربع الثالث 2025" },
        { phase: "المرحلة 2: تطوير المنصة", details: "تطوير برمجيات مخصصة لخوارزمية التوجيه.", timeline: "الربع الرابع 2025" },
        { phase: "المرحلة 3: التكامل", details: "الربط مع واجهات برمجة تطبيقات وزارة الداخلية وإدارة الأرصاد الجوية.", timeline: "الربع الأول 2026" }
      ],
      technicalSpecs: [
        { category: "الاتصال", requirement: "شبكة NB-IoT / 5G مخصصة.", critical: true },
        { category: "الاستضافة", requirement: "سحابة ميزة (المستأجر الحكومي).", critical: true },
        { category: "الكمون", requirement: "تحديثات فورية < 30 ثانية.", critical: false }
      ],
      procurementStrategy: {
        method: "مناقصة عامة",
        evaluationCriteria: [
          { name: "الحل التقني", weight: "60%" },
          { name: "السعر", weight: "40%" }
        ],
        vendorQualification: "شركات دمج البرمجيات من الدرجة الأولى."
      },
      financialAnalysis: {
        capex: "10,000,000 ر.ق",
        opex: "500,000 ر.ق/سنة (صيانة بعد الضمان)",
        roi: "استرداد التكلفة في منع حدث فيضان كبير واحد.",
        benchmarking: "مقارنة بتكلفة شبكة المياه الذكية PUB في سنغافورة لكل مستشعر."
      },
      risks: [
        { name: "تخريب المستشعرات", prob: "متوسط", impact: "منخفض", mitigation: "هياكل متينة وتنبيهات التلاعب." },
        { name: "تكامل البيانات", prob: "عالي", impact: "عالي", mitigation: "توقيع اتفاقية مسبقة مع مزودي البيانات." }
      ],
      procurementStatus: {
        method: "مناقصة",
        status: "مراجعة كراسة الشروط",
        compliance: "مشروع استراتيجي"
      },
      phasingJustification: "يمكن التجزئة حسب المنطقة البلدية، لكن المنصة المركزية مطلوبة مقدماً."
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2025-12-01 08:00", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2025-12-01 14:30", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "مراجعة فنية", stepEn: "Technical Review", date: "2025-12-03 09:45", actor: "Ahmed Al-Mulla (MOM)", statusAr: "قيد الدراسة", statusEn: "In Review" }
    ],
    documents: [
      { name: 'Technical_Proposal.pdf', typeEn: 'Proposal', typeAr: 'عرض فني', size: '2.5 MB', date: '2025-01-15', url: 'http://localhost:8096/Technical_Proposal.pdf' },
      { name: 'RFP_Draft_v1.pdf', typeEn: 'RFP', typeAr: 'مسودة المناقصة', size: '1.2 MB', date: '2025-01-20' }
    ]
  },
  { 
    id: 'FA-2025-001', 
    applicantEn: 'Ministry of Interior', applicantAr: 'وزارة الداخلية', 
    typeEn: 'Operational/Capital (Ch 2&3)', typeAr: 'تشغيلي/رأسمالي (باب 2 و 3)', 
    statusEn: 'Approved', statusAr: 'معتمد', 
    date: '2025-01-08', priorityEn: 'High', priorityAr: 'عالية',
    alerts: 0,
    detailsEn: {
      approvalType: 'Preliminary Approval',
      category: 'Service',
      subject: 'IT Security & Software Services',
      requestingEntity: 'MOI - Cyber Security Dept',
      executingEntity: 'SecureTech Co.',
      startDate: '2026-03-01',
      endDate: '2027-02-28',
      totalValue: 3200000,
      projName: 'Cybersecurity Services Upgrade',
      description: 'Implementation of approved new initiative to enhance national security infrastructure. Procurement of advanced threat detection software and 24/7 managed security services.',
      scope: '1. Licencing for SIEM/SOAR platforms\n2. 24/7 SOC Monitoring Services\n3. Incident Response Retainer',
      economicImpact: 'Protection of critical national data assets valued at >500M QAR.',
      socialImpact: 'Ensuring public trust in digital government services (Metrash2).',
      budget: [{ year: '2025', amount: 3200000 }]
    },
    detailsAr: {
      approvalType: 'موافقة أولية',
      category: 'خدمات',
      subject: 'خدمات أمن المعلومات والبرمجيات',
      requestingEntity: 'وزارة الداخلية - إدارة الأمن السيبراني',
      executingEntity: 'SecureTech Co.',
      startDate: '2026-03-01',
      endDate: '2027-02-28',
      totalValue: 3200000,
      projName: 'تحديث خدمات الأمن السيبراني',
      description: 'تنفيذ مبادرة جديدة معتمدة لتعزيز البنية التحتية للأمن الوطني. شراء برمجيات متقدمة للكشف عن التهديدات وخدمات أمنية مدارة على مدار الساعة.',
      scope: '1. ترخيص لمنصات SIEM/SOAR\n2. خدمات مراقبة مركز العمليات الأمنية (SOC) على مدار 24/7\n3. خدمات الاستجابة للحوادث',
      economicImpact: 'حماية الأصول والبيانات الوطنية الحيوية التي تقدر قيمتها بأكثر من 500 مليون ريال قطري.',
      socialImpact: 'ضمان ثقة الجمهور في الخدمات الحكومية الرقمية (مثل مطراش2).',
      budget: [{ year: '2025', amount: 3200000 }]
    },
    longSummaryEn: {
      isStructured: true,
      businessCase: {
        problem: "Legacy endpoint protection systems are insufficient against modern ransomware vectors. The current contract expires in Feb 2026, posing a risk of coverage gap for critical MOI databases.",
        solution: "Deploying a Next-Gen AI-driven SOC (Security Operations Center) service. This consolidates 3 separate vendor contracts into one unified managed service, reducing administrative overhead.",
        strategicAlignment: "Aligns with 'Secure Nation' pillar of QNV 2030 and mandates from the National Cyber Security Agency (NCSA)."
      },
      scopeOfWork: [
        { phase: "Phase 1: Licensing Provisioning", details: "Activation of 15,000 Endpoint Detection & Response (EDR) licenses.", timeline: "Month 1" },
        { phase: "Phase 2: Integration", details: "Integration of log sources (Firewalls, Servers, Cloud) into SecureTech's SIEM.", timeline: "Month 2-3" },
        { phase: "Phase 3: Baselining", details: "AI learning period to establish normal traffic patterns and tune false positives.", timeline: "Month 4" },
        { phase: "Phase 4: Full Operations", details: "Handover to 24/7 active monitoring with 15-minute SLA for critical alerts.", timeline: "Month 5+" }
      ],
      technicalSpecs: [
        { category: "Threat Intelligence", requirement: "Real-time feed integration with GCC-CERT and Global Threat Exchanges.", critical: true },
        { category: "Data Residency", requirement: "All logs and telemetry must remain within Qatar borders (On-premise or Azure Qatar North).", critical: true },
        { category: "SLA Response", requirement: "L1 Response < 15 mins. L2 Analysis < 2 hours. L3 Remediation < 4 hours.", critical: false },
        { category: "Certification", requirement: "Service provider must be CREST accredited and ISO 27001 certified.", critical: true }
      ],
      procurementStrategy: {
        method: "Limited Tender (Security Exempt)",
        evaluationCriteria: [
          { name: "Technical Capability", weight: "50%" },
          { name: "Price", weight: "30%" },
          { name: "National Security Clearance", weight: "20%" }
        ],
        vendorQualification: "Pre-approved security vendors list only."
      },
      financialAnalysis: {
        capex: "QAR 1,200,000 (Software Licenses)",
        opex: "QAR 2,000,000 (Managed Services Manpower)",
        roi: "Consolidation saves QAR 450k/year vs previous multi-vendor setup.",
        benchmarking: "Rates are 5% below 2024 average for Tier-1 SOC analysts."
      },
      risks: [
        { name: "Integration Complexity", prob: "Medium", impact: "Medium", mitigation: " phased rollout starting with non-critical segments." },
        { name: "Data Volume Costs", prob: "High", impact: "Low", mitigation: "Fixed-price contract for log ingestion up to 5TB/day." }
      ],
      procurementStatus: {
        method: "Limited Tender",
        status: "Approved",
        compliance: "Compliant with Article 14 (Security Exceptions)"
      },
      phasingJustification: "Security monitoring cannot be phased. Partial coverage leaves the network vulnerable to lateral movement attacks."
    },
    longSummaryAr: {
      isStructured: true,
      businessCase: {
        problem: "أنظمة حماية نقاط النهاية القديمة غير كافية ضد فيروسات الفدية الحديثة. ينتهي العقد الحالي في فبراير 2026، مما يشكل خطراً بوجود فجوة في التغطية لقواعد بيانات وزارة الداخلية الحيوية.",
        solution: "نشر خدمة مركز عمليات الأمن (SOC) من الجيل القادم المدعوم بالذكاء الاصطناعي. هذا يوحد 3 عقود بائعين منفصلة في خدمة مدارة واحدة موحدة، مما يقلل من العبء الإداري.",
        strategicAlignment: "يتماشى مع ركيزة 'أمة آمنة' في رؤية قطر الوطنية 2030 وتفويضات الوكالة الوطنية للأمن السيبراني (NCSA)."
      },
      scopeOfWork: [
        { phase: "المرحلة 1: توفير التراخيص", details: "تفعيل 15,000 رخصة كشف واستجابة لنقاط النهاية (EDR).", timeline: "الشهر 1" },
        { phase: "المرحلة 2: التكامل", details: "دمج مصادر السجلات (جدران الحماية، الخوادم، السحابة) في نظام SIEM الخاص بالشركة المنفذة.", timeline: "الشهر 2-3" },
        { phase: "المرحلة 3: تحديد الخط الأساسي", details: "فترة تعلم الذكاء الاصطناعي لتأسيس أنماط المرور الطبيعية وضبط النتائج الإيجابية الخاطئة.", timeline: "الشهر 4" },
        { phase: "المرحلة 4: العمليات الكاملة", details: "التسليم للمراقبة النشطة على مدار 24/7 مع اتفاقية مستوى خدمة 15 دقيقة للتنبيهات الحرجة.", timeline: "الشهر 5+" }
      ],
      technicalSpecs: [
        { category: "استخبارات التهديدات", requirement: "تكامل التغذية في الوقت الحقيقي مع GCC-CERT وتبادلات التهديدات العالمية.", critical: true },
        { category: "إقامة البيانات", requirement: "يجب أن تبقى جميع السجلات والقياسات عن بعد داخل حدود دولة قطر (محلياً أو Azure Qatar North).", critical: true },
        { category: "استجابة SLA", requirement: "استجابة المستوى الأول < 15 دقيقة. تحليل المستوى الثاني < 2 ساعة. معالجة المستوى الثالث < 4 ساعات.", critical: false },
        { category: "الشهادات", requirement: "يجب أن يكون مقدم الخدمة معتمداً من CREST وحاصلاً على شهادة ISO 27001.", critical: true }
      ],
      procurementStrategy: {
        method: "مناقصة محدودة (استثناء أمني)",
        evaluationCriteria: [
          { name: "القدرة الفنية", weight: "50%" },
          { name: "السعر", weight: "30%" },
          { name: "التصريح الأمني", weight: "20%" }
        ],
        vendorQualification: "قائمة بائعي الأمن المعتمدين مسبقاً فقط."
      },
      financialAnalysis: {
        capex: "1,200,000 ر.ق (تراخيص البرمجيات)",
        opex: "2,000,000 ر.ق (قوى عاملة للخدمات المدارة)",
        roi: "التوحيد يوفر 450 ألف ريال سنوياً مقارنة بإعداد البائعين المتعددين السابق.",
        benchmarking: "الأسعار أقل بنسبة 5% من متوسط السوق لعام 2024 لمحللي SOC من المستوى الأول."
      },
      risks: [
        { name: "تعقيد التكامل", prob: "متوسط", impact: "متوسط", mitigation: "تطبيق مرحلي يبدأ بالقطاعات غير الحيوية." },
        { name: "تكاليف حجم البيانات", prob: "عالي", impact: "منخفض", mitigation: "عقد بسعر ثابت لاستيعاب السجلات حتى 5 تيرابايت/يوم." }
      ],
      procurementStatus: {
        method: "مناقصة محدودة",
        status: "تمت الموافقة",
        compliance: "متوافق مع المادة 14 (الاستثناءات الأمنية)"
      },
      phasingJustification: "لا يمكن تجزئة المراقبة الأمنية. التغطية الجزئية تترك الشبكة عرضة للهجمات الجانبية، مما يبطل الغرض من المشروع."
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2025-01-02 07:30", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2025-01-03 09:00", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "مراجعة أمنية", stepEn: "Security Review", date: "2025-01-05 11:00", actor: "NCSA Rep", statusAr: "موافق عليه", statusEn: "Approved" },
      { stepAr: "مراجعة مالية", stepEn: "Financial Review", date: "2025-01-07 14:00", actor: "Fin. Officer", statusAr: "موافق عليه", statusEn: "Approved" },
      { stepAr: "معتمد", stepEn: "Approved", date: "2025-01-08 16:30", actor: "Director General", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: [
      { name: 'Tech_Specs_Sec_v2.pdf', typeEn: 'RFP', typeAr: 'كراسة شروط', size: '3.1 MB', date: '2025-12-10' },
      { name: 'NCSA_Endorsement.pdf', typeEn: 'Approval', typeAr: 'موافقة', size: '0.5 MB', date: '2025-12-15' },
      { name: 'Financial_Offer_SecureTech.xlsx', typeEn: 'Finance', typeAr: 'عرض مالي', size: '1.2 MB', date: '2026-01-05' }
    ]
  },
  { 
    id: 'FA-2025-002', 
    applicantEn: 'Ministry of Transport', applicantAr: 'وزارة المواصلات', 
    typeEn: 'Main Projects (Ch 4)', typeAr: 'المشاريع الرئيسية (باب 4)', 
    statusEn: 'Approved', statusAr: 'معتمد', 
    date: '2024-12-22', priorityEn: 'Medium', priorityAr: 'متوسطة',
    alerts: 0,
    detailsEn: {
      approvalType: 'Final Approval',
      category: 'Framework Contract',
      subject: 'Training Services (Teachers Upskilling)',
      requestingEntity: 'MOT - National Transport Academy',
      executingEntity: 'EduPro Training',
      startDate: '2026-02-01',
      endDate: '2028-01-31',
      totalValue: 13000000,
      projName: 'Transport Workforce Upskilling Program',
      description: 'Implementation of National Development Strategy initiative (PRJ-EDU-009). Framework agreement for upskilling instructors and trainers within the transport sector.',
      scope: '1. Train-the-Trainer Certification\n2. Curriculum Development for Autonomous Transport\n3. 5000 Training Hours over 2 years',
      economicImpact: 'Bridging the skill gap for operating new Metro and Tram expansions.',
      socialImpact: 'Job creation for nationals in specialized transport sectors.',
      budget: [{ year: '2025', amount: 6500000 }, { year: '2026', amount: 6500000 }]
    },
    detailsAr: {
      approvalType: 'موافقة نهائية',
      category: 'عقد إطاري',
      subject: 'خدمات التدريب (تطوير المعلمين)',
      requestingEntity: 'وزارة المواصلات - أكاديمية النقل الوطنية',
      executingEntity: 'EduPro Training',
      startDate: '2026-02-01',
      endDate: '2028-01-31',
      totalValue: 13000000,
      projName: 'برنامج تطوير قوى عمل النقل',
      description: 'تنفيذ مبادرة استراتيجية التنمية الوطنية (PRJ-EDU-009). اتفاقية إطارية لرفع كفاءة المدربين والمعلمين في قطاع النقل.',
      scope: '1. شهادة تدريب المدربين (TOT)\n2. تطوير مناهج النقل الذاتي\n3. 5000 ساعة تدريبية على مدار عامين',
      economicImpact: 'سد الفجوة المهارية لتشغيل توسعات المترو والترام الجديدة.',
      socialImpact: 'خلق فرص عمل للمواطنين في قطاعات النقل المتخصصة.',
      budget: [{ year: '2025', amount: 6500000 }, { year: '2026', amount: 6500000 }]
    },
    longSummaryEn: {
      isStructured: true,
      businessCase: {
        problem: "Rapid expansion of the public transport network has outpaced the availability of qualified local trainers. Reliance on foreign consultants for basic training is unsustainable and costly.",
        solution: "A comprehensive 'Train-the-Trainer' framework to certify 200 local instructors who will subsequently train the wider workforce.",
        strategicAlignment: "Directly supports NDS3 'Human Development' goals and the Qatarization mandate in the transport sector."
      },
      scopeOfWork: [
        { phase: "Phase 1: Curriculum Design", details: "Localization of international transport safety materials (IATA/UIC standards).", timeline: "Month 1-3" },
        { phase: "Phase 2: Master Trainer Sessions", details: "Intensive 4-week bootcamps for Senior Instructors.", timeline: "Month 4-6" },
        { phase: "Phase 3: Pilot Rollout", details: "instructors deliver training under supervision of EduPro experts.", timeline: "Month 7-12" },
        { phase: "Phase 4: Certification", details: "Accreditation of the National Transport Academy as a regional hub.", timeline: "Year 2" }
      ],
      technicalSpecs: [
        { category: "Accreditation", requirement: "Provider must be an Authorized Training Center (ATC) for International Transport bodies.", critical: true },
        { category: "Language", requirement: "All materials and delivery must be bilingual (Arabic/English).", critical: true },
        { category: "Platform", requirement: "Includes LMS (Learning Management System) license for 2000 users.", critical: false },
        { category: "KPIs", requirement: "Min 90% pass rate for certification exams.", critical: true }
      ],
      procurementStrategy: {
        method: "Framework Agreement",
        evaluationCriteria: [
          { name: "Curriculum Quality", weight: "40%" },
          { name: "Staff Experience", weight: "30%" },
          { name: "Commercial", weight: "30%" }
        ],
        vendorQualification: "Previous experience with government academies in GCC."
      },
      financialAnalysis: {
        capex: "QAR 0 (Service based)",
        opex: "QAR 13,000,000 (Unit rate per training hour + Curriculum fees)",
        roi: "Reducing consultant spend by QAR 8M annually after year 2.",
        benchmarking: "Unit rate of QAR 1200/hr is consistent with MOPHR educational framework rates."
      },
      risks: [
        { name: "Low Attendance", prob: "Medium", impact: "High", mitigation: "Mandatory attendance policy linked to promotion." },
        { name: "Curriculum Relevance", prob: "Low", impact: "Medium", mitigation: "Steering committee approval required for all modules." }
      ],
      procurementStatus: {
        method: "Framework Contract",
        status: "Approved",
        compliance: "Standard Tender"
      },
      phasingJustification: "Can be phased annually (as requested), but core curriculum development (Ch 4 cost) must be paid upfront in 2025."
    },
    longSummaryAr: {
      isStructured: true,
      businessCase: {
        problem: "التوسع السريع في شبكة النقل العام فاق توفر المدربين المحليين المؤهلين. الاعتماد على الاستشاريين الأجانب للتدريب الأساسي غير مستدام ومكلف للغاية.",
        solution: "إطار عمل شامل 'تدريب المدربين' لاعتماد 200 مدرب محلي سيقومون لاحقاً بتدريب القوى العاملة الأوسع، مما يضمن استدامة المعرفة.",
        strategicAlignment: "يدعم مباشرة أهداف 'التنمية البشرية' في استراتيجية التنمية الوطنية الثالثة وتفويض التقطير في قطاع النقل."
      },
      scopeOfWork: [
        { phase: "المرحلة 1: تصميم المناهج", details: "توطين مواد سلامة النقل الدولية (معايير IATA/UIC) لتناسب السياق المحلي.", timeline: "الشهر 1-3" },
        { phase: "المرحلة 2: دورات كبار المدربين", details: "معسكرات مكثفة لمدة 4 أسابيع لكبار المدربين لتأهيلهم.", timeline: "الشهر 4-6" },
        { phase: "المرحلة 3: التشغيل التجريبي", details: "يقدم المدربون الجدد التدريب تحت إشراف خبراء EduPro لضمان الجودة.", timeline: "الشهر 7-12" },
        { phase: "المرحلة 4: الاعتماد", details: "اعتماد أكاديمية النقل الوطنية كمركز إقليمي معتمد للتدريب.", timeline: "السنة 2" }
      ],
      technicalSpecs: [
        { category: "الاعتماد", requirement: "يجب أن يكون المزود مركز تدريب معتمد (ATC) لهيئات النقل الدولية.", critical: true },
        { category: "اللغة", requirement: "يجب أن تكون جميع المواد والتقديم ثنائي اللغة (عربي/إنجليزي).", critical: true },
        { category: "المنصة", requirement: "يشمل رخصة نظام إدارة التعلم (LMS) لـ 2000 مستخدم.", critical: false },
        { category: "مؤشرات الأداء", requirement: "حد أدنى 90% معدل نجاح لامتحانات الشهادة.", critical: true }
      ],
      procurementStrategy: {
        method: "اتفاقية إطارية",
        evaluationCriteria: [
          { name: "جودة المناهج", weight: "40%" },
          { name: "خبرة الموظفين", weight: "30%" },
          { name: "العرض التجاري", weight: "30%" }
        ],
        vendorQualification: "خبرة سابقة مع أكاديميات حكومية في دول مجلس التعاون الخليجي."
      },
      financialAnalysis: {
        capex: "0 ر.ق (قائم على الخدمة)",
        opex: "13,000,000 ر.ق (سعر الوحدة لكل ساعة تدريب + رسوم المناهج)",
        roi: "تقليل الإنفاق على الاستشاريين بمقدار 8 ملايين ريال سنوياً بعد السنة الثانية.",
        benchmarking: "سعر الوحدة 1200 ريال/ساعة يتماشى مع معدلات الإطار التعليمي لوزارة الصحة العامة."
      },
      risks: [
        { name: "انخفاض الحضور", prob: "متوسط", impact: "عالي", mitigation: "سياسة حضور إلزامية مرتبطة بالترقية الوظيفية." },
        { name: "ملاءمة المناهج", prob: "منخفض", impact: "متوسط", mitigation: "موافقة اللجنة التوجيهية مطلوبة لجميع الوحدات التدريبية." }
      ],
      procurementStatus: {
        method: "عقد إطاري",
        status: "تمت الموافقة",
        compliance: "مناقصة قياسية"
      },
      phasingJustification: "يمكن التجزئة سنوياً (كما هو مطلوب)، ولكن تطوير المناهج الأساسية (تكلفة الباب 4) يجب دفعه مقدماً في عام 2025 لضمان الجاهزية."
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2024-12-15 08:30", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2024-12-16 10:00", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "مراجعة الموارد البشرية", stepEn: "HR Review", date: "2024-12-18 13:45", actor: "HR Manager", statusAr: "موافق عليه", statusEn: "Approved" },
      { stepAr: "معتمد", stepEn: "Approved", date: "2024-12-22 09:15", actor: "Minister Office", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: [
      { name: 'Training_Framework_RFP.pdf', typeEn: 'RFP', typeAr: 'كراسة شروط', size: '5.4 MB', date: '2025-11-20' },
      { name: 'EduPro_Commercial_Bid.xlsx', typeEn: 'Finance', typeAr: 'عرض مالي', size: '1.8 MB', date: '2025-12-05' },
      { name: 'NDS3_Alignment_Report.pdf', typeEn: 'Strategic', typeAr: 'استراتيجي', size: '2.2 MB', date: '2025-10-15' }
    ]
  },
  { 
    id: 'FA-2025-003', 
    applicantEn: 'Ministry of Justice', applicantAr: 'وزارة العدل', 
    typeEn: 'Operational (Ch 2)', typeAr: 'تشغيلي (باب 2)', 
    statusEn: 'Approved', statusAr: 'معتمد', 
    date: '2025-01-04', priorityEn: 'Low', priorityAr: 'منخفضة',
    alerts: 0,
    detailsEn: {
      approvalType: 'Change Order / Renewal',
      category: 'Services',
      subject: 'Cleaning Services for Court Complex',
      requestingEntity: 'MOJ - Facilities Management',
      executingEntity: 'CleanCity LLC',
      startDate: '2026-02-01',
      endDate: '2027-01-31',
      totalValue: 1800000,
      projName: 'Facility Hygiene & Maintenance',
      description: 'Renew existing commitment (APR-2024-187) for cleaning and waste management services at the Main Court Complex and Lusail branches.',
      scope: '1. General Cleaning (Internal/External)\n2. Waste Disposal & Recycling\n3. Landscaping maintenance',
      economicImpact: 'Asset preservation.',
      socialImpact: 'Health & Safety compliance for public visitors.',
      budget: [{ year: '2026', amount: 1800000 }]
    },
    detailsAr: {
      approvalType: 'أمر تغيير / تجديد',
      category: 'خدمات',
      subject: 'خدمات النظافة لمجمع المحاكم',
      requestingEntity: 'وزارة العدل - إدارة المرافق',
      executingEntity: 'CleanCity LLC',
      startDate: '2026-02-01',
      endDate: '2027-01-31',
      totalValue: 1800000,
      projName: 'النظافة وصيانة المرافق',
      description: 'تجديد الالتزام الحالي (APR-2024-187) لخدمات النظافة وإدارة النفايات في مجمع المحاكم الرئيسي وفروع لوسيل.',
      scope: '1. النظافة العامة (داخلية/خارجية)\n2. التخلص من النفايات وإعادة التدوير\n3. صيانة المناظر الطبيعية',
      economicImpact: 'الحفاظ على الأصول الحكومية.',
      socialImpact: 'الامتثال لمعايير الصحة والسلامة للزوار والموظفين.',
      budget: [{ year: '2026', amount: 1800000 }]
    },
    longSummaryEn: {
      isStructured: true,
      businessCase: {
        problem: "Current contract expires Jan 31st, 2026. Interruption in service would violate Health & Safety regulations for public buildings.",
        solution: "Exercise option year 3 of existing contract with CleanCity LLC. This avoids mobilization costs of a new vendor.",
        strategicAlignment: "Operational continuity."
      },
      scopeOfWork: [
        { phase: "Daily Operations", details: "Shift based cleaning (6am - 10pm) for all public areas, courtrooms, and offices.", timeline: "Daily" },
        { phase: "Quarterly Deep Clean", details: "Facade cleaning and marble polishing.", timeline: "Quarterly" }
      ],
      technicalSpecs: [
        { category: "Manpower", requirement: "45 Cleaners + 3 Supervisors.", critical: true },
        { category: "Materials", requirement: "Must use eco-friendly/biodegradable chemicals (Green Building req).", critical: false },
        { category: "Equipment", requirement: "Vendor provides all machinery (scrubbers, vacuums).", critical: false }
      ],
      procurementStrategy: {
        method: "Direct Agreement (Extension)",
        evaluationCriteria: [
          { name: "Performance History", weight: "100%" }
        ],
        vendorQualification: "Incumbent vendor."
      },
      financialAnalysis: {
        capex: "N/A",
        opex: "QAR 1,800,000 (Monthly billing)",
        roi: "N/A - Operational Necessity.",
        benchmarking: "Same rates as 2024/2025. No inflation applied."
      },
      risks: [
        { name: "Staff Turnover", prob: "Medium", impact: "Low", mitigation: "Vendor obligated to replace staff within 24 hours." }
      ],
      procurementStatus: {
        method: "Change Order",
        status: "Approved",
        compliance: "Contract allows for +20% variation/extension."
      },
      phasingJustification: "Cannot be phased. Monthly service."
    },
    longSummaryAr: {
      isStructured: true,
      businessCase: {
        problem: "ينتهي العقد الحالي في 31 يناير 2026. أي انقطاع في الخدمة سيخالف لوائح الصحة والسلامة للمباني العامة ويؤثر على سير العمل.",
        solution: "ممارسة خيار السنة الثالثة من العقد الحالي مع شركة CleanCity LLC. هذا يجنب تكاليف التعبئة لمورد جديد ويضمن استمرارية الخدمة.",
        strategicAlignment: "استمرارية التشغيل والكفاءة التشغيلية."
      },
      scopeOfWork: [
        { phase: "العمليات اليومية", details: "تنظيف بنظام الورديات (6 صباحاً - 10 مساءً) لجميع المناطق العامة وقاعات المحاكم والمكاتب.", timeline: "يومي" },
        { phase: "التنظيف العميق الفصلي", details: "تنظيف الواجهات وتلميع الرخام والصيانة الوقائية.", timeline: "ربع سنوي" }
      ],
      technicalSpecs: [
        { category: "القوى العاملة", requirement: "45 عامل نظافة + 3 مشرفين.", critical: true },
        { category: "المواد", requirement: "يجب استخدام مواد كيميائية صديقة للبيئة/قابلة للتحلل (متطلبات المباني الخضراء).", critical: false },
        { category: "المعدات", requirement: "يوفر المورد جميع الآلات (أجهزة الغسيل، المكانس الكهربائية).", critical: false }
      ],
      procurementStrategy: {
        method: "اتفاق مباشر (تتمديد)",
        evaluationCriteria: [
          { name: "سجل الأداء السابق", weight: "100%" }
        ],
        vendorQualification: "المورد الحالي (أداء مرضي)."
      },
      financialAnalysis: {
        capex: "غير منطبق",
        opex: "1,800,000 ر.ق (فواتير شهرية)",
        roi: "غير منطبق - ضرورة تشغيلية.",
        benchmarking: "نفس معدلات 2024/2025. لم يتم تطبيق أي زيادة تضخم."
      },
      risks: [
        { name: "دوران الموظفين", prob: "متوسط", impact: "منخفض", mitigation: "المورد ملزم باستبدال الموظفين خلال 24 ساعة." }
      ],
      procurementStatus: {
        method: "أمر تغيير",
        status: "معتمد",
        compliance: "العقد يسمح بتغيير/تمديد بنسبة +20%."
      },
      phasingJustification: "لا يمكن تجزئتها. خدمة شهرية مستمرة."
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2024-12-28 08:00", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2024-12-29 09:30", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "مراجعة إدارة المرافق", stepEn: "FM Review", date: "2025-01-02 11:15", actor: "Facilities Mgr", statusAr: "موافق عليه", statusEn: "Approved" },
      { stepAr: "معتمد", stepEn: "Approved", date: "2025-01-04 14:00", actor: "Contracts Dept", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: [
      { name: 'Original_Contract_2024.pdf', typeEn: 'Contract', typeAr: 'عقد', size: '8.2 MB', date: '2024-01-15' },
      { name: 'Performance_Report_2025.pdf', typeEn: 'Report', typeAr: 'تقرير', size: '1.1 MB', date: '2025-12-20' },
      { name: 'Change_Order_Request_Form.pdf', typeEn: 'Form', typeAr: 'نموذج', size: '0.3 MB', date: '2026-01-02' }
    ]
  },
  { 
    id: 'REQ-TECH-2024-089', 
    applicantEn: 'Min. of Comm. & IT (MCIT)', applicantAr: 'وزارة الاتصالات وتكنولوجيا المعلومات', 
    typeEn: 'Budget Variation', typeAr: 'تعديل الميزانية', 
    statusEn: 'Approved', statusAr: 'معتمد', 
    date: '2024-02-14', priorityEn: 'High', priorityAr: 'عالية',
    alerts: 0,
    detailsEn: {
      approvalType: 'Extension',
      category: 'Goods & Services',
      subject: 'HPC & GPU Cluster for National LLM',
      requestingEntity: 'MCIT - AI Dept',
      executingEntity: 'National Data Center Provider (TBD)',
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      totalValue: 45000000,
      projName: 'Project Falcon: National Arabic LLM',
      description: 'Request for additional funding to procure High-Performance Computing infrastructure. This is critical to accelerate the training phase of the National Arabic Large Language Model (Falcon-AR) to meet the Q4 launch deadline.',
      scope: '1. Procurement of HPC GPU Clusters\n2. High-speed Low-Latency Networking setup\n3. 12-month Enterprise Support & Maintenance',
      economicImpact: 'Est. 120M QAR annual efficiency gains across gov services via AI automation.',
      socialImpact: 'Preservation of Arabic heritage in digital space; improved citizen services.',
      budget: [{ year: '2024', amount: 35000000 }, { year: '2025', amount: 10000000 }]
    },
    detailsAr: {
      approvalType: 'تمديد',
      category: 'سلع وخدمات',
      subject: 'مجموعة الحوسبة عالية الأداء والوحدات الرسومية للنموذج اللغوي الوطني',
      requestingEntity: 'وزارة الاتصالات - إدارة الذكاء الاصطناعي',
      executingEntity: 'مزود مركز البيانات الوطني (قيد التحديد)',
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      totalValue: 45000000,
      projName: 'مشروع فالكون: النموذج اللغوي العربي الوطني',
      description: 'طلب تمويل إضافي لشراء بنية تحتية للحوسبة عالية الأداء. هذا أمر بالغ الأهمية لتسريع مرحلة تدريب النموذج اللغوي العربي الكبير الوطني (Falcon-AR) للوفاء بموعد الإطلاق في الربع الرابع.',
      scope: '1. شراء مجموعات GPU للحوسبة عالية الأداء\n2. إعداد شبكات عالية السرعة ومنخفضة الكمون\n3. دعم وصيانة للمؤسسات لمدة 12 شهرًا',
      economicImpact: 'مكاسب كفاءة سنوية تقدر بـ 120 مليون ريال قطري عبر الخدمات الحكومية من خلال أتمتة الذكاء الاصطناعي.',
      socialImpact: 'الحفاظ على التراث العربي في الفضاء الرقمي؛ تحسين خدمات المواطنين.',
      budget: [{ year: '2024', amount: 35000000 }, { year: '2025', amount: 10000000 }]
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2024-02-01 08:00", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2024-02-02 10:30", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "مراجعة تقنية", stepEn: "Technical Review", date: "2024-02-05 14:15", actor: "IT Director", statusAr: "موافق عليه", statusEn: "Approved" },
      { stepAr: "معتمد", stepEn: "Approved", date: "2024-02-14 11:45", actor: "Budget Dept", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: [
      { name: 'RFP_Full_Document_v4.pdf', typeEn: 'RFP', typeAr: 'كراسة شروط', size: '14.2 MB', date: '2024-01-20' },
      { name: 'Technical_Bill_of_Quantities.xlsx', typeEn: 'BoQ', typeAr: 'جدول الكميات', size: '2.1 MB', date: '2024-02-01' },
      { name: 'Data_Sovereignty_Legal_Opinion.pdf', typeEn: 'Legal', typeAr: 'رأي قانوني', size: '1.4 MB', date: '2024-02-10' }
    ]
  },
  { 
    id: 'REQ-HLTH-2024-201', 
    applicantEn: 'Min. of Public Health', applicantAr: 'وزارة الصحة العامة', 
    typeEn: 'Budget Variation', typeAr: 'تعديل الميزانية', 
    statusEn: 'Approved', statusAr: 'معتمد', 
    date: '2024-02-08', priorityEn: 'Low', priorityAr: 'منخفضة',
    alerts: 0,
    detailsEn: {
      approvalType: 'Extension',
      category: 'Service',
      subject: 'Genomic Data Lake Expansion',
      requestingEntity: 'MOPH - Research',
      executingEntity: 'Google Cloud / Oracle',
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      totalValue: 7500000,
      projName: 'Qatar Genome Cloud Storage',
      description: 'Request to increase cloud storage budget due to higher than expected sequencing data volume (Big Data).',
      scope: 'Additional 5PB of Hot Storage and 20PB of Cold Archive Storage.',
      economicImpact: 'Supports biotech research commercialization.',
      socialImpact: 'Accelerates personalized medicine initiatives.',
      budget: [{ year: '2024', amount: 7500000 }]
    },
    detailsAr: {
      approvalType: 'تمديد',
      category: 'خدمات',
      subject: 'توسيع بحيرة البيانات الجينية',
      requestingEntity: 'وزارة الصحة - البحوث',
      executingEntity: 'Google Cloud / Oracle',
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      totalValue: 7500000,
      projName: 'التخزين السحابي لجينوم قطر',
      description: 'طلب زيادة ميزانية التخزين السحابي بسبب حجم بيانات التسلسل الأعلى من المتوقع (البيانات الضخمة).',
      scope: '5 بيتابايت إضافية من التخزين الساخن و 20 بيتابايت من أرشيف التخزين البارد.',
      economicImpact: 'يدعم تسويق أبحاث التكنولوجيا الحيوية.',
      socialImpact: 'يسرع مبادرات الطب الشخصي.',
      budget: [{ year: '2024', amount: 7500000 }]
    },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2024-02-01 09:00", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2024-02-02 11:30", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "معتمد", stepEn: "Approved", date: "2024-02-08 15:00", actor: "Research Director", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: [
      { name: 'RFP_Cloud_Storage_Services.pdf', typeEn: 'RFP', typeAr: 'كراسة شروط', size: '1.5 MB', date: '2024-01-10' },
      { name: 'Capacity_Planning_Report.xlsx', typeEn: 'Technical', typeAr: 'فني', size: '2.2 MB', date: '2024-01-25' }
    ]
  },
  { 
    id: 'REQ-SAS-2025-891', 
    applicantEn: 'Ministry of Comm. & IT', applicantAr: 'وزارة الاتصالات وتكنولوجيا المعلومات', 
    typeEn: 'Framework Agreement', typeAr: 'اتفاقية إطارية', 
    statusEn: 'Approved', statusAr: 'موافق عليه', 
    date: '2025-04-11', priorityEn: 'Medium', priorityAr: 'متوسطة',
    alerts: 0,
    detailsEn: {
      approvalType: 'New Agreement',
      category: 'Services',
      subject: 'SAS Framework Agreement',
      requestingEntity: 'MCIT',
      executingEntity: 'SAS Institute',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 1000000,
      projName: 'Analytics Platform License',
      description: 'Main framework agreement for SAS Analytics software services for 12 months duration.',
      scope: '1. Software Licensing\n2. Maintenance & Support',
      economicImpact: 'Enhancing data analytics capabilities.',
      socialImpact: 'N/A',
      budget: [{ year: '2025', amount: 500000 }, { year: '2026', amount: 500000 }]
    },
    detailsAr: {
      approvalType: 'اتفاقية جديدة',
      category: 'خدمات',
      subject: 'اتفاقية إطارية لشركة SAS',
      requestingEntity: 'وزارة الاتصالات',
      executingEntity: 'معهد SAS',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 1000000,
      projName: 'رخصة منصة التحليلات',
      description: 'اتفاقية إطارية رئيسية لخدمات برمجيات SAS التحليلية لمدة 12 شهراً.',
      scope: '1. ترخيص البرمجيات\n2. الصيانة والدعم',
      economicImpact: 'تعزيز قدرات تحليل البيانات.',
      socialImpact: 'غير منطبق',
      budget: [{ year: '2025', amount: 500000 }, { year: '2026', amount: 500000 }]
    },
    longSummaryEn: { isStructured: true, businessCase: { problem: "Need for advanced analytics tools to process government data.", solution: "Framework agreement with SAS to provide standardized tooling.", strategicAlignment: "Digital Transformation." }, scopeOfWork: [{ phase: "Delivery", details: "License activation.", timeline: "Immediate" }], technicalSpecs: [{ category: "Software", requirement: "SAS Viya", critical: true }], procurementStrategy: { method: "Direct", evaluationCriteria: [{name: "Technical", weight: "100%"}], vendorQualification: "Sole Source" }, financialAnalysis: { capex: "0", opex: "1,000,000", roi: "High", benchmarking: "Standard Global Pricing" }, risks: [{ name: "Utilization", prob: "Low", impact: "Medium", mitigation: "Training provided" }], procurementStatus: { method: "Direct", status: "Approved", compliance: "Compliant" }, phasingJustification: "Annual License." },
    longSummaryAr: { isStructured: true, businessCase: { problem: "الحاجة إلى أدوات تحليل متقدمة لمعالجة البيانات الحكومية.", solution: "اتفاقية إطارية مع SAS لتوفير أدوات موحدة.", strategicAlignment: "التحول الرقمي." }, scopeOfWork: [{ phase: "التسليم", details: "تفعيل الترخيص.", timeline: "فوري" }], technicalSpecs: [{ category: "البرمجيات", requirement: "SAS Viya", critical: true }], procurementStrategy: { method: "مباشر", evaluationCriteria: [{name: "فني", weight: "100%"}], vendorQualification: "مصدر وحيد" }, financialAnalysis: { capex: "0", opex: "1,000,000", roi: "عالي", benchmarking: "التسعير العالمي القياسي" }, risks: [{ name: "الاستخدام", prob: "منخفض", impact: "متوسط", mitigation: "توفير التدريب" }], procurementStatus: { method: "مباشر", status: "معتمد", compliance: "متوافق" }, phasingJustification: "رخصة سنوية." },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2025-04-10 11:01", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2025-04-10 11:01", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "تحت الإجراء", stepEn: "In Process", date: "2025-04-10 11:06", actor: "OMER ALBOKARI QC", statusAr: "الموافقة", statusEn: "Approved" },
      { stepAr: "تم الارسال للإعتماد", stepEn: "Sent for Approval", date: "2025-04-10 11:08", actor: "OMER ALBOKARI QC1", statusAr: "الموافقة", statusEn: "Approved" },
      { stepAr: "موافق عليه", stepEn: "Approved", date: "2025-04-11 11:10", actor: "OMER ALBOKARI QC2", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: []
  },
  { 
    id: 'REQ-SAS-2025-907', 
    applicantEn: 'Ministry of Finance', applicantAr: 'وزارة المالية', 
    typeEn: 'Framework Agreement', typeAr: 'اتفاقية إطارية', 
    statusEn: 'Approved', statusAr: 'موافق عليه', 
    date: '2025-04-12', priorityEn: 'High', priorityAr: 'عالية',
    alerts: 0,
    detailsEn: {
      approvalType: 'New Agreement',
      category: 'Services',
      subject: 'Enterprise SAS Framework Agreement',
      requestingEntity: 'MOF',
      executingEntity: 'SAS Institute',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 10000000,
      projName: 'National Finance Analytics Platform',
      description: 'Major framework agreement for SAS Analytics services across the ministry for 12 months.',
      scope: 'Enterprise-wide Software Licensing and Support',
      economicImpact: 'Critical for financial forecasting.',
      socialImpact: 'N/A',
      budget: [{ year: '2025', amount: 5000000 }, { year: '2026', amount: 5000000 }]
    },
    detailsAr: {
      approvalType: 'اتفاقية جديدة',
      category: 'خدمات',
      subject: 'اتفاقية SAS الإطارية للمؤسسات',
      requestingEntity: 'وزارة المالية',
      executingEntity: 'معهد SAS',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 10000000,
      projName: 'منصة التحليلات المالية الوطنية',
      description: 'اتفاقية إطارية رئيسية لخدمات تحليلات SAS عبر الوزارة لمدة 12 شهراً.',
      scope: 'ترخيص البرمجيات ودعم على مستوى المؤسسة',
      economicImpact: 'حاسم للتنبؤ المالي.',
      socialImpact: 'غير منطبق',
      budget: [{ year: '2025', amount: 5000000 }, { year: '2026', amount: 5000000 }]
    },
    longSummaryEn: { isStructured: true, businessCase: { problem: "Consolidation of financial analytics tools.", solution: "Enterprise Agreement with SAS.", strategicAlignment: "Financial Sustainability." }, scopeOfWork: [{ phase: "Rollout", details: "Enterprise deployment.", timeline: "Q2 2025" }], technicalSpecs: [{ category: "Platform", requirement: "Cloud Native", critical: true }], procurementStrategy: { method: "Direct", evaluationCriteria: [{name: "Cost", weight: "50%"}], vendorQualification: "Strategic Partner" }, financialAnalysis: { capex: "2M", opex: "8M", roi: "Very High", benchmarking: "Discounted Enterprise Rate" }, risks: [{ name: "Adoption", prob: "Medium", impact: "High", mitigation: "Change Management" }], procurementStatus: { method: "Direct", status: "Approved", compliance: "Compliant" }, phasingJustification: "Enterprise License." },
    longSummaryAr: { isStructured: true, businessCase: { problem: "توحيد أدوات التحليل المالي.", solution: "اتفاقية مؤسسية مع SAS.", strategicAlignment: "الاستدامة المالية." }, scopeOfWork: [{ phase: "النشر", details: "نشر على مستوى المؤسسة.", timeline: "الربع الثاني 2025" }], technicalSpecs: [{ category: "المنصة", requirement: "سحابية", critical: true }], procurementStrategy: { method: "مباشر", evaluationCriteria: [{name: "التكلفة", weight: "50%"}], vendorQualification: "شريك استراتيجي" }, financialAnalysis: { capex: "2M", opex: "8M", roi: "عالي جداً", benchmarking: "سعر مؤسسي مخفض" }, risks: [{ name: "التبني", prob: "متوسط", impact: "عالي", mitigation: "إدارة التغيير" }], procurementStatus: { method: "مباشر", status: "معتمد", compliance: "متوافق" }, phasingJustification: "رخصة مؤسسية." },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2025-04-10 08:10", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2025-04-10 08:10", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "تحت الإجراء", stepEn: "In Process", date: "2025-04-11 09:10", actor: "OMER ALBOKARI QC", statusAr: "الموافقة", statusEn: "Approved" },
      { stepAr: "تم الارسال للإعتماد", stepEn: "Sent for Approval", date: "2025-04-12 09:12", actor: "OMER ALBOKARI QC1", statusAr: "الموافقة", statusEn: "Approved" },
      { stepAr: "موافق عليه", stepEn: "Approved", date: "2025-04-12 09:36", actor: "OMER ALBOKARI QC2", statusAr: "اعتماد", statusEn: "Final Approval" }
    ],
    documents: []
  },
  { 
    id: 'REQ-SAS-2025-916', 
    applicantEn: 'Ministry of Finance', applicantAr: 'وزارة المالية', 
    typeEn: 'Framework Agreement', typeAr: 'اتفاقية إطارية', 
    statusEn: 'Rejected', statusAr: 'مرفوض', 
    date: '2025-04-15', priorityEn: 'High', priorityAr: 'عالية',
    alerts: 1,
    detailsEn: {
      approvalType: 'New Agreement',
      category: 'Services',
      subject: 'SAS Framework Agreement',
      requestingEntity: 'MOF',
      executingEntity: 'SAS Institute',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 999999,
      projName: 'Analytics License (Draft)',
      description: 'Request for SAS services. Rejected due to missing documentation.',
      scope: 'N/A',
      economicImpact: 'N/A',
      socialImpact: 'N/A',
      budget: [{ year: '2025', amount: 500000 }, { year: '2026', amount: 500000 }]
    },
    detailsAr: {
      approvalType: 'اتفاقية جديدة',
      category: 'خدمات',
      subject: 'اتفاقية إطارية لشركة SAS',
      requestingEntity: 'وزارة المالية',
      executingEntity: 'معهد SAS',
      startDate: '2025-05-01',
      endDate: '2026-04-30',
      totalValue: 999999,
      projName: 'رخصة تحليلات (مسودة)',
      description: 'طلب خدمات SAS. تم الرفض بسبب نقص المستندات (عدم إرفاق النموذج).',
      scope: 'غير منطبق',
      economicImpact: 'غير منطبق',
      socialImpact: 'غير منطبق',
      budget: [{ year: '2025', amount: 500000 }, { year: '2026', amount: 500000 }]
    },
    longSummaryEn: { isStructured: false, businessCase: { problem: "", solution: "", strategicAlignment: "" }, scopeOfWork: [], technicalSpecs: [], procurementStrategy: { method: "", evaluationCriteria: [], vendorQualification: "" }, financialAnalysis: { capex: "", opex: "", roi: "", benchmarking: "" }, risks: [], procurementStatus: { method: "", status: "Rejected", compliance: "Non-Compliant" }, phasingJustification: "" },
    longSummaryAr: { isStructured: false, businessCase: { problem: "", solution: "", strategicAlignment: "" }, scopeOfWork: [], technicalSpecs: [], procurementStrategy: { method: "", evaluationCriteria: [], vendorQualification: "" }, financialAnalysis: { capex: "", opex: "", roi: "", benchmarking: "" }, risks: [], procurementStatus: { method: "", status: "مرفوض", compliance: "غير متوافق" }, phasingJustification: "" },
    workflowHistory: [
      { stepAr: "مسودة", stepEn: "Draft", date: "2025-04-15 07:20", actor: "Initiator", statusAr: "مسودة", statusEn: "Draft" },
      { stepAr: "تم الإرسال للموافقة", stepEn: "Submission", date: "2025-04-15 07:20", actor: "Initiator", statusAr: "الارسال", statusEn: "Sent" },
      { stepAr: "تحت الإجراء", stepEn: "In Process", date: "2025-04-17 10:14", actor: "OMER ALBOKARI QC", statusAr: "الموافقة", statusEn: "Approved" },
      { stepAr: "مرفوض", stepEn: "Rejected", date: "2025-04-20 11:45", actor: "OMER ALBOKARI QC2", statusAr: "مرفوض", statusEn: "Rejected" }
    ],
    documents: []
  }
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Approved': case 'تمت الموافقة': case 'معتمد': case 'موافق عليه': return 'bg-green-100 text-green-700';
    case 'Pending': case 'Submitted for approval': case 'قيد الانتظار': case 'قيد المراجعة': case 'تم الإرسال للموافقة': case 'Submitted with Modification': case 'تم الإرسال مع تعديل': return 'bg-yellow-100 text-yellow-700';
    case 'In Review': case 'In progress': case 'قيد الدراسة': case 'تحت الإجراء': return 'bg-blue-100 text-blue-700';
    case 'Rejected': case 'تم الرفض': case 'مرفوض': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityStyles = (priority: string) => {
  if (priority === 'High' || priority === 'عالية' || priority === 'Critical' || priority === 'حرج') return 'text-qatar-maroon';
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
  const [casesList, setCasesList] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showMinistryDashboard, setShowMinistryDashboard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState('');
  const itemsPerPage = 7;

  const handleStatusUpdate = (id: string, newStatusEn: string, newStatusAr: string) => {
    const updatedCases = casesList.map(c => 
      c.id === id 
        ? { ...c, statusEn: newStatusEn, statusAr: newStatusAr }
        : c
    );
    setCasesList(updatedCases);
    // Also update selectedCase to reflect changes immediately
    if (selectedCase && selectedCase.id === id) {
      setSelectedCase({ ...selectedCase, statusEn: newStatusEn, statusAr: newStatusAr });
    }
  };

  const handleInvestigate = () => {
    window.open('http://viya.sasserver.demo.sas.com/SASVisualInvestigator/index.html#/document/MOF_Requests_Final/FA-2026-001', '_blank');
  };

  const totalPages = Math.ceil(casesList.length / itemsPerPage);
  const displayedCases = casesList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (selectedCase) {
    if (showMinistryDashboard) {
      return (
        <div className="h-[calc(100vh-8rem)] relative">
          <MinistryDashboard 
            ministryNameEn={selectedCase.applicantEn}
            ministryNameAr={selectedCase.applicantAr}
            onClose={() => setShowMinistryDashboard(false)}
          />
        </div>
      );
    }

    // Select correct language object
    const details = isRtl ? selectedCase.detailsAr : selectedCase.detailsEn;
    const longSummary = isRtl ? selectedCase.longSummaryAr : selectedCase.longSummaryEn;

    return (
      <div className="animate-fade-in h-[calc(100vh-8rem)] flex flex-col relative">
        <button 
          onClick={() => { setSelectedCase(null); setShowChat(false); setComment(''); }}
          className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500 hover:text-qatar-maroon mb-4 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{t('back_to_list')}</span>
        </button>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* LEFT: Main Data & Supporting Docs */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-100">
                   <div>
                      <h2 className="text-2xl font-bold text-gray-900">{details?.projName || selectedCase.typeEn}</h2>
                      <p className="text-sm text-gray-500 font-mono mt-1">{selectedCase.id}</p>
                   </div>
                   <div className="flex items-center space-x-3 rtl:space-x-reverse">
                     <span className={`px-4 py-2 rounded-lg font-bold text-xs uppercase ${getStatusStyles(isRtl ? selectedCase.statusAr : selectedCase.statusEn)}`}>
                        {isRtl ? selectedCase.statusAr : selectedCase.statusEn}
                     </span>
                   </div>
                </div>

                {/* Comment Area */}
                <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">{t('employee_comments')}</label>
                    <textarea 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-qatar-maroon outline-none transition-all resize-none"
                        rows={3}
                        placeholder={isRtl ? 'أدخل ملاحظاتك هنا...' : 'Enter your comments here...'}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap gap-3 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200 items-center">
                  <button 
                    onClick={() => setShowMinistryDashboard(true)}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-qatar-maroon text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-sm font-bold text-sm"
                  >
                    <LayoutDashboard size={16} />
                    <span>{t('ministry_overview')}</span>
                  </button>
                  <button 
                    onClick={handleInvestigate}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-bold text-sm"
                  >
                    <Search size={16} />
                    <span>{t('investigate')}</span>
                  </button>
                  <div className="flex-1"></div>
                  
                  {/* Submit for Approval */}
                  <button 
                    onClick={() => handleStatusUpdate(selectedCase.id, 'Approved', 'معتمد')}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-bold text-sm"
                  >
                    <Check size={16} />
                    <span>{t('submit_approval')}</span>
                  </button>

                  {/* Submit for Approval - Modify */}
                  <button 
                    onClick={() => handleStatusUpdate(selectedCase.id, 'Submitted with Modification', 'تم الإرسال مع تعديل')}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-bold text-sm"
                  >
                    <Edit size={16} />
                    <span>{t('submit_approval_modify')}</span>
                  </button>

                  {/* Reject */}
                  <button 
                    onClick={() => handleStatusUpdate(selectedCase.id, 'Rejected', 'مرفوض')}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm font-bold text-sm"
                  >
                    <XCircle size={16} />
                    <span>{t('reject_request')}</span>
                  </button>
                </div>

                {/* Section 1 */}
                <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec1_title')}</h4>
                <div className="grid grid-cols-2 gap-4 mb-8">
                   <ReadOnlyField labelKey="approval_type" value={details?.approvalType} />
                   <ReadOnlyField labelKey="contract_category" value={details?.category} />
                   <ReadOnlyField labelKey="requesting_entity" value={details?.requestingEntity} />
                   <ReadOnlyField labelKey="total_value" value={details?.totalValue?.toLocaleString() + (isRtl ? ' ر.ق' : ' QAR')} />
                   <div className="col-span-2">
                     <ReadOnlyField labelKey="contract_subject" value={details?.subject} />
                   </div>
                </div>

                {/* Section 2 */}
                <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec2_title')}</h4>
                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <ReadOnlyField labelKey="detailed_desc" value={details?.description} />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <ReadOnlyField labelKey="scope_work" value={details?.scope} />
                  </div>
                </div>

                {/* Section 3 */}
                <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec3_title')}</h4>
                <div className="grid grid-cols-2 gap-6 mb-8">
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <ReadOnlyField labelKey="economic_impact" value={details?.economicImpact} />
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <ReadOnlyField labelKey="social_impact" value={details?.socialImpact} />
                   </div>
                </div>

                {/* Section 4 - Approvals */}
                <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('sec4_title')}</h4>
                {selectedCase.workflowHistory ? (
                  <div className="overflow-x-auto mb-8 border border-gray-200 rounded-xl">
                    <table className="w-full text-xs text-start">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 font-bold text-gray-500">{isRtl ? 'المرحلة' : 'Stage'}</th>
                          <th className="px-4 py-3 font-bold text-gray-500">{isRtl ? 'التاريخ' : 'Date'}</th>
                          <th className="px-4 py-3 font-bold text-gray-500">{isRtl ? 'المنشئ' : 'Actor'}</th>
                          <th className="px-4 py-3 font-bold text-gray-500">{isRtl ? 'الحالة' : 'Status'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedCase.workflowHistory.map((step: any, idx: number) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-medium text-gray-900">{isRtl ? step.stepAr : step.stepEn}</td>
                            <td className="px-4 py-3 text-gray-500 font-mono">{step.date}</td>
                            <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                              <User size={12} className="text-gray-400" />
                              {step.actor}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold ${getStatusStyles(isRtl ? step.statusAr : step.statusEn)}`}>
                                {isRtl ? step.statusAr : step.statusEn}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['req_dept', 'fin_officer', 'legal_contracts', 'final_approver'].map((key) => (
                      <div key={key} className="p-3 bg-white border border-green-100 rounded-xl text-center">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-[10px]">✓</div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">{t(key)}</p>
                          <p className="text-[10px] font-mono text-gray-400 mt-1">--/--/----</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section 5 - Supporting Documentation */}
                <h4 className="text-xs font-bold text-qatar-maroon uppercase tracking-widest mb-6 bg-red-50 p-2 rounded">{t('supporting_docs')}</h4>
                <div className="space-y-3">
                   {selectedCase.documents?.map((doc: any, idx: number) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-qatar-maroon transition-colors group ${doc.url ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                        onClick={() => doc.url && window.open(doc.url, '_blank')}
                      >
                         <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="p-3 bg-white rounded-lg text-red-500 shadow-sm">
                               <FileText size={24} />
                            </div>
                            <div>
                               <p className={`text-sm font-bold ${doc.url ? 'text-blue-600 underline decoration-blue-300 underline-offset-2' : 'text-gray-800'}`}>{doc.name}</p>
                               <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-500 mt-1">
                                  <span className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{isRtl ? doc.typeAr : doc.typeEn}</span>
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                  <span>•</span>
                                  <span>{doc.date}</span>
                               </div>
                            </div>
                         </div>
                         <button 
                            className="p-2 text-gray-400 hover:text-qatar-maroon hover:bg-white rounded-lg transition-all"
                            onClick={(e) => {
                                if (doc.url) {
                                    e.stopPropagation();
                                    window.open(doc.url, '_blank');
                                }
                            }}
                         >
                            {doc.url ? <ExternalLink size={20} /> : <Download size={20} />}
                         </button>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* RIGHT: Detailed Analysis (RFP & Scope) */}
          <div className="lg:col-span-1 h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
             <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                <div>
                   <h3 className="text-lg font-bold mb-1">{isRtl ? 'تحليل شامل لكراسة الشروط' : 'RFP Deep Dive Analysis'}</h3>
                   <p className="text-xs text-gray-400">{isRtl ? 'مراجعة فنية ومالية وقانونية شاملة' : 'Comprehensive Technical, Financial & Legal Review'}</p>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg"><Shield size={20} className="text-qatar-gold" /></div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {longSummary && longSummary.isStructured ? (
                   <>
                      {/* 1. BUSINESS CASE & NECESSITY (THE "WHY") */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                            <Briefcase size={16} className="text-blue-700" />
                            <h4 className="text-xs font-bold text-blue-900 uppercase">{isRtl ? '١. دراسة الجدوى والضرورة' : '1. Business Case & Necessity'}</h4>
                         </div>
                         <div className="p-4 space-y-4">
                            <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{isRtl ? 'بيان المشكلة (الوضع الحالي)' : 'Problem Statement (Current State)'}</p>
                               <p className="text-xs text-gray-700 leading-relaxed bg-red-50 p-3 rounded-lg border border-red-50">
                                  {longSummary.businessCase.problem}
                               </p>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{isRtl ? 'الحل المقترح (الوضع المستقبلي)' : 'Proposed Solution (Future State)'}</p>
                               <p className="text-xs text-gray-700 leading-relaxed font-medium">
                                  {longSummary.businessCase.solution}
                               </p>
                            </div>
                             <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{isRtl ? 'التوافق الاستراتيجي' : 'Strategic Alignment'}</p>
                               <p className="text-[10px] text-gray-500 italic">
                                  "{longSummary.businessCase.strategicAlignment}"
                               </p>
                            </div>
                         </div>
                      </div>

                      {/* 2. SCOPE OF WORK (WBS) */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-3 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
                            <Clock size={16} className="text-indigo-700" />
                            <h4 className="text-xs font-bold text-indigo-900 uppercase">{isRtl ? '٢. نطاق العمل (المراحل)' : '2. Scope of Work (Phased)'}</h4>
                         </div>
                         <div className="divide-y divide-gray-100">
                            {longSummary.scopeOfWork.map((phase: any, i: number) => (
                               <div key={i} className="p-3 hover:bg-gray-50">
                                  <div className="flex justify-between items-start mb-1">
                                     <span className="text-xs font-bold text-gray-800">{phase.phase}</span>
                                     <span className="text-[10px] font-mono bg-gray-100 px-1.5 rounded text-gray-500">{phase.timeline}</span>
                                  </div>
                                  <p className="text-[10px] text-gray-500 leading-tight">{phase.details}</p>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* 3. TECHNICAL SPECIFICATIONS */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
                            <Cpu size={16} className="text-emerald-700" />
                            <h4 className="text-xs font-bold text-emerald-900 uppercase">{isRtl ? '٣. المواصفات الفنية' : '3. Technical Specifications'}</h4>
                         </div>
                         <div className="p-4">
                            <table className="w-full text-xs">
                               <thead>
                                  <tr className="text-[10px] text-gray-400 uppercase text-left">
                                     <th className="font-bold pb-2 pl-1">{isRtl ? 'المكون' : 'Component'}</th>
                                     <th className="font-bold pb-2">{isRtl ? 'المتطلبات' : 'Requirement'}</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-100">
                                  {longSummary.technicalSpecs.map((spec: any, i: number) => (
                                     <tr key={i}>
                                        <td className="py-2 pl-1 font-bold text-gray-700 align-top w-1/3">
                                           {spec.category}
                                           {spec.critical && <span className="block text-[9px] text-red-500 mt-0.5">*{isRtl ? 'مسار حرج' : 'Critical Path'}</span>}
                                        </td>
                                        <td className="py-2 text-gray-600 align-top">{spec.requirement}</td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </div>

                      {/* 4. PROCUREMENT STRATEGY */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-3 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                            <Scale size={16} className="text-amber-700" />
                            <h4 className="text-xs font-bold text-amber-900 uppercase">{isRtl ? '٤. استراتيجية الشراء' : '4. Procurement Strategy'}</h4>
                         </div>
                         <div className="p-4 space-y-3">
                            <div className="flex justify-between text-xs border-b border-gray-100 pb-2">
                               <span className="text-gray-500">{isRtl ? 'الطريقة:' : 'Method:'}</span>
                               <span className="font-bold text-gray-900">{longSummary.procurementStatus.method}</span>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{isRtl ? 'أوزان معايير التقييم' : 'Evaluation Criteria Weights'}</p>
                               <div className="flex space-x-1 h-2 rounded-full overflow-hidden">
                                  {longSummary.procurementStrategy.evaluationCriteria.map((c: any, i: number) => (
                                     <div key={i} className={`h-full ${i===0?'bg-blue-500':i===1?'bg-green-500':i===2?'bg-amber-500':'bg-gray-300'}`} style={{width: c.weight}}></div>
                                  ))}
                               </div>
                               <div className="flex flex-wrap gap-2 mt-2">
                                  {longSummary.procurementStrategy.evaluationCriteria.map((c: any, i: number) => (
                                     <div key={i} className="flex items-center gap-1 text-[9px]">
                                        <div className={`w-2 h-2 rounded-full ${i===0?'bg-blue-500':i===1?'bg-green-500':i===2?'bg-amber-500':'bg-gray-300'}`}></div>
                                        <span className="text-gray-600">{c.name} ({c.weight})</span>
                                     </div>
                                  ))}
                               </div>
                            </div>
                            <div className="text-[10px] bg-gray-50 p-2 rounded border border-gray-100">
                               <span className="font-bold text-gray-600">{isRtl ? 'التأهيل: ' : 'Qualification: '}</span>
                               <span className="text-gray-500">{longSummary.procurementStrategy.vendorQualification}</span>
                            </div>
                         </div>
                      </div>

                      {/* 5. FINANCIAL & TCO */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
                            <BarChart3 size={16} className="text-gray-700" />
                            <h4 className="text-xs font-bold text-gray-900 uppercase">{isRtl ? '٥. التحليل المالي والتكلفة الإجمالية' : '5. Financial & TCO Analysis'}</h4>
                         </div>
                         <div className="p-4 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                               <p className="text-[10px] font-bold text-gray-400 uppercase">{isRtl ? 'رأسمالي (CapEx)' : 'CapEx'}</p>
                               <p className="text-xs font-bold text-gray-900">{longSummary.financialAnalysis.capex}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                               <p className="text-[10px] font-bold text-gray-400 uppercase">{isRtl ? 'تشغيلي (OpEx)' : 'OpEx'}</p>
                               <p className="text-xs font-bold text-gray-900">{longSummary.financialAnalysis.opex}</p>
                            </div>
                            <div className="col-span-2 p-3 bg-green-50 rounded-lg border border-green-100">
                               <p className="text-[10px] font-bold text-green-700 uppercase">{isRtl ? 'العائد على الاستثمار / القيمة' : 'ROI / Value'}</p>
                               <p className="text-xs text-green-800">{longSummary.financialAnalysis.roi}</p>
                            </div>
                             <div className="col-span-2 text-[10px] text-gray-500 italic border-t border-gray-100 pt-2">
                               {isRtl ? 'المقارنة المعيارية: ' : 'Benchmarking: '}{longSummary.financialAnalysis.benchmarking}
                            </div>
                         </div>
                      </div>

                       {/* 6. RISKS */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                         <div className="p-3 bg-red-50 border-b border-red-100 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-700" />
                            <h4 className="text-xs font-bold text-red-900 uppercase">{isRtl ? '٦. المخاطر الرئيسية والتخفيف' : '6. Key Risks & Mitigation'}</h4>
                         </div>
                         <div className="divide-y divide-gray-100">
                            {longSummary.risks.map((risk: any, i: number) => (
                               <div key={i} className="p-3">
                                  <div className="flex justify-between mb-1">
                                     <span className="text-xs font-bold text-gray-800">{risk.name}</span>
                                     <span className="text-[9px] font-bold bg-red-100 text-red-600 px-1.5 rounded">{isRtl ? 'احتمالية' : 'Prob'}: {risk.prob}</span>
                                  </div>
                                  <p className="text-[10px] text-gray-500">{isRtl ? 'التخفيف' : 'Mitigation'}: {risk.mitigation}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                      
                      {/* 7. PHASING WARNING (Added to match previous high quality structure) */}
                      <div className="bg-red-50 p-5 rounded-xl border border-red-100 space-y-2 mb-4">
                           <h4 className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold text-red-800 uppercase tracking-wider">
                              <AlertTriangle size={14} />
                              <span>{isRtl ? 'لماذا لا يمكن تجزئة هذا الطلب' : 'Why This Cannot Be Phased'}</span>
                           </h4>
                           <p className="text-xs text-red-700 leading-relaxed text-justify">
                              {longSummary.phasingJustification}
                           </p>
                        </div>
                   </>
                ) : (
                   // Fallback for non-detailed cases
                   <div className="text-center py-10">
                      <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                      <p className="text-gray-400 text-sm">{isRtl ? 'تحليل شامل غير متوفر لهذا السجل القديم.' : 'Full deep dive analysis not available for this legacy record.'}</p>
                      <button className="mt-4 text-xs font-bold text-qatar-maroon hover:underline">{isRtl ? 'طلب تحليل يدوي' : 'Request Manual Analysis'}</button>
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
           {showChat && (
              <div className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-4 animate-slide-up origin-bottom-right">
                 <div className="h-full flex flex-col">
                    <div className="bg-qatar-maroon text-white p-3 flex justify-between items-center">
                       <span className="text-sm font-bold">{t('ai_assistant')}</span>
                       <button onClick={() => setShowChat(false)} className="hover:bg-white/10 p-1 rounded"><X size={16} /></button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <Chatbot caseData={selectedCase} />
                    </div>
                 </div>
              </div>
           )}
           
           <button 
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${showChat ? 'bg-gray-800 text-white rotate-90' : 'bg-qatar-maroon text-white'}`}
           >
              {showChat ? <X size={24} /> : <MessageSquare size={24} />}
           </button>
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
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('alerts')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayedCases.map((c) => (
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
                    <div className={`flex items-center space-x-1.5 rtl:space-x-reverse ${c.alerts > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {c.alerts > 0 ? <AlertTriangle size={16} /> : <CheckCircle size={16} className="text-gray-300" />}
                      <span className="font-bold text-xs">{c.alerts} {t('alerts')}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Functional Pagination */}
        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {isRtl 
              ? `عرض ${(currentPage - 1) * itemsPerPage + 1} إلى ${Math.min(currentPage * itemsPerPage, casesList.length)} من أصل ${casesList.length} مدخل`
              : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, casesList.length)} of ${casesList.length} entries`}
          </p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-xs font-bold ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-qatar-maroon'}`}
            >
              {isRtl ? 'السابق' : 'Previous'}
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
               <button 
                 key={i}
                 onClick={() => setCurrentPage(i + 1)}
                 className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                   currentPage === i + 1 
                     ? 'bg-qatar-maroon text-white shadow-sm' 
                     : 'text-gray-400 hover:bg-gray-100'
                 }`}
               >
                 {i + 1}
               </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-xs font-bold ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-qatar-maroon'}`}
            >
              {isRtl ? 'التالي' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseManagement;
