import {Component, OnInit} from '@angular/core';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {ActivatedRoute} from '@angular/router';
import {FrameSummary} from '../_models/FrameSummary';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {FrameApiService} from '../_service/frame-api.service';

@Component({
  selector: 'app-model-frame-overview',
  templateUrl: './model-frame-overview.component.html',
  styleUrls: ['./model-frame-overview.component.scss']
})
export class ModelFrameOverviewComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _frameApi: FrameApiService,
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
    this._frameApi
      .getFrameSummary(this.connectionInfo.server, this.connectionInfo.frameId)
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
