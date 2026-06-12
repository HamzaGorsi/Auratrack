# AuraTrack Project Status

## Current State

* Next.js 15
* TypeScript
* Prisma ORM
* PostgreSQL (Supabase)
* NextAuth Authentication
* Vercel Deployment

Status: Stable

---

# Core Systems

## Authentication

Completed:

* Registration working
* Login working
* Logout working
* Session persistence working
* NextAuth configured
* Protected routes working

---

## Database

Completed:

* Prisma connected to Supabase
* User model working
* Player model working
* SearchHistory model working
* ConnectedAccount model working
* FriendRequest model working
* Notification model working
* Achievement model working

---

# Riot Integration

Completed:

* RIOT_API_KEY configured
* Riot account lookup working
* Riot API requests working
* Valorant account discovery working

Previous issue:

* Expired Riot API key in Vercel

Resolved.

---

# Henrik Integration

Current Status: NOT WORKING

Current Error:

```json
{"errors":[{"code":0,"message":"Unauthorized","status":401,"details":null}]}
```

What has already been tested:

* HENRIK_API_KEY exists in Vercel
* New Henrik token generated
* Token starts with HDEV-
* Vercel redeployed
* Authorization header changed to Bearer format
* Query parameter auth removed

Current State:

* AuraTrack reaches Henrik API
* Henrik rejects token with 401 Unauthorized

Next Task:

* Verify Henrik authentication documentation
* Verify required header format
* Verify token activation status

Files involved:

* lib/henrik.ts
* app/api/player/[platform]/[username]/route.ts

---

# Player Profile Page

Status: 95%

Completed:

* Liquid Glass redesign
* Hero card redesign
* Stats cards redesign
* Connected Accounts section redesign
* Library redesign
* Riot Connect modal redesign
* Purple/Cyan theme removed from hover effects
* Hover movement removed
* Glass buttons implemented
* Save button redesigned

Remaining:

* Final visual polish
* Multi-game support architecture

---

# Navbar

Status: Mostly Complete

Completed:

* Dropdown bug fixed
* Dropdown z-index fixed
* Profile menu fixed
* Mobile menu working
* Login / Signup redesign
* Purple navbar background mostly removed

Remaining:

* Remove remaining flicker effect
* Final button styling pass
* Standardize colours across entire site

Files:

* components/Navbar.tsx

---

# UI Design System

Current Theme:

* Dark Liquid Glass
* VisionOS inspired
* Glass panels
* Neutral glass buttons
* Minimal hover effects
* No movement animations on cards

Glass Card:

```css
bg-white/[0.03]
backdrop-blur-xl
border-white/[0.08]
```

Glass Button:

```css
bg-white/[0.05]
backdrop-blur-xl
border-white/[0.08]
hover:border-white/[0.16]
```

Removed:

* hover:scale
* hover:-translate
* Heavy gaming-card animations

---

# Search System

Completed:

* Search page working
* Search history saving
* Recent searches display

In Progress:

* Delete search history entry (X button)

Backend created:

```text
app/api/recent-searches/[id]/route.ts
```

Need:

* Frontend delete button
* Delete request integration

---

# Friends System

Status: Functional

Completed:

* Send friend request endpoint
* Friend request UI
* Session validation
* Toast notifications

Remaining:

* Friends list
* Pending requests
* Accept / Decline system

Files:

* app/friends/page.tsx

---

# Settings Page

Status: Functional

Completed:

* Account section
* Security section
* Appearance section

Remaining:

* Convert all buttons to unified design system
* Remove old grey button styles

Files:

* app/settings/page.tsx

---

# Components

## TrendingPlayers

Status:

* Functional
* Needs redesign

Planned:

* Full Liquid Glass conversion

---

## LiveActivity

Status:

* Functional
* Needs redesign

Planned:

* Full Liquid Glass conversion

---

## Leaderboard

Status:

* Working

Issues:

* Uses limited data
* Needs visual redesign
* Needs better rankings system

---

# Loading Screen

Current Status:

* Existing loader works

Researching:

* New premium loading experience
* Less generic spinner
* More memorable branding

Ideas:

* Aura portal
* Character movement
* Energy core
* Multi-game themed loading animation

PixiJS possibility discussed but not implemented.

---

# Multi-Game Architecture

Current Reality

AuraTrack currently supports:

```text
RIOT -> Valorant
```

Only.

Not Yet Supported:

* CS2
* Fortnite
* Apex Legends
* Overwatch 2
* Rainbow Six Siege
* Rocket League
* Marvel Rivals
* League of Legends

Future Architecture:

User
└── Connected Accounts

Games
├── Valorant
├── CS2
├── Fortnite
├── Apex
├── R6
└── etc

Each game:

* Stats
* Match History
* Rank
* Achievements

---

# Known Issues

1. Henrik API returns 401 Unauthorized.
2. Minor navbar flickering still present.
3. Recent search deletion UI not implemented.
4. Buttons not fully standardized site-wide.
5. Leaderboard data is limited.
6. Multi-game backend not implemented.

---

# Next Priorities

1. Fix Henrik authentication.
2. Finish search-history delete feature.
3. Standardize all buttons.
4. Fix remaining navbar flicker.
5. Redesign Leaderboard.
6. Redesign TrendingPlayers.
7. Redesign LiveActivity.
8. Implement multi-game architecture.

---

# Last Completed Task

* Navbar dropdown bug fixed.
* Navbar z-index fixed.
* Login / Signup buttons redesigned.
* Search history delete API route created.
* Liquid Glass profile redesign completed.