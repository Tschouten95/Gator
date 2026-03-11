import { db } from "..";
import { eq, and } from "drizzle-orm";
import {Feed, users, feedFollows, feeds, User} from "../schema";



export type FeedFollowResult = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    feedName: string;
    feedUrl: string;
    userName: string;
};

export async function createFeedFollow(feed: Feed, user: User): Promise<FeedFollowResult> {
    const [newFeedFollow] = await db.insert(feedFollows).values({
        feedId: feed.id,
        userId: user.id,
    }).returning();

    const [result] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id,newFeedFollow.id))

    return result
}

export async function getFeedFollowsForUser(user: User) {
    const result = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, user.id));

    return result;
}

export async function deleteFeedFollow(feedId: string, userId: string) {
    const [result] = await db.delete(feedFollows)
    .where(
        and(
            eq(feedFollows.userId, userId),
            eq(feedFollows.feedId, feedId)
        )
    ).returning();

    return result;
}