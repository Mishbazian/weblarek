import { TCardBase } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class CardView<T> extends Component<TCardBase & T> {
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

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: string) {
        this.priceElement.textContent = value;
    }
}
