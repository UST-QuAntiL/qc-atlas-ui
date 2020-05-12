import { Link } from "./link.model";

export class Qpu {
  id?: number;
  maxGateTime: number;
  name: string;
  numberOfQubits: number;
  t1: number;
  supportedSdkIds: number[];
  _links?: Link[];
}

export class QpuDtoList {
  qpuDtoList: Qpu[];
}
