import { ICardBase} from "../../../types";

import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class CardView<T extends ICardBase> extends Component<ICardBase> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>(
            ".card__title",
            this.container,
        );
        this.priceElement = ensureElement<HTMLElement>(
            ".card__price",
            this.container,
        );
    }

    set title(value: ICardBase["title"]) {
        this.titleElement.textContent = value;
    }

    set price(value: ICardBase["price"]) {
        this.priceElement.textContent = value.toString();
    }


    render(data: Partial<T>): HTMLElement {
        return super.render(data);
    }
}


 




