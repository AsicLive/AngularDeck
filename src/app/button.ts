import { ButtonType } from './button-type';
import { DeckAction } from './deck-action';

export class Button {
    set: number;
    id: number;
    type: ButtonType;
    image: string;
    imageBase64: string;
    actions: DeckAction[];

    constructor(set, id) {
        this.set = set;
        this.id = id;
        this.image = 'missing.png';
        this.type = ButtonType.action;
        this.actions = new Array<DeckAction>();
        this.imageBase64 = null;
    }
}
