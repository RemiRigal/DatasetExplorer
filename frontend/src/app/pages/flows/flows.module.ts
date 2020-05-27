import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReteModule} from 'rete-angular-render-plugin';
import {
  EditorSnackBarComponent,
  FlowsEditorComponent,
  FlowsEditorLoadDialogComponent,
  FlowsEditorSaveDialogComponent
} from './flows-editor/flows-editor.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NodeComponent} from './flows-editor/node/node.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlowsComponent} from './flows/flows.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AppSharedModule} from '../../shared/shared.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    FlowsComponent,
    FlowsEditorComponent,
    FlowsEditorLoadDialogComponent,
    FlowsEditorSaveDialogComponent,
    NodeComponent,
    EditorSnackBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReteModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    AppSharedModule,
    MatBadgeModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [FlowsEditorComponent, ReteModule],
  entryComponents: []
})
export class AppFlowsModule {}
