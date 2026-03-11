import { deleteFeedFollow } from "src/lib/db/queries/feedFollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schema";

export async function unfollowFeedHandler(cmdName: string, user: User, ...args: string[]) {
    if (!args[0]) {
        throw new Error("the unfollowFeed handler expects a single argument, the url of a feed");
    }

    const feed = await getFeedByUrl(args[0]);

    if (!feed) {
        throw new Error("no feed with this url was found!")
    }

    const result = await deleteFeedFollow(feed.id, user.id);

    if (result) {
        console.log("Feed unfollowed succesfully!")
    }
}