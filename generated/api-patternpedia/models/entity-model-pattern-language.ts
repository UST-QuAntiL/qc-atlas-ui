/* tslint:disable */
import { Link } from './link';
import { PatternSchema } from './pattern-schema';
export type EntityModelPatternLanguage = {
  id?: string;
  uri?: string;
  name?: string;
  graph?: {};
  logo?: string;
  creativeCommonsReference?: string;
  patternSchema?: PatternSchema;
  links?: Array<Link>;
};
