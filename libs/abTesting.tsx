"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Variant = "A" | "B";
type TestID = string;
type EventType = "view" | "click" | "conversion";

interface ABTestContextType {
  getVariant: (testId: TestID) => Variant;
  recordEvent: (testId: TestID, event: EventType) => void;
}

// Create context with default values
const ABTestContext = createContext<ABTestContextType>({
  getVariant: () => "A",
  recordEvent: () => { },
});

// Get variant for a test (with cookie persistence)
const getVariantFromCookie = (testId: TestID): Variant => {
  if (typeof window === "undefined") return "A";

  const cookies = document.cookie.split("; ");
  const testCookie = cookies.find(cookie => cookie.startsWith(`ab_${testId}=`));

  if (testCookie) {
    return testCookie.split("=")[1] as Variant;
  }

  // Assign variant randomly if not found (50/50 split)
  const variant: Variant = Math.random() < 0.5 ? "A" : "B";

  // Store in cookie for 30 days
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  document.cookie = `ab_${testId}=${variant};expires=${expiryDate.toUTCString()};path=/`;

  return variant;
};

// Provider component
export const ABTestProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracked, setTracked] = useState<Record<string, Set<EventType>>>({});

  // Function to get variant
  const getVariant = (testId: TestID): Variant => {
    return getVariantFromCookie(testId);
  };

  // Function to record events
  const recordEvent = async (testId: TestID, event: EventType) => {
    if (typeof window === "undefined") return;

    const variant = getVariant(testId);

    // Prevent duplicate tracking of the same event type for the same test
    if (!tracked[testId]) {
      setTracked(prev => ({ ...prev, [testId]: new Set([event]) }));
    } else if (!tracked[testId].has(event)) {
      setTracked(prev => {
        const newSet = new Set(prev[testId]);
        newSet.add(event);
        return { ...prev, [testId]: newSet };
      });
    } else {
      // Already tracked this event for this test
      return;
    }

    // Send to API endpoint
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

  return (
    <ABTestContext.Provider value={{ getVariant, recordEvent }}>
      {children}
    </ABTestContext.Provider>
  );
};

// Hook to use AB testing
export const useABTest = () => {
  return useContext(ABTestContext);
}