import { TCart } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";



export class CartView extends Component<TCart> {
    private productsList: HTMLUListElement;
    private orderButton: HTMLButtonElement;
    private priceElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.productsList = ensureElement<HTMLUListElement>(
            ".basket__list",
            this.container,
        );
        this.priceElement = ensureElement<HTMLElement>(
            ".basket__price",
            this.container,
        );
        this.orderButton = ensureElement<HTMLButtonElement>(
            ".basket__button",
            this.container,
        );
        //this.orderButton.disabled = true;
    }
    set products(items: HTMLElement[]) {
        this.productsList.replaceChildren();
        items.forEach((item)=>
        this.productsList.append(item))
    }
    set cartPrice(value: number) {
        this.priceElement.textContent = value.toString();
    }
    set isCanOrder(value: boolean) {
        this.orderButton.disabled = !value;
    }
}
