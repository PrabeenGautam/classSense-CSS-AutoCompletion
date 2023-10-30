import { StatusBarAlignment, StatusBarItem, window, ThemeColor } from 'vscode';
import { NotifierConstructor, NotifierTypes } from '../types';
import { NotificationPriority } from '../enum';

class ServiceNotifier {
  private _statusBarItem: StatusBarItem;

  constructor({
    command,
    position = StatusBarAlignment.Right,
  }: NotifierConstructor) {
    this._statusBarItem = window.createStatusBarItem(position);
    this._statusBarItem.command = command;
  }

  public notify({
    message = 'ClassSense',
    tooltip,
    icon = 'check-all',
    priority = NotificationPriority.INFO,
    color = new ThemeColor('statusBarItem.foreground'),
  }: NotifierTypes) {
    this._statusBarItem.text = `$(${icon}) ${message}`;
    this._statusBarItem.tooltip = tooltip || undefined;

    // Set color based on priority
    switch (priority) {
      case NotificationPriority.ERROR:
        this._statusBarItem.color = new ThemeColor(
          'statusBarItem.errorForeground'
        );
        break;
      case NotificationPriority.WARNING:
        this._statusBarItem.color = new ThemeColor(
          'statusBarItem.warningForeground'
        );
        break;
      default:
        this._statusBarItem.color = color;
    }

    this._statusBarItem.show();
  }
}

export default ServiceNotifier;
