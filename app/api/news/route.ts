import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const feeds = [
  "https://www.dexerto.com/feed/",
  "https://dotesports.com/feed",
  "https://www.pcgamer.com/rss/",
  "https://www.gamesradar.com/rss/",
  "https://www.ign.com/rss",
];

function detectGame(title: string) {
  const text = title.toLowerCase();

  if (text.includes("valorant")) return "VALORANT";
  if (text.includes("counter") || text.includes("cs2")) return "CS2";
  if (text.includes("fortnite")) return "FORTNITE";
  if (text.includes("apex")) return "APEX";
  if (text.includes("rocket league")) return "ROCKET LEAGUE";
  if (text.includes("rainbow six")) return "RAINBOW SIX";

  return "GAMING";
}

export async function GET() {
  try {
    const articles = [];

    for (const url of feeds) {
      try {
        const feed = await parser.parseURL(url);

        for (const item of feed.items) {
          articles.push({
            title: item.title ?? "Untitled",
            description:
              item.contentSnippet ??
              item.content ??
              "",
            link: item.link ?? "#",
            image:
              (item.enclosure as any)?.url ??
              null,
            source: feed.title,
            pubDate: item.pubDate,
            game: detectGame(item.title ?? ""),
          });
        }
      } catch {}
    }

    articles.sort(
      (a, b) =>
        new Date(b.pubDate || 0).getTime() -
        new Date(a.pubDate || 0).getTime()
    );

    return NextResponse.json(
      articles.slice(0, 30)
    );
  } catch {
    return NextResponse.json([]);
  }
}