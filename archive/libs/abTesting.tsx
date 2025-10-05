"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

type Variant = "A" | "B" | "C" | "D";
type TestID = string;
type EventType = "view" | "click" | "conversion";

interface ABTestContextType {
  variant: Variant;
  recordEvent: (testId: TestID, event: EventType) => void;
  getVariant: (testId: TestID) => Variant;
}

// Create context with default values
const ABTestContext = createContext<ABTestContextType>({
  variant: "A",
  recordEvent: () => { },
  getVariant: () => "A",
});

// Provider component
export const ABTestProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with variant A to match server-side rendering
  const [variant, setVariant] = useState<Variant>("A");
  const [trackedEvents, setTrackedEvents] = useState<Set<string>>(new Set());
  const isInitializedRef = useRef(false);

  // Initialize variant after first render (client-side only)
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Only run on client-side
    if (typeof window === "undefined") return;

    // Try to get variant from cookie for "landing_headline_test"
    const testId = "landing_headline_test"; // Hardcoded for simplicity

    const cookies = document.cookie.split("; ");
    const testCookie = cookies.find(cookie => cookie.startsWith(`ab_${testId}=`));

    if (testCookie) {
      setVariant(testCookie.split("=")[1] as Variant);
    } else {
      // Assign variant randomly with equal distribution (25% each)
      const random = Math.random();
      const newVariant: Variant =
        random < 0.25 ? "A" :
          random < 0.5 ? "B" :
            random < 0.75 ? "C" : "D";

      // Store in cookie for 30 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `ab_${testId}=${newVariant};expires=${expiryDate.toUTCString()};path=/`;

      setVariant(newVariant);
    }
  }, []);

  // Function to record events
  const recordEvent = async (testId: TestID, event: EventType) => {
    if (typeof window === "undefined") return;

    // Create a unique key for deduplication
    const eventKey = `${testId}:${event}:${variant}`;

    // Skip if already tracked
    if (trackedEvents.has(eventKey)) return;

    // Add to tracked events
    setTrackedEvents(prev => {
      const newSet = new Set(prev);
      newSet.add(eventKey);
      return newSet;
    });

    // Send to API
    try {
      await fetch('/api/ab-tracking', {
        method: 'POST',
        body: JSON.stringify({ testId, variant, event }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error recording AB test event:', error);
    }
  };

  // Function to get variant for a specific test
  const getVariant = (testId: TestID): Variant => {
    return variant;
  };

  return (
    <ABTestContext.Provider value={{ variant, recordEvent, getVariant }}>
      {children}
    </ABTestContext.Provider>
  );
};

// Hook to use AB testing
export const useABTest = () => {
  return useContext(ABTestContext);
}