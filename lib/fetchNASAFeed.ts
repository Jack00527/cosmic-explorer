// lib/fetchNASAFeed.ts
import Parser from "rss-parser";

type NASAFeedItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories?: string[];
  enclosure?: {
    url: string;
  };
};

export async function fetchNASAFeed(): Promise<NASAFeedItem[]> {
  const parser = new Parser<{}, NASAFeedItem>();
  const feed = await parser.parseURL("https://www.nasa.gov/news-release/feed/");

  return feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    contentSnippet: item.contentSnippet || "",
    categories: item.categories,
    enclosure: item.enclosure, // may contain image
  }));
}
