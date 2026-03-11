import { deleteAllUsers } from "../lib/db/queries/users";


export async function resetHandler(cmdName: string, ...args: string[]) {
    try {
        await deleteAllUsers();
        console.log("users table has been reset!")
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}