import { Parameters } from "./parameters.model";
import { Content } from "./content.model";
import { Tag } from "./tag.model";
import { Link } from "./link.model";

export class Algorithm {
  id?: number;
  name: string;
  inputParameters?: Parameters;
  content?: Content;
  outputParameters?: Parameters;
  tags: Tag[];
  _links?: Link[];
}

export class AlgorithmDtos {
  algorithmDtos: Algorithm[];
}
