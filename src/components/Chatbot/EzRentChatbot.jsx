// components/EzRentChatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Loader2, Sparkles } from 'lucide-react';

const EzRentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: 'Hello! 👋 I\'m your EzRent AI Assistant. I can help you with property bookings, hosting questions, travel tips, and anything about the EzRent platform. How can I assist you today? 🏠'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showToast = (message, type = 'success') => {
    setError(type === 'error' ? message : '');
    if (type === 'error') {
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are EzRent AI Assistant — a friendly, professional, and intelligent chatbot built for the EzRent platform.

EzRent is a full-featured property rental and booking platform. It connects guests who want to rent places to stay with hosts who list their properties. EzRent also includes a special "Guest Experiences" feature where travelers can share their personal travel stories, tips, and photos.

Your main role is to assist users with any questions related to the EzRent platform and provide general travel guidance when appropriate.

Key Features:
- Property booking and rental platform
- Guest and host dashboards
- Guest Experiences community feature
- Secure payment processing
- Admin management system

Always be polite, friendly, and helpful. Keep responses clear, short, and human-like. Use emojis sparingly. Answer in the same language as the user's question.

User's question: ${userMessage}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'I apologize, but I couldn\'t generate a response. Please try again.';
      
      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      showToast(error.message || 'Sorry, I encountered an error. Please try again.', 'error');
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment. 🛠️' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How do I book a property?",
    "How to become a host?",
    "What is Guest Experiences?",
    "How to contact support?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md animate-[slideIn_0.3s_ease-out] max-w-md border bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
        </button>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col animate-[scaleIn_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-t-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">EzRent AI Assistant</h3>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col shadow-2xl bg-white dark:bg-gray-900 border-x border-b border-gray-200 dark:border-gray-800 rounded-b-2xl">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-950/50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${
                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'bg-gradient-to-r from-emerald-500 to-green-500'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-md">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl shadow-sm flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.length === 1 && !loading && (
                  <div className="mt-4 animate-[fadeIn_0.5s_ease-out]">
                    <p className="text-xs font-medium text-center mb-3 text-gray-500 dark:text-gray-400">
                      Quick questions you can ask:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="text-left p-3 text-sm font-medium rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500/50 text-gray-700 dark:text-gray-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask about bookings, hosting, or travel..."
                  className="flex-1 px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 text-sm font-medium bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-750"
                  disabled={loading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || loading}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-center mt-3 font-medium text-gray-500 dark:text-gray-500">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                  Powered by Gemini 2.0 Flash
                </span>
                {' • '}
                <span className="text-gray-600 dark:text-gray-400">EzRent AI</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default EzRentChatbot;