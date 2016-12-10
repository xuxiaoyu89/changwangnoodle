import {Component} from '@angular/core';

@Component({
  selector: 'image-editor',
  template: require('./image-editor.component.html'),
  styles: [require('./image-editor.component.scss')],
  providers: []
})

export class ImageEditorComponent {
  constructor () {}

  ngOnInit() {
    let dropbox = document.getElementById('dropbox');
    dropbox.addEventListener('dragenter', this.onDragEnter, false);
    dropbox.addEventListener('dragover', this.onDragOver, false);
    dropbox.addEventListener('drop', this.onDrop, false);
    console.log("on init, drop listener added");
  }

  onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e) {
    console.log('dropped something');
    e.stopPropagation();
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt.files;
    console.log(files);
  }

}