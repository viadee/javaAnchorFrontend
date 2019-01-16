import {RouterModule, Routes} from '@angular/router';
import {AnchorSetOverviewComponent} from './anchorset-overview/anchor-set-overview.component';
import {ModelFrameOverviewComponent} from './model-frame-overview/model-frame-overview.component';
import {GlobalModelExplanationOverviewComponent} from './global-model-explanation-overview/global-model-explanation-overview.component';
import {IndexComponent} from './index/index.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'model-frame-overview', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'model-frame-overview', component: ModelFrameOverviewComponent},
  {path: 'anchorset-overview', component: AnchorSetOverviewComponent},
  {path: 'global-model-explanation', component: GlobalModelExplanationOverviewComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
