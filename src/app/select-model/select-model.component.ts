import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Model} from '../_models/Model';
import {DataFrame} from '../_models/DataFrame';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ClusterApiService} from '../_service/cluster-api.service';
import {ModelApiService} from '../_service/model-api.service';
import {FrameApiService} from '../_service/frame-api.service';


@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss']
})
export class SelectModelComponent implements OnInit {

  paramServer;
  paramModelId;
  paramFrameId;

  modelForm: FormGroup;

  servers: Array<string> = [];
  private _models: Model[];
  private _frames: DataFrame[];

  private modelsLoaded: boolean;
  private framesLoaded: boolean;

  private modelFrameList: Array<Object>;

  @Output() connectionInfo = new EventEmitter<ConnectionInfo>();

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _clusterApi: ClusterApiService,
              private _modelApi: ModelApiService,
              private _frameApi: FrameApiService,
              private _spinner: NgxSpinnerService) {
    _route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.paramServer = value.server;
        this.paramModelId = value.model_id;
        this.paramFrameId = value.frame_id;
      } else {
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
    this.loadConnectionNames();
    this.modelForm = new FormGroup({
      server: new FormControl(this.paramServer),
      model: new FormControl({value: '', disabled: true}),
      frame: new FormControl({value: '', disabled: true})
    });
  }

  filterModelsAndFrames(event) {

  }

  loadConnectionNames() {
    this._spinner.show();
    this._clusterApi.getConnectionNames().subscribe((response) => {
      this._spinner.hide();

      if (response !== undefined && response !== null) {
        this.servers = response.connectionNames;

        if (this.paramServer !== undefined && this.paramServer !== null) {
          this.loadModelsAndFrames(null);
        }
      }
    }, err => {
      console.log('Error: ' + err.message);
    });
  }

  public loadModelsAndFrames(event) {
    this.models = null;
    this.frames = null;
    this.modelsLoaded = false;
    this.framesLoaded = false;

    this._spinner.show();
    this._clusterApi.tryConnect(this.getServer()).subscribe((response) => {
      if (response.can_connect === true) {
        this.loadModels();
        this.loadFrames();
      } else {
        // failed to connect to server
        this._spinner.hide();
        // TODO fehler anzeigen
      }
    });
  }

  private updateModelFrameDropDown() {
    this.modelFrameList = [];
    for (let model of this._models) {
      let first = false;
      for (let frame of model.compatibleFrames) {
        if (!first) {
          this.modelFrameList.push(model);
        }
        this.modelFrameList.push(frame);
      }
    }
  }

  public modelSelectionChanged(event) {
    if (this.frames.includes(this.getModel().data_frame)) {
      this.setFrame(this.getModel().data_frame);
    }
  }

  public loadModels() {
    this._modelApi
      .getModels(this.getServer()).subscribe((response) => {
      this.models = response;
      if (this.models == null) {
        const no_models_available = new Model(null, 'no models available', null, null, null, null);
        this.models = [no_models_available];
      } else {
        this.modelForm.controls.model.enable();
        if (this.paramModelId !== undefined) {
          for (const model of this.models) {
            if (model.model_id === this.paramModelId) {
              this.setModel(model);
            }
          }
        }
      }
      this.modelsLoaded = true;
      this.checkLoadedData();
    }, (err) => {
      console.log('Error: ' + err.message);
      this._spinner.hide();
    });
  }

  public loadFrames() {
    this._frameApi.getFrames(this.getServer()).subscribe((response) => {
      this.frames = response;
      if (this.frames == null) {
        const no_frame_available = new DataFrame(null, 'no models available', null);
        this.frames = [no_frame_available];
      } else {
        this.modelForm.controls.frame.enable();
        if (this.paramFrameId !== null) {
          for (const frame of this.frames) {
            if (frame.frame_id === this.paramFrameId) {
              this.setFrame(frame);
            }
          }
        }
      }
      this.framesLoaded = true;
      this.checkLoadedData();
    }, (err) => {
      console.log('Error: ' + err.message);
      this._spinner.hide();
    });
  }

  private checkLoadedData() {
    if (this.framesLoaded && this.modelsLoaded) {
      this._spinner.hide();
    }
  }

  get models() {
    return this._models;
  }

  set models(models: Model[]) {
    this._models = models;
    if (models === undefined || models === null) {
      if (this.modelForm !== undefined && this.modelForm !== null) {
        this.modelForm.controls.model.disable();
      }
    }
  }

  get frames() {
    return this._frames;
  }

  set frames(frames: DataFrame[]) {
    this._frames = frames;
    if (frames === undefined || frames === null) {
      if (this.modelForm !== undefined && this.modelForm !== null) {
        this.modelForm.controls.frame.disable();
      }
    }
  }

  private getServer() {
    return this.modelForm.controls.server.value;
  }

  private getModel() {
    return this.modelForm.controls.model.value;
  }

  private setModel(model: Model) {
    this.modelForm.controls.model.setValue(model, {onlySelf: true});
  }

  private getFrame() {
    return this.modelForm.controls.frame.value;
  }

  private setFrame(frame: DataFrame) {
    this.modelForm.controls.frame.setValue(frame, {onlySelf: true});
  }

}
