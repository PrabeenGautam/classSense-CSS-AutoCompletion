import * as vscode from 'vscode';
import { Command } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';

export const messageNotifier = new MessageService();
export const cacheNotifer = new ServiceNotifier({
  command: Command.CACHE,
});

export function activate(context: vscode.ExtensionContext) {
  console.log('Fetehcing Parsable Files');
}

export function deactivate() {}
