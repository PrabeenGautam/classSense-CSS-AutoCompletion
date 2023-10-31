import { MessageOptions, StatusBarAlignment, ThemeColor } from 'vscode';
import { NotificationPriority } from '../enum';

export interface NotifierTypes {
  message?: string;
  tooltip?: string;
  icon?: string;
  priority?: NotificationPriority;
  color?: ThemeColor | string;
}

export interface NotifierConstructor {
  command: string;
  position?: StatusBarAlignment;
}

export interface MessageOption {
  message: string;
  options?: MessageOptions;
  type?: NotificationPriority;
  items?: {
    title: string;
    callback: () => void;
  }[];
}

export interface CSSDefination {
  file: string;
  classNames: string[];
}

export interface UniqueCSSDefination {
  class: string;
  existFiles: string[];
}
