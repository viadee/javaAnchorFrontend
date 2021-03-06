import {CategoryFreq} from './CategoryFreq';

export interface ColumnSummary {
  frame_id: string;
  label: string;
  column_min: number;
  column_max: number;
  mean: number;
  column_type: string;
  missing_count: number;
  data: Array<any>;
  categories: CategoryFreq[];
  unique: number;
} {

}
