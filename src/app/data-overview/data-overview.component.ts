import {Component, OnInit} from '@angular/core';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {ColumnInfo} from '../_models/ColumnInfo';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  constructor(private _h2oApi: H2oApiService) {
  }

  connectionInfo: ConnectionInfo;

  columns: ColumnInfo[];

  ngOnInit() {
  }

  selectedConnection(event) {
    this.connectionInfo = event;
    this._h2oApi
      .getDataFrame(this.connectionInfo.server, this.connectionInfo.frame.frame_id as string)
      .subscribe(data => {
        this.columns = JSON.parse(data);
      });
  }

}
