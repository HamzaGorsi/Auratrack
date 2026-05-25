"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const { data: session } =
    useSession();

  const [notifications, setNotifications] =
    useState<any[]>([]);

  async function loadNotifications() {
    if (!session?.user?.username) {
      return;
    }

    const res = await fetch(
      "/api/notifications",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username:
            session.user.username,
        }),
      }
    );

    const data = await res.json();

    setNotifications(data);
  }

  useEffect(() => {
    loadNotifications();
  }, [session]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Social Activity
          </div>

          <h1 className="text-6xl font-black mt-3">
            Notifications
          </h1>

          <p className="text-white/45 mt-5 text-lg">
            Stay updated with social and
            competitive activity.
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-5">
          {notifications.length === 0 && (
            <div className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-8 text-white/45">
              No notifications yet.
            </div>
          )}

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-6 hover:bg-white/[0.05] transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {notification.message}
                  </div>

                  <div className="text-white/45 mt-3">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-white/[0.06] text-white border border-white/[0.08] text-sm font-bold">
                  {notification.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}