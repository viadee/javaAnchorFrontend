import {FeatureConditionRequest} from './FeatureConditionRequest';
import {AnchorRuleMetric} from './AnchorRuleMetric';
import {AnchorRuleEnum} from './AnchorRuleEnum';

export interface Anchor {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any };
  label_of_case: string;
  metricAnchor: { [id: number]: AnchorRuleMetric };
  enumAnchor: { [id: number]: AnchorRuleEnum };
  precision: number;
  prediction: any;
  affected_rows: number;
  condition: FeatureConditionRequest;
}

{

}
