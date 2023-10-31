import * as vscode from 'vscode';
import { Command } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';
import autoCompleteProvider from './providers/AutoCompleteProvider';

import { UniqueCSSDefination } from './types';
import CacheCommand, { tryCache } from './providers/CacheCommand';

export const messageNotifier = new MessageService();
export const cacheNotifer = new ServiceNotifier({
  command: Command.CACHE,
});

let uniqueCSSDefination: UniqueCSSDefination[] = [];
let caching = false;

export function setUniqueCSSDefination(data: UniqueCSSDefination[]) {
  uniqueCSSDefination = data;
}

export function getUniqueCSSDefination() {
  return uniqueCSSDefination;
}

const disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
  disposables.push(autoCompleteProvider());
  context.subscriptions.push(CacheCommand(caching));

  caching = true;
  tryCache(caching);
}

function unregisterProviders(
  disposables: vscode.Disposable | vscode.Disposable[]
) {
  const disposablesArray = Array.isArray(disposables)
    ? disposables
    : [disposables];

  disposablesArray.forEach((disposable) => disposable.dispose());
}

export function deactivate() {
  unregisterProviders(disposables);
}
