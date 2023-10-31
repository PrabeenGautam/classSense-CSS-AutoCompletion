import getClassFromText from './getClassFromText';
import getConfig from './getConfig';

const startCondition = ["='", '="', '={`', '=`'];

interface ReturnProp {
  isInClassAttribute: boolean;
  existingClassNames: string[];
}

function checkClassAttribute(lineText: string): ReturnProp {
  // Get User Config to provide autosuggestion for defined attributes
  const classAttributes = getConfig('classAttributes', [
    'className',
    'class',
    'ngClass',
  ]);

  const existingClassAttributes = classAttributes.filter(
    (className: string) => {
      return lineText.includes(`${className}=`);
    }
  );

  if (existingClassAttributes.length === 0) {
    return { isInClassAttribute: false, existingClassNames: [] };
  }

  // Since we are filtering the classAttributes, we can be sure that the last element is the selected one
  const selecedClassAttribute =
    existingClassAttributes[existingClassAttributes.length - 1];

  const existingClassNames = getClassFromText(lineText, selecedClassAttribute);

  const checkClassName = `${selecedClassAttribute}=`;

  const classStart = startCondition.some((sc) =>
    lineText.endsWith(selecedClassAttribute + sc)
  );

  if (classStart) return { isInClassAttribute: true, existingClassNames };
  const classIndex = lineText.indexOf(checkClassName);

  if (classIndex === -1) {
    return { isInClassAttribute: false, existingClassNames };
  }

  const classValue = lineText.slice(classIndex + checkClassName.length);
  const quotation = classValue.replace(/[^"\'\`]/g, '');
  const isClosed = isQuotationClosed(quotation);
  return { isInClassAttribute: !isClosed, existingClassNames };
}

function isQuotationClosed(input: string) {
  const length = input.length - 1;

  if (length === 0) {
    return false;
  }

  return input[0] === input[length];
}

export default checkClassAttribute;
