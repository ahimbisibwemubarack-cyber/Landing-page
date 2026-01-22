
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the official AI assistant for Aviyo Plant-Based Nutrition Ltd, a Ugandan social enterprise. 
Your goal is to provide professional, accurate, and helpful information about Aviyo to potential customers, investors, and partners.

Context about Aviyo:
- Name: Aviyo Plant-Based Nutrition Ltd
- Founder: Ahimbisibwe Mubarack (Full-stack developer & innovator)
- Location: Kampala, Uganda
- Mission: To provide affordable, enzyme-enhanced plant-based milk alternatives that improve health for lactose-intolerant and hypertensive patients while promoting sustainability.
- Key Products: 
  1. Soya Bliss Golden Milk: Wellness blend with turmeric, ginger, and spices. Fermented to remove "beany" flavor.
  2. Soy-cassava Nova: Creamy blend of cassava and soya, naturally sweet.
  3. Soy-fortified Fusion: Fortified with Calcium, Vit D, B12. Targeted for nutrition interventions (babies, schools, NGOs).
  4. Soy-rice Fusion.
- Innovation: We use food-grade enzymes (proteases, amylases, phytase) to improve digestibility, remove anti-nutrients (phytic acid), and eliminate unpleasant soy flavors.
- Shelf Life: Our aseptic processing allows for 6–12 months shelf life without refrigeration.
- Values: Health First, Innovation, Accessibility, Sustainability, Integrity.
- Business Model: Social enterprise supporting local Ugandan farmers through direct sourcing and training.

Tone: Professional, expert, sustainable, and friendly. 
Always encourage users to contact the team for partnerships through the lead generation form on the website.
Keep responses concise but informative.
`;

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hello! I am the Aviyo Nutrition Assistant. How can I help you learn about our sustainable plant-based solutions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initChat = () => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
    return chatRef.current;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const chat = initChat();
      const result = await chat.sendMessageStream({ message: userMessage });
      
      let botContent = '';
      setMessages(prev => [...prev, { role: 'bot', content: '' }]);

      for await (const chunk of result) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
          botContent += text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'bot', content: botContent };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'I apologize, but I am having trouble connecting to my knowledge base right now. Please try again or contact us directly!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white w-[90vw] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-aviyo-green p-6 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Bot size={24} className="text-aviyo-gold" />
              </div>
              <div>
                <h3 className="font-black tracking-tight leading-none">Aviyo Assistant</h3>
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">Online & AI Powered</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Minimize2 size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-aviyo-gold text-slate-950' : 'bg-white text-aviyo-green border border-slate-100'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-aviyo-green text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.content || (isLoading && idx === messages.length - 1 ? <Loader2 size={16} className="animate-spin text-aviyo-green" /> : null)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-aviyo-green/10 focus:border-aviyo-green outline-none font-medium pr-14 transition-all"
                placeholder="Ask about our nutrition technology..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-aviyo-green text-white rounded-xl flex items-center justify-center hover:bg-aviyo-green/90 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">Powered by Gemini 3 Pro</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-aviyo-green text-white rounded-2xl flex items-center justify-center shadow-3xl hover:shadow-aviyo-green/40 transition-all transform hover:-translate-y-2 active:scale-95"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-aviyo-gold rounded-full border-2 border-white animate-pulse"></div>
          <MessageSquare className="group-hover:scale-110 transition-transform" />
          <div className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl">
            Questions? Chat with us!
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
