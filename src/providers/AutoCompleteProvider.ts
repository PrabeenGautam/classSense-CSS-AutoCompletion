import {
  languages,
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from 'vscode';
import { getFilesToScan } from '../utils/getConfig';
import checkClassAttribute from '../utils/checkClassAttribute';
import { getUniqueCSSDefination } from '../extension';

const triggerChars = ['"', "'", ' ', '`', '{'];

function autoCompleteProvider() {
  return languages.registerCompletionItemProvider(
    { pattern: getFilesToScan() },
    {
      provideCompletionItems(
        document: TextDocument,
        position: Position
      ): CompletionItem[] {
        const lineText = document.lineAt(position).text;
        const lineTextBeforeCursor = lineText.slice(0, position.character);

        const { isInClassAttribute, existingClassNames } =
          checkClassAttribute(lineTextBeforeCursor);

        if (!isInClassAttribute) {
          return [];
        }

        const suggestions = getUniqueCSSDefination().map((defination) => {
          const { class: cn, existFiles } = defination;

          /*    if (existingClassNames.includes(cn)) {
            return;
          } */

          const item = new CompletionItem(cn, CompletionItemKind.Value);
          item.detail = existFiles.join(' | ');

          return item;
        });

        return suggestions as CompletionItem[];
      },
    },
    ...triggerChars
  );
}

export default autoCompleteProvider;
