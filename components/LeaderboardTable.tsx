"use client";

import React from "react";
import DataTable from "react-data-table-component";

interface LeaderboardEntry {
  username: string;
  totalPoints: number;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

// Helper to get the first day of the current month
export const getFirstDayOfMonth = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

// Format the current month period for display
const formatMonthPeriod = (): string => {
  const now = new Date();
  return now.toLocaleString('default', { month: 'long', year: 'numeric' });
};

// Helper to get the fixed competition start date (May 1st of the current year)
const getCompetitionStartDate = (): Date => {
  const now = new Date();
  // May is month 4 (zero-indexed)
  return new Date(Date.UTC(now.getUTCFullYear(), 4, 1));
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const columns = [
    {
      name: "Username",
      selector: (row: LeaderboardEntry) => row.username,
      sortable: true,
    },
    {
      name: "Points",
      selector: (row: LeaderboardEntry) => row.totalPoints,
      sortable: true,
      right: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1f2937",
        color: "#f3f4f6",
        fontWeight: "bold",
        fontSize: "0.875rem",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        backgroundColor: "#374151",
        color: "#f3f4f6",
        paddingLeft: "16px",
        paddingRight: "16px",
        fontSize: "0.875rem",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#1f2937",
        color: "#f3f4f6",
      },
      pageButtonsStyle: {
        color: "#f3f4f6",
        fill: "#f3f4f6",
      },
    },
  };

  const mid = Math.ceil(data.length / 2);
  const leftData = data.slice(0, mid);
  const rightData = data.slice(mid);
  const isRightDisplayed = rightData.length > 0;

  // Use the fixed competition start date for display
  const competitionStartDate = getCompetitionStartDate();
  const competitionStartDateString = competitionStartDate.toLocaleDateString();

  if (data.length <= 5) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-white mb-3">
          Leaderboard
          <div className="text-sm font-normal text-gray-300">
            Points accumulated since {competitionStartDateString}
          </div>
        </h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <DataTable columns={columns} data={data} customStyles={customStyles} pagination theme="dark" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-center text-xl font-semibold text-white mb-3">
        Leaderboard
        <div className="text-sm font-normal text-gray-300">
          Points accumulated since {competitionStartDateString}
        </div>
      </h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <DataTable
              columns={columns}
              data={leftData}
              customStyles={customStyles}
              pagination
              theme="dark"
            />
          </div>
          {isRightDisplayed && (
            <div className="flex-1">
              <DataTable
                columns={columns}
                data={rightData}
                customStyles={customStyles}
                pagination
                theme="dark"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
