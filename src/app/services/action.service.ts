import {Injectable} from '@angular/core';
import * as actionList from 'app/actions';

@Injectable()
export class ActionService {

  actions;

  constructor() {
    this.actions = actionList;
  }
}
