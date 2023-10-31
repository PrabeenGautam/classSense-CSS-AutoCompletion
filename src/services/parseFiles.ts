import { RelativePattern, Uri, workspace } from 'vscode';
import { getExcludedFolders } from '../utils/getConfig';

async function parseFiles(): Promise<Uri[]> {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return [];
  }

  const excludeFolders: string[] = getExcludedFolders();

  const excludedGlob = `{${excludeFolders.join(',')}}`;
  const rootPath = workspaceFolders[0];

  const filePattern = new RelativePattern(rootPath, `**/*.css`);
  const combinedPattern = new RelativePattern(rootPath, excludedGlob);

  return await workspace.findFiles(filePattern, combinedPattern);
}

export default parseFiles;
