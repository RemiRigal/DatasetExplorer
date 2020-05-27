import {NgModule} from '@angular/core';
import {BrowserComponent} from './browser/browser.component';
import {AppSharedModule} from '../../shared/shared.module';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    BrowserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppSharedModule,
    VirtualScrollerModule
  ],
  exports: [],
  entryComponents: []
})
export class AppBrowserModule {}
