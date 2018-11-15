import {FeatureCondition} from './FeatureCondition';

export interface FeatureConditionMetric extends FeatureCondition{
  conditionMin: number;
  conditionMax: number;
}
