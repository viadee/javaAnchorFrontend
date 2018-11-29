import {FeatureConditionRequest} from './FeatureConditionRequest';
import {AnchorPredicateMetric} from './AnchorPredicateMetric';
import {AnchorPredicateEnum} from './AnchorPredicateEnum';

export interface Anchor {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any };
  label_of_case: string;
  metricPredicate: { [id: number]: AnchorPredicateMetric };
  enumPredicate: { [id: number]: AnchorPredicateEnum };
  precision: number;
  prediction: any;
  affected_rows: number;
  condition: FeatureConditionRequest;
}

{

}
