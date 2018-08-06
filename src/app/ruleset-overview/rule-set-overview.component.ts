import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectionInfo} from '../_models/ConnectionInfo';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';

@Component({
  selector: 'app-ruleset-overview',
  templateUrl: './rule-set-overview.component.html',
  styleUrls: ['./rule-set-overview.component.scss']
})
export class RuleSetOverviewComponent implements OnInit {

  connectionInfo: ConnectionInfo;

  server: string;
  model_id: string;
  frame_id: string;

  constructor(private route: ActivatedRoute, private _h2oApi: H2oApiService) {
    route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.server = value.server;
        this.model_id = value.model_id;
        this.frame_id = value.frame_id;

        this._h2oApi.getRandomRule(this.server, this.model_id, this.frame_id).subscribe((rule: any) => {
          console.log(rule);
        });
      } else {
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
  }

}
