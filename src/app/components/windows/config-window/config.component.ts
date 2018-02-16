import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService, ObsWebsocketService} from 'app/services';
import {Configuration} from 'app/models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnDestroy {

  config: Configuration;

  constructor(private configService: ConfigurationService,
              private obs: ObsWebsocketService) {
  }

  ngOnInit() {
    this.config = this.configService.getConfig();
  }

  ngOnDestroy() {
  }

  updateOBS() {
    this.obs.connect(this.config.obsHost, this.config.obsPass);
  }

  saveConfig() {
    this.obs.connect(this.config.obsHost, this.config.obsPass);
    this.configService.save();
  }

}
