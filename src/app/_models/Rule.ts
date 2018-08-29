export interface Rule {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any};
  names: Array<string>;
  precision: number;
  prediction: any;
  affected_rows: number;
} {

}
