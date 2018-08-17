import {Component, OnInit} from '@angular/core';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {ColumnInfo} from '../_models/ColumnInfo';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-model-frame-overview',
  templateUrl: './model-frame-overview.component.html',
  styleUrls: ['./model-frame-overview.component.scss']
})
export class ModelFrameOverviewComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _h2oApi: H2oApiService) {

    _route.queryParams.subscribe(params => {
      if (params !== undefined && params.hasOwnProperty('server') && params.hasOwnProperty('model_id')
        && params.hasOwnProperty('frame_id')) {
        this.selectedConnection(new ConnectionInfo(params.server, params.model_id, params.frame_id));
      }
    });

  }

  connectionInfo: ConnectionInfo;

  columns: ColumnInfo[];

  ngOnInit() {
  }

  selectedConnection(event) {
    this.connectionInfo = event;
    this._h2oApi
      .getDataFrame(this.connectionInfo.server, this.connectionInfo.frameId)
      .subscribe(data => {
        this.columns = JSON.parse(data);
      });
  }

}
