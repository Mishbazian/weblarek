import { ICardCart } from "../../../types";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

export class CardCartView extends CardView<ICardCart> {
    private indexElement: HTMLElement;
    constructor() {        
        const cardContainer = cloneTemplate("#card-basket");
        super(cardContainer);
        this.indexElement = ensureElement('.basket__item-index', this.container)
    }
    set index(value: number){
        console.log('index', value)
        this.indexElement.textContent = value.toString();
    };
}