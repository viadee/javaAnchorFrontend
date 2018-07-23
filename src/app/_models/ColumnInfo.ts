import {CategoryFreq} from './CategoryFreq';

export interface ColumnInfo {
  label: String;
  min: number;
  max: number;
  mean: number;
  type: string;
  missing_count: number;
  data: Array<any>;
  categories: CategoryFreq[];
} {

}
