import {Model} from './Model';
import {DataFrame} from './DataFrame';

export class ConnectionInfo {
  constructor(
    public server: string,
    public model: Model,
    public frame: DataFrame) {

  }
}
