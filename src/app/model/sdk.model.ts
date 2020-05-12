import { Link } from "./link.model";

export class Sdk {
  id?: number;
  name: string;
  _links?: Link[];
}

export class SdkDtos {
  sdkDtos: Sdk[];
}
