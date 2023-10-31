import { Uri } from 'vscode';
import { readFile } from './fileHandler';

function ExtractorGateway(fileURI: Uri) {
  const document = readFile(fileURI.fsPath);
}

export default ExtractorGateway;
