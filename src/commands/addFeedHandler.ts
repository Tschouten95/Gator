import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feedFollows";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function addFeedHandler(cmdName: string, user: User, ...args: string[]) {
    const name = args[0];
    const url = args[1];

    if (!name || !url) {
        throw new Error("Please provide both a name and url.")
    }

    const feed = await createFeed(name,url,user.id);
    await createFeedFollow(feed,user);

    printFeed(feed,user);
}

export function printFeed(feed: Feed, user: User) {
    console.log(`Id: ${feed.id}`)
    console.log(`Name: ${feed.name}`)
    console.log(`Url: ${feed.url}`)
    console.log(`Created at: ${feed.createdAt}`)
    console.log(`Updated at: ${feed.updatedAt}`)
    console.log(`User: ${user.name}`)
}