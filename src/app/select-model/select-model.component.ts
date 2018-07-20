import {Component, OnInit} from '@angular/core';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';


export interface DataFrame {
  id: String;
  name: String;
  url: String;
}


export interface Model {
  id: String;
  name: String;
  url: String;
  data_frame: DataFrame[];
}


@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.css']
})
export class SelectModelComponent implements OnInit {

  constructor(private h2oApi: H2oApiService) {
  }

  h2oInstances: String[] = [];
  selectedInstance: string;
  models: Model[];
  frames: DataFrame[];

  ngOnInit() {
    this.h2oInstances.push('http://localhost:54321');
    this.h2oInstances.push('http://192.168.42.28:54321');
  }

  public loadModelsAndFrames(event) {
    this.selectedInstance = event;
    this.models = null;
    this.frames = null;

    const tryC = this.h2oApi.tryConnect(event).subscribe((canConnect: any) => {
      if (JSON.parse(canConnect)['can_connect'] === true) {
        this.getModels();
        this.getFrames();
      } else {
        // TODO fehler anzeigen
      }
    });
  }

  public getModels() {
    this.h2oApi.getModels(this.selectedInstance).subscribe((data: any) => {
      this.models = JSON.parse(data['models']) as Model[];
      console.log(this.models);
    });
  }

  public getFrames() {
    this.h2oApi.getDataFrames(this.selectedInstance).subscribe((data: any) => {
      this.frames = JSON.parse(data['frames']) as DataFrame[];
      console.log(this.frames);
    });
  }

}
