import { getPostsForUser } from "src/lib/db/queries/posts";
import { Post, User } from "src/lib/db/schema";

export async function browseFeedHandler(cmdName: string,user: User, ...args: string[]) {
    const limit = parseInt(args[0]) || undefined;

    const posts = await getPostsForUser(user, limit);

    for (const post of posts) {
        printPost(post);
    }
}

export function printPost(post: Post) {
    console.log(`Id: ${post.id}`)
    console.log(`Title: ${post.title}`)
    console.log(`Url: ${post.url}`)
    console.log(`Description: ${post.description}`)
    console.log(`Published At: ${post.publishedAt}`)
    console.log("\n")
}