import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectionInfo} from '../_models/ConnectionInfo';

@Component({
  selector: 'app-ruleset-overview',
  templateUrl: './ruleset-overview.component.html',
  styleUrls: ['./ruleset-overview.component.scss']
})
export class RulesetOverviewComponent implements OnInit {

  connectionInfo: ConnectionInfo;

  server: string;
  model_id: string;
  frame_id: string;

  constructor(private route: ActivatedRoute) {
    route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.server = value.server;
        this.model_id = value.model_id;
        this.frame_id = value.frame_id;
      }
    });
  }

  ngOnInit() {
  }

}
