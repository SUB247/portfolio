import React, { useState } from 'react';
import { Bot, User, Send, Sparkles, RefreshCcw } from 'lucide-react';

export default function RelxChatPreview() {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'How does Gemini process multimodal context tokens?'
    },
    {
      sender: 'ai',
      text: 'Gemini projects text, images, and audio into a shared semantic latent space, allowing cross-modal attention layers to compute contextual relationships simultaneously.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Explain zero-shot prompting',
    'Summarize modern cyber defense',
    'Generate React hook example'
  ];

  const handleSend = (text) => {
    const q = text || inputVal;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "Analyzing prompt context with Gemini model weights...";
      if (q.toLowerCase().includes('zero-shot')) {
        aiReply = "Zero-shot prompting instructs the model to execute a task without prior examples, relying purely on its pre-trained knowledge representations.";
      } else if (q.toLowerCase().includes('cyber')) {
        aiReply = "Modern defense blends proactive zero-trust architecture, automated log anomaly detection, and rapid credential rotation.";
      } else if (q.toLowerCase().includes('hook')) {
        aiReply = "Custom hooks encapsulate stateful logic: const useWindowSize = () => { /* listener logic */ return size; };";
      } else {
        aiReply = `Processed query "${q}": Synthesized response generated using Gemini API semantic parsing.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl bg-[#090909] border border-white/10 overflow-hidden font-sans text-xs flex flex-col shadow-inner">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#121212] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#89AACC] to-[#4E85BF] flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-black" />
          </div>
          <span className="font-semibold text-white">RELX AI Assistant</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#89AACC]">
            Gemini 1.5 Pro
          </span>
        </div>
        <button
          onClick={() => setMessages([
            { sender: 'user', text: 'How does Gemini process multimodal context tokens?' },
            { sender: 'ai', text: 'Gemini projects text, images, and audio into a shared semantic latent space.' }
          ])}
          className="text-muted hover:text-white transition-colors p-1"
          title="Reset Chat"
        >
          <RefreshCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-3.5 max-h-48 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-[#89AACC]" />
              </div>
            )}
            <div
              className={`max-w-[82%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#89AACC]/20 to-[#4E85BF]/30 text-white border border-[#89AACC]/30'
                  : 'bg-white/[0.04] text-text/90 border border-white/5'
              }`}
            >
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-muted text-[11px] font-mono pl-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 text-[10px]">Generating response...</span>
          </div>
        )}
      </div>

      {/* Sample prompt chips */}
      <div className="px-3 py-1.5 bg-[#0e0e0e] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-muted hover:text-[#89AACC] border border-white/5 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-3 py-2 bg-[#0c0c0c] border-t border-white/10">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="bg-transparent flex-1 text-white focus:outline-none text-xs placeholder:text-muted/40 font-sans"
        />
        <button
          onClick={() => handleSend()}
          className="p-1 rounded bg-[#89AACC]/20 hover:bg-[#89AACC]/30 text-[#89AACC] transition-colors"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
