import { NextResponse } from "next/server";

export async function GET() {
  const query = [
    "valorant",
    "cs2",
    "fortnite",
    "apex legends",
    "rocket league",
    "rainbow six",
    "esports",
  ].join(" OR ");

  const url =
    `https://newsdata.io/api/1/news?apikey=${
      process.env.NEWSDATA_API_KEY
    }&q=${encodeURIComponent(query)}&language=en`;

  const res = await fetch(url);

  const data = await res.json();

  return NextResponse.json(data);
}