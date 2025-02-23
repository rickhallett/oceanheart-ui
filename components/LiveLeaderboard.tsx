"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import ButtonAccount from "@/components/ButtonAccount";
import LeaderboardTable from "@/components/LeaderboardTable";
import LineGraph from "@/components/LineGraph";
import PracticeTypesStackedBarChart from "@/components/PracticeTypesStackedBarChart";
import CumulativePointsAreaChart from "@/components/CumulativePointsAreaChart";
import PracticeTypesRadarChart from "@/components/PracticeTypesRadarChart";
import Countdown from "@/components/Countdown";
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
const LiveLeaderboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [minutes, setMinutes] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.colors.saigoTheme);
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

  console.log('Fetched leaderboard data:', data);

  if (error) {
    console.error('Error loading leaderboard:', error);
    return <div className="flex flex-col items-center justify-center h-screen">
      <ButtonAccount />
      <div className="text-red-500">Error loading leaderboard data</div>
    </div>;
  }
  if (!data) return <LoadingPage />;

  const { leaderboardData, practiceSummary, dailyPoints, stackedData, practiceTypes } = data;

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
    setMinutes(1);
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
          <SaigoAnimatedText text="Saigo No Yume: The Last Dream" />
        </div>
        <Image src="/images/hbi_transparent.webp" alt="Saigo Logo" width={200} height={200} />
        <div className="flex flex-row items-center justify-center w-full py-5">
          <Countdown enhanced={true} />
        </div>

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
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered textarea-secondary w-full"
                placeholder="What you learn? Can it help others? What was the most important lesson? (This feature is development...)"
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


        <div className="w-full h-[1020px] md:h-[1020px] max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Column: Practice Summary Types */}
            <div className="md:w-1/3">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Practice Summary</h2>
                <div className="flex flex-wrap md:flex-col gap-4">
                  {practiceSummary.map((practice, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 flex-1 md:flex-none">
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
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column: Pie Chart & Stacked Bar Chart */}
            <div className="md:w-2/3 flex flex-col gap-32 sm:gap-4">
              <div className="bg-gray-800 rounded-lg p-0 md:p-4 md:m-16 flex justify-evenly">
                <ResponsiveContainer width="100%" aspect={1}>
                  <PieChart>
                    <Pie
                      data={practiceSummary}
                      dataKey="totalPoints"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
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
              <div className="bg-gray-800 rounded-lg p-0 md:p-10 hidden md:block">
                <PracticeTypesStackedBarChart data={stackedData} practiceTypes={practiceTypes} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center text-gray-300 font-bold border-t-2 border-gray-600 py-3 px-4">
            {/* Practice Summary Section */}
            <div className="flex flex-row items-center justify-center w-full gap-16 flex-wrap">
              <div className="mt-8">
                <LineGraph data={dailyPoints} />
              </div>
              <div className="mt-8">
                <PracticeTypesRadarChart data={practiceSummary} />
              </div>
              <div className="mt-8">
                <CumulativePointsAreaChart dailyPoints={dailyPoints} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLeaderboard;
