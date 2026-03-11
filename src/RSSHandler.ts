import { XMLParser } from "fast-xml-parser";
import { parse } from "node:path";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    const parser = new XMLParser();
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator",
        }
    })

    const xml = await response.text();
    const parsedXML = parser.parse(xml);

    if (!parsedXML.rss?.channel) {
        throw new Error("Invalid response");
    }

    const channel = parsedXML.rss?.channel;

    if (!channel?.title || !channel?.link || !channel?.description) {
        throw new Error("Missing required channel metadata");
    }

    const title = channel.title;
    const link = channel.link;
    const description = channel.description;

    const rawItems = Array.isArray(channel.item)
    ? channel.item
    : (channel.item ? [channel.item] : []);

    const validItems: RSSItem[] = [];

    rawItems.forEach((item: RSSItem) => {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            return
        }

        validItems.push(item);
    });

    const RSSFeed: RSSFeed = {
        channel: {
            title: title,
            link: link,
            description: description,
            item: validItems,
        }
    }

    return RSSFeed;
}