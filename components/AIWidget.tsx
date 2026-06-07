'use client';

// FREE AI SETUP:
// 1. Go to https://openrouter.ai and sign up (free)
// 2. Go to Keys → Create Key
// 3. Paste in .env.local as NEXT_PUBLIC_OPENROUTER_KEY
// 4. Free models: mistralai/mistral-7b-instruct:free, meta-llama/llama-3-8b-instruct:free

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';

const SYSTEM_MESSAGE = "You are an AI assistant for Santhosh S's portfolio. Santhosh is a Software Developer with 2+ years of experience. He works at Syncfusion as Software Developer III since Feb 2024 in Chennai. He builds scalable UI components using Next.js, Angular, TypeScript. He built BoldAI Agent (Next.js, REST API, embeddable JS widget, AI versioning) and BoldChat (Angular, WebSocket, real-time chat). He studied B.E. Computer Science at Nandha College of Technology (CGPA 8.1, 2019-2023). He lives in Erode, Tamil Nadu. Email: santhoshpy0209@gmail.com. LinkedIn: linkedin.com/in/santhosh-s-8700421b9. Keep answers concise, friendly and professional.";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! I am Santhosh\'s portfolio assistant. Ask me anything about his skills, experience, or projects!' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // OpenRouter Key from env
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_KEY;
      if (!apiKey || apiKey === 'your_openrouter_key_here') {
        throw new Error('API key is not configured');
      }

      // Limit history to last 6 messages
      const history = messages.slice(-6).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Append latest message
      history.push({ role: 'user', content: userMessage.content });

      // Call OpenRouter
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
          'X-Title': 'Santhosh Portfolio',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [
            { role: 'system', content: SYSTEM_MESSAGE },
            ...history,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('OpenRouter API request failed');
      }

      const responseData = await response.json();
      const assistantReply = responseData?.choices?.[0]?.message?.content || 'I could not process that answer.';
      
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error('AI Widget Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't connect. Try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(99,102,241,0.55)] border border-indigo-500/20 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
        </motion.button>
      </div>

      {/* Slide-Up Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed z-50 md:bottom-24 md:right-6 md:w-[320px] md:h-[450px] w-full h-[55vh] bottom-0 right-0 glass-panel md:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-slate-950/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Ask about Santhosh</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Feed Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/10">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={index} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/10 text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-[0_2px_10px_rgba(99,102,241,0.2)]'
                          : 'bg-slate-950/60 border border-white/5 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {isUser && (
                      <div className="w-7 h-7 rounded-full bg-purple-600/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/10 text-xs">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/10">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-950/60 border border-white/5 px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950/70 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about his projects..."
                className="flex-1 bg-slate-900/60 border border-white/5 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/25"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
