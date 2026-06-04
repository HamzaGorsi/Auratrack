"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();

  function handleSave() {
    toast.success("Settings saved");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="rounded-[32px] bg-black border border-white/[0.04] p-5 sm:p-8">
          <div className="text-white/40 uppercase tracking-[4px] text-sm">
            AuraTrack Settings
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
            Settings
          </h1>

          <div className="text-white/50 mt-4 text-sm sm:text-base">
            Manage your AuraTrack account and preferences.
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-8 mt-6 sm:mt-8">
          <div className="rounded-[32px] bg-black border border-white/[0.04] p-5 sm:p-8">
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Account
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Profile Settings
            </h2>

            <div className="space-y-5 mt-6 sm:mt-8">
              <div>
                <div className="text-white/40 text-sm mb-3">
                  Username
                </div>

                <input
                  readOnly
                  defaultValue={session?.user?.username}
                  className="w-full h-14 rounded-2xl bg-white/[0.02] border border-white/[0.08] px-5 outline-none"
                />
              </div>

              <div>
                <div className="text-white/40 text-sm mb-3">
                  Email
                </div>

                <input
                  readOnly
                  defaultValue={session?.user?.email || ""}
                  className="w-full h-14 rounded-2xl bg-white/[0.02] border border-white/[0.08] px-5 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="
w-full
sm:w-auto
h-14
px-8
rounded-2xl

bg-gradient-to-r
from-violet-600/30
to-cyan-500/20

border
border-violet-400/30

backdrop-blur-xl

text-white
font-black

hover:border-violet-300/50

transition-all
duration-300
"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-[32px] bg-black border border-white/[0.04] p-5 sm:p-8">
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Appearance
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Interface
            </h2>

            <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
              {["Dark Mode", "Compact Layout", "Reduce Motion"].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      toast.info(`${label} — coming soon`)
                    }
                    className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left px-5 hover:border-violet-400/30 transition-all"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="rounded-[32px] bg-black border border-white/[0.04] p-5 sm:p-8 xl:col-span-2">
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Security
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Account Security
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() =>
                  toast.info("Password change — coming soon")
                }
                className="h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left px-5 hover:border-violet-400/30 transition-all"
              >
                Change Password
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.error("Contact support to delete your account")
                }
                className="h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-left px-5 hover:bg-red-500/15 transition-all"
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
