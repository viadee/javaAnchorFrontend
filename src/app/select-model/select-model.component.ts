import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Model} from '../_models/Model';
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

  private paramServer;

  modelForm: FormGroup;

  servers: Array<string> = [];
  private _models: Model[];

  filteredModels: Model[];

  @Output() connectionInfo = new EventEmitter<ConnectionInfo>();

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _clusterApi: ClusterApiService,
              private _modelApi: ModelApiService,
              private _frameApi: FrameApiService,
              private _spinner: NgxSpinnerService) {
    _route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server')) {
        this.paramServer = value.server;
      } else {
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
    this.loadConnectionNames();
    this.modelForm = new FormGroup({
      server: new FormControl(this.paramServer),
      frameFilter: new FormControl(),
    });
  }

  loadConnectionNames() {
    this._spinner.show();
    this._clusterApi.getConnectionNames().subscribe((response) => {
      this._spinner.hide();

      if (response !== undefined && response !== null) {
        this.servers = response.connectionNames;

        if (this.paramServer !== undefined && this.paramServer !== null) {
          this.tryConnectAndLoadModels(null);
        }
      }
    }, this.onServerError);
  }

  private filterFramesInModels(event) {
    if (this.models === undefined || this.models === null) {
      return;
    }

    // Deep copy
    this.filteredModels = JSON.parse(JSON.stringify(this.models));
    if (this.getFrameFilter() === undefined || this.getFrameFilter() === null || this.getFrameFilter().trim().length <= 0) {
      return;
    }

    const frameFilter = this.getFrameFilter();
    for (const model of this.filteredModels) {
      model.compatibleFrames = model.compatibleFrames.filter((frameName) => {
          return frameName.includes(frameFilter);
        });
    }
  }

  public tryConnectAndLoadModels(event) {
    this._router.navigate(['/index'], {queryParams: {server: this.getServer()}});
    this.models = null;

    this._spinner.show();
    this._clusterApi.tryConnect(this.getServer()).subscribe((response) => {
      if (response.can_connect === true) {
        this.loadModels();
      } else {
        // failed to connect to server
        this._spinner.hide();
        // TODO view error
      }
    }, this.onServerError);
  }

  public loadModels() {
    this._modelApi
      .getModels(this.getServer()).subscribe((response) => {
        response.push(new Model('id', 'name', 'url', null, ['frame'], []));
        response.push(new Model('id2', 'name2', 'url2', null, ['frame1', 'frame2', 'frame3'], []));
        this.models = response;
        if (this.models == null) {
          const no_models_available = new Model(null, 'no models available', null, null, null, null);
          this.models = [no_models_available];
        }
        this._spinner.hide();
    }, this.onServerError);
  }

  private onServerError(err) {
    // TODO view error
    console.log('Error: ' + err.message);
    this._spinner.hide();
  }

  get models() {
    return this._models;
  }

  set models(models: Model[]) {
    this._models = models;
    if (models === undefined || models === null) {
      if (this.modelForm !== undefined && this.modelForm !== null) {
        // this.modelForm.controls.model.disable();
        // TODO view error
      }
    }

    this.filterFramesInModels(null);
  }

  private getServer() {
    return this.modelForm.controls.server.value;
  }

  private getFrameFilter() {
    return this.modelForm.controls.frameFilter.value;
  }

  private setFrameFilter(filter: string) {
    this.modelForm.controls.model.setValue(filter, {onlySelf: true});
  }

}
