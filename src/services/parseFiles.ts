import { RelativePattern, Uri, workspace } from 'vscode';
import { getCSSLanguages, getExcludedFolders } from '../utils/getConfig';

async function parseFiles(): Promise<Uri[]> {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return [];
  }

  const excludeFolders: string[] = getExcludedFolders();
  const cssLangauges = getCSSLanguages();

  const excludedGlob = `{${excludeFolders.join(',')}}`;
  const rootPath = workspaceFolders[0];

  const filePattern = new RelativePattern(rootPath, cssLangauges);
  const combinedPattern = new RelativePattern(rootPath, excludedGlob);

  return await workspace.findFiles(filePattern, combinedPattern);
}

export default parseFiles;
