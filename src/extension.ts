import * as vscode from 'vscode';
import { Command } from './enum';
import ServiceNotifier from './services/statusNotifier';
import MessageService from './services/messageNotifier';
import autoCompleteProvider from './providers/AutoCompleteProvider';
import cache from './services/cache';
import { UniqueCSSDefination } from './types';

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

export function activate(context: vscode.ExtensionContext) {
  cache();
  context.subscriptions.push(autoCompleteProvider());
}

export function deactivate() {}
