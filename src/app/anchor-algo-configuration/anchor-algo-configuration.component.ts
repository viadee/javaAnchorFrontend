import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnchorApiService} from '../_service/anchor-api.service';
import {AnchorConfigDescription, ConfigInputType} from '../_models/AnchorConfigDescription';

@Component({
  selector: 'app-anchor-algo-configuration',
  templateUrl: './anchor-algo-configuration.component.html',
  styleUrls: ['./anchor-algo-configuration.component.scss']
})
export class AnchorAlgoConfigurationComponent implements OnInit {

  anchorConfig: Array<AnchorConfigDescription>;

  @Output() onConfigChange = new EventEmitter<Array<AnchorConfigDescription>>();

  constructor(
    private _anchorApi: AnchorApiService,
  ) {
    this._anchorApi.getAnchorConfigs().subscribe((result) => {
      if (!result) {
        console.log('anchors config is ' + result);
      }
      this.anchorConfig = result;
      this.onConfigChange.emit(this.anchorConfig);
    });
  }

  isConfigNumber(config: AnchorConfigDescription): boolean {
    return config.inputType === ConfigInputType.INT
      || config.inputType === ConfigInputType.DOUBLE;
  }

  isConfigString(config: AnchorConfigDescription): boolean {
    return config.inputType === ConfigInputType.STRING;
  }

  configChange(configName: string, configValue: string) {
    for (let config of this.anchorConfig) {
      if (config.configName === configName) {
        config.value = configValue;
      }
    }
    this.onConfigChange.emit(this.anchorConfig);
  }

  ngOnInit() {
  }

}
