import { window, MessageOptions } from 'vscode';
import { MessageOption } from '../types';
import { NotificationPriority } from '../enum';

class MessageService {
  private _defaultOptions: MessageOptions;

  constructor(options = {}) {
    this._defaultOptions = {
      modal: false,
      detail: '',
    };

    this._defaultOptions = { ...this._defaultOptions, ...options };
  }

  showMessage({
    message,
    options = {},
    type = NotificationPriority.INFO,
    items = [],
  }: MessageOption): void {
    const mergedOptions: MessageOptions = {
      ...this._defaultOptions,
      ...options,
    };

    const actions = items.map((item) => item.title);
    let showMethod: (
      message: string,
      options: MessageOptions,
      ...actions: string[]
    ) => Thenable<string | undefined>;

    switch (type) {
      case NotificationPriority.ERROR:
        showMethod = window.showErrorMessage;
        break;
      case NotificationPriority.WARNING:
        showMethod = window.showWarningMessage;
        break;
      default:
        showMethod = window.showInformationMessage;
    }

    showMethod(message, mergedOptions, ...actions).then((selectedItem) =>
      this._handleAction(selectedItem, items)
    );
  }

  private _handleAction(
    selection: string | undefined,
    items: MessageOption['items']
  ) {
    if (!selection || !items || !items.length) {
      return;
    }

    const item = items.find((item) => item.title === selection);
    if (item) {
      item.callback();
    }
  }
}

export default MessageService;
