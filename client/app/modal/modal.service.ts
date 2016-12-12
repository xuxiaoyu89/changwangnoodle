import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {
  public modalData: Object = {};
  public component: any = null;
  setModalProperties(component, data) {
    this.modalData = data;
    this.component = component;
  }
}
