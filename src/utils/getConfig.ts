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

export function getClassAttributes() {
  return getConfig('classAttributes', ['className', 'class', 'ngClass']);
}
