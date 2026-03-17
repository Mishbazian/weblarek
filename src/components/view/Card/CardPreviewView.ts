import { controlState, ICardPreview } from "../../../types";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { CardInfoView } from "./CardInfoView";

export class CardPreviewView extends CardInfoView<ICardPreview> {
    private descriptionElement: HTMLElement;
    private orderButton: HTMLButtonElement;
    constructor(container: HTMLElement) {
        super(container);
        this.descriptionElement = ensureElement(".card__text", this.container);
        this.orderButton = ensureElement<HTMLButtonElement>(
            ".card__button",
            this.container,
        );
        this.orderButton.addEventListener("click", () => {
            //@todo
        });
    }
    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set orderButtonState({ text, disabled}:controlState) {
        this.orderButton.disabled = disabled;
        this.orderButton.textContent = text;
    }
}
