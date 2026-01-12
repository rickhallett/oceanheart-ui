"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    IconQuestionMark,
    IconBook,
    IconMail,
    IconBrandDiscord,
    IconSearch,
    IconChevronDown,
    IconChevronUp,
    IconHeadset
} from "@tabler/icons-react";

export default function SupportPage() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        {
            question: "How do I access my course materials?",
            answer: "Navigate to the Courses page from the left sidebar. Click on any enrolled course to access lessons, videos, and downloadable resources."
        },
        {
            question: "What are the Eight Circles of Mastery?",
            answer: "The Eight Circles represent your journey through The Kaishin Method, from Circle 0 (Introduction) to Circle 8 (Master Integration). Each circle builds upon the previous, deepening your practice and integration."
        },
        {
            question: "What are the Three Pillars of The Kaishin Method?",
            answer: "The Three Pillars are View (Zen mindfulness), Compass (ACT values work), and Ground (Somatic practices). Together they create a comprehensive path to integration and transformation."
        },
        {
            question: "Can I change my subscription plan?",
            answer: "Yes! Go to Settings > Billing to view available plans and make changes. Contact support if you need assistance choosing the right plan."
        },
        {
            question: "How do I connect with Kaishin directly?",
            answer: "VIP tier members have direct access to Kaishin. Full Program members can connect during live coaching calls. Otherwise, reach out through our community forum or support channels."
        },
        {
            question: "What if I miss a live session?",
            answer: "All live sessions are recorded and available in your course library within 24 hours. You'll receive an email notification when recordings are ready."
        }
    ];

    const resources = [
        {
            title: "Getting Started Guide",
            description: "New to The Kaishin Method? Start here for a comprehensive overview.",
            icon: IconBook,
            color: "text-gold"
        },
        {
            title: "Knowledge Base",
            description: "Browse articles and tutorials about The Kaishin Method.",
            icon: IconQuestionMark,
            color: "text-plum"
        },
        {
            title: "Community Forum",
            description: "Connect with other members and share your transformation journey.",
            icon: IconBrandDiscord,
            color: "text-jade"
        },
        {
            title: "Live Support",
            description: "Chat with our support team Monday-Friday, 9am-5pm PST.",
            icon: IconHeadset,
            color: "text-gold"
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-2">
                    <span className="text-gold">Support</span>
                </h1>
                <p className="text-zinc-400">Get help and explore resources</p>
            </div>

            {/* Quick Resources */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
                {resources.map((resource, index) => (
                    <div
                        key={index}
                        className="bg-black border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all cursor-pointer backdrop-blur-xl group"
                    >
                        <resource.icon className={`w-10 h-10 ${resource.color} mb-4 transition-transform group-hover:scale-110`} />
                        <h3 className="text-lg font-serif font-light text-zinc-100 mb-2">{resource.title}</h3>
                        <p className="text-sm text-zinc-400">{resource.description}</p>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-serif font-light text-zinc-100 mb-6">Frequently Asked Questions</h2>

                {/* Search */}
                <div className="relative mb-6">
                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search FAQs..."
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/[0.1] text-zinc-100 placeholder-zinc-400 focus:border-gold/50 focus:outline-none transition-colors"
                    />
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-black border border-white/[0.1] overflow-hidden backdrop-blur-xl"
                        >
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gold/5 transition-colors"
                            >
                                <span className="text-zinc-100 font-serif font-light">{faq.question}</span>
                                {expandedFaq === index ? (
                                    <IconChevronUp className="w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300" />
                                ) : (
                                    <IconChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300" />
                                )}
                            </button>

                            <div
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{
                                    maxHeight: expandedFaq === index ? '500px' : '0',
                                    opacity: expandedFaq === index ? 1 : 0
                                }}
                            >
                                <div className="px-5 pb-5">
                                    <div className="pt-3 border-t border-white/[0.1]">
                                        <p className="text-zinc-100 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-8 text-zinc-400">
                            No results found. Try a different search term.
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gold/10 border border-gold/30 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-serif font-light text-zinc-100 mb-6 flex items-center gap-2">
                    <IconMail className="w-6 h-6 text-gold" />
                    Contact Support
                </h2>

                <p className="text-zinc-100 mb-6">
                    Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get back to you within 24 hours.
                </p>

                <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="support-name" className="text-zinc-400 mb-2 block">Name</Label>
                            <Input
                                id="support-name"
                                placeholder="Your name"
                                className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="support-email" className="text-zinc-400 mb-2 block">Email</Label>
                            <Input
                                id="support-email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="support-subject" className="text-zinc-400 mb-2 block">Subject</Label>
                        <Input
                            id="support-subject"
                            placeholder="How can we help?"
                            className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                        />
                    </div>

                    <div>
                        <Label htmlFor="support-message" className="text-zinc-400 mb-2 block">Message</Label>
                        <textarea
                            id="support-message"
                            rows={5}
                            placeholder="Describe your question or issue..."
                            className="w-full bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-zinc-100 placeholder-zinc-400 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gold text-white px-8 py-3 font-medium hover:bg-gold/90 transition-all shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-white/[0.1] grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-serif font-light text-zinc-400 mb-2">Email</h4>
                        <a href="mailto:support@kaishinmethod.com" className="text-zinc-100 hover:text-gold transition-colors">
                            support@kaishinmethod.com
                        </a>
                    </div>
                    <div>
                        <h4 className="text-sm font-serif font-light text-zinc-400 mb-2">Support Hours</h4>
                        <p className="text-zinc-100">Monday - Friday, 9:00 AM - 5:00 PM PST</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
