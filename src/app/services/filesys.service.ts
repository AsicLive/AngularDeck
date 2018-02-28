import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class FilesysService {

  public configDir;
  public dirSeparator;

  constructor(private electronService: ElectronService) {
    const os = this.electronService.remote.require('os');
    const app = this.electronService.remote.require('electron').app;

    this.configDir = app.getPath('userData');

    switch (os.platform()) {
      case 'darwin':
        this.dirSeparator = '/';
        break;
      case 'linux':
        // TODO: Not sure where to store things on Linux
        this.dirSeparator = '/';
        break;
      case 'win32':
        this.dirSeparator = '\\';
        break;
    }
  }

  getPath(fileName, dir = '') {
    const fs = this.electronService.remote.require('fs');

    if (dir != '') {
      return this.configDir + this.dirSeparator + fileName;
    } else {
      const dirDir = this.configDir + this.dirSeparator + dir.toString();
      if (!fs.existsSync(dirDir)) {
        fs.mkdirSync(dirDir);
      }
      return dirDir + fileName;
    }
  }
}
