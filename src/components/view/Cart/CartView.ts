import { TCart } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";


/**
 * компонент корзины, отображает список товаров и общую стоимость. При клике кнопки заказа, вызывает полученную в конструкторе коллбэк-функцию.
 */
export class CartView extends Component<TCart> {
    private productsList: HTMLUListElement;
    private orderButton: HTMLButtonElement;
    private priceElement: HTMLElement;
    constructor(container: HTMLElement, private events: IEvents) {
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
        this.orderButton.addEventListener('click',()=>this.events.emit('order:create'))
    }
    set products(items: HTMLElement[]) {
        this.productsList.replaceChildren();
        items.forEach((item)=>
        this.productsList.append(item))
    }
    set cartPrice(value: string) {
        this.priceElement.textContent = value.toString();
    }
    set isCanOrder(value: boolean) {
        this.orderButton.disabled = !value;
    }
}
