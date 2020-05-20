import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject
} from '@angular/core';
import Node from 'rete';
import ConnectionMasteryPlugin from 'rete-connection-mastery-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import AutoArrangePlugin from 'rete-auto-arrange-plugin';
import {AngularRenderPlugin} from 'rete-angular-render-plugin';
import AreaPlugin from 'rete-area-plugin';
import {RestService} from '../api/rest.service';
import {DataPluginComponent} from './components/data-plugin-component';
import {FileComponent} from './components/input-file-components';
import {DataPlugin} from '../classes/DataPlugin';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Pipeline} from '../classes/Pipeline';
import {DataFile} from '../classes/DataFile';
import {NodeComponent} from './node/node.component';
import {NodeEditor} from './node-editor';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../utils/Forms';

@Component({
  selector: 'app-pipelines-editor',
  templateUrl: './pipelines-editor.component.html',
  styleUrls: ['./pipelines-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelinesEditorComponent implements AfterViewInit {

  @Output() nodeEditClick = new EventEmitter<Node>();

  @ViewChild('nodeEditor') el: ElementRef;
  editor: NodeEditor = null;
  mapParams = { enable: false };
  ioItems = {
    Audio: DataFile.TYPE_AUDIO,
    Image: DataFile.TYPE_IMAGE,
    Video: DataFile.TYPE_VIDEO
  };
  warnings: string[] = [];

  constructor(private rs: RestService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngAfterViewInit() {
    const editor = new NodeEditor('DatasetExplorer@0.0.0', this.el.nativeElement);
    editor.use(ConnectionPlugin);
    editor.use(AngularRenderPlugin, { component: NodeComponent });
    editor.use(ConnectionMasteryPlugin);
    editor.use(AutoArrangePlugin, { margin: {x: 50, y: 50 }, depth: 0 });
    editor.use(MinimapPlugin, this.mapParams);

    editor.on('zoom', ({ source }) => {
      return source !== 'dblclick';
    });
    editor.on('nodeeditclick', (node) => {
      this.nodeEditClick.emit(node);
    });
    editor.on('nodedeleteclick', (node) => {
      // @ts-ignore
      editor.removeNode(node);
    });
    editor.on([
        'nodecreated',
        'noderemoved',
        'connectioncreated',
        'connectionremoved'
      ], () => {
        const warnings = [];
        console.log(editor.getNbFlows());
        if (editor.getNbFlows() !== 1) {
          warnings.push('The Flow must have a unique connected data flow');
        }
        this.warnings = warnings;
      }
    );

    editor.view.resize();
    editor.trigger('process');
    AreaPlugin.zoomAt(editor);

    this.rs.getPlugins().subscribe(
      (response) => {
        response.forEach(async plugin => {
          const dataPluginComponent = new DataPluginComponent(plugin);
          editor.register(dataPluginComponent);
        });
      }
    );

    for (const [name, type] of Object.entries(this.ioItems)) {
      editor.register(new FileComponent(`${name} Input`, type, true));
      editor.register(new FileComponent(`${name} Output`, type, false));
    }
    this.editor = editor;
  }

  async addPluginNode(plugin: DataPlugin) {
    const node = await new DataPluginComponent(plugin).createNode();
    this.addNode(node);
  }

  async addFileNode(name: string, type: string, isInput: boolean) {
    const component = new FileComponent(name, type, isInput);
    const node = await component.createNode();
    this.addNode(node);
  }

  addNode(node) {
    this.editor.addNode(node);
  }

  arrange() {
    if (this.editor.nodes.length > 0) {
      this.editor.trigger('arrangeall');
      AreaPlugin.zoomAt(this.editor);
    }
  }

  toggleMap() {
    this.mapParams.enable = !this.mapParams.enable;
  }

  save() {
    const dialogRef = this.dialog.open(PipelinesEditorSaveDialogComponent);
    const dialogSubmitSubscription = dialogRef.componentInstance.save.subscribe(name => {
      dialogSubmitSubscription.unsubscribe();
      this.rs.createPipeline(name, this.editor.toJSON()).subscribe(() => {
        this.snackBar.openFromComponent(EditorSnackBarComponent, {
          duration: 5000,
          data: 'Flow saved'
        });
      });
    });
  }

  load() {
    const dialogRef = this.dialog.open(PipelinesEditorLoadDialogComponent, {
      width: '500px'
    });
    const dialogSubmitSubscription = dialogRef.componentInstance.pipelineClick.subscribe(async pipeline => {
      dialogSubmitSubscription.unsubscribe();
      await this.editor.clear();
      await this.editor.fromJSON(pipeline.diagram);
      AreaPlugin.zoomAt(this.editor);
      this.snackBar.openFromComponent(EditorSnackBarComponent, {
        duration: 5000,
        data: 'Flow loaded'
      });
    });
  }

  async clear() {
    await this.editor.clear();
  }

  resetZoom() {
    AreaPlugin.zoomAt(this.editor);
  }
}

@Component({
  selector: 'app-pipelines-editor-load-dialog',
  templateUrl: 'pipelines-editor-load-dialog.html',
})
export class PipelinesEditorLoadDialogComponent implements OnInit {

  @Output() pipelineClick = new EventEmitter<Pipeline>();

  pipelines: Pipeline[];

  constructor(
    private rs: RestService,
    public dialogRef: MatDialogRef<PipelinesEditorLoadDialogComponent>) {}

  ngOnInit() {
    this.rs.getPipelines().subscribe(pipelines => {
      this.pipelines = pipelines;
    });
  }

  loadPipeline(pipeline: Pipeline) {
    this.pipelineClick.emit(pipeline);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-pipelines-editor-save-dialog',
  templateUrl: 'pipelines-editor-save-dialog.html',
  styles: [`
    .name-input-form-field {
      width: 250px;
    }
  `]
})
export class PipelinesEditorSaveDialogComponent {

  @Input() name = '';
  @Output() save = new EventEmitter<string>();
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  matcher = new CustomErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<PipelinesEditorSaveDialogComponent>) {}

  saveClicked() {
    this.save.emit(this.name);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-editor-snack-bar-component',
  template: `
    <div class="row">
      <mat-icon>check_circle_outline</mat-icon>
      <span class="snack-bar-message">{{message}}</span>
    </div>
  `,
  styles: [`
    .snack-bar-message {
      margin-left: 12px;
      line-height: 100%;
      display: inline-flex;
      align-items: center;
    }
  `],
})
export class EditorSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
