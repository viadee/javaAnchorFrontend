import {AnchorPredicate} from './AnchorPredicate';

export interface AnchorPredicateMetric extends AnchorPredicate {
  conditionMin: number;
  conditionMax: number;
}
