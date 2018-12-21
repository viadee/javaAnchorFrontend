import {FeatureConditionRequest} from './FeatureConditionRequest';
import {AnchorPredicate} from './AnchorPredicate';

export interface Anchor {
  model_id: string;
  frame_id: string;
  coverage: number;
  features: Array<number>;
  instance: { [id: string]: any };
  label_of_case: string;
  predicates: { [id: number]: AnchorPredicate };
  precision: number;
  prediction: any;
  affected_rows: number;
  condition: FeatureConditionRequest;
}
