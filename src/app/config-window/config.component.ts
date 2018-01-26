import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../configuration.service";
import {Configuration} from "../configuration";
import {ObsWebsocketService} from "../obs-websocket.service";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

    config: Configuration;

    constructor(private configService: ConfigurationService,
                private obs: ObsWebsocketService) {
    }

    ngOnInit() {
        this.config = this.configService.getConfig();
    }

    updateOBS() {
        this.obs.connect(this.config.obsHost, this.config.obsPass);
    }

    saveConfig() {
        this.configService.save();
    }

}
