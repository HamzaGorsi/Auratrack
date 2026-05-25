"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PerformanceChart({
  matches,
}: {
  matches: any[];
}) {
  const chartData = matches
    .slice()
    .reverse()
    .map((match, index) => ({
      match: index + 1,

      kd:
        match.deaths > 0
          ? (
              match.kills / match.deaths
            ).toFixed(2)
          : match.kills,

      kills: match.kills,

      deaths: match.deaths,
    }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient
              id="colorKD"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#8b5cf6"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#8b5cf6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="match"
            stroke="rgba(255,255,255,0.4)"
          />

          <YAxis
            stroke="rgba(255,255,255,0.4)"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="kd"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#colorKD)"
            strokeWidth={4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}