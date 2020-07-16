export class MinimalPrologParser {
  public parseRule(rule: string): PrologRule {
    return undefined;
  }
}

interface Token {
  id: string;
  matches: string;
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

const prologTokens: { [key: string]: Token } = {
  ':-': { id: 'op:rule', matches: ':-' },
  '?-': { id: 'op:query', matches: '?-' },
  '=\\=': { id: 'op:equalnot', matches: '=\\=' },
  '=:=': { id: 'op:equal', matches: '=:=' },
  ',': { id: 'op:conj', matches: ',' },
  ';': { id: 'op:disj', matches: ';' },
  '=': { id: 'op:unif', matches: '=' },
  '\\=': { id: 'op:notunif', matches: '\\=' },
  '<': { id: 'op:lt', matches: '<' },
  '>': { id: 'op:gt', matches: '>' },
  '=<': { id: 'op:em', matches: '=<' },
  '>=': { id: 'op:ge', matches: '>=' },
  '-': { id: 'op:minus', matches: '-' },
  '+': { id: 'op:plus', matches: '+' },
  '*': { id: 'op:mult', matches: '*' },
  '/': { id: 'op:div', matches: '/' },
  // prettier-ignore
  'not': { id: 'op:not', matches: 'not' },
  // prettier-ignore
  'is': { id: 'op:is', matches: 'is' },
  '|': { id: 'list:tail', matches: '|' },
  '\n': { id: 'newline', matches: '\n' },
  '.': { id: 'period', matches: '.' },
  '(': { id: 'parens_open', matches: '(' },
  ')': { id: 'parens_close', matches: ')' },
  '[': { id: 'list:open', matches: '[' },
  ']': { id: 'list:close', matches: ']' },
};
