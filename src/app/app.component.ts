import { Component } from '@angular/core';
import {Button} from './models/button';
import {ObsWebsocketService} from './services/obs-websocket.service';
import {ArduinoService} from './device_services/arduino.service';
import { ConfigurationService } from './services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activeButton: Button;
  buttonSets: Button[][];

  obsConnected = false;
  arduinoConnected = false;

  constructor(public obs: ObsWebsocketService,
              public arduino: ArduinoService,
              public config: ConfigurationService) {
    this.buttonSets = [[]];
    this.activeButton = new Button(-1, -1);
    this.connectArduino();
    this.connectOBS();
  }

  connectOBS() {
    this.obs.connect(this.config.getConfig().obsHost, this.config.getConfig().obsPass);
  }

  connectArduino() {
    this.arduino.connect();
  }
}
