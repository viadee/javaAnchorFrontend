import {RouterModule, Routes} from '@angular/router';
import {RulesetOverviewComponent} from './ruleset-overview/ruleset-overview.component';
import {ModelFrameOverviewComponent} from './model-frame-overview/model-frame-overview.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'model-frame-overview', pathMatch: 'full'},
  {path: 'model-frame-overview', component: ModelFrameOverviewComponent},
  {path: 'ruleset-overview', component: RulesetOverviewComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
