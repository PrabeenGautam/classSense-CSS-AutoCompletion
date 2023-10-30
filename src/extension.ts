import * as vscode from 'vscode';
import ServiceNotifier from './services/serviceNotifier';
import { Command } from './enum';

export function activate(context: vscode.ExtensionContext) {
  const notifier = new ServiceNotifier({ command: Command.CACHE });

  notifier.notify({
    message: 'Notification Message',
    tooltip: 'Tooltip Text',
  });
}

export function deactivate() {}
