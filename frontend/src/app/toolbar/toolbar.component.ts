import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../api/rest.service';
import {DataPlugin} from '../classes/DataPlugin';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() dataFileType: string;
  @Output() process = new EventEmitter<DataPlugin>();

  constructor(private rs: RestService) { }

  plugins: DataPlugin[];

  ngOnInit(): void {
    this.rs.getPlugins().subscribe(
      (response) => {
        this.plugins = response.filter(value => {
          return value.inType === this.dataFileType;
        });
      },
      (error) => {
        console.log('No Plugins Found' + error);
      }
    );
  }

  applyPlugin(plugin) {
    this.process.emit(plugin);
  }
}
