import { controlState, TCardPreview } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { CardExtView } from "./CardExtView";

export class CardPreviewView extends CardExtView<TCardPreview> {
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

    set orderButtonState({ text, disabled }: controlState) {
        this.orderButton.disabled = disabled;
        this.orderButton.textContent = text;
    }
}
