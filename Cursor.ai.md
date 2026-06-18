# AuraTrack - Complete Project Context

## Project

AuraTrack is a premium esports tracking platform inspired by Tracker.gg but designed to become more modern, cinematic and feature rich.

The long-term goal is to support multiple competitive games from one account while keeping all player statistics synchronized from official APIs whenever possible.

Current supported games:

- Valorant (implemented)
- Fortnite (planned)
- Apex Legends (planned)
- Counter Strike 2 (planned)
- Rainbow Six Siege (planned)
- Rocket League (planned)

Future support should be modular through providers.

---

# Tech Stack

Frontend

- Next.js App Router
- React
- TypeScript
- TailwindCSS

Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)

Authentication

- Local authentication
- Connected gaming accounts

Current external APIs

Implemented

- Riot Games API

Integrated

- NewsData API

Planned

- Tracker Network
- Faceit
- Steam
- Epic Games
- PandaScore
- Liquipedia
- HLTV

---

# Design Rules

The project must never look generic.

Design goals

- premium
- cinematic
- futuristic
- esports focused
- animated
- glass UI
- blue electric theme

Avoid

- placeholder UI
- bootstrap looking layouts
- fake statistics
- lorem ipsum

Always preserve the existing visual identity.

---

# Current Homepage

Completed

- animated portal
- cinematic background
- hero section
- navigation
- game carousel
- statistics cards
- search section
- leaderboard section
- live data cards
- animated embers
- glass UI

Removed

- fake lightning effect

Future

- cinematic background video
- particle simulation
- dynamic portal shader

---

# Database Models

Completed

User

Player

Match

FriendRequest

Notification

Activity

SearchHistory

Achievement

ConnectedAccount

Game

Relationships completed.

Indexes completed.

---

# Riot Integration

Implemented

Search Riot ID

Lookup account

Lookup rank

Lookup match history

Lookup match details

Provider

lib/providers/riot.ts

Current limitation

Matches are fetched but not fully synchronized into the database.

---

# Synchronization

Created

lib/sync/saveMatches.ts

Purpose

Store matches in database.

Created

lib/sync/updatePlayerStats.ts

Purpose

Recalculate

- kills
- deaths
- wins
- games

after synchronization.

Current task

Call both automatically after every successful Riot sync.

---

# Homepage APIs

Completed

/api/platform-stats

Returns

- tracked players
- matches analyzed
- active users
- supported games
- tournaments
- daily matches

/api/trending

Returns most searched players.

/api/recent-searches

Returns latest searches.

/api/recent-matches

Returns latest synchronized matches.

/api/news

Returns live esports news using NewsData API.

Needs frontend integration.

---

# Search

Completed

/api/search

Current behavior

Search Riot account.

Create Player if missing.

Return Riot account.

Needs

Automatic synchronization after successful search.

---

# Authentication

Working

Login

Signup

Navbar state

Providers

Needs

Profile page

Avatar upload

Settings

---

# Current Problem

Prisma schema is newer than Supabase database.

Player model contains

lastSyncedAt

riotPuuid

Database currently missing them.

Need SQL migration.

After synchronization

Leaderboard API should work again.

---

# Rules

Never generate fake data.

Never create placeholder statistics.

Everything shown to users must come from

- database
- official API
- trusted esports API

No hardcoded values except configuration.

---

# Coding Standards

Prefer extending existing components.

Avoid duplicate code.

Reuse providers.

Reuse hooks.

Keep API endpoints small.

Keep synchronization modular.

Everything should remain strongly typed.

---

# Remaining Backend Work

HIGH PRIORITY

1 Database synchronization

2 Automatic Riot synchronization

3 Store every Riot match

4 Update player statistics

5 Player profile API

6 Match history API

7 Leaderboards

8 Trending searches

9 Recent activity

10 Achievements

11 Friends

12 Notifications

13 Connected accounts

---

# Remaining Frontend Work

Homepage

Live news

Tournament widget

Real statistics

Player pages

Friends

Profile

Settings

Achievements

Notifications

Leaderboard improvements

Game pages

---

# Deployment Checklist

Enable RLS

Create policies

Environment validation

Caching

Redis

Image optimization

Rate limiting

Analytics

SEO

Production monitoring

Error logging

Backups

---

# Important Rule

Whenever modifying code:

Never replace working code.

Extend existing functionality.

Maintain the current visual design.

Always use real APIs.

Never introduce placeholder data.