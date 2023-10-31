import { RelativePattern, Uri, WorkspaceFolder, workspace } from 'vscode';
import * as path from 'path';
import * as Bluebird from 'bluebird';

import { getCSSLanguages, getExcludedFolders } from '../utils/getConfig';
import { fileExist, readFile } from './fileHandler';

async function parseConfigFiles(
  rootDir: WorkspaceFolder,
  excludedGlob: string
): Promise<Uri[]> {
  try {
    const root = rootDir.uri.fsPath;
    const configFilePath = path.join(root, 'classSense.config.json');

    const cssSuggestions = getCSSLanguages();

    if (!(await fileExist(configFilePath))) return [];

    const fileContent = await readFile(configFilePath);
    if (!fileContent) return [];

    const config = JSON.parse(fileContent);
    const configFiles = config.filesToScan;

    const configFilesArray: string[] = Array.isArray(configFiles)
      ? configFiles
      : [configFiles];

    const fullURI: Uri[] = [];

    await Bluebird.map(configFilesArray, async (file) => {
      const extension = path.extname(file).replace('.', '');
      if (!cssSuggestions.includes(extension)) {
        return;
      }

      const filePath = path.join(root, file);
      if (await fileExist(filePath)) {
        fullURI.push(Uri.file(filePath));
        return;
      }

      const filePattern = new RelativePattern(rootDir, `**/${file}`);
      const combinedPattern = new RelativePattern(rootDir, excludedGlob);

      const fetchFiles = await workspace.findFiles(
        filePattern,
        combinedPattern
      );

      fetchFiles.forEach((file) => {
        fullURI.push(file);
      });
    });

    return fullURI;
  } catch (error) {
    console.log('Failed to parse config file', error);
    return [];
  }
}

async function parseFiles(): Promise<Uri[]> {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return [];
  }

  const excludeFolders: string[] = getExcludedFolders();
  const cssLangauges = getCSSLanguages();

  const excludedGlob = `{${excludeFolders.join(',')}}`;
  const rootPath = workspaceFolders[0];

  const configFiles = await parseConfigFiles(rootPath, excludedGlob);
  if (configFiles.length > 0) return configFiles;

  const filePattern = new RelativePattern(rootPath, cssLangauges);
  const combinedPattern = new RelativePattern(rootPath, excludedGlob);

  return await workspace.findFiles(filePattern, combinedPattern);
}

export default parseFiles;
