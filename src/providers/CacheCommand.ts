import { commands } from 'vscode';
import { Command } from '../enum';
import cache from '../services/cache';

function CacheCommand() {
  return commands.registerCommand(Command.CACHE, async () => {
    cache();
  });
}

export default CacheCommand;
