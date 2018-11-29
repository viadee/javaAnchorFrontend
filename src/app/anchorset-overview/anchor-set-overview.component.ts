import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Anchor} from '../_models/Anchor';
import {ListRenderComponent} from '../_helpers/list-render.component';
import {LocalDataSource} from 'ng2-smart-table';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {FrameSummary} from '../_models/FrameSummary';
import {NgxSpinnerService} from 'ngx-spinner';
import {FeatureConditionResponse} from '../_models/FeatureConditionResponse';
import {FeatureConditionRequest} from '../_models/FeatureConditionRequest';
import {FrameApiService} from '../_service/frame-api.service';
import {FrameColumnApiService} from '../_service/frame-column-api.service';
import {AnchorApiService} from '../_service/anchor-api.service';
import {ConnectionInfo} from '../_models/ConnectionInfo';

@Component({
  selector: 'app-anchorset-overview',
  templateUrl: './anchor-set-overview.component.html',
  styleUrls: ['./anchor-set-overview.component.scss']
})
export class AnchorSetOverviewComponent implements OnInit {

  conn: ConnectionInfo;

  frameSummary: FrameSummary;

  columnConditions: FeatureConditionResponse;

  public source: LocalDataSource;

  settings = {
    columns: {
      prediction: {
        title: 'Prediction'
      },
      precision: {
        title: 'Precision'
      },
      coverage: {
        title: 'Coverage'
      },
      affected_rows: {
        title: 'Cases'
      },
      anchor: {
        title: 'Anchor',
        filter: false,
        type: 'custom',
        renderComponent: ListRenderComponent,
      },
      conditions: {
        title: 'Instance conditions',
        filter: false,
        type: 'custom',
        renderComponent: ListRenderComponent,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    attr: {
      class: 'table table-striped table-hover'
    },
  };

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _frameApi: FrameApiService,
              private _frameColumnApi: FrameColumnApiService,
              private _anchorApi: AnchorApiService,
              private _globals: GlobalVariablesComponent,
              private _spinner: NgxSpinnerService) {
    this.source = new LocalDataSource();


    this._globals.checkQueryParams(route, (conn) => {
      if (conn !== null) {
        this.conn = conn;
        if (this._globals.getAnchors() !== null) {
          this.updateAnchorsList();
        }

        if (this._globals.getFrameSummary() === null) {
          this._frameApi.getFrameSummary(this.conn.server, this.conn.frameId).subscribe(response => {
            this.frameSummary = response;
            this._globals.setFrameSummary(this.frameSummary);
          });
        } else {
          this.frameSummary = this._globals.getFrameSummary();
        }

        if (this._globals.getColumnConditions() !== null) {
          this.columnConditions = this._globals.getColumnConditions();
        } else {
          this._frameColumnApi.getCaseSelectConditions(this.conn.server, this.conn.modelId, this.conn.frameId)
            .subscribe(response => {
              this.columnConditions = response;
              this._globals.setColumnConditions(this.columnConditions);
            });
        }
      } else {
        this._router.navigate(['/model-frame-overview']);
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
  }

  public requestAnalysis(selectConditions: FeatureConditionRequest) {
    this._spinner.show();
    this._anchorApi.computeRule(this.conn.server, this.conn.modelId, this.conn.frameId, selectConditions)
      .subscribe((response: Anchor) => {
        this._spinner.hide();
        const anchor = response;
        if (anchor === null) {
          // TODO handle no anchor from server
          return;
        }

        anchor.condition = selectConditions;
        this._globals.addAnchor(anchor);
        this.updateAnchorsList();
      }, (err) => {
        console.log('failed to generate anchor: ' + err.message);
        this._spinner.hide();
      });
  }

  private updateAnchorsList() {
    this.source.load(this.transformAnchors(this._globals.getAnchors()));
  }

  private transformAnchors(anchors: Anchor[]): CompressedAnchor[] {
    const transformedAnchors = new Array<CompressedAnchor>(anchors.length);
    for (let i = 0; i < anchors.length; i++) {
      transformedAnchors[i] = this.transformAnchor(anchors[i]);
    }

    return transformedAnchors;
  }

  private transformAnchor(anchor: Anchor): CompressedAnchor {
    if (!anchor.metricPredicate) {
      anchor.metricPredicate = {};
    }
    if (!anchor.enumPredicate) {
      anchor.enumPredicate = {};
    }
    const metricKeys: string[] = Object.keys(anchor.metricPredicate);
    const enumKeys: string[] = Object.keys(anchor.enumPredicate);

    const anchorSize = metricKeys.length + enumKeys.length;
    const anchorExpl = new Array<String>(anchorSize);
    for (let i = 0; i < enumKeys.length; i++) {
      if (enumKeys[i] !== undefined && anchor.enumPredicate.hasOwnProperty(enumKeys[i])) {
        const condition = anchor.enumPredicate[enumKeys[i]];
        anchorExpl.push(condition.featureName + ' = ' + condition.category);
      }
    }
    for (let i = 0; i < metricKeys.length; i++) {
      if (metricKeys[i] !== undefined && anchor.metricPredicate.hasOwnProperty(metricKeys[i])) {
        const condition = anchor.metricPredicate[metricKeys[i]];
        anchorExpl.push(condition.featureName + ' = (' + condition.conditionMin +
          ', ' + condition.conditionMax + ')');
      }
    }

    const enumConditions = anchor.condition.enumConditions;
    const enumConditionKeys = Object.keys(enumConditions);
    const metricConditions = anchor.condition.metricConditions;
    const metricConditionKeys = Object.keys(metricConditions);
    const conditionLength = enumConditionKeys.length + metricConditionKeys.length;

    const conditions = new Array<string>(conditionLength);
    for (const key of enumConditionKeys) {
      conditions.push(key + ' = ' + enumConditions[key].category);
    }
    for (const key of metricConditionKeys) {
      const metricCondition = metricConditions[key];
      conditions.push(key + ' = (' + metricCondition.conditionMin + ', ' + metricCondition.conditionMax + ')');
    }

    return new CompressedAnchor(anchor.coverage, anchorExpl, anchor.precision, anchor.prediction, anchor.affected_rows,
      conditions);
  }

}


class CompressedAnchor {
  coverage: number;
  anchor: String[];
  precision: number;
  prediction: any;
  affected_rows: number;
  conditions: string[];

  constructor(coverage: number, anchor: String[], precision: number, prediction: any, affected_rows: number, conditions: string[]) {
    this.coverage = coverage;
    this.anchor = anchor;
    this.precision = precision;
    this.prediction = prediction;
    this.affected_rows = affected_rows;
    this.conditions = conditions;
  }
}
