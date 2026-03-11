import { setUser } from "../config"
import { getUserByName } from "../lib/db/queries/users";

export async function loginHandler(cmdName: string, ...args: string[]) {
    if (!args[0]) {
        throw new Error("the login handler expects a single argument, the username");
    }
    const user = await getUserByName(args[0]);

    if (!user) {
        throw new Error("User not found");
    }

    setUser(args[0]);

    console.log("User has been set!")
}