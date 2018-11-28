import {Component, Input, OnInit} from '@angular/core';
import {Anchor} from '../_models/Anchor';
import {FeatureConditionMetric} from '../_models/FeatureConditionMetric';
import {FeatureCondition} from '../_models/FeatureCondition';
import {FeatureConditionEnum} from '../_models/FeatureConditionEnum';

@Component({
  selector: 'app-global-model-explanation-tabular',
  templateUrl: './global-model-explanation-tabular.component.html',
  styleUrls: ['./global-model-explanation-tabular.component.scss']
})
export class GlobalModelExplanationTabularComponent implements OnInit {

  anchorFeatures: FeatureCondition[];

  globalAnchorTable: Array<Array<number>> = null;

  rowRange: Array<number>;

  constructor() {
  }

  @Input()
  set anchors(anchors: Anchor[]) {
    this.computeTable(anchors);
  }

  private computeTable(anchors: Anchor[]): void {
    if (!anchors) {
      return;
    }
    this.computeColumns(anchors);
    this.globalAnchorTable = null;

    for (let rowIndex = 0; rowIndex < anchors.length; rowIndex++) {
      const anchor = anchors[rowIndex];

      const metricKeys = Object.keys(anchor.metricAnchor);
      const enumKeys = Object.keys(anchor.enumAnchor);
      for (let columnIndex = 0; columnIndex < this.anchorFeatures.length; columnIndex++) {
        const header = this.anchorFeatures[columnIndex];

        for (let index = 0; index < metricKeys.length; index++) {
          const key = metricKeys[index];
          if (this.isSameFeatureCondition(header, anchor.metricAnchor[key])) {
            this.addToTable(rowIndex, columnIndex);
          }
        }
        for (let index = 0; index < enumKeys.length; index++) {
          const key = enumKeys[index];
          if (this.isSameFeatureCondition(header, anchor.enumAnchor[key])) {
            this.addToTable(rowIndex, columnIndex);
          }
        }
      }
    }

    this.rowRange = new Array<number>(this.globalAnchorTable.length);
    for (let i = 0; i < this.rowRange.length; i++) {
      this.rowRange[i] = i;
    }
  }

  getFeatureConditionTitle(condition: FeatureCondition): string {
    if (this.isMetricCondition(condition)) {
      const metricCon = <FeatureConditionMetric> condition;
      return '(' + metricCon.conditionMin + ', ' + metricCon.conditionMax + ')';
    } else if (this.isEnumCondition(condition)) {
      return (<FeatureConditionEnum> condition).category;
    } else {
      console.log('unhandled column type: ' + condition.columnType);
      // TODO throw error
    }
  }

  private addToTable(row: number, column: number): void {
    if (this.globalAnchorTable === null) {
      this.globalAnchorTable = [];
    }
    let rowData: Array<number>;
    if (!this.globalAnchorTable[row]) {
      this.globalAnchorTable[row] = new Array<number>(this.anchorFeatures.length);
    }
    rowData = this.globalAnchorTable[row];
    let cell = rowData[column];
    if (!cell) {
      cell = 0;
    }
    cell++;
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

  ngOnInit() {
  }

}
