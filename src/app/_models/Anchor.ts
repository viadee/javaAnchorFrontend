import {FeatureConditionMetric} from './FeatureConditionMetric';
import {FeatureConditionEnum} from './FeatureConditionEnum';
import {FeatureConditionRequest} from './FeatureConditionRequest';

export interface Anchor {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any};
  label_of_case: string;
  metricAnchor: {[id: number]: FeatureConditionMetric};
  enumAnchor: {[id: number]: FeatureConditionEnum};
  precision: number;
  prediction: any;
  affected_rows: number;
  condition: FeatureConditionRequest;
} {

}
