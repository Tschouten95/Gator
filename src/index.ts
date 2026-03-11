import { CommandsRegistry, registerCommand, runCommand } from "./commands/commandsRegistry";
import { loginHandler } from "./commands/loginHandler";
import { registerHandler } from "./commands/registerHandler";
import { resetHandler } from "./commands/resetHandler";
import { getUserHandler } from "./commands/getAllHandler";
import { aggHandler } from "./commands/aggHandler";
import { addFeedHandler } from "./commands/addFeedHandler";
import { listFeedHandler } from "./commands/listFeedHandler";
import { followFeedHandler } from "./commands/followFeedHandler";
import { followingFeedHandler } from "./commands/followingFeedHandler";
import { middlewareLoggedIn } from "./middleware/middlewareLoggedIn";
import { unfollowFeedHandler } from "./commands/unfollowFeedHandler";
import { browseFeedHandler } from "./commands/broseFeedHandler";

async function main() {
  const commands: CommandsRegistry = {}

  registerCommand(commands, "login", loginHandler);
  registerCommand(commands, "register", registerHandler);
  registerCommand(commands, "reset", resetHandler);
  registerCommand(commands, "users", getUserHandler);
  registerCommand(commands, "agg", aggHandler);
  registerCommand(commands, "addfeed", middlewareLoggedIn(addFeedHandler));
  registerCommand(commands, "feeds", listFeedHandler);
  registerCommand(commands, "follow", middlewareLoggedIn(followFeedHandler));
  registerCommand(commands, "unfollow", middlewareLoggedIn(unfollowFeedHandler));
  registerCommand(commands, "following", middlewareLoggedIn(followingFeedHandler));
  registerCommand(commands, "browse", middlewareLoggedIn(browseFeedHandler));


  const args = process.argv.slice(2);
  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  if (!cmdName) {
    throw new Error('No command provided');
  }

  await runCommand(commands,cmdName, ...cmdArgs);

  process.exit(0)
}

main();