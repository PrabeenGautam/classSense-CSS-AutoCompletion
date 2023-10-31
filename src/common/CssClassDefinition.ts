import { Location } from 'vscode';

class CssClassDefinition {
  public constructor(public className: string, public location?: Location) {}
}

export default CssClassDefinition;
