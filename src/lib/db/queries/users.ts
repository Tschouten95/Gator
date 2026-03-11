import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    const user = await getUserByName(name);

    if (user) {
        throw new Error("A user with this username already exists")
    }

    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getAllUsers() {
    const result = await db.select().from(users);

    return result
}

export async function getUserByName(name: string) {
    if (!name) {
        throw new Error('Please pass in a name!');
    }

    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result;
}

export async function getUserById(id: string) {
    if (!id) {
        throw new Error('Please pass in a id!');

    }

    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
}

export async function deleteAllUsers() {
    await db.delete(users);
}