import {RouterModule, Routes} from '@angular/router';
import {RuleSetOverviewComponent} from './ruleset-overview/rule-set-overview.component';
import {ModelFrameOverviewComponent} from './model-frame-overview/model-frame-overview.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'model-frame-overview', pathMatch: 'full'},
  {path: 'model-frame-overview', component: ModelFrameOverviewComponent},
  {path: 'ruleset-overview', component: RuleSetOverviewComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
