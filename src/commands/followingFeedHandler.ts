import { readConfig } from "src/config";
import { FeedFollowResult, getFeedFollowsForUser } from "src/lib/db/queries/feedFollows";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schema";


export async function followingFeedHandler(cmdName: string, user: User, ...args: string[]) {
    const followingFeeds = await getFeedFollowsForUser(user);

    for (const followingFeed of followingFeeds) {
        printFollowFeed(followingFeed);
    }
}

 export function printFollowFeed(result: FeedFollowResult) {
    console.log(`Id: ${result.id}`)
    console.log(`Created At: ${result.createdAt}`)
    console.log(`Updated At: ${result.updatedAt}`)
    console.log(`Feed Name: ${result.feedName}`)
    console.log(`Feed Url: ${result.feedUrl}`)
    console.log(`User Name: ${result.userName}`)
    console.log("\n")
 }