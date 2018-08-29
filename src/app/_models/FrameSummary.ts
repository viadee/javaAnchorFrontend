import {ColumnSummary} from './ColumnSummary';

export interface FrameSummary {
  frame_id: string;
  row_count: string;
  column_summary_list: Array<ColumnSummary>;
} {

}
