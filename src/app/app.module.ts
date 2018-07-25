import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';
import {SelectModelComponent} from './select-model/select-model.component';
import { ColumnInfoComponent } from './column-info/column-info.component';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {Ng2SmartTableModule} from 'ng2-smart-table';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    SelectModelComponent,
    ColumnInfoComponent,
    DataOverviewComponent,
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
