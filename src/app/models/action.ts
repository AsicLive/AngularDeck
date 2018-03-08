import {ActionType} from 'app/models/index';

export abstract class Action {
  name: string;
  func: string;
  category: ActionType;

  abstract getDetailsTemplate: any;
  abstract doAction: any;
}
