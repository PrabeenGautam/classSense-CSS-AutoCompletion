import { RelativePattern, workspace } from 'vscode';
import getConfig from '../utils/getConfig';

async function parseFiles() {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return [];
  }

  const excludeFolders: string[] = getConfig('excludeFolders', [
    '**/.git/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/.hg/**',
    '**/.svn/**',
  ]);

  const excludedGlob = `{${excludeFolders.join(',')}}`;
  const rootPath = workspaceFolders[0];

  const filePattern = new RelativePattern(rootPath, `**/*.css`);
  const combinedPattern = new RelativePattern(rootPath, excludedGlob);

  return await workspace.findFiles(filePattern, combinedPattern);
}

export default parseFiles;
