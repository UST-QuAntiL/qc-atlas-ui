import { Tag } from "./tag.model";
import { Parameters } from "./parameters.model";
import { Content } from "./content.model";
import { Link } from "./link.model";

export class Implementation {
  id?: number;
  name: string;
  content?: Content;
  sdk: string;
  fileLocation: string;
  inputParameters?: Parameters;
  outputParameters?: Parameters;
  programmingLanguage: string;
  selectionRule: string;
  tags: Tag[];
  _links?: Link[];
}

export class ImplementationDtos {
  implementationDtos: Implementation[];
}
