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

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        theme="dark"
      />
    </div>
  );
};

export default LeaderboardTable;
