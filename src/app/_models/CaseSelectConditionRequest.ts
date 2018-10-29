import {CaseSelectConditionEnum} from './CaseSelectConditionEnum';
import {CaseSelectConditionMetric} from './CaseSelectConditionMetric';

export interface CaseSelectConditionRequest {
  enumConditions: Map<string, CaseSelectConditionEnum>
  metricConditions: Map<string, CaseSelectConditionMetric>
}
