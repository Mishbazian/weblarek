import { ICardPreview } from "../../../types";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { CardInfoView } from "./CardInfoView";

export class CardPreviewView extends CardInfoView<ICardPreview> {
    private descriptionElement: HTMLElement;
    private buyButton: HTMLButtonElement;
        constructor() {        
            const cardContainer = cloneTemplate("#card-preview");
            super(cardContainer);
            this.descriptionElement = ensureElement('.card__text', this.container)
            this.buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
            this.buyButton.addEventListener('click', () => {
                //@todo
            })
        }
        set description(value: string){
            this.descriptionElement.textContent = value;
        };
}