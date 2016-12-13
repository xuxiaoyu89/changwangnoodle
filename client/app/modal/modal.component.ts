import {Component, ElementRef, Input, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from './modal.service';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'modal',
  template: require('./modal.component.html'),
  styles: [require('./modal.component.scss')]
})

export class ModalComponent {
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;



  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef,
    private modal: ModalService,
    private viewContainer: ViewContainerRef
  ) {}

  isModalOpen() {
    if (this.modal.modalOpenState && this.modal.component === null) {
      open();
    }
    return this.modal.modalOpenState;
  }

  open() {
    let component = this.modal.component;
    this.content.createComponent(component)
  }
}