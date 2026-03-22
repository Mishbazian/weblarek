import { TOrderSuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/**
 * Окно сообщения об успешном оформлениии заказа. Расширяет Component элементом сообщения. Устанавливает слушатель события `click` на кнопку закрытия окна с обработчиком, полученным в конструкторе.
 */
export class OrderSuccessView extends Component<TOrderSuccess> {
    private totalElement: HTMLElement;
    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.totalElement = ensureElement(
            ".order-success__description",
            this.container,
        );
        const closeButton = ensureElement(
            ".order-success__close",
            this.container,
        );
        closeButton.addEventListener("click", ()=>this.events.emit('order:complete'));
    }
    set total(value: string) {
        this.totalElement.textContent = `Списано ${value}`;
    }
}
