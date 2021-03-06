import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RestService} from './api/rest.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {HeaderComponent} from './header/header.component';
import {BrowserComponent} from './browser/browser.component';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {APIInterceptor} from './api/api-interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ProcessorComponent} from './processor/processor.component';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {DeferLoadDirective} from './directives/defer-load.directive';
import {DatafileCardComponent, DatafilePreviewImageDialogComponent} from './datafile-card/datafile-card.component';
import {ProcessorToolsSidebarComponent} from './processor-tools-sidebar/processor-tools-sidebar.component';
import {MatRadioModule} from '@angular/material/radio';
import {FooterComponent} from './footer/footer.component';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {ProcessorInfoSidebarComponent} from './processor-info-sidebar/processor-info-sidebar.component';
import {ToolsComponent} from './tools/tools.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ToolsParametersComponent} from './tools-parameters/tools-parameters.component';
import {ProcessorToolsOverlayComponent} from './processor-tools-overlay/processor-tools-overlay.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {ProcessorToolsOverlayService} from './processor-tools-overlay/processor-tools-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrowserComponent,
    ProcessorComponent,
    DeferLoadDirective,
    DatafileCardComponent,
    DatafilePreviewImageDialogComponent,
    ProcessorToolsSidebarComponent,
    FooterComponent,
    ProcessorInfoSidebarComponent,
    ToolsComponent,
    ToolsParametersComponent,
    ProcessorToolsOverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSliderModule,
    MatRadioModule,
    VirtualScrollerModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    OverlayModule
  ],
  providers: [
    RestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    ProcessorToolsOverlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
