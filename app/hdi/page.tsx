"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

// Import components
import HDIHeader from './components/HDIHeader';
import TerminalEmulation from './components/TerminalEmulation';
import AudioPlayer from './components/AudioPlayer';
import ContentSections from './components/ContentSections';
import CountdownTimer from './components/CountdownTimer';

export default function HDIPage() {
  // State for HDI definitions from the database
  const [hdiDefinitions, setHdiDefinitions] = useState([
    "Human Digital Interface",
    "Higher Defiance Institute",
    "Hyperconsciousness Design Initiative",
    "Heart Data Integrated"
  ]);
  const [namesCount, setNamesCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch HDI names from the API
  const fetchHDINames = async () => {
    try {
      const response = await fetch('/api/hdi/names');
      const data = await response.json();

      if (data.names && data.names.length > 0) {
        setHdiDefinitions(data.names);
        setNamesCount(data.names.length);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching HDI names:', error);
      setIsLoading(false);
    }
  };

  // Poll for new names
  useEffect(() => {
    fetchHDINames();

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/hdi/names');
        const data = await response.json();

        if (data.count > namesCount) {
          setHdiDefinitions(data.names);
          setNamesCount(data.count);
        }
      } catch (error) {
        console.error('Error polling HDI names:', error);
      }
    }, 5000); // Poll every 5 secs

    return () => clearInterval(pollInterval);
  }, [namesCount]);

  const handleDownload = async () => {
    try {
      window.location.href = "/api/hdi/download";
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 font-mono">
        <HDIHeader 
          hdiDefinitions={hdiDefinitions} 
          isLoading={isLoading} 
        />
        <TerminalEmulation />
        <AudioPlayer />
        <ContentSections hdiDefinitions={hdiDefinitions} />
        <CountdownTimer onDownload={handleDownload} />
      </div>
    </>
  );
}
