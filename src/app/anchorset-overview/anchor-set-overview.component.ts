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
  server: string;
  model_id: string;
  frame_id: string;

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

    route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.server = value.server;
        this.model_id = value.model_id;
        this.frame_id = value.frame_id;
        this.conn = new ConnectionInfo(this.server, this.model_id, this.frame_id);
        if (!this.conn.equals(this._globals.getConnection())) {
          this._globals.updateConnectionInfo(this.conn);
        }

        if (this._globals.getAnchors() !== null) {
          this.updateAnchorsList();
        }

        if (this._globals.getFrameSummary() === null) {
          this._frameApi.getFrameSummary(this.server, this.frame_id).subscribe(response => {
            this.frameSummary = response;
            this._globals.setFrameSummary(this.frameSummary);
          });
        } else {
          this.frameSummary = this._globals.getFrameSummary();
        }

        if (this._globals.getColumnConditions() !== null) {
          this.columnConditions = this._globals.getColumnConditions();
        } else {
          this._frameColumnApi.getCaseSelectConditions(this.server, this.model_id, this.frame_id).subscribe(response => {
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

  public requestAnalyzation(selectConditions: FeatureConditionRequest) {
    this._spinner.show();
    this._anchorApi.getRandomAnchor(this.server, this.model_id, this.frame_id, selectConditions)
      .subscribe((response: Anchor) => {
        this._spinner.hide();
        const anchor = response;
        if (anchor === null) {
          // TODO handle no anchor from server
          return;
        }

        // TODO umformen (names gelöscht)
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
    if (anchor.metricAnchor === undefined || anchor.metricAnchor === null) {
      anchor.metricAnchor = {};
    }
    if (anchor.enumAnchor === undefined || anchor.enumAnchor === null) {
      anchor.enumAnchor = {};
    }
    const metricKeys: string[] = Object.keys(anchor.metricAnchor);
    const enumKeys: string[] = Object.keys(anchor.enumAnchor);

    const anchorSize = metricKeys.length + enumKeys.length;
    const anchorExpl = new Array<String>(anchorSize);
    for (let i = 0; i < anchorSize; i++) {
      let anchorString;
      if (enumKeys[i] !== undefined && anchor.enumAnchor.hasOwnProperty(enumKeys[i])) {
        let condition = anchor.enumAnchor[enumKeys[i]];
        anchorString = condition.featureName + " = " + condition.category;
      } else {
        let condition = anchor.metricAnchor[metricKeys[i]];
        anchorString = condition.featureName + " = Range(" + condition.conditionMin +
          ", " + condition.conditionMax + ")";
      }
      anchorExpl.push(anchorString);
    }
    return new CompressedAnchor(anchor.coverage, anchorExpl, anchor.precision, anchor.prediction, anchor.affected_rows);
  }

}


class CompressedAnchor {
  coverage: number;
  anchor: String[];
  precision: number;
  prediction: any;
  affected_rows: number;

  constructor(coverage: number, anchor: String[], precision: number, prediction: any, affected_rows: number) {
    this.coverage = coverage;
    this.anchor = anchor;
    this.precision = precision;
    this.prediction = prediction;
    this.affected_rows = affected_rows;
  }
}
