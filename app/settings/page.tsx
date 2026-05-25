"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } =
    useSession();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16">

        {/* HEADER */}
        <div
          className="
            rounded-[32px]
            bg-black
            border
            border-white/[0.04]
            p-8
          "
        >
          <div className="text-white/40 uppercase tracking-[4px] text-sm">
            AuraTrack Settings
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
            Settings
          </h1>

          <div className="text-white/50 mt-4">
            Manage your AuraTrack
            account and preferences.
          </div>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

          {/* ACCOUNT */}
          <div
            className="
              rounded-[32px]
              bg-black
              border
              border-white/[0.04]
              p-8
            "
          >
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Account
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Profile Settings
            </h2>

            <div className="space-y-5 mt-8">

              <div>
                <div className="text-white/40 text-sm mb-3">
                  Username
                </div>

                <input
                  defaultValue={
                    session?.user
                      ?.username
                  }
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-white/[0.02]
                    border
                    border-white/[0.08]
                    px-5
                    outline-none
                  "
                />
              </div>

              <div>
                <div className="text-white/40 text-sm mb-3">
                  Email
                </div>

                <input
                  defaultValue={
                    session?.user
                      ?.email || ""
                  }
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-white/[0.02]
                    border
                    border-white/[0.08]
                    px-5
                    outline-none
                  "
                />
              </div>

              <button
                className="
                  h-14
                  px-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#18181b]
                  to-black
                  font-black
                  hover:brightness-110
                  transition-all
                  duration-200
                "
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* APPEARANCE */}
          <div
            className="
              rounded-[32px]
              bg-black
              border
              border-white/[0.04]
              p-8
            "
          >
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Appearance
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Interface
            </h2>

            <div className="space-y-4 mt-8">

              <button
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.08]
                  text-left
                  px-5
                  hover:bg-white/[0.05]
                  transition-all
                "
              >
                Dark Mode
              </button>

              <button
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.08]
                  text-left
                  px-5
                  hover:bg-white/[0.05]
                  transition-all
                "
              >
                Compact Layout
              </button>

              <button
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.08]
                  text-left
                  px-5
                  hover:bg-white/[0.05]
                  transition-all
                "
              >
                Reduce Motion
              </button>
            </div>
          </div>

          {/* SECURITY */}
          <div
            className="
              rounded-[32px]
              bg-black
              border
              border-white/[0.04]
              p-8
            "
          >
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Security
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Account Security
            </h2>

            <div className="space-y-4 mt-8">

              <button
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.08]
                  text-left
                  px-5
                  hover:bg-white/[0.05]
                  transition-all
                "
              >
                Change Password
              </button>

              <button
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-300
                  text-left
                  px-5
                  hover:bg-red-500/15
                  transition-all
                "
              >
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}