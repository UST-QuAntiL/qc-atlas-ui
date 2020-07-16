export const parseRule = (rule: string): PrologRule => {
  rule = rule.replace(/\s+/, '');
  const delimIndex = rule.indexOf(':-');
  if (delimIndex === -1) {
    throw new Error('not a rule');
  }
  const head = rule.substring(0, delimIndex);
  const body = rule.substring(delimIndex + 2);
  const [functionName, params] = /(.*?)\((.*?)\)/.exec(head).splice(1);
  if (!functionName) {
    throw new Error('no function name');
  }

  const args = params.split(',');
  return { head: { functionName, arguments: args }, body };
};

interface Token {
  id: string;
  matches?: string;
  content?: string;
}

export interface ParameterPrologRules {
  selectionRule: PrologRule;
  widthRule: PrologRule;
  depthRule: PrologRule;
}

/**
 * TODO do this better
 */
export interface PrologRule {
  head: PrologHead; // e.g. sibling(X,Y) :-
  body: string; // parent(Z,X), parent(Z,Y).
}

export interface PrologHead {
  functionName: string;
  arguments: string[];
}
