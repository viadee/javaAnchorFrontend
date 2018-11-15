import {FeatureConditionEnum} from './FeatureConditionEnum';
import {FeatureConditionMetric} from './FeatureConditionMetric';

export interface FeatureConditionResponse {
  enumConditions: Map<string, Array<FeatureConditionEnum>>
  metricConditions: Map<string, Array<FeatureConditionMetric>>
}
