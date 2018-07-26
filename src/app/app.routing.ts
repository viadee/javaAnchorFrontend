import {RouterModule, Routes} from '@angular/router';
import {DataOverviewComponent} from './data-overview/data-overview.component';
import {RulesetOverviewComponent} from './ruleset-overview/ruleset-overview.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'data-overview', pathMatch: 'full'},
  {path: 'data-overview', component: DataOverviewComponent},
  {path: 'ruleset-overview', component: RulesetOverviewComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
