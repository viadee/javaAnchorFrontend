export interface Rule {
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any};
  names: Array<string>;
  precision: number;
  prediction: any;
  affected_rows: number;
} {

}
