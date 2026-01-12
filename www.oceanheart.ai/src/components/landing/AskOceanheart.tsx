"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import { AIModal } from "./AIModal";

const placeholders = [
  "What AI services do you offer?",
  "Can you build a custom tool for my business?",
  "Can you build a Next.js app for my startup?",
  "How do you approach AI system design?",
  "How can I hire you for a project?",
  "What's your development philosophy?",
];

export function AskOceanheart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState("");

  const handleChange = () => {
    // Placeholder for onChange
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = e.currentTarget.querySelector('input');
    const question = input?.value || "";

    if (question.trim()) {
      setInitialQuestion(question);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-12 md:py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 text-center mb-3 md:mb-4">
          Questions?
        </h2>
        <p className="text-zinc-400 text-center mb-6 md:mb-8 text-sm md:text-base">
          Ask me anything about what I do
        </p>

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {isModalOpen && (
        <Modal>
          <ModalBody>
            <ModalContent className="bg-black">
              <AIModal
                initialQuestion={initialQuestion}
                onClose={() => setIsModalOpen(false)}
              />
            </ModalContent>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
