import { User } from "src/lib/db/schema";

export type CommandHandler = (
    cmdName: string,
     ...args: string[]
) => Promise<void>;

export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const command = registry[cmdName];
    if (!command) {
        throw new Error('Command does not exist')
    }

   await command(cmdName, ...args);
}