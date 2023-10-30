import * as vscode from 'vscode';
import ServiceNotifier from './services/statusNotifier';
import { Command } from './enum';

export function activate(context: vscode.ExtensionContext) {
  const notifier = new ServiceNotifier({ command: Command.CACHE });

  notifier.notify({
    tooltip: 'Refresh ClassSense cache',
    // icon: 'sync~spin',
  });
}

export function deactivate() {}
