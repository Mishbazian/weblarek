import { TCardActions, TOrderButtonState, TCardFull } from "../../../types";
import { cardActions } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardExtView } from "./CardExtView";

/**
 * Карточка товара в режиме предпросмотра. Расширяет родительский класс возможностью установки описания товара и управления кнопкой заказа.
 */
export class CardPreviewView extends CardExtView<TCardFull> {
    private descriptionElement: HTMLElement;
    private orderButton: HTMLButtonElement;
    /**
     * @constructor создает экземпляр карточки и устанавливает обработчик события клика.
     * @param {HTMLElement} container - DOM элемент, содержащий структуру карточки
     * @param {object} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    constructor(container: HTMLElement, actions?: TCardActions) {
        const orderButton = ensureElement<HTMLButtonElement>(
            ".card__button",
            container,
        );
        super(container, orderButton, actions);
        this.descriptionElement = ensureElement(".card__text", this.container);
        this.orderButton = orderButton;
    }

    // установить текст описания
    set description(value: string) {
        this.descriptionElement.textContent = value;
    }
    // установить состояние кнопки. Здесь определяется какое действие с товаром доступно пользователю.
    set state(state: TOrderButtonState) {
        this.orderButton.disabled = state === "disabled";
        this.orderButton.textContent = cardActions[state];
    }
}
