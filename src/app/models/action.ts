import {ActionType} from 'app/models/index';

export abstract class Action {
  name: string;
  func: string;
  category: ActionType;

  abstract getDetailsTemplate(action);

  abstract doAction(that, action);
}
