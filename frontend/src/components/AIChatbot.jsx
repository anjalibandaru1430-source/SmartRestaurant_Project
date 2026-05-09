import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import axios from 'axios';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! I am your AI assistant. How can I help you with your order?', sender: 'ai' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { message: userMsg.text });
      setMessages((prev) => [...prev, { text: res.data.reply, sender: 'ai' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-transform transform hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 overflow-hidden flex flex-col" style={{ height: '500px' }}>
          <div className="bg-orange-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center"><MessageSquare className="w-5 h-5 mr-2" /> AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-orange-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'user' ? 'bg-orange-600 text-white self-end rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm rounded-2xl px-4 py-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="ml-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
