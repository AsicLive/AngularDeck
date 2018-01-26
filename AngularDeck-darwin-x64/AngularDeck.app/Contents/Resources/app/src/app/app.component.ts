import { Component } from '@angular/core';
import {Button} from "./button";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activeButton: Button;
  buttonSets: Button[][];

  constructor() {
    this.buttonSets = [[]];
    this.activeButton = new Button(-1, -1);
  }
}
