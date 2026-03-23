import { TCardActions, TCardCartExt } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

/**
 * Карточка товара в корзине. Расширяет CardView возможностью установки порядкового номера товара в корзине.
 */
export class CardCartView extends CardView<TCardCartExt> {
    private indexElement: HTMLElement;
    /**
     * @constructor создает экземпляр карточки
     * @param {HTMLElement} container - DOM элемент, содержащий структуру карточки
     * @param {object} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    constructor(container: HTMLElement, actions: TCardActions) {
        const deleteButton = ensureElement(".basket__item-delete", container);
        super(container, deleteButton, actions);
        this.indexElement = ensureElement(
            ".basket__item-index",
            this.container,
        );
    }
    /**
     * установить порядковый номер в списке товаров корзины
     */
    set index(value: number) {
        this.indexElement.textContent = value.toString();
    }
}

