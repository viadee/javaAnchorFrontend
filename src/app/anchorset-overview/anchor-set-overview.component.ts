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

@Component({
  selector: 'app-anchorset-overview',
  templateUrl: './anchor-set-overview.component.html',
  styleUrls: ['./anchor-set-overview.component.scss']
})
export class AnchorSetOverviewComponent implements OnInit {

  server: string;
  model_id: string;
  frame_id: string;

  frameSummary: FrameSummary;

  columnConditions: FeatureConditionResponse;

  anchors: Array<Anchor> = [];

  public source: LocalDataSource;

  settings = {
    columns: {
      label_of_case: {
        title: 'Label'
      },
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
      instance: {
        title: 'Instance',
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

        if (this._globals.getFrameSummary() === null) {
          this._frameApi.getFrameSummary(this.server, this.frame_id).subscribe(response => {
            this.frameSummary = response;
            this._globals.setFrameSummary(this.frameSummary);
          });
        }

        this._frameColumnApi.getCaseSelectConditions(this.server, this.model_id, this.frame_id).subscribe(response => {
          this.columnConditions = response;
        });
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
        this.anchors.push(anchor);
        this._globals.addAnchor(anchor);

        this.source.load(this.anchors);
      }, (err) => {
        console.log('failed to generate anchor: ' + err.message);
        this._spinner.hide();
      });
  }

}
