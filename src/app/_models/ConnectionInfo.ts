import {Model} from './Model';
import {DataFrame} from './DataFrame';

export class ConnectionInfo {
  constructor(
    public server: string,
    public modelId: string,
    public frameId: string) {

  }
}
