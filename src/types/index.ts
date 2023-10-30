import { StatusBarAlignment, ThemeColor } from 'vscode';
import { NotificationPriority } from '../enum';

export interface NotifierTypes {
  message: string;
  tooltip?: string;
  icon?: string;
  priority?: NotificationPriority;
  color?: ThemeColor | string;
}

export interface NotifierConstructor {
  command: string;
  position?: StatusBarAlignment;
}
