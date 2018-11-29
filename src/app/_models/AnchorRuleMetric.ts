import {AnchorRule} from './AnchorRule';

export interface AnchorRuleMetric extends AnchorRule{
  conditionMin: number;
  conditionMax: number;
}
