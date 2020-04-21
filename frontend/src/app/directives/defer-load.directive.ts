import {AfterViewInit, Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appDeferLoad]'
})
export class DeferLoadDirective implements AfterViewInit {

  @Output() public appDeferLoad: EventEmitter<boolean> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;
  private visible = false;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(entries => {
        this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.element.nativeElement as Element);
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.visible = true;
        this.appDeferLoad.emit(this.visible);
      } else if (this.visible) {
        this.visible = false;
        this.appDeferLoad.emit(this.visible);
      }
    });
  }

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (entry as any).isIntersecting && entry.target === this.element.nativeElement;
  }
}
