"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconSend, IconLoader2, IconX } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface CVChatWidgetProps {
  className?: string;
  variant?: "hero" | "widget";
}

const SUGGESTED_QUESTIONS = [
  "Why does psychology help with coding?",
  "Tell me about your agent orchestration",
  "How did you solve context rot?",
];

export function CVChatWidget({
  className,
  variant = "hero",
}: CVChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(variant === "hero");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom within container bounds
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantId = `assistant-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/cv-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullContent = "";
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Final flush of any remaining bytes
            const finalChunk = decoder.decode();
            if (finalChunk) {
              fullContent += finalChunk;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: fullContent } : m
                )
              );
            }
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: fullContent } : m
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Error: Failed to get response. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  // Floating widget button
  if (variant === "widget" && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-terminal-bg-secondary border border-white/10 rounded-sm flex items-center justify-center text-terminal-cyan hover:border-terminal-cyan/50 transition-colors"
      >
        <span className="font-terminal text-base sm:text-lg">&gt;_</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        variant === "widget" &&
          "fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-96 max-h-[80vh] bg-terminal-bg border border-white/10 rounded-sm shadow-2xl flex flex-col",
        variant === "hero" && "max-w-2xl mx-auto px-4 sm:px-0",
        className
      )}
    >
      {/* Widget header */}
      {variant === "widget" && (
        <div className="flex items-center justify-between px-4 py-3 bg-terminal-bg-secondary border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-3 h-3 rounded-full bg-terminal-red hover:brightness-110 transition-all"
              />
              <div className="w-3 h-3 rounded-full bg-terminal-orange/50" />
              <div className="w-3 h-3 rounded-full bg-terminal-green/50" />
            </div>
            <span className="ml-3 font-terminal text-xs text-terminal-muted">
              cv-agent
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 text-terminal-muted hover:text-terminal-cyan transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Messages area */}
      {messages.length > 0 && (
        <div
          ref={messagesContainerRef}
          className={cn(
            "overflow-y-auto space-y-3 p-3 sm:p-4",
            variant === "widget" ? "max-h-[50vh] sm:max-h-96 flex-1" : "max-h-80 sm:max-h-[28rem] mb-4"
          )}
        >
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === "user" ? (
                <div className="font-terminal text-[11px] sm:text-xs break-words">
                  <span className="text-terminal-green">$</span>
                  <span className="text-terminal-cyan ml-1 sm:ml-2">ask</span>
                  <span className="text-terminal-muted ml-1 sm:ml-2">&quot;{message.content}&quot;</span>
                </div>
              ) : (
                <div className="pl-3 sm:pl-4 border-l border-white/10">
                  {message.content ? (
                    <div className="chat-message-content font-terminal text-[11px] sm:text-xs text-terminal-secondary text-left leading-relaxed [&_p]:mb-2 [&_p]:last:mb-0 [&_strong]:text-terminal [&_strong]:font-normal [&_code]:text-terminal-cyan [&_code]:bg-terminal-bg-tertiary [&_code]:px-1 [&_code]:rounded-sm [&_ul]:list-none [&_ul]:space-y-1 [&_ul]:my-2 [&_li]:before:content-['-'] [&_li]:before:text-terminal-muted [&_li]:before:mr-2">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="font-terminal text-xs text-terminal-muted animate-pulse">...</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Suggested questions */}
      {messages.length === 0 && variant === "hero" && (
        <div className="mb-4">
          <div className="font-terminal text-xs text-terminal-muted mb-2 sm:mb-3">
            <span className="text-terminal-green">$</span> suggested queries:
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-3 py-2 sm:py-1.5 font-terminal text-xs bg-terminal-bg-secondary text-terminal-secondary border border-white/10 rounded-sm hover:border-terminal-cyan/30 hover:text-terminal-cyan transition-colors text-left sm:text-center"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          variant === "widget" && "p-3 sm:p-4 border-t border-white/10"
        )}
      >
        <div className="relative flex items-center gap-2 bg-terminal-bg-secondary border border-white/10 rounded-sm px-3 py-2.5 sm:py-2">
          <span className="font-terminal text-terminal-green text-xs sm:text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask me anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent font-terminal text-base sm:text-sm text-terminal placeholder:text-terminal-muted focus:outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-1.5 text-terminal-muted hover:text-terminal-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            {isLoading ? (
              <IconLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <IconSend className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
