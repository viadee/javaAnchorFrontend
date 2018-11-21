import {Component, OnInit} from '@angular/core';
import {AnchorApiService} from '../_service/anchor-api.service';
import {AnchorConfigDescription, ConfigInputType} from '../_models/AnchorConfigDescription';

@Component({
  selector: 'app-anchor-algo-configuration',
  templateUrl: './anchor-algo-configuration.component.html',
  styleUrls: ['./anchor-algo-configuration.component.scss']
})
export class AnchorAlgoConfigurationComponent implements OnInit {

  anchorConfig: Array<AnchorConfigDescription>;

  constructor(
    private _anchorApi: AnchorApiService,
  ) {
    this._anchorApi.getAnchorConfigs().subscribe((result) => {
      if (!result) {
        console.log('anchors config is ' + result);
      }
      this.anchorConfig = result;
    });
  }

  isConfigNumber(config: AnchorConfigDescription): boolean {
    return config.inputType === ConfigInputType.INT
      || config.inputType === ConfigInputType.DOUBLE;
  }

  isConfigString(config: AnchorConfigDescription): boolean {
    return config.inputType === ConfigInputType.STRING;
  }

  ngOnInit() {
  }

}
