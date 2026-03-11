import { arrayBuffer } from "node:stream/consumers";
import { readConfig } from "src/config";
import { getAllUsers } from "src/lib/db/queries/users";

export async function getUserHandler(cmdName: string, ...args: string[]) {
    const config = await readConfig();
    const users = await getAllUsers();
    const currentUserName = config.currentUserName

    for (const user of users) {
        console.log(`* ${user.name}${(user.name === currentUserName) ?  (' (current)') : ``}`);
    }
}