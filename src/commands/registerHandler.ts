import { setUser } from "../config"
import { createUser } from "../lib/db/queries/users";

export async function registerHandler(cmdName: string, ...args: string[]) {
    if (!args[0]) {
        throw new Error("The register handler expects a single argument, the username");
    }
    console.log(args[0]);

    try {
        const user = await createUser(args[0]);
        setUser(user.name)

        console.log("User was created");
        console.log(user);
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}