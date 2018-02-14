import { Component } from '@angular/core';
import {Button} from './button';
import {ObsWebsocketService} from './obs-websocket.service';
import {ArduinoService} from './device_connectors/arduino.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activeButton: Button;
  buttonSets: Button[][];

  constructor(obs: ObsWebsocketService,
              arduino: ArduinoService) {
    this.buttonSets = [[]];
    this.activeButton = new Button(-1, -1);
    arduino.connect();
  }
}
