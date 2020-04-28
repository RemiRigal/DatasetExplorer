import {AfterContentInit, AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataFile} from '../classes/DataFile';
import {CustomStorage} from '../utils/CustomStorage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() left = 0;
  @Input() right = 0;
  @Input() fileCount = 0;
  @Output() heightChange = new EventEmitter<number>();
  @Output() widthChange = new EventEmitter<number>();

  heightValue = 120;
  widthValue = 25;

  @Input()
  get height() {
    return this.heightValue;
  }

  set height(height) {
    this.heightValue = height;
    this.heightChange.emit(this.heightValue);
    CustomStorage.setCardHeight(this.heightValue);
  }

  @Input()
  get width() {
    return this.widthValue;
  }

  set width(width) {
    this.widthValue = width;
    this.widthChange.emit(this.widthValue);
    localStorage.setItem('cardWidth', this.widthValue + '');
    CustomStorage.setCardWidth(this.widthValue);
  }

  constructor() { }

  ngOnInit() {
    this.height = this.heightValue;
    this.width = this.widthValue;
  }
}
