import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';
import {SelectModelComponent} from './select-model/select-model.component';
import { ColumnInfoComponent } from './column-info/column-info.component';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { DataListComponent } from './data-list/data-list.component';
import { SelectCaseForAnalysisComponent } from './select-case-for-analysis/select-case-for-analysis.component';
import { RulesetOverviewComponent } from './ruleset-overview/ruleset-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectModelComponent,
    ColumnInfoComponent,
    DataOverviewComponent,
    DataListComponent,
    SelectCaseForAnalysisComponent,
    RulesetOverviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    // BsDropdownModule.forRoot(),
    // ModalModule.forRoot(),
    // ChartsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
