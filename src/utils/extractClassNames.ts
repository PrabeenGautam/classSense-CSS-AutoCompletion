export default function extractClassNames(cssContent: string): string[] {
  const classNamesSet = new Set();

  // Regular expression to match CSS class selectors
  const classSelectorRegex = /\.([a-zA-Z][a-zA-Z0-9_-]*)(?![^\{]*\})/g;

  let match;
  while ((match = classSelectorRegex.exec(cssContent)) !== null) {
    classNamesSet.add(match[1]);
  }

  // Convert the Set to an array
  const classNames = Array.from(classNamesSet);
  return classNames as string[];
}
