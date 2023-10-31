import { languages, TextDocument, Position, Range } from 'vscode';
import { getFilesToScan } from '../utils/getConfig';
import checkClassAttribute from '../utils/checkClassAttribute';
import CssClassDefinition from '../common/CssClassDefinition';

function autoCompleteProvider(defination: CssClassDefinition[]) {
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
