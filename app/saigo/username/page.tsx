"use client";

import { useState } from "react";

export default function UsernamePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateUsername = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // TODO: Implement LLM-based username generation
      // const response = await generateUsername();
      // const isUnique = await checkUsernameUniqueness(response);
      // if (isUnique) {
      //   await saveUsernameToSupabase(response);
      // }

      setUsername("placeholder_username");
    } catch (err) {
      setError("Failed to generate username. Please try again.");
      console.error("Username generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Generate Your Unique Username</h1>

      <div className="prose max-w-none mb-8">
        <p>
          Welcome to the username generation process! We use advanced AI to create
          a unique username that reflects the spirit of Saigo.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
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
