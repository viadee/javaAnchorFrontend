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

  private computeTable() {
    this.computeColumns();

    for (let rowIndex = 0; rowIndex < this.anchors.length; rowIndex++) {
      const anchor = this.anchors[rowIndex];

      const metricKeys = Object.keys(anchor.metricAnchor);
      const enumKeys = Object.keys(anchor.enumAnchor);
      this.anchorFeatures.forEach((header, columnIndex) => {
        metricKeys.forEach((key) => {
          if (this.isSameFeatureCondition(header, anchor.metricAnchor[key])) {
            this.addToTable(rowIndex, columnIndex);
            rowIndex++;
          }
        });
        enumKeys.forEach((key) => {
          if (this.isSameFeatureCondition(header, anchor.enumAnchor[key])) {
            this.addToTable(rowIndex, columnIndex);
            rowIndex++;
          }
        });
      });
    }

    this.rowRange = [this.globalAnchorTable.length];
    for (let i = 0; i < this.rowRange.length; i++) {
      this.rowRange  [i] = i;
    }
  }

  private addToTable(row: number, column: number) {
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

  private computeColumns() {
    this.anchorFeatures = [];
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

  private isSameFeatureCondition(conditionLeft: FeatureCondition, conditionRight: FeatureCondition) {
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
