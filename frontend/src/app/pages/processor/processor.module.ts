import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessorComponent} from './processor/processor.component';
import {ProcessorInfoSidebarComponent} from './processor-info-sidebar/processor-info-sidebar.component';
import {AppSharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProcessorComponent,
    ProcessorInfoSidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppSharedModule,
    MatSidenavModule
  ],
  exports: [],
  entryComponents: []
})
export class AppProcessorModule {}
