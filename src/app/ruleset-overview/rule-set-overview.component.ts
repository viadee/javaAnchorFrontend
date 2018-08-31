import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {Rule} from '../_models/Rule';
import {ListRenderComponent} from '../_helpers/list-render.component';
import {LocalDataSource} from 'ng2-smart-table';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {FrameSummary} from '../_models/FrameSummary';

@Component({
  selector: 'app-ruleset-overview',
  templateUrl: './rule-set-overview.component.html',
  styleUrls: ['./rule-set-overview.component.scss']
})
export class RuleSetOverviewComponent implements OnInit {

  server: string;
  model_id: string;
  frame_id: string;

  frameSummary: FrameSummary;

  columnsConditions: Map<string, Map<string, string>>;

  rules: Array<Rule> = [];

  public source: LocalDataSource;

  settings = {
    columns: {
      prediction: {
        title: 'Prediction'
      },
      precision: {
        title: 'Precision'
      },
      coverage: {
        title: 'Coverage'
      },
      affected_rows: {
        title: 'Cases'
      },
      names: {
        title: 'Rule',
        filter: false,
        type: 'custom',
        renderComponent: ListRenderComponent,
      },
      instance: {
        title: 'Instance',
        filter: false,
        type: 'custom',
        renderComponent: ListRenderComponent,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    attr: {
      class: 'table table-striped table-hover'
    },
  };

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _h2oApi: H2oApiService,
              private _globals: GlobalVariablesComponent) {
    this.source = new LocalDataSource();

    route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.server = value.server;
        this.model_id = value.model_id;
        this.frame_id = value.frame_id;

        if (this._globals.getFrameSummary() === null) {
          this._h2oApi.getDataFrame(this.server, this.frame_id).subscribe(data => {
            this.frameSummary = JSON.parse(data);
            this._globals.setFrameSummary(this.frameSummary);
          });
        }

        this._h2oApi.getCaseSelectConditions(this.server, this.model_id, this.frame_id).subscribe(data => {
          this.columnsConditions = JSON.parse(data);
        })
      } else {
        this._router.navigate(['/model-frame-overview']);
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
  }

  public requestAnalyzation(event: Map<string, string>) {
    this._h2oApi.getRandomRule(this.server, this.model_id, this.frame_id, event).subscribe((data: any) => {
      const rule = JSON.parse(data);
      this.rules.push(rule);
      this._globals.addRule(rule);

      this.source.load(this.rules);
    });
  }

}
