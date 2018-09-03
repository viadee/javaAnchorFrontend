export interface Rule {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any};
  label_of_case: string;
  names: Array<string>;
  precision: number;
  prediction: any;
  affected_rows: number;
} {

}
