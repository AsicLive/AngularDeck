import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class KeysenderService {

  public ks;

  constructor(
     public electronService: ElectronService
  ) {
    this.ks = electronService.remote.require('robotjs');
  }

}
