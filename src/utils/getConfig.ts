import { workspace } from 'vscode';

function getConfig(key: string, defaultValue?: any) {
  return workspace.getConfiguration('classSense').get(key, defaultValue);
}

export default getConfig;
