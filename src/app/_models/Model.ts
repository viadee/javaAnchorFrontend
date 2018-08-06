import {DataFrame} from './DataFrame';

export class Model {

  constructor(
    public model_id: string,
    public name: string,
    public url: string,
    public data_frame: DataFrame[]) {

  }
}
