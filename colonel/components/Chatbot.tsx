
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatbotProps {
  caseData: any;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ caseData }) => {
  const { t, isRtl } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Summary
  useEffect(() => {
    const generateSummary = async () => {
      if (!caseData || messages.length > 0) return;

      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const context = `
          You are an AI Assistant for the Ministry of Finance Qatar.
          Analyze the following case request data and provide a professional, 
          concise executive summary (max 3 sentences) in the ${isRtl ? 'Arabic' : 'English'} language.
          
          CASE DATA:
          ${JSON.stringify(caseData)}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: context,
        });

        setMessages([
          {
            id: 'init-summary',
            role: 'model',
            text: response.text || 'Unable to generate summary.'
          }
        ]);
      } catch (error) {
        console.error("Gemini API Error:", error);
        setMessages([
          {
            id: 'error',
            role: 'model',
            text: isRtl ? 'عذراً، حدث خطأ أثناء تحليل الطلب.' : 'Sorry, I encountered an error analyzing the request.'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [caseData, isRtl]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Construct context with history (simplified for this demo)
      const context = `
        Context: You are analyzing a Ministry of Finance request.
        Case Data: ${JSON.stringify(caseData)}
        
        Current User Question: ${input}
        
        Answer professionally in ${isRtl ? 'Arabic' : 'English'}. Keep it brief.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
      });

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: response.text || '' };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: 'err', role: 'model', text: isRtl ? 'حدث خطأ.' : 'An error occurred.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-qatar-maroon text-white p-4 flex items-center space-x-2 rtl:space-x-reverse">
        <Sparkles size={18} className="text-qatar-gold" />
        <h3 className="font-bold text-sm tracking-wide">{t('ai_assistant')}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} items-end gap-2`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-qatar-maroon text-white'}`}>
                 {msg.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
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
  );
};

export default Chatbot;
