import { TCardActions, TOrderSuccess, TOrderSuccessActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Окно сообщения об успешном оформлениии заказа. Расширяет Component элементом сообщения. Устанавливает слушатель события `click` на кнопку закрытия окна с обработчиком, полученным в конструкторе.
 */
export class OrderSuccessView extends Component<TOrderSuccess> {
    private totalElement: HTMLElement;
    constructor(container: HTMLElement, actions: TOrderSuccessActions) {
        super(container);
        this.totalElement = ensureElement(
            ".order-success__description",
            this.container,
        );
        const closeButton = ensureElement(
            ".order-success__close",
            this.container,
        );
        closeButton.addEventListener("click", actions.onClick);
    }
    set total(value: string) {
        this.totalElement.textContent = `Списано ${value}`;
    }
}
