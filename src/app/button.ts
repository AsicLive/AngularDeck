import { ButtonType } from "./button-type";
import { DeckAction } from "./deck-action";

export class Button {
    set: number;
    id: number;
    type: ButtonType;
    image: string;
    imageBase64: string;
    //Remove once action chaining works.
    action: DeckAction;
    actions: DeckAction[];

    constructor(set, id) {
        this.set = set;
        this.id = id;
        this.image = 'missing.png';
        this.type = ButtonType.action;
        //Remove once action chaining works.
        this.actions = new Array<DeckAction>();
        this.action = new DeckAction();
        this.action.name = 'none';
        this.action.func = 'none';
        this.imageBase64 = null;
    }
}
