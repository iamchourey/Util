import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';


@Component({
  selector: 'app-second-block',
  templateUrl: './second-block.component.html',
  styleUrls: ['./second-block.component.css']
})
export class SecondBlockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

}
