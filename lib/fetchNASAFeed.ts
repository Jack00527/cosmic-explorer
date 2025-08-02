// lib/fetchNASAFeed.ts
import Parser from "rss-parser";

const parser = new Parser();

export async function fetchNASAFeed() {
  const feed = await parser.parseURL("https://www.nasa.gov/news-release/feed/");
  return feed.items || [];
}
