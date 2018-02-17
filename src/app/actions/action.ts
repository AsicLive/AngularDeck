import {ActionType} from 'app/models';

export abstract class action {
   name: string;
   func: string;
   category: ActionType;

   abstract getDetailsTemplate(action);
   abstract doAction(that, action);
}
