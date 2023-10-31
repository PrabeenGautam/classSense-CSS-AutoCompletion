import * as vscode from 'vscode';
import { Command } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';
import autoCompleteProvider from './providers/AutoCompleteProvider';

export const messageNotifier = new MessageService();
export const cacheNotifer = new ServiceNotifier({
  command: Command.CACHE,
});

export function activate(context: vscode.ExtensionContext) {
  console.log('Fetching Parsable Files');
  context.subscriptions.push(autoCompleteProvider());
}

export function deactivate() {}
