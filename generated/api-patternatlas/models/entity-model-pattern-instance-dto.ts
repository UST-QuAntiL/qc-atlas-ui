/* tslint:disable */
import { DesignModelPatternGraphData } from './design-model-pattern-graph-data';
import { Links } from './links';
export type EntityModelPatternInstanceDto = {
  id?: string;
  uri?: string;
  name?: string;
  iconUrl?: string;
  patternLanguageId?: string;
  patternLanguageName?: string;
  graphData?: DesignModelPatternGraphData;
  x?: number;
  y?: number;
  _links?: Links;
};
