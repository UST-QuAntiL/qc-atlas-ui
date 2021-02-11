/* tslint:disable */
import { Attribute } from './attribute';
import { LangString } from './lang-string';
import { Location } from './location';
import { Other } from './other';
import { QualifiedName } from './qualified-name';
import { Type } from './type';
export type ProvActivityDto = {
  id?: QualifiedName;
  label?: Array<LangString>;
  location?: Array<Location>;
  type?: Array<Type>;
  attributes?: Array<Attribute>;
  others?: Array<Other>;
  startTime?: string;
  endTime?: string;
};
