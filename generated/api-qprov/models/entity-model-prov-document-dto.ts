/* tslint:disable */
import { Links } from './links';
import { Namespace } from './namespace';
import { StatementOrBundle } from './statement-or-bundle';
export type EntityModelProvDocumentDto = { 'databaseId'?: number, 'namespace'?: Namespace, 'statementOrBundle'?: Array<StatementOrBundle>, '_links'?: Links };
