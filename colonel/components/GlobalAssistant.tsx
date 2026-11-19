
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';
import { rawMinistriesData, casesData } from '../data';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const GlobalAssistant: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: isRtl 
        ? 'مرحباً، أنا المساعد الذكي لوزارة المالية. لدي صلاحية الوصول إلى بيانات لوحة المؤشرات وسجلات الحالات. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello, I am the Ministry of Finance AI Assistant. I have access to the Dashboard KPIs and Case Records. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const context = `
        You are an intelligent AI assistant for the Ministry of Finance Qatar.
        You have access to the following dataset regarding Ministries, Budgets, and Specific Cases.
        
        DATASET:
        1. Ministries KPI Data: ${JSON.stringify(rawMinistriesData)}
        2. Case Records: ${JSON.stringify(casesData)}

        INSTRUCTIONS:
        - Answer the user's question based strictly on the provided data.
        - If the user asks for recommendations, provide data-backed suggestions (e.g., "MOI has high pending requests, I recommend allocating more resources...").
        - Keep answers professional, concise, and helpful.
        - Answer in the same language as the user's question (Arabic or English).
        
        User Question: ${input}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
      });

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: response.text || 'I did not understand that.' };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: 'err', role: 'model', text: isRtl ? 'عذراً، حدث خطأ.' : 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex flex-col items-end`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
          {/* Header */}
          <div className="bg-qatar-maroon text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Sparkles size={18} className="text-qatar-gold" />
              <div>
                <h3 className="font-bold text-sm tracking-wide">{t('ai_assistant')}</h3>
                <p className="text-[10px] text-white/80">Powered by Gemini 3.0</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} items-end gap-2`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-qatar-maroon text-white'}`}>
                     {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-white text-gray-800 rounded-br-none border border-gray-100' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-qatar-maroon/10'
                  }`}>
                    <ReactMarkdown 
                      className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4 prose-li:my-0.5 prose-strong:text-qatar-maroon prose-strong:font-bold text-gray-800"
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100">
                  <Loader2 size={14} className="animate-spin text-qatar-maroon" />
                  <span className="text-xs text-gray-400">{t('typing')}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ai_input_placeholder')}
                className="flex-1 bg-gray-50 border border-gray-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-qatar-maroon"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-qatar-maroon text-white rounded-xl hover:bg-opacity-90 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-qatar-maroon text-white shadow-lg shadow-maroon-900/30 flex items-center justify-center hover:scale-105 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
};

export default GlobalAssistant;
