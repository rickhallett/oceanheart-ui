'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function SchedulePage() {
  const searchParams = useSearchParams();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Schedule Your Clarity Call</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-6">
          Thank you for your interest in scheduling a free 20-minute clarity call.
          Please select a time that works for you from the calendar below.
        </p>

        {/* This would be replaced with your actual scheduling component */}
        <div className="border border-gray-300 rounded-md p-4 bg-gray-50 mb-6">
          <p className="text-center text-gray-700">
            [Your calendar/scheduling widget would be embedded here]
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">What to expect on our call:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We&apos;ll discuss your specific challenges and goals related to AI</li>
            <li>I&apos;ll share how my coaching approach might support you</li>
            <li>You can ask any questions you have about working together</li>
            <li>No pressure or obligation - just an opportunity to connect</li>
          </ul>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <p className="italic">
            &quot;Looking forward to connecting and helping you navigate the AI landscape with clarity and confidence.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}