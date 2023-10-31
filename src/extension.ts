import * as vscode from 'vscode';
import { Command, Configurations } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';
import autoCompleteProvider from './providers/AutoCompleteProvider';

import { UniqueCSSDefination } from './types';
import CacheCommand from './providers/CacheCommand';
import cache from './services/cache';

export const messageNotifier = new MessageService();
export const cacheNotifer = new ServiceNotifier({
  command: Command.CACHE,
});

let autoCompleteDisposable: vscode.Disposable | undefined;
let uniqueCSSDefination: UniqueCSSDefination[] = [];
let cacheInialized = false;

export function setUniqueCSSDefination(data: UniqueCSSDefination[]) {
  uniqueCSSDefination = data;
}

export function getUniqueCSSDefination() {
  return uniqueCSSDefination;
}

const disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
  registerAutoCompleteProvider();

  vscode.workspace.onDidChangeConfiguration(async (event) => {
    try {
      if (
        event.affectsConfiguration(Configurations.EXCLUDE_FOLDERS) ||
        event.affectsConfiguration(Configurations.FILES_TO_SCAN) ||
        event.affectsConfiguration(Configurations.CSS_LANGUAGES)
      ) {
        await cache();
      }

      if (event.affectsConfiguration(Configurations.CLASS_ATTRIBUTES)) {
        registerAutoCompleteProvider();
      }
    } catch (error) {}
  });

  context.subscriptions.push(...disposables);
  context.subscriptions.push(CacheCommand());

  if (!cacheInialized) {
    cacheInialized = true;
    cache();
  }
}

function registerAutoCompleteProvider() {
  if (autoCompleteDisposable) {
    unregisterProviders(autoCompleteDisposable);
  }

  autoCompleteDisposable = autoCompleteProvider();
  disposables.push(autoCompleteDisposable);
}

function unregisterProviders(
  disposables: vscode.Disposable | vscode.Disposable[]
) {
  const disposablesArray = Array.isArray(disposables)
    ? disposables
    : [disposables];

  disposablesArray.forEach((disposable) => disposable.dispose());
  disposablesArray.length = 0;
}

export function deactivate() {
  unregisterProviders(disposables);
}
