import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {NodeComponent as ReteNodeComponent, NodeService} from 'rete-angular-render-plugin';

@Component({
  selector: 'app-rete-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent extends ReteNodeComponent {

  mouseOver = false;

  onMouseEnter() {
    this.mouseOver = true;
  }

  onMouseLeave() {
    this.mouseOver = false;
  }
}
