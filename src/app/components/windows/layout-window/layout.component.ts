import { Component, OnInit } from '@angular/core';
import {Button} from 'app/models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  activeButton: Button;

  constructor() {
      this.activeButton = new Button(-1, -1);
  }

  ngOnInit() {
  }

}
