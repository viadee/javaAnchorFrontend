import {RouterModule, Routes} from '@angular/router';
import {SelectModelComponent} from './select-model/select-model.component';
import {DataOverviewComponent} from './data-overview/data-overview.component';
import {ColumnInfoComponent} from './column-info/column-info.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'data-overview', pathMatch: 'full'},
  {path: 'select-model', component: SelectModelComponent},
  {path: 'data-overview', component: DataOverviewComponent},
  {path: 'column-info', component: ColumnInfoComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
