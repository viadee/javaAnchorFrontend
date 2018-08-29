import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {H2oApiService} from '../_service/h2o-api/h2o-api.service';
import {Rule} from '../_models/Rule';
import {ListRenderComponent} from '../_helpers/list-render.component';
import {LocalDataSource} from 'ng2-smart-table';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';

@Component({
  selector: 'app-ruleset-overview',
  templateUrl: './rule-set-overview.component.html',
  styleUrls: ['./rule-set-overview.component.scss']
})
export class RuleSetOverviewComponent implements OnInit {

  server: string;
  model_id: string;
  frame_id: string;

  rules: Array<Rule> = [];

  public source: LocalDataSource;

  settings = {
    columns: {
      prediction: {
        title: 'Prediction'
      },
      precision: {
        title: 'Precicsion'
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
              private _h2oApi: H2oApiService,
              private _globals: GlobalVariablesComponent) {
    this.source = new LocalDataSource();

    route.queryParams.forEach(value => {
      if (value !== undefined && value.hasOwnProperty('server') && value.hasOwnProperty('model_id') && value.hasOwnProperty('frame_id')) {
        this.server = value.server;
        this.model_id = value.model_id;
        this.frame_id = value.frame_id;
      } else {
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.loadRandom();
  }

  private loadRandom() {
    this._h2oApi.getRandomRule(this.server, this.model_id, this.frame_id).subscribe((data: any) => {
      const rule = JSON.parse(data);
      this.rules.push(rule);
      console.log(rule);
      this.source.load(this.rules);
    });
  }

  private computeSearchConditions() {
    const conditions = {};
    const columns = this._globals.getFrameSummary().column_summary_list;
    for (const column of columns) {
      const columnConditions: string[] = [];
      if (['enum', 'string'].includes(column.column_type)) {
        for (const cat of column.categories) {
          columnConditions.push(`${column.label} = ${cat.name}`);
        }
      } else {
        const buckets = 4;
        const min = column.column_min;
        const max = column.column_max;
        const step = (max - min) / buckets;

        for (let i = 0; i < buckets; i++) {
          if (i === 0) {
            columnConditions.push(`${column.label} < ${min + step}`)
          } else if (i === buckets - 1) {
            columnConditions.push(`${min + i * step} < ${column.label}`)
          } else {
            columnConditions.push(`${min + i * step} <= ${column.label} <= ${min + (i + 1) * step}`)
          }
        }
      }
      conditions[column.label] = columnConditions;
    }
  }

}
