import {FeatureConditionEnum} from './FeatureConditionEnum';
import {FeatureConditionMetric} from './FeatureConditionMetric';

export interface FeatureConditionRequest {
  enumConditions: Map<string, FeatureConditionEnum>
  metricConditions: Map<string, FeatureConditionMetric>
}
