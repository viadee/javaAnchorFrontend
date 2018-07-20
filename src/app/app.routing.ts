import {RouterModule, Routes} from '@angular/router';
import {SelectModelComponent} from './select-model/select-model.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'select-model', pathMatch: 'full'},
  {
    path: 'select-model',
    component: SelectModelComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
