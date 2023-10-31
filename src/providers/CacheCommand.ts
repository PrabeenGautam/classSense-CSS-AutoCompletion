import { commands } from 'vscode';
import { Command } from '../enum';
import cache from '../services/cache';

function CacheCommand(caching: boolean) {
  return commands.registerCommand(Command.CACHE, async () => {
    if (caching) {
      return;
    }

    caching = true;
    tryCache(caching);
  });
}

export async function tryCache(caching: boolean) {
  try {
    await cache();
  } catch (err) {
    console.error('Failed to cache CSS definations', err);
  } finally {
    caching = false;
  }
}

export default CacheCommand;
