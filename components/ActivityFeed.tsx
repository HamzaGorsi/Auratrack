"use client";

import { useEffect, useState } from "react";

export default function ActivityFeed() {
  const [activities, setActivities] =
    useState<any[]>([]);

  async function loadActivities() {
  try {
    const res = await fetch(
      "/api/activity",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return;

    const data =
      await res.json();

    setActivities(data);
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    loadActivities();

    const interval =
      setInterval(() => {
        loadActivities();
      }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Live Activity
          </div>

          <h2 className="text-4xl font-black mt-3">
            Global Feed
          </h2>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-green-500/20 text-white border border-green-500/30 font-bold synced-pulse">
          LIVE
        </div>
      </div>

      <div className="space-y-4">
        {activities.length === 0 && (
          <div className="text-white/45">
            No activity yet.
          </div>
        )}

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="
  relative
  overflow-hidden
  rounded-[28px]
  border
  border-white/[0.04]
  bg-black/80
  p-5
  transition-all
  duration-300
  hover:bg-white/[0.05]
hover:border-white/[0.18]
"
          >
            <div
  className="
    absolute
    inset-0
    opacity-0
    hover:opacity-100
    transition-opacity
    duration-300
    bg-gradient-to-r
    from-[#18181b]/10
    to-black/10
  "
/>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">
                  {activity.message}
                </div>

                <div className="text-white/40 mt-2 text-sm">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/[0.06] text-white border border-white/[0.08] text-sm font-bold">
                {activity.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}