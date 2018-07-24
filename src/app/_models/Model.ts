import {DataFrame} from './DataFrame';

export class Model {
  constructor(
    public model_id: String,
    public name: String,
    public url: String,
    public data_frame: DataFrame[]) {

  }
}
