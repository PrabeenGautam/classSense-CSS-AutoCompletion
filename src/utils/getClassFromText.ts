function getClassFromText(text: string, attr: string) {
  const textWithoutBrackets = text.replace(/[\{\}\$]/g, '');
  const regex = new RegExp(`${attr}=["|'|\`|{\`]([\\w- ]*$)`);

  const classNames: RegExpMatchArray | null = textWithoutBrackets.match(regex);

  if (!classNames || classNames.length === 1) return [];

  const classNamesString = classNames[1].split(' ');
  return classNamesString;
}

export default getClassFromText;
