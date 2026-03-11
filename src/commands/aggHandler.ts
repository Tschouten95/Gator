import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { createPost } from "src/lib/db/queries/posts";
import { fetchFeed } from "src/RSSHandler";

export async function aggHandler(cmdName: string, ...args: string[]) {
    const durationStr = args[0];

    const timeBetweenReqs = parseDuration(durationStr);

    console.log(`Collecting feeds every ${durationStr}`);

    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenReqs);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

export async function scrapeFeeds() {
    const nextFeed = await getNextFeedToFetch();

    if (!nextFeed) {
        console.log("No next feed found...")
        return;
    }

    await markFeedFetched(nextFeed.id)

    const RSSFeed = await fetchFeed(nextFeed.url);

    const items = RSSFeed.channel.item;

    for (const item of items) {
        const post = {
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt: new Date(item.pubDate),
            feedId: nextFeed.id,
        }

        createPost(post);
    }
}

export function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);

    if (!match) {
        throw new Error("No match found, please pass in a valid duration");
    }

    const parsedInt = parseInt(match[1])

    switch (match[2]) {
        case "ms":
            return parsedInt;
            case "s":
            return parsedInt * 1000;
        case "m":
            return parsedInt * 1000 * 60
        case "h":
            return parsedInt * 1000 * 60 * 60;
    }

    throw new Error("No match found, please pass in a valid duration");
}

export function handleError(err: unknown) {
    console.error(err);
}

