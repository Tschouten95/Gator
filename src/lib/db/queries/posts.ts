import { db } from "..";
import { desc, eq } from "drizzle-orm";
import { NewPost, Post, posts, feeds, feedFollows, User } from "../schema";

export async function createPost(post: NewPost): Promise<Post> {
    const [result] = await db.insert(posts).values({
        title: post.title,
        url: post.url,
        description: post.description,
        publishedAt: post.publishedAt,
        feedId: post.feedId,
    }).returning()

    return result;
}

export async function getPostsForUser(user: User, limit: number = 2) {
    const result = await db.select({
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        title: posts.title,
        url: posts.url,
        description: posts.description,
        publishedAt: posts.publishedAt,
        feedId: posts.feedId,
    }).from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .innerJoin(feedFollows, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, user.id))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

    return result;
}