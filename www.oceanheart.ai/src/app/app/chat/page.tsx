"use client";
import { useState, useRef, useEffect } from "react";
import { IconSend, IconUser, IconPlus, IconTrash, IconMenu2, IconX } from "@tabler/icons-react";
import { useChat } from "@/contexts/ChatContext";
import { motion, AnimatePresence } from "framer-motion";
import { MarkdownMessage } from "@/components/MarkdownMessage";

export default function ChatPage() {
    const { currentSession, sessions, addMessage, createSession, loadSession, deleteSession, isLoading } = useChat();
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentSession?.messages]);

    // Create a session if none exists
    useEffect(() => {
        if (!isLoading && !currentSession && sessions.length === 0) {
            createSession();
        }
    }, [isLoading, currentSession, sessions.length, createSession]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !currentSession) return;

        const question = inputValue;

        // Add user message
        addMessage(question, 'user');
        setInputValue("");
        setIsTyping(true);
        setStreamingMessage("");

        try {
            // Call the RAG API endpoint
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            // Read the streaming response and update incrementally
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    fullResponse += chunk;
                    setStreamingMessage(fullResponse);
                }
            }

            // Save the complete message
            addMessage(fullResponse, 'assistant');
            setStreamingMessage("");
            setIsTyping(false);
        } catch (_error) {
            
            const errorMsg = "I apologize, but I'm having trouble accessing the book content right now. Please make sure your ANTHROPIC_API_KEY is set in the environment variables.";
            addMessage(errorMsg, 'assistant');
            setStreamingMessage("");
            setIsTyping(false);
        }
    };

    const handleNewChat = () => {
        createSession();
        setIsSidebarOpen(false);
    };

    const handleLoadSession = (sessionId: string) => {
        loadSession(sessionId);
        setIsSidebarOpen(false);
    };

    const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Delete this conversation?')) {
            deleteSession(sessionId);
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else {
            return 'Just now';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-zinc-400">Loading chat...</div>
            </div>
        );
    }

    // Welcome message for first session
    const displayMessages = currentSession?.messages?.length === 0 ? [
        {
            id: 'welcome',
            role: 'assistant' as const,
            content: "Welcome! I'm your Kaishin AI Companion, here to guide you through The Kaishin Method. I can help with questions about The View, The Compass, and The Ground, as well as your journey through the Eight Circles of Mastery. What would you like to explore?",
            timestamp: new Date().toISOString()
        }
    ] : currentSession?.messages || [];

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex gap-6">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-24 right-6 z-50 w-14 h-14 bg-gold text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,165,116,0.5)] hover:bg-gold/90 transition-all"
            >
                {isSidebarOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
            </button>

            {/* Sidebar - Sessions List */}
            <AnimatePresence>
                {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="fixed lg:relative inset-y-0 left-0 z-40 lg:z-0 w-80 bg-black border border-white/[0.1] p-4 overflow-y-auto lg:block backdrop-blur-xl"
                        style={{ height: 'calc(100vh - 12rem)' }}
                    >
                        {/* New Chat Button */}
                        <button
                            onClick={handleNewChat}
                            className="w-full mb-4 bg-gold text-white px-4 py-3 hover:bg-gold/90 transition-all flex items-center justify-center gap-2 font-medium shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                        >
                            <IconPlus className="w-5 h-5" />
                            <span>New Conversation</span>
                        </button>

                        {/* Sessions List */}
                        <div className="space-y-2">
                            <h3 className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Conversations</h3>
                            {sessions.length === 0 ? (
                                <p className="text-sm text-zinc-400 text-center py-8">No conversations yet</p>
                            ) : (
                                sessions
                                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                                    .map((session) => (
                                        <div
                                            key={session.id}
                                            onClick={() => handleLoadSession(session.id)}
                                            className={`group relative p-3 cursor-pointer transition-all ${
                                                currentSession?.id === session.id
                                                    ? 'bg-gold/10 border border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.2)]'
                                                    : 'bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.2]'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-zinc-100 truncate">{session.title}</p>
                                                    <p className="text-xs text-zinc-400 mt-1">
                                                        {formatTimestamp(session.updatedAt)} · {session.messages.length} messages
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => handleDeleteSession(session.id, e)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-plum/20 rounded transition-all"
                                                >
                                                    <IconTrash className="w-4 h-4 text-plum" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <span className="text-5xl font-serif-jp text-gold">心</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-light text-zinc-100">
                                Kaishin AI <span className="text-gold">Companion</span>
                            </h1>
                            <p className="text-zinc-400 text-sm">Your guide through The Kaishin Method</p>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto bg-black border border-white/[0.1] p-6 mb-6 space-y-6 backdrop-blur-xl">
                    {displayMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {message.role === "assistant" ? (
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <span className="text-3xl font-serif-jp text-gold">心</span>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-white/[0.05] rounded-full flex items-center justify-center border border-white/[0.1]">
                                        <IconUser className="w-5 h-5 text-zinc-400" />
                                    </div>
                                )}
                            </div>

                            {/* Message Content */}
                            <div className={`flex-1 max-w-2xl ${message.role === "user" ? "text-right" : ""}`}>
                                <div
                                    className={`inline-block px-4 py-3 ${
                                        message.role === "assistant"
                                            ? "bg-white/[0.02] border border-white/[0.1]"
                                            : "bg-gold/10 border border-gold/50"
                                    }`}
                                >
                                    {message.role === "assistant" ? (
                                        <div className="text-sm md:text-base prose prose-invert max-w-none">
                                            <MarkdownMessage content={message.content} />
                                        </div>
                                    ) : (
                                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-zinc-100">{message.content}</p>
                                    )}
                                </div>
                                <p className="text-xs text-zinc-400 mt-1">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Streaming Message */}
                    {isTyping && streamingMessage && (
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <span className="text-3xl font-serif-jp text-gold">心</span>
                                </div>
                            </div>
                            <div className="flex-1 max-w-2xl">
                                <div className="inline-block px-4 py-3 bg-white/[0.02] border border-white/[0.1]">
                                    <div className="text-sm md:text-base prose prose-invert max-w-none">
                                        <MarkdownMessage content={streamingMessage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Typing Indicator (when no content yet) */}
                    {isTyping && !streamingMessage && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <span className="text-3xl font-serif-jp text-gold">心</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/[0.1] px-4 py-3">
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
                <div className="bg-black border border-white/[0.1] p-4 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about The View, Compass, or Ground..."
                            className="flex-1 bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-zinc-100 placeholder-zinc-400 focus:border-gold/50 focus:outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isTyping || !inputValue.trim() || !currentSession}
                            className="bg-gold text-white px-6 py-3 font-medium hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                        >
                            <IconSend className="w-5 h-5" />
                            <span className="hidden sm:inline">Send</span>
                        </button>
                    </form>

                    {/* Suggested Prompts */}
                    {displayMessages.length <= 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {[
                                "What are the Three Pillars?",
                                "Explain the Eight Circles of Mastery",
                                "How do the Five Bodies develop?",
                                "What is the 90-Day Transformation?"
                            ].map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputValue(prompt)}
                                    className="text-xs px-3 py-2 bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05] transition-all text-zinc-100"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
