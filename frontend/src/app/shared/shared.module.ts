import {NgModule} from '@angular/core';
import {DatafileCardComponent} from './datafile-card/datafile-card.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ToolsParametersComponent} from './tools-parameters/tools-parameters.component';
import {ToolsSidebarComponent} from './tools-sidebar/tools-sidebar.component';
import {ToolsSidebarOverlayService} from './tools-sidebar-overlay/tools-sidebar-overlay.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ToolsSidebarOverlayComponent} from './tools-sidebar-overlay/tools-sidebar-overlay.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppDirectivesModule} from '../directives/directives.module';

@NgModule({
  declarations: [
    DatafileCardComponent,
    FooterComponent,
    HeaderComponent,
    ToolsParametersComponent,
    ToolsSidebarComponent,
    ToolsSidebarOverlayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppDirectivesModule
  ],
  providers: [
    ToolsSidebarOverlayService
  ],
  exports: [
    DatafileCardComponent,
    FooterComponent,
    ToolsSidebarComponent,
    ToolsParametersComponent,
    HeaderComponent
  ],
  entryComponents: []
})
export class AppSharedModule {}
