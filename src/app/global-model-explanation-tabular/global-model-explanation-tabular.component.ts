import {Component, Input, OnInit} from '@angular/core';
import {Anchor} from '../_models/Anchor';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';
import {AnchorPredicate} from '../_models/AnchorPredicate';
import {AnchorUtil} from '../_helpers/AnchorUtil';

@Component({
  selector: 'app-global-model-explanation-tabular',
  templateUrl: './global-model-explanation-tabular.component.html',
  styleUrls: ['./global-model-explanation-tabular.component.scss']
})
export class GlobalModelExplanationTabularComponent implements OnInit {

  color1 = [224, 0, 0];
  color2 = [255, 225, 221];

  PRECISION_FRACTION_DIGITS = 3;
  COVERAGE_FRACTION_DIGITS = 3;

  anchorPredicates: AnchorPredicate[];

  globalAnchorTable: Array<Array<Array<any>>> = null;

  spResult: SubmodularPickResult;

  rowRange: Array<number>;

  predictions: Array<any>;

  coverage: Array<string>;

  precision: Array<string>;

  exactCoverages: Array<string>;

  constructor() {
  }

  @Input()
  set anchors(anchors: SubmodularPickResult) {
    if (!anchors) {
      return;
    }
    this.spResult = anchors;
    this.computeTable(anchors.anchors);
  }

  private computeTable(anchors: Anchor[]): void {
    if (!anchors || anchors.length <= 0) {
      return;
    }
    anchors = anchors.sort((left, right) => AnchorUtil.compareAnchorByPrediction(left, right));
    this.computeColumns(anchors);

    this.globalAnchorTable = null;
    this.predictions = [];
    this.coverage = [];
    this.precision = [];
    this.exactCoverages = new Array(this.anchorPredicates.length);

    const topOrBottom = 0;

    for (let rowIndex = 0; rowIndex < anchors.length; rowIndex++) {
      const anchor = anchors[rowIndex];
      this.predictions.push(anchor.prediction);

      const predicateKeys = Object.keys(anchor.predicates);
      for (let columnIndex = 0; columnIndex < this.anchorPredicates.length; columnIndex++) {
        const header = this.anchorPredicates[columnIndex];

        for (let index = 0; index < predicateKeys.length; index++) {
          const metricPredicate: AnchorPredicate = anchor.predicates[predicateKeys[index]];
          this.checkAnchorPredicateAndAddToTable(columnIndex, rowIndex, topOrBottom, header, metricPredicate);
        }
      }

      this.coverage.push(anchor.coverage.toFixed(this.COVERAGE_FRACTION_DIGITS));
      this.precision.push(anchor.precision.toFixed(this.PRECISION_FRACTION_DIGITS));
      // const row = this.globalAnchorTable[rowIndex];
      // row.push([anchor.coverage.toFixed(4), 0]);
      // row.push([anchor.precision.toFixed(4), 0]);
    }

    this.rowRange = new Array<number>(this.globalAnchorTable.length);
    for (let i = 0; i < this.rowRange.length; i++) {
      this.rowRange[i] = i;
    }
  }

  private checkAnchorPredicateAndAddToTable(columnIndex: number,
                                            rowIndex: number,
                                            topOrBottom: number,
                                            header: AnchorPredicate,
                                            predicate: AnchorPredicate) {
    if (AnchorUtil.isSameFeatureCondition(header, predicate)) {
      this.exactCoverages[columnIndex] = predicate.exactCoverage.toFixed(this.COVERAGE_FRACTION_DIGITS);
      this.addToTable(rowIndex, columnIndex, topOrBottom, predicate.addedPrecision);
    }
  }

  public getFeatureConditionTitle(condition: AnchorPredicate): string {
    return AnchorUtil.getFeatureConditionTitle(condition);
  }

  private addToTable(row: number, column: number, topOrBottom: number, addedPrecision: number): void {
    if (this.globalAnchorTable === null) {
      this.globalAnchorTable = [];
    }
    let rowData: Array<Array<any>>;
    if (!this.globalAnchorTable[row]) {
      this.globalAnchorTable[row] = new Array<any>(this.anchorPredicates.length);
    }
    rowData = this.globalAnchorTable[row];
    let cell = rowData[column];
    if (!cell) {
      cell = [
        addedPrecision.toFixed(this.PRECISION_FRACTION_DIGITS),
        this.pickGradientHex(addedPrecision, topOrBottom)
      ];
    }
    // cell++;
    rowData[column] = cell;
  }

  private computeColumns(anchors: Anchor[]): void {
    this.anchorPredicates = [];
    if (!anchors) {
      return;
    }

    for (const anchor of anchors) {
      const predicateKeys = Object.keys(anchor.predicates);
      for (const key of predicateKeys) {
        this.isInFeatureConditionList(anchor.predicates[key]);
      }
    }
  }

  private isInFeatureConditionList(condition: AnchorPredicate): void {
    if (!AnchorUtil.containsFeatureCondition(this.anchorPredicates, condition)) {
      this.anchorPredicates.push(condition);
    }
  }

  private pickGradientHex(weight: number, topOrBottom: number) {
    if (!weight) {
      return 0;
    }
    const w1 = weight;
    const w2 = 1 - w1;
    return this.rgbToHex(Math.round(this.color1[0] * w1 + this.color2[0] * w2),
      Math.round(this.color1[1] * w1 + this.color2[1] * w2),
      Math.round(this.color1[2] * w1 + this.color2[2] * w2));
    // return this.rgbToHex(255, 255, 255);
  }

  private rgbToHex(r: number, g: number, b: number) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  private componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  ngOnInit() {
  }

}
