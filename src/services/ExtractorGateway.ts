import { Uri } from 'vscode';
import { readFile } from './fileHandler';
import extractClassNames from '../utils/extractClassNames';

async function ExtractorGateway(fileURI: string) {
  const document = await readFile(fileURI);
  const classNames = extractClassNames(document);
  return classNames;
}

export default ExtractorGateway;
