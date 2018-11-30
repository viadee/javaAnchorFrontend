import {Component, Input, OnInit} from '@angular/core';
import {Anchor} from '../_models/Anchor';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';
import {AnchorPredicateMetric} from '../_models/AnchorPredicateMetric';
import {AnchorPredicateEnum} from '../_models/AnchorPredicateEnum';
import {AnchorPredicate} from '../_models/AnchorPredicate';

@Component({
  selector: 'app-global-model-explanation-tabular',
  templateUrl: './global-model-explanation-tabular.component.html',
  styleUrls: ['./global-model-explanation-tabular.component.scss']
})
export class GlobalModelExplanationTabularComponent implements OnInit {

  color1 = [255, 23, 62];
  color2 = [32, 44, 179];

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
    anchors = anchors.sort((left, right) => this.compareAnchor(left, right));
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

      const metricKeys = Object.keys(anchor.metricPredicate);
      const enumKeys = Object.keys(anchor.enumPredicate);
      for (let columnIndex = 0; columnIndex < this.anchorPredicates.length; columnIndex++) {
        const header = this.anchorPredicates[columnIndex];

        for (let index = 0; index < metricKeys.length; index++) {
          const metricPredicate: AnchorPredicate = anchor.metricPredicate[metricKeys[index]];
          this.checkAnchorPredicateAndAddToTable(columnIndex, rowIndex, topOrBottom, header, metricPredicate);
        }
        for (let index = 0; index < enumKeys.length; index++) {
          const enumPredicate: AnchorPredicate = anchor.enumPredicate[enumKeys[index]];
          this.checkAnchorPredicateAndAddToTable(columnIndex, rowIndex, topOrBottom, header, enumPredicate);
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
    if (this.isSameFeatureCondition(header, predicate)) {
      this.exactCoverages[columnIndex] = predicate.exactCoverage.toFixed(this.COVERAGE_FRACTION_DIGITS);
      this.addToTable(rowIndex, columnIndex, topOrBottom, predicate.addedPrecision.toFixed(this.PRECISION_FRACTION_DIGITS));
    }
  }

  compareAnchor(left: Anchor, right: Anchor): number {
    return left.prediction < right.prediction ? -1 : left.prediction === right.prediction ? 0 : 1;
  }

  getFeatureConditionTitle(condition: AnchorPredicate): string {
    if (this.isMetricCondition(condition)) {
      const metricCon = <AnchorPredicateMetric>condition;
      const roundLength = this.round(metricCon.conditionMin, metricCon.conditionMax);
      return '(' + metricCon.conditionMin.toFixed(roundLength) + ', ' + metricCon.conditionMax.toFixed(roundLength) + ')';
    } else if (this.isEnumCondition(condition)) {
      return (<AnchorPredicateEnum>condition).category;
    } else {
      console.log('unhandled column type: ' + condition.columnType);
      // TODO throw error
    }
  }

  private addToTable(row: number, column: number, topOrBottom: number, addedPrecision: string): void {
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
      cell = [addedPrecision, this.pickGradientHex(addedPrecision, topOrBottom)];
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
      const metricKeys = Object.keys(anchor.metricPredicate);
      const enumKeys = Object.keys(anchor.enumPredicate);
      for (const key of metricKeys) {

        this.isInFeatureConditionList(anchor.metricPredicate[key]);
      }
      for (const key of enumKeys) {
        this.isInFeatureConditionList(anchor.enumPredicate[key]);
      }
    }
  }

  private isInFeatureConditionList(condition: AnchorPredicate): void {
    if (!this.containsFeatureCondition(this.anchorPredicates, condition)) {
      this.anchorPredicates.push(condition);
    }
  }

  private containsFeatureCondition(conditions: Array<AnchorPredicate>, condition: AnchorPredicate): boolean {
    for (const conditionInList of conditions) {
      if (this.isSameFeatureCondition(condition, conditionInList)) {
        return true;
      }
    }

    return false;
  }

  private isSameFeatureCondition(conditionLeft: AnchorPredicate, conditionRight: AnchorPredicate): boolean {
    if (conditionLeft === null || conditionRight === null) {
      return false;
    }

    if (conditionLeft.columnType === conditionRight.columnType
      && conditionLeft.featureName === conditionRight.featureName) {
      if (this.isMetricCondition(conditionLeft)) {
        const metricConditionLeft = <AnchorPredicateMetric>conditionLeft;
        const metricConditionRight = <AnchorPredicateMetric>conditionRight;
        return metricConditionLeft.conditionMin === metricConditionRight.conditionMin
          && metricConditionLeft.conditionMax === metricConditionRight.conditionMax;
      } else if (this.isEnumCondition(conditionLeft)) {
        return (<AnchorPredicateEnum>conditionLeft).category === (<AnchorPredicateEnum>conditionRight).category;
      } else {
        console.log('unhandled column type: ' + conditionLeft.columnType);
        // TODO handle error
      }
    }

    return false;
  }

  private isMetricCondition(condition: AnchorPredicate): boolean {
    return condition.columnType === 'metric';
  }

  private isEnumCondition(condition: AnchorPredicate): boolean {
    return condition.columnType === 'string';
  }

  private pickGradientHex(weight, topOrBottom: number) {
    if (!weight) {
      return 0;
    }
    const w1 = weight;
    const w2 = 1 - w1;
    // return this.rgbToHex(Math.round(this.color1[0] * w1 + this.color2[0] * w2),
    //   Math.round(this.color1[1] * w1 + this.color2[1] * w2),
    //   Math.round(this.color1[2] * w1 + this.color2[2] * w2));
    return this.rgbToHex(255, 255, 255);
  }

  private rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  private componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * Finds the index in which the floating number differs even if the pre dot value is not the same.
   *
   * @param left
   * @param right
   */
  private round(left: number, right: number): number {
    const truncedLeft = Math.trunc(left);
    const truncedRight = Math.trunc(right);
    if (truncedLeft === left && truncedRight === right) {
      // not a floating number
      return 0;
    } else if (truncedLeft === left || truncedRight === right) {
      // just one value is floating
      return 1;
    }

    const truncToFixedMax = 20;
    const leftZero = (left - truncedLeft).toFixed(truncToFixedMax);
    const rightZero = (right - truncedRight).toFixed(truncToFixedMax);

    for (let i = 0; i < leftZero.length; i++) {
      if (leftZero.charAt(i) !== rightZero.charAt(i)) {
        return i;
      }
    }

    return truncToFixedMax;
  }

  ngOnInit() {
  }

}
