import { TCardActions, TCardCart } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

/**
 * Карточка товара в корзине. Расширяет CardView элементом для установки порядкового номера товара в корзине и добавляет обработчик, полученный в конструкторе на событие клика кнопки удаления товара из корзины.
 */
export class CardCartView extends CardView<TCardCart> {
    private indexElement: HTMLElement;
        /**
     * @constructor создает экземпляр карточки и устанавливает обработчик события клика.
     * @param {HTMLElement} container - DOM элемент, содержащий структуру карточки
     * @param {object} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    constructor(container: HTMLElement, actions: TCardActions) {
        super(container);
        this.indexElement = ensureElement(
            ".basket__item-index",
            this.container,
        );
        const deleteButton = ensureElement('.basket__item-delete', this.container)
        deleteButton.addEventListener('click', actions.onClick)
    }
    /**
     * установить порядковый номер в списке товаров корзины
     */
    set index(value: number) {
        this.indexElement.textContent = value.toString();
    }
}
