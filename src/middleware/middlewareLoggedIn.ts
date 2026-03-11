import { CommandHandler, UserCommandHandler } from "src/commands/commandsRegistry";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";


type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const config = await readConfig();
        const userName = config.currentUserName;

        if (!userName) {
            throw new Error("No current user is set.");
        }

        const user = await getUserByName(userName);

        if (!user) {
            throw new Error("Current user not found in database.")
        }

        await handler(cmdName, user, ...args)
    }
}