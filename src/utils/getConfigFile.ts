import { workspace } from 'vscode';
import * as path from 'path';
import { fileExist, readFile } from '../services/fileHandler';
import { ConfigFile } from '../types';

async function getConfigFile(): Promise<ConfigFile | undefined> {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return;
  }

  const root = workspaceFolders[0].uri.fsPath;
  const configFilePath = path.join(root, 'classSense.config.json');

  if (!(await fileExist(configFilePath))) return;
  const fileContent = await readFile(configFilePath);
  if (!fileContent) return;

  return JSON.parse(fileContent);
}

export default getConfigFile;
