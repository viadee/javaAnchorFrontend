import {CaseSelectConditionEnum} from './CaseSelectConditionEnum';
import {CaseSelectConditionMetric} from './CaseSelectConditionMetric';

export interface CaseSelectConditionResponse {
  enumConditions: Map<string, Array<CaseSelectConditionEnum>>
  metricConditions: Map<string, Array<CaseSelectConditionMetric>>
}
