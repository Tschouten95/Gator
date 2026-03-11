import { getActiveResourcesInfo } from "node:process";
import { getAllFeeds } from "src/lib/db/queries/feeds";
import { getUserById } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";


export async function listFeedHandler(cmdName: string, ...args: string[]) {
    const feeds = await getAllFeeds();

    for (const feed of feeds) {
        if (!feed.userId) {
            throw new Error("Feed does not have a associated user");
        }

        const user = await getUserById(feed.userId);
        printFeed(feed, user);
    }
}

export function printFeed(feed: Feed, user: User) {
    console.log("\n")
    console.log(`Id: ${feed.id}`)
    console.log(`Name: ${feed.name}`)
    console.log(`Url: ${feed.url}`)
    console.log(`Created at: ${feed.createdAt}`)
    console.log(`Updated at: ${feed.updatedAt}`)
    console.log(`User: ${user.name}`)
}