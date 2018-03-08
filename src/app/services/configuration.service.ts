import {Injectable} from '@angular/core';
import {Configuration} from 'app/models';
import {FilesysService} from './filesys.service';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class ConfigurationService {

  FILE_NAME = 'config.json';

  private URL = 'http://localhost:4200';
  public config: Configuration;

  constructor(private filesys: FilesysService,
              private electron: ElectronService) {
    const fs = this.electron.remote.require('fs');
    this.config = new Configuration();
    try {
      this.config = JSON.parse(fs.readFileSync(this.filesys.getPath(this.FILE_NAME)));
    } catch (e) {
      this.config = new Configuration();
      this.save();
    }
  }

  public getConfig() {
    if (this.config != null) {
      return this.config;
    } else {
      return new Configuration();
    }
  }

  public updateConfig(property, value) {
    this.config[property] = value;
    this.save();
  }

  public save() {
    const fs = this.electron.remote.require('fs');
    try {
      fs.writeFileSync(this.filesys.getPath(this.FILE_NAME), JSON.stringify(this.config));
    } catch (e) {
      console.log(e);
    }
  }
}
