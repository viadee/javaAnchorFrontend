import {Anchor} from './Anchor';

export interface SubmodularPickResult {
  aggregatedCoverage: number;
  anchors: Array<Anchor>;
}
