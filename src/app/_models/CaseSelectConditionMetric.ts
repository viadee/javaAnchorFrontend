import {CaseSelectCondition} from './CaseSelectCondition';

export interface CaseSelectConditionMetric extends CaseSelectCondition{
  conditionMin: number;
  conditionMax: number;
}
