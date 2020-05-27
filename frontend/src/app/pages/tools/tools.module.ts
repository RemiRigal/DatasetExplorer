import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolsComponent} from './tools/tools.component'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {AppSharedModule} from '../../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    AppSharedModule
  ],
  exports: [],
  entryComponents: []
})
export class AppToolsModule {}
