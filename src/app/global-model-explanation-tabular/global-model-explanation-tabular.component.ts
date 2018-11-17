import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {NgxSpinnerService} from 'ngx-spinner';
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

  anchors: Anchor[];

  anchorFeatures: FeatureCondition[];

  globalAnchorTable: Array<Array<number>> = null;

  rowRange: Array<number>;

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _globals: GlobalVariablesComponent,
              private _spinner: NgxSpinnerService
  ) {
    this._globals.checkQueryParams(route, (conn) => {
      if (conn !== null) {
        this.anchors = this._globals.getAnchors();
        this.computeTable();
      } else {
        this._router.navigate(['/model-frame-overview']);
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  private computeTable(): void {
    if (!this.anchors) {
      return;
    }
    this.computeColumns();
    console.log("computed columns: " + JSON.stringify(this.anchorFeatures, null, 2));

    console.log("anchors length: " + this.anchors.length);
    for (let rowIndex = 0; rowIndex < this.anchors.length; rowIndex++) {
      console.log("rowIndex: " + rowIndex + "; anchorsLength: " + this.anchors.length + "; is lower: " + (rowIndex < this.anchors.length));
      const anchor = this.anchors[rowIndex];

      const metricKeys = Object.keys(anchor.metricAnchor);
      const enumKeys = Object.keys(anchor.enumAnchor);
      console.log("metricKeys: " + JSON.stringify(metricKeys, null, 2));
      console.log("enumKeys: " + JSON.stringify(enumKeys, null, 2));
      for (let columnIndex = 0; columnIndex < this.anchorFeatures.length; columnIndex++) {
        const header = this.anchorFeatures[columnIndex];
        console.log("header: " + JSON.stringify(header, null, 2));

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
      console.log("global anchor: " + JSON.stringify(this.globalAnchorTable, null, 2));
    }

    this.rowRange = new Array<number>(this.globalAnchorTable.length);
    for (let i = 0; i < this.rowRange.length; i++) {
      this.rowRange[i] = i;
    }
    console.log("row range: " + JSON.stringify(this.rowRange));
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

  private computeColumns(): void {
    this.anchorFeatures = [];
    if (!this.anchors) {
      return;
    }
    for (const anchor of this.anchors) {
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
    if (!
      this.containsFeatureCondition(this.anchorFeatures, condition)
    ) {
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
      switch (conditionLeft.columnType) {
        case 'metric':
          const metricCondictionLeft = <FeatureConditionMetric>conditionLeft;
          const metricCondictionRight = <FeatureConditionMetric>conditionRight;
          return metricCondictionLeft.conditionMin === metricCondictionRight.conditionMin
            && metricCondictionLeft.conditionMax === metricCondictionRight.conditionMax;
        case 'string':
          return (<FeatureConditionEnum>conditionLeft).category === (<FeatureConditionEnum>conditionRight).category;
      }
    }

    return false;
  }

  ngOnInit() {
  }

}
