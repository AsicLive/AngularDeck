import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class FilesysService {

  public os;
  public platform;
  public homeDir;
  public configDir;
  public dirSeparator;

  constructor(private electronService: ElectronService) {
    const os = this.electronService.remote.require('os');
    const fs = this.electronService.remote.require('fs');
    this.homeDir = os.homedir();
    const user = os.userInfo().username;
    switch (os.platform()) {
      case 'darwin':
        this.configDir = '/Users/' + user + '/.AngularDeck/';
        this.dirSeparator = '/';
        break;
      case 'linux':
        //TODO: Not sure where to store things on Linux
        this.configDir = '~/.config/AngularDeck/';
        this.dirSeparator = '/';
        break;
      case 'win32':
        this.configDir = 'C:\\Users\\' + user + '\\AppData\\Roaming\\AngularDeck\\';
        this.dirSeparator = '\\';
        break;
    }
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir);
    }
  }

  getPath(fileName, dir: any = false) {
    const fs = this.electronService.remote.require('fs');

    if (!dir) {
      return this.configDir + fileName;
    } else {
      const dirDir = this.configDir + dir + this.dirSeparator;
      if (!fs.existsSync(dirDir)) {
        fs.mkdirSync(dirDir);
      }
      return dirDir + fileName;
    }
  }
}
