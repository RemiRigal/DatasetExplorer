import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReteModule} from 'rete-angular-render-plugin';
import {
  EditorSnackBarComponent,
  PipelinesEditorComponent,
  PipelinesEditorLoadDialogComponent,
  PipelinesEditorSaveDialogComponent
} from './pipelines-editor.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NodeComponent} from './node/node.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PipelinesEditorComponent,
    PipelinesEditorLoadDialogComponent,
    PipelinesEditorSaveDialogComponent,
    NodeComponent,
    EditorSnackBarComponent
  ],
  imports: [
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
    ReactiveFormsModule
  ],
  exports: [PipelinesEditorComponent, ReteModule],
  entryComponents: []
})
export class PipelinesEditorModule {}
