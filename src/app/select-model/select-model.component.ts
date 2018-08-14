import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {Model} from '../_models/Model';
import {DataFrame} from '../_models/DataFrame';
import {ConnectionInfo} from '../_models/ConnectionInfo';


@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss']
})
export class SelectModelComponent implements OnInit {

  constructor(private _h2oApi: H2oApiService) {
  }

  h2oInstances: String[] = [];
  selectedInstance: string;

  models: Model[];
  selectedModel: Model;

  frames: DataFrame[];
  selectedFrame: DataFrame;

  @Output() connectionInfo = new EventEmitter<ConnectionInfo>();

  ngOnInit() {
    this.h2oInstances.push('local');
    this.h2oInstances.push('local-H2O');
    this.h2oInstances.push('http://192.168.42.28:54321');
  }

  public loadModelsAndFrames(event) {
    this.models = null;
    this.frames = null;

    this._h2oApi.tryConnect(this.selectedInstance).subscribe((canConnect: any) => {
      if (JSON.parse(canConnect)['can_connect'] === true) {
        this.getModels();
        this.getFrames();
      } else {
        // TODO fehler anzeigen
      }
    });
  }

  public getModels() {
    this._h2oApi
      .getModels(this.selectedInstance).subscribe((data) => {
      this.models = JSON.parse(data);
      if (this.models == null) {
        const no_models_available = new Model(null, 'no models available', null, null);
        this.models = [no_models_available];
      }
    });
  }

  public getFrames() {
    this._h2oApi
      .getDataFrames(this.selectedInstance).subscribe((data) => {
      this.frames = JSON.parse(data);
      if (this.frames == null) {
        const no_frame_available = new DataFrame(null, 'no models available', null);
        this.frames = [no_frame_available];
      }
    });
  }

  public onSubmit() {
    this.connectionInfo.emit(new ConnectionInfo(this.selectedInstance, this.selectedModel, this.selectedFrame));
  }

}
