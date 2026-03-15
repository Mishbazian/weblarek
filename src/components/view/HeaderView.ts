import { IHeader } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/**
 * Компонент заголовка страницы.
 * Отображает кнопку корзины и счётчик товаров в корзине.
 * Наследуется от Component<IHeader>.
 */
export class HeaderView extends Component<IHeader> {
    private cartButton: HTMLButtonElement;
    private cartCounter: HTMLElement;

    /**
     * Создает экземпляр класса.
     * @param events - Объект событий для эмитации событий корзины.
     * @param container - HTML-элемент, в который встроен заголовок.
     */
    constructor(
        protected events: IEvents,
        container: HTMLElement,
    ) {
        super(container);
        this.cartButton = ensureElement<HTMLButtonElement>(
            ".header__basket",
            this.container,
        );
        this.cartCounter = ensureElement<HTMLElement>(
            ".header__basket-counter",
            this.container,
        );
        this.cartButton.addEventListener("click", () => {
            this.events.emit("cart:open");
        });
    }

    /**
     * Устанавливает количество товаров в корзине.
     * @param value - Количество товаров (целое число).
     */
    set counter(value: number) {
        this.cartCounter.textContent = value.toString();
    }
}
