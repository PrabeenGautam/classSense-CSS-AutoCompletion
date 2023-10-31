import { workspace } from 'vscode';

export function getConfig(key: string, defaultValue?: any) {
  return workspace.getConfiguration('classSense').get(key, defaultValue);
}

export function getFilesToScan() {
  return getConfig('filesToScan', '**/*.{html,js,ts,jsx,tsx}');
}

export function getExcludedFolders() {
  return getConfig('excludeFolders', [
    '**/.git/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/.hg/**',
    '**/.svn/**',
  ]);
}

export function getClassAttributes(): string {
  return getConfig('classAttributes', ['className', 'class', 'ngClass']);
}

export function getShowSuggestions(): boolean {
  return getConfig('showSuggestions', true);
}

export function getEmmetSupport(): boolean {
  return getConfig('enableEmmetSupport', false);
}

export function getCSSLanguages(): string {
  return getConfig('CSSLanguages', '**/*.{css,sass,scss}');
}
