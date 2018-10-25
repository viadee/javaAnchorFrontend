import {Component, OnInit} from '@angular/core';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {ActivatedRoute} from '@angular/router';
import {FrameSummary} from '../_models/FrameSummary';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-model-frame-overview',
  templateUrl: './model-frame-overview.component.html',
  styleUrls: ['./model-frame-overview.component.scss']
})
export class ModelFrameOverviewComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _h2oApi: H2oApiService,
              private _globals: GlobalVariablesComponent,
              private _spinner: NgxSpinnerService) {

    _route.queryParams.subscribe(params => {
      if (params !== undefined && params.hasOwnProperty('server') && params.hasOwnProperty('model_id')
        && params.hasOwnProperty('frame_id')) {
        this.selectedConnection(new ConnectionInfo(params.server, params.model_id, params.frame_id));
      }
    });

  }

  connectionInfo: ConnectionInfo;

  frameSummary: FrameSummary;

  ngOnInit() {
  }

  selectedConnection(event) {
    this._spinner.show();
    this.connectionInfo = event;
    this._h2oApi
      .getDataFrame(this.connectionInfo.server, this.connectionInfo.frameId)
      .subscribe(response => {
        this.frameSummary = response;
        this._globals.setFrameSummary(this.frameSummary);

        this._spinner.hide();
      }, (err) => {
        console.log(err.message);
        this._spinner.hide();
      });
  }

}
