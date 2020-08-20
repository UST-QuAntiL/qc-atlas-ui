/* tslint:disable */
import { Link } from './link';
import { PatternSectionSchema } from './pattern-section-schema';
export type EntityModelPatternSchema = {
  id?: string;
  patternSectionSchemas?: Array<PatternSectionSchema>;
  links?: Array<Link>;
};
