import { action } from './action';
import {ActionType} from 'app/models';

export class deck_delay extends action {

   name = '';
   func = '';
   category = ActionType.deck;

   getDetailsTemplate(action) {
      return ``;
   }

   doAction(that, action) {
      
   }
}
