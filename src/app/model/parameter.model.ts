import { Link } from "./link.model";

export class Parameter {
  name: string;
  type: string;
  description?: string;
  restriction?: string;
  _links?: Link[];
}
