
import React, { useState, useRef } from 'react';
import { Plus, Info, ChevronRight, ChevronLeft, Save, CheckCircle, Upload, X, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const DigitalForm: React.FC = () => {
  const { t, isRtl, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormData = {
    approvalType: '',
    contractCategory: '',
    contractSubject: '',
    requestNumber: 'REQ-2024-00124',
    requestDate: new Date().toISOString().split('T')[0],
    requestingEntity: '',
    executingEntity: '',
    startDate: '',
    endDate: '',
    totalValue: '',
    projectType: 'Main',
    projectNameAr: '',
    projectNameEn: '',
    detailedDescription: '',
    scopeWork: '',
    budgetRows: [
      { year: '2024', amount: '', justification: '', linkage: '', kpi: false, kpiDesc: '' },
      { year: '2025', amount: '', justification: '', linkage: '', kpi: false, kpiDesc: '' },
      { year: '2026', amount: '', justification: '', linkage: '', kpi: false, kpiDesc: '' },
      { year: '2027', amount: '', justification: '', linkage: '', kpi: false, kpiDesc: '' },
      { year: '2028', amount: '', justification: '', linkage: '', kpi: false, kpiDesc: '' },
    ],
    economicImpact: '',
    socialImpact: '',
    strategicAlignment: false,
    alignmentExplanation: '',
    necessityJustification: '',
    budgetAvail: false,
    ceilingCompliance: false,
    costCenter: '',
    additionalComments: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateBudget = (index: number, field: string, value: any) => {
    const newRows = [...formData.budgetRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setFormData({ ...formData, budgetRows: newRows });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map((file: File) => ({
        name: file.name
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData(initialFormData);
    setUploadedFiles([]);
  };

  const bilingualLabel = (key: string) => {
    const secondaryLanguage = language === 'en' ? 'ar' : 'en';
    return (
      <div className="flex flex-col mb-1.5">
        <span className="text-xs font-bold text-gray-700 uppercase">
          {translations[language][key as keyof typeof translations['en']]}
        </span>
        <span className="text-[10px] font-medium text-gray-400 mt-0.5">
          {translations[secondaryLanguage][key as keyof typeof translations['en']]}
        </span>
      </div>
    );
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <button 
            onClick={() => setCurrentStep(step)}
            className="flex items-center space-x-3 rtl:space-x-reverse group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              currentStep === step 
                ? 'bg-qatar-maroon text-white shadow-lg scale-110' 
                : currentStep > step 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
            }`}>
              {currentStep > step ? <CheckCircle size={18} /> : step}
            </div>
            <div className="hidden md:block text-start">
              <p className={`text-[10px] font-bold uppercase transition-colors ${currentStep === step ? 'text-qatar-maroon' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {t('step')} {step}
              </p>
              <p className={`text-xs font-semibold transition-colors ${currentStep === step ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>
                {t(`sec${step}_title`).split('. ')[1]}
              </p>
            </div>
          </button>
          {step < 4 && <div className={`flex-1 h-px mx-4 transition-colors duration-500 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('submission_success_title')}</h2>
          <p className="text-gray-500 mb-8">{t('submission_success_msg')}</p>
          
          <button 
            onClick={handleReset}
            className="flex items-center justify-center space-x-2 bg-qatar-maroon text-white px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all font-bold shadow-lg shadow-maroon-900/10 mx-auto"
          >
            <RefreshCw size={20} className={isRtl ? 'ml-2' : 'mr-2'} />
            <span>{t('start_new_form')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('new_application')}</h3>
          <p className="text-gray-500 text-sm">{t('application_desc')}</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button className="flex items-center space-x-2 bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all font-semibold">
            <Save size={16} />
            <span>{t('save_draft')}</span>
          </button>
        </div>
      </div>

      <StepIndicator />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 transition-all min-h-[600px]">
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-sm font-bold text-qatar-maroon uppercase tracking-widest pb-3 border-b border-gray-50 mb-6">{t('sec1_title')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    {bilingualLabel('approval_type')}
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none">
                      <option value="New">{t('opt_new')}</option>
                      <option value="Renewal">{t('opt_renewal')}</option>
                      <option value="Extension">{t('opt_extension')}</option>
                      <option value="Amendment">{t('opt_amendment')}</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('contract_category')}
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none">
                      <option value="Service">{t('opt_service')}</option>
                      <option value="Goods">{t('opt_goods')}</option>
                      <option value="Works">{t('opt_works')}</option>
                      <option value="Consultancy">{t('opt_consultancy')}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    {bilingualLabel('contract_subject')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" placeholder="..." />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('request_number')}
                    <input type="text" disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 cursor-not-allowed font-mono" value={formData.requestNumber} />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('request_date')}
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" value={formData.requestDate} />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('requesting_entity')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('executing_entity')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('contract_start')}
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('contract_end')}
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('total_value')}
                    <div className="relative">
                      <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                      <span className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs`}>QAR</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('project_type')}
                    <div className="flex space-x-4 rtl:space-x-reverse p-2">
                       <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="projType" className="text-qatar-maroon focus:ring-qatar-maroon" /> <span className="text-sm">{t('opt_main')}</span></label>
                       <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="projType" className="text-qatar-maroon focus:ring-qatar-maroon" /> <span className="text-sm">{t('opt_sub')}</span></label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('proj_name_ar')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none text-right" dir="rtl" />
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('proj_name_en')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-sm font-bold text-qatar-maroon uppercase tracking-widest pb-3 border-b border-gray-50 mb-6">{t('sec2_title')}</h4>
                <div className="space-y-6">
                  <div className="space-y-1">
                    {bilingualLabel('detailed_desc')}
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('scope_work')}
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between items-center mb-4">
                       {bilingualLabel('budget_dist')}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                            <th className="p-3 text-start">{t('year')}</th>
                            <th className="p-3 text-start">{t('allocated_amount')}</th>
                            <th className="p-3 text-start">{t('justification')}</th>
                            <th className="p-3 text-start">{t('kpi_alignment')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {formData.budgetRows.map((row, i) => (
                            <React.Fragment key={row.year}>
                              <tr>
                                <td className="p-3 font-bold text-gray-900">{row.year}</td>
                                <td className="p-3"><input type="number" className="w-24 bg-gray-50 border border-gray-200 rounded px-2 py-1" /></td>
                                <td className="p-3"><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1" /></td>
                                <td className="p-3">
                                  <input type="checkbox" checked={row.kpi} onChange={(e) => updateBudget(i, 'kpi', e.target.checked)} className="rounded text-qatar-maroon" />
                                </td>
                              </tr>
                              {row.kpi && (
                                <tr className="bg-red-50/30">
                                  <td colSpan={4} className="p-3">
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                      <div className="text-[10px] font-bold text-qatar-maroon uppercase">{t('kpi_description')}:</div>
                                      <input type="text" className="flex-1 bg-white border border-red-100 rounded px-2 py-1 text-xs" placeholder="..." />
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-sm font-bold text-qatar-maroon uppercase tracking-widest pb-3 border-b border-gray-50 mb-6">{t('sec3_title')}</h4>
                <div className="space-y-6">
                  <div className="space-y-1">
                    {bilingualLabel('economic_impact')}
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('social_impact')}
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="max-w-md">
                      {bilingualLabel('strategic_alignment')}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={formData.strategicAlignment} onChange={(e) => setFormData({...formData, strategicAlignment: e.target.checked})} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-qatar-maroon"></div>
                    </label>
                  </div>
                  {formData.strategicAlignment && (
                    <div className="space-y-1 animate-slide-down">
                      {bilingualLabel('explanation_alignment')}
                      <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                    </div>
                  )}
                  <div className="space-y-1">
                    {bilingualLabel('contract_necessity')}
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-24"></textarea>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-sm font-bold text-qatar-maroon uppercase tracking-widest pb-3 border-b border-gray-50 mb-6">{t('sec4_title')}</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl border border-gray-100">
                       <input type="checkbox" className="w-5 h-5 rounded text-qatar-maroon" />
                       <div className="flex-1">{bilingualLabel('budget_avail')}</div>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl border border-gray-100">
                       <input type="checkbox" className="w-5 h-5 rounded text-qatar-maroon" />
                       <div className="flex-1">{bilingualLabel('ceiling_compliance')}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {bilingualLabel('cost_center')}
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none" placeholder="DEPT-123-FIN" />
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('req_approvals')}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {['req_dept', 'fin_officer', 'legal_contracts', 'final_approver'].map((key) => (
                        <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-200 border-dashed text-center space-y-3">
                           {bilingualLabel(key)}
                           <div className="h-12 border border-gray-200 bg-white rounded flex items-center justify-center text-gray-300 italic text-[10px]">
                              Awaiting Digital Signature
                           </div>
                           <p className="text-[10px] text-gray-400">{t('date_fields')}: --/--/----</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between">
              <button 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
                  currentStep === 1 ? 'invisible' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={18} className={isRtl ? 'rotate-180' : ''} />
                <span>{t('previous')}</span>
              </button>
              
              {currentStep < 4 ? (
                <button 
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-qatar-maroon text-white px-8 py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-bold shadow-lg shadow-maroon-900/10"
                >
                  <span>{t('next')}</span>
                  <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-green-600 text-white px-8 py-2.5 rounded-lg hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-900/10"
                >
                  <CheckCircle size={18} />
                  <span>{t('submit')}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-qatar-maroon text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <Info size={18} />
                  <span className="font-bold text-sm uppercase tracking-wider">{t('submission_guide')}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs font-medium">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>{t('guide_point_1')}</span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs font-medium">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>{t('guide_point_2')}</span>
                  </div>
                </div>
             </div>
             <div className={`absolute top-0 ${isRtl ? 'left-0 -ml-8' : 'right-0 -mr-8'} -mt-8 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl`}></div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t('supporting_docs')}</h4>
            
            {/* Hidden Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileChange} 
            />
            
            {/* Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-qatar-maroon transition-colors cursor-pointer group bg-gray-50/50"
            >
              <div className="p-3 bg-white rounded-full text-gray-400 group-hover:text-qatar-maroon transition-colors shadow-sm">
                <Upload size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">{t('upload_docs')}</p>
                <p className="text-[10px] text-gray-400 mt-1">{t('drag_drop')}</p>
              </div>
            </div>
            
            {/* Uploaded Files List */}
            <div className="mt-6 space-y-2">
               {uploadedFiles.map((file, index) => (
                 <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 text-[10px] animate-fade-in relative group">
                    <span className="truncate font-medium text-gray-600 max-w-[70%]">{file.name}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                       <span className="text-green-500 font-bold">100%</span>
                       <button onClick={() => removeFile(index)} className="text-gray-300 hover:text-red-500">
                         <X size={12} />
                       </button>
                    </div>
                 </div>
               ))}
               {uploadedFiles.length === 0 && (
                  <p className="text-[10px] text-gray-400 text-center italic mt-4">No documents uploaded</p>
               )}
            </div>
          </div>

          {/* Additional Comments Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t('additional_comments')}</h4>
            <textarea 
              value={formData.additionalComments}
              onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-qatar-maroon outline-none h-32 text-sm"
              placeholder="..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalForm;
