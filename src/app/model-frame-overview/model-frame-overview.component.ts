import {Component, OnInit} from '@angular/core';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {ColumnInfo} from '../_models/ColumnInfo';

@Component({
  selector: 'app-model-frame-overview',
  templateUrl: './model-frame-overview.component.html',
  styleUrls: ['./model-frame-overview.component.scss']
})
export class ModelFrameOverviewComponent implements OnInit {

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
  //
  // public onSubmit() {
  //   const extras: NavigationExtras = {
  //     queryParams: {'connection-info': this.connectionInfo}
  //   };
  //   this.router.navigate(['/model-frame-overview'], extras);
  // }

}
