import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RestService} from './api/rest.service';
import {APIInterceptor} from './api/api-interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AppToolsModule} from './pages/tools/tools.module';
import {AppProcessorModule} from './pages/processor/processor.module';
import {AppBrowserModule} from './pages/browser/browser.module';
import {AppFlowsModule} from './pages/flows/flows.module';
import {AppSharedModule} from './shared/shared.module';
import {AppDirectivesModule} from './directives/directives.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    AppToolsModule,
    AppProcessorModule,
    AppBrowserModule,
    AppFlowsModule,
    AppSharedModule,
    AppDirectivesModule
  ],
  providers: [
    RestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
