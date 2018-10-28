import {CaseSelectConditionEnum} from './CaseSelectConditionEnum';
import {CaseSelectConditionMetric} from './CaseSelectConditionMetric';

export interface CaseSelectConditionResponse {
  caseSelectConditionEnum: Map<string, Array<CaseSelectConditionEnum>>
  caseSelectConditionMetric: Map<string, Array<CaseSelectConditionMetric>>
}
