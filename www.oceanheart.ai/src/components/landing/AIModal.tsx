"use client";
import { useState, useRef, useEffect } from "react";
import { IconSend, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { MarkdownMessage } from "@/components/MarkdownMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIModalProps {
  initialQuestion?: string;
  onClose: () => void;
}

export function AIModal({ initialQuestion, onClose }: AIModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Submit initial question if provided
  useEffect(() => {
    if (initialQuestion && messages.length === 0) {
      handleAsk(initialQuestion);
    }
  }, [initialQuestion]);

  const handleAsk = async (question: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setStreamingMessage("");

    try {
      const response = await fetch("/api/ask-visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fullResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingMessage("");
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const question = inputValue;
    setInputValue("");
    await handleAsk(question);
  };

  // Welcome message
  const displayMessages = messages.length === 0 ? [
    {
      id: "welcome",
      role: "assistant" as const,
      content: "Welcome! I'm here to help you understand what Kai offers across AI systems engineering, custom software development, and technical consulting. What would you like to know?",
      timestamp: new Date().toISOString(),
    }
  ] : messages;

  return (
    <div className="flex flex-col h-full max-h-[85vh] md:max-h-[80vh]">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/[0.1]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-3xl font-serif-jp text-gold">心</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-light text-zinc-100">
                Oceanheart AI
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm">Your guide to understanding the offerings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 md:gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {message.role === "assistant" ? (
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-serif-jp text-gold">心</span>
                </div>
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/[0.05] rounded-full flex items-center justify-center border border-white/[0.1]">
                  <IconUser className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[85%] md:max-w-2xl ${message.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block px-3 md:px-4 py-2 md:py-3 ${
                  message.role === "assistant"
                    ? "bg-white/[0.02] border border-white/[0.1]"
                    : "bg-gold/10 border border-gold/50"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="text-sm md:text-base prose prose-invert max-w-none prose-sm md:prose-base">
                    <MarkdownMessage content={message.content} />
                  </div>
                ) : (
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-zinc-100">
                    {message.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming Message */}
        {isTyping && streamingMessage && (
          <div className="flex gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-serif-jp text-gold">心</span>
              </div>
            </div>
            <div className="flex-1 max-w-[85%] md:max-w-2xl">
              <div className="inline-block px-3 md:px-4 py-2 md:py-3 bg-white/[0.02] border border-white/[0.1]">
                <div className="text-sm md:text-base prose prose-invert max-w-none prose-sm md:prose-base">
                  <MarkdownMessage content={streamingMessage} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && !streamingMessage && (
          <div className="flex gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-serif-jp text-gold">心</span>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.1] px-3 md:px-4 py-2 md:py-3">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-gold/70 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gold/70 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gold/70 rounded-full"
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-white/[0.1]">
        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-white/[0.05] border border-white/[0.1] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-zinc-100 placeholder-zinc-400 focus:border-gold/50 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="bg-gold text-black px-4 md:px-6 py-2 md:py-3 font-medium hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
          >
            <IconSend className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
