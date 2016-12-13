import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {
  public modalData: Object = {};
  public component: any = null;
  public modalOpenState: boolean = false;
  setModalProperties(component, data) {
    this.modalData = data;
    this.component = component;
    this.modalOpenState = true;
  }
}
