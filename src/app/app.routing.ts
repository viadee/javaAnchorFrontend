import {RouterModule, Routes} from '@angular/router';
import {AnchorSetOverviewComponent} from './anchorset-overview/anchor-set-overview.component';
import {ModelFrameOverviewComponent} from './model-frame-overview/model-frame-overview.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'model-frame-overview', pathMatch: 'full'},
  {path: 'model-frame-overview', component: ModelFrameOverviewComponent},
  {path: 'anchorset-overview', component: AnchorSetOverviewComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
