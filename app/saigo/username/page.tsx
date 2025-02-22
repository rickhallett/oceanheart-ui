"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function UsernamePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateUsername = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/saigo/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate username');
      }

      const data = await response.json();
      setUsername(data.created);
      router.push('/saigo/leaderboard');
    } catch (err) {
      setError("Failed to generate username. Please try again.");
      console.error("Username generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-8">
      <Image src="/images/hbi_transparent.webp" alt="HBI Logo" width={200} height={200} />
      <h1 className="text-2xl font-bold mb-4 mt-4">Generate Your Unique Username</h1>

      <div className="flex flex-col items-center gap-4 mt-4">
        <button
          className="btn btn-primary"
          onClick={handleGenerateUsername}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Username"}
        </button>

        {username && (
          <div className="alert alert-success">
            <p>Your generated username: <strong>{username}</strong></p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
