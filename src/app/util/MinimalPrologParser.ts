export const parsePrologRule = (rule: string): PrologRule => {
  rule = rule.replace(/\s+/, '');
  const delimIndex = rule.indexOf(':-');
  if (delimIndex === -1) {
    throw new Error('not a rule');
  }

  const nmbBrOpen = rule.split('(').length - 1;
  const nmbBrClosed = rule.split(')').length - 1;
  const bracketError = nmbBrOpen - nmbBrClosed;
  if (bracketError > 0) {
    throw new Error('expected ")"');
  } else if (bracketError < 0) {
    throw new Error('expected "("');
  }

  const head = rule.substring(0, delimIndex);
  const body = rule.substring(delimIndex + 2);
  const [functionName, params] = /(.*?)\((.*?)\)/.exec(head).splice(1);
  if (!functionName) {
    throw new Error('no function name');
  }

  if (!rule.endsWith('.')) {
    throw new Error('expected "." at end of rule');
  }

  const args = params.split(',');
  return { head: { functionName, arguments: args }, body };
};

/**
 * More in depth representation should be implemented in the future
 */
export interface PrologRule {
  head: PrologHead; // e.g. sibling(X,Y) :-
  body: string; // parent(Z,X), parent(Z,Y).
}

export interface PrologHead {
  functionName: string;
  arguments: string[];
}
