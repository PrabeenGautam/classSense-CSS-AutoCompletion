import { languages, TextDocument, Position, Range } from 'vscode';
import getConfig from '../utils/getConfig';
import checkClassAttribute from '../utils/checkClassAttribute';

function autoCompleteProvider() {
  return languages.registerCompletionItemProvider(
    { pattern: getConfig('filesToScan', '**/*.{html,js,ts,jsx,tsx}') },
    {
      provideCompletionItems(document: TextDocument, position: Position) {
        const lineText = document.lineAt(position).text;
        const lineTextBeforeCursor = lineText.slice(0, position.character);

        const { isInClassAttribute, existingClassNames } =
          checkClassAttribute(lineTextBeforeCursor);

        if (!isInClassAttribute) {
          return [];
        }

        return [];
      },
    }
  );
}

export default autoCompleteProvider;
