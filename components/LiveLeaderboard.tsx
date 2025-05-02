"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import ButtonAccount from "@/components/ButtonAccount";
import LeaderboardTable from "@/components/LeaderboardTable";
import LineGraph from "@/components/LineGraph";
import PracticeTypesStackedBarChart from "@/components/PracticeTypesStackedBarChart";
import CumulativePointsAreaChart from "@/components/CumulativePointsAreaChart";
import PracticeTypesRadarChart from "@/components/PracticeTypesRadarChart";
import Timer from "@/components/Timer";
import Image from "next/image";
import { Legend, Cell, PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import SaigoAnimatedText from "@/components/SaigoAnimatedText";
import anime from "animejs";
import config from "@/config";

interface LeaderboardEntry {
  username: string;
  totalPoints: number;
}

interface LeaderboardData {
  leaderboardData: LeaderboardEntry[];
  practiceSummary: Array<{ type: string; totalPoints: number }>;
  dailyPoints: number[];
  stackedData: any[];
  practiceTypes: string[];
}

import { PRACTICE_TYPES_COLORS } from "@/libs/chartColors";
import LoadingPage from "@/components/LoadingPage";
const fetcher = (url: string) => fetch(url).then(res => res.json());

// Function to trigger Instagram check
const triggerInstagramCheck = async () => {
  try {
    await fetch('/api/saigo/instagram/check-trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Instagram check triggered');
  } catch (error) {
    console.error('Error triggering Instagram check:', error);
  }
};

const LiveLeaderboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [minutes, setMinutes] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showMachTable, setShowMachTable] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.colors.saigoTheme);

    // Trigger Instagram check when the component mounts
    triggerInstagramCheck();
  }, []);
  const { data, error: fetchError } = useSWR<LeaderboardData>(
    '/api/saigo/leaderboard',
    fetcher,
    {
      refreshInterval: 30000,  // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );


  if (error) {
    console.error('Error loading leaderboard:', error);
    return <div className="flex flex-col items-center justify-center h-screen">
      <ButtonAccount />
      <div className="text-red-500">Error loading leaderboard data</div>
    </div>;
  }
  if (!data) return <LoadingPage />;

  const { leaderboardData, practiceSummary, dailyPoints, stackedData, practiceTypes } = data;

  const showCountdown = true;

  anime({
    targets: 'h1',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function (el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      activityType,
      minutes,
      comment,
    };

    const response = await fetch("/api/saigo/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.error || "Submission failed");
    } else {
      setShowForm(false);
      // Trigger a revalidation of the SWR cache
      mutate('/api/saigo/leaderboard');
    }

    setSubmitting(false);
    setActivityType("");
    setMinutes("");
    setComment("");
  };
  const totalPoints = leaderboardData.reduce((sum: number, user) => sum + user.totalPoints, 0);

  return (
    <div className="mockup-window border bg-base-300 border m-4">
      <div className="flex flex-row items-end justify-end mr-4 gap-0 md:gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-white btn-outline"
        >
          Submit Practice
        </button>
        <ButtonAccount />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-row items-center justify-center w-full py-5">
          <SaigoAnimatedText text="White Dragon" />
        </div>
        <div className="flex flex-row items-center justify-center w-full py-5">
          <Image src="/images/hbi_transparent.webp" alt="Saigo Logo" width={200} height={200} />
        </div>
        {showCountdown && (
          <div className="flex flex-col items-center justify-center w-full py-5">
            <div className="text-center mb-2 text-xl font-bold">Time Elapsed</div>
            <Timer enhanced={true} />
          </div>
        )}



        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">Submit Activity</h2>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Activity Type
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                required
                className="select select-secondary w-full"
              >
                <option value="">Select an activity</option>
                {practiceTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Minutes
              </label>
              <input
                type="number"
                min={1}
                placeholder="0"
                value={minutes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setMinutes("");
                  } else {
                    setMinutes(value.replace(/^0+/, "") || "");
                  }
                }}
                required
                className="input input-bordered input-secondary w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Log
              </label>
              <textarea
                value={comment}
                rows={3}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered textarea-secondary w-full"
                placeholder="What did you learn? Can it help others? What was the most important lesson? (This feature is in development...)"
                disabled={true}
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-white btn-outline btn-sm"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-error btn-outline btn-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <LeaderboardTable data={leaderboardData} />
        )}

        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center text-gray-300 font-bold border-t-2 border-gray-600 py-3 px-4">
            <span>Alisone</span>
            <span>{totalPoints}</span>
          </div>
        </div>

        {/* Practice Summary Panel */}
        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Practice Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {practiceSummary.map((practice, index) => (
              practice.totalPoints > 0 && (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div
                    className="text-gray-300 font-medium mb-1"
                    style={{
                      color:
                        (PRACTICE_TYPES_COLORS.find((item) => item.type === practice.type)
                          ?.color) || "#000000",
                    }}
                  >
                    {practice.type}
                  </div>
                  <div className="flex flex-row items-end justify-between">
                    <div className="text-2xl font-bold text-white">
                      {practice.totalPoints} <span className="text-sm">mins</span>
                    </div>
                    <div className="text-xs opacity-50">({Math.floor(practice.totalPoints / 7)} pts/d)</div>
                  </div>
                </div>
              )))}
          </div>
        </div>

        {/* Pie Chart Panel */}
        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Practice Distribution</h2>
          <div className="flex justify-center min-h-[540px]">
            <div className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={practiceSummary}
                    dataKey="totalPoints"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {practiceSummary.map((entry) => {
                      const colorObj = PRACTICE_TYPES_COLORS.find(
                        (item) => item.type === entry.type
                      );
                      const fillColor = colorObj ? colorObj.color : "#000000";
                      return <Cell key={entry.type} fill={fillColor} />;
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Points Per Day Panel */}
        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Points Per Day</h2>
          <div className="w-full min-h-[370px]">
            <LineGraph data={dailyPoints} />
          </div>
        </div>

        {/* Cumulative Points Panel */}
        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4 min-h-[500px]">
          <h2 className="text-2xl font-bold text-white mb-4">Cumulative Progress</h2>
          <div className="w-full h-[300px] md:h-[400px]">
            <CumulativePointsAreaChart dailyPoints={dailyPoints} />
          </div>
        </div>

        {/* Mach Rank Table - Toggleable */}
        <div className="w-full max-w-4xl mt-4 mx-auto mb-6">
          <button
            onClick={() => setShowMachTable(!showMachTable)}
            className="btn btn-white btn-outline w-3/4 mb-2 flex items-center justify-around mx-auto"
          >
            <span className="text-md font-bold">Mach Speeds (30 days)</span>
            <span className="text-md">{showMachTable ? '▲' : '▼'}</span>
          </button>

          {showMachTable && (
            <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 ease-in-out">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="text-center">Mach Rank</th>
                      <th className="text-center">mph</th>
                      <th className="text-center">mph/d</th>
                      <th className="text-center">hrs/d</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 1</td>
                      <td className="text-center">767</td>
                      <td className="text-center">25.6</td>
                      <td className="text-center">0.4</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 2</td>
                      <td className="text-center">1,534</td>
                      <td className="text-center">51.1</td>
                      <td className="text-center">0.9</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 3</td>
                      <td className="text-center">2,301</td>
                      <td className="text-center">76.7</td>
                      <td className="text-center">1.3</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 4</td>
                      <td className="text-center">3,068</td>
                      <td className="text-center">102.3</td>
                      <td className="text-center">1.7</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 5</td>
                      <td className="text-center">3,835</td>
                      <td className="text-center">127.8</td>
                      <td className="text-center">2.1</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 6</td>
                      <td className="text-center">4,602</td>
                      <td className="text-center">153.4</td>
                      <td className="text-center">2.6</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 7</td>
                      <td className="text-center">5,369</td>
                      <td className="text-center">179.0</td>
                      <td className="text-center">3.0</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 8</td>
                      <td className="text-center">6,136</td>
                      <td className="text-center">204.5</td>
                      <td className="text-center">3.4</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 9</td>
                      <td className="text-center">6,903</td>
                      <td className="text-center">230.1</td>
                      <td className="text-center">3.8</td>
                    </tr>
                    <tr className="hover:bg-gray-600">
                      <td className="text-center font-bold">Mach 10</td>
                      <td className="text-center">7,670</td>
                      <td className="text-center">255.7</td>
                      <td className="text-center">4.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveLeaderboard;
