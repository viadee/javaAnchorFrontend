import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {Model} from '../_models/Model';
import {DataFrame} from '../_models/DataFrame';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss']
})
export class SelectModelComponent implements OnInit {

  paramServer;
  paramModelId;
  paramFrameId;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _h2oApi: H2oApiService,
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

  modelForm: FormGroup;

  servers: String[] = [];
  private _models: Model[];
  private _frames: DataFrame[];

  private modelsLoaded: boolean;
  private framesLoaded: boolean;

  @Output() connectionInfo = new EventEmitter<ConnectionInfo>();

  ngOnInit() {
    this.servers.push('local-H2O');

    this.modelForm = new FormGroup({
      server: new FormControl(this.paramServer),
      model: new FormControl({value: '', disabled: true}),
      frame: new FormControl({value: '', disabled: true})
    });

    if (this.paramServer !== undefined && this.paramServer !== null) {
      // this.loadModels();
      // this.loadFrames();
      this.loadModelsAndFrames(null);
    }
  }

  public loadModelsAndFrames(event) {
    this.models = null;
    this.frames = null;
    this.modelsLoaded = false;
    this.framesLoaded = false;

    this._spinner.show();
    this._h2oApi.tryConnect(this.getServer()).subscribe((canConnect: any) => {
      if (JSON.parse(canConnect)['can_connect'] === true) {
        this.loadModels();
        this.loadFrames();
      } else {
        // failed to connect to server
        this._spinner.hide();
        // TODO fehler anzeigen
      }
    });
  }

  public modelSelectionChanged(event) {
    if (this.frames.includes(this.getModel().data_frame)) {
      this.setFrame(this.getModel().data_frame);
    }
  }

  public loadModels() {
    this._h2oApi
      .getModels(this.getServer()).subscribe((data) => {
      this.models = JSON.parse(data);
      if (this.models == null) {
        const no_models_available = new Model(null, 'no models available', null, null);
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
      this._spinner.hide();
    });
  }

  public loadFrames() {
    this._h2oApi
      .getDataFrames(this.getServer()).subscribe((data) => {
      this.frames = JSON.parse(data);
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
