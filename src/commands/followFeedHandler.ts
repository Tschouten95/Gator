import { config } from "node:process";
import { readConfig } from "src/config";
import { createFeedFollow, FeedFollowResult } from "src/lib/db/queries/feedFollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schema";

export async function followFeedHandler(cmdName: string, user: User, ...args: string[]) {
    if (!args[0]) {
        throw new Error("the feedFollow handler expects a single argument, the url of a feed");
    }

    await followFeed(args[0], user);
}

export async function followFeed(url: string, user: User) {
    const feed = await getFeedByUrl(url);

    const result = await createFeedFollow(feed,user);

    printFollowFeed(result)
}

 export async function printFollowFeed(result: FeedFollowResult) {
    console.log(`Id: ${result.id}`)
    console.log(`Created At: ${result.createdAt}`)
    console.log(`Updated At: ${result.updatedAt}`)
    console.log(`Feed Name: ${result.feedName}`)
    console.log(`Feed Url: ${result.feedUrl}`)
    console.log(`User Name: ${result.userName}`)
 }