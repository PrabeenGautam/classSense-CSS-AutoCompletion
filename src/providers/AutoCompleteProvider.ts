import { languages, TextDocument, Position, Range } from 'vscode';
import { getFilesToScan } from '../utils/getConfig';
import checkClassAttribute from '../utils/checkClassAttribute';

// Use this for autocomplete
import { cssDefination } from '../extension';

function autoCompleteProvider() {
  return languages.registerCompletionItemProvider(
    { pattern: getFilesToScan() },
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
