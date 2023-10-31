import * as vscode from 'vscode';
import { Command } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';
import autoCompleteProvider from './providers/AutoCompleteProvider';
import CssClassDefinition from './common/CssClassDefinition';
import cache from './services/cache';

export const messageNotifier = new MessageService();
export const cacheNotifer = new ServiceNotifier({
  command: Command.CACHE,
});

export let cssDefination: CssClassDefinition[] = [];

export function activate(context: vscode.ExtensionContext) {
  cache();
  context.subscriptions.push(autoCompleteProvider());
}

export function deactivate() {}
