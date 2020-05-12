import { Link } from "./link.model";

export class Tag {
  key: string;
  value: string;
  _links?: Link[];
}

export class TagsDtos {
  tagsDtos: Tag[];
}
