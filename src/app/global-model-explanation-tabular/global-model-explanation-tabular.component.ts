import {Component, Input, OnInit} from '@angular/core';
import {Anchor} from '../_models/Anchor';
import {FeatureConditionMetric} from '../_models/FeatureConditionMetric';
import {FeatureCondition} from '../_models/FeatureCondition';
import {FeatureConditionEnum} from '../_models/FeatureConditionEnum';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';

@Component({
  selector: 'app-global-model-explanation-tabular',
  templateUrl: './global-model-explanation-tabular.component.html',
  styleUrls: ['./global-model-explanation-tabular.component.scss']
})
export class GlobalModelExplanationTabularComponent implements OnInit {

  anchorFeatures: FeatureCondition[];

  globalAnchorTable: Array<Array<Array<any>>> = null;

  spResult: SubmodularPickResult;

  rowRange: Array<number>;

  predictions: Array<any>;

  coverage: Array<string>;

  precision: Array<string>;

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
    if (!anchors) {
      return;
    }
    anchors = anchors.sort((left, right) => this.compareAnchor(left, right));
    this.computeColumns(anchors);

    this.globalAnchorTable = null;
    this.predictions = [];
    this.coverage = [];
    this.precision = [];

    const topOrBottom = true;

    for (let rowIndex = 0; rowIndex < anchors.length; rowIndex++) {
      const anchor = anchors[rowIndex];
      this.predictions.push(anchor.prediction);

      const metricKeys = Object.keys(anchor.metricAnchor);
      const enumKeys = Object.keys(anchor.enumAnchor);
      for (let columnIndex = 0; columnIndex < this.anchorFeatures.length; columnIndex++) {
        const header = this.anchorFeatures[columnIndex];

        for (let index = 0; index < metricKeys.length; index++) {
          const key = metricKeys[index];
          if (this.isSameFeatureCondition(header, anchor.metricAnchor[key])) {
            this.addToTable(rowIndex, columnIndex, topOrBottom, anchor.metricAnchor[key].precision.toFixed(4));
          }
        }
        for (let index = 0; index < enumKeys.length; index++) {
          const key = enumKeys[index];
          if (this.isSameFeatureCondition(header, anchor.enumAnchor[key])) {
            this.addToTable(rowIndex, columnIndex, topOrBottom, anchor.enumAnchor[key].precision.toFixed(4));
          }
        }
      }

      this.coverage.push(anchor.coverage.toFixed(4));
      this.precision.push(anchor.precision.toFixed(4));
      // const row = this.globalAnchorTable[rowIndex];
      // row.push([anchor.coverage.toFixed(4), 0]);
      // row.push([anchor.precision.toFixed(4), 0]);
    }

    this.rowRange = new Array<number>(this.globalAnchorTable.length);
    for (let i = 0; i < this.rowRange.length; i++) {
      this.rowRange[i] = i;
    }
  }

  compareAnchor(left: Anchor, right: Anchor): number {
    return left.prediction < right.prediction ? -1 : left.prediction === right.prediction ? 0 : 1;
  }

  getFeatureConditionTitle(condition: FeatureCondition): string {
    if (this.isMetricCondition(condition)) {
      const metricCon = <FeatureConditionMetric>condition;
      return '(' + metricCon.conditionMin + ', ' + metricCon.conditionMax + ')';
    } else if (this.isEnumCondition(condition)) {
      return (<FeatureConditionEnum>condition).category;
    } else {
      console.log('unhandled column type: ' + condition.columnType);
      // TODO throw error
    }
  }

  private addToTable(row: number, column: number, topOrBottom: boolean, addedPrecision: number): void {
    if (this.globalAnchorTable === null) {
      this.globalAnchorTable = [];
    }
    let rowData: Array<Array<any>>;
    if (!this.globalAnchorTable[row]) {
      this.globalAnchorTable[row] = new Array<any>(this.anchorFeatures.length);
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
    this.anchorFeatures = [];
    if (!anchors) {
      return;
    }
    for (const anchor of anchors) {
      const metricKeys = Object.keys(anchor.metricAnchor);
      const enumKeys = Object.keys(anchor.enumAnchor);
      for (const key of metricKeys) {
        this.isInFeatureConditionList(anchor.metricAnchor[key]);
      }
      for (const key of enumKeys) {
        this.isInFeatureConditionList(anchor.enumAnchor[key]);
      }
    }
  }

  private isInFeatureConditionList(condition: FeatureCondition): void {
    if (!this.containsFeatureCondition(this.anchorFeatures, condition)) {
      this.anchorFeatures.push(condition);
    }
  }

  private containsFeatureCondition(conditions: Array<FeatureCondition>, condition: FeatureCondition): boolean {
    for (const conditionInList of conditions) {
      if (this.isSameFeatureCondition(condition, conditionInList)) {
        return true;
      }
    }

    return false;
  }

  private isSameFeatureCondition(conditionLeft: FeatureCondition, conditionRight: FeatureCondition): boolean {
    if (conditionLeft === null || conditionRight === null) {
      return false;
    }

    if (conditionLeft.columnType === conditionRight.columnType
      && conditionLeft.featureName === conditionRight.featureName) {
      if (this.isMetricCondition(conditionLeft)) {
        const metricConditionLeft = <FeatureConditionMetric>conditionLeft;
        const metricConditionRight = <FeatureConditionMetric>conditionRight;
        return metricConditionLeft.conditionMin === metricConditionRight.conditionMin
          && metricConditionLeft.conditionMax === metricConditionRight.conditionMax;
      } else if (this.isEnumCondition(conditionLeft)) {
        return (<FeatureConditionEnum>conditionLeft).category === (<FeatureConditionEnum>conditionRight).category;
      } else {
        console.log('unhandled column type: ' + conditionLeft.columnType);
        // TODO handle error
      }
    }

    return false;
  }

  private isMetricCondition(condition: FeatureCondition): boolean {
    return condition.columnType === 'metric';
  }

  private isEnumCondition(condition: FeatureCondition): boolean {
    return condition.columnType === 'string';
  }

  color1 = [255, 23, 62];
  color2 = [32, 44, 179];

  private pickGradientHex(weight, topOrBottom: boolean) {
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
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  private componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  ngOnInit() {
  }

}
