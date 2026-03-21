import { TCardPreview, TCardActions, TOrderButtonState } from "../../../types";
import { cardActions } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardExtView } from "./CardExtView";


/**
 * Карточка товара в режиме предпросмотра (наследует `CardExtView<TCardPreview>`). Расширяет поля родительского класса элементами описания и кнопки заказа и добавляет генерацию событий, через полученную в конструкторе коллбэк-функцию.
 */
export class CardPreviewView extends CardExtView<TCardPreview> {
    private descriptionElement: HTMLElement;
    private orderButton: HTMLButtonElement;
        /**
     * @constructor создает экземпляр карточки и устанавливает обработчик события клика.
     * @param {HTMLElement} container - DOM элемент, содержащий структуру карточки
     * @param {object} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    constructor(container: HTMLElement, actions?: TCardActions) {
        super(container);
        this.descriptionElement = ensureElement(".card__text", this.container);
        this.orderButton = ensureElement<HTMLButtonElement>(
            ".card__button",
            this.container,
        );
        if (actions) {
            this.orderButton.addEventListener("click", actions.onClick);
        }
    }

    // установить текст описания
    set description(value: string) {
        this.descriptionElement.textContent = value;
    }
// установить состояние кнопки. Здесь определяется какое действие с товаром доступно пользователю.
    set state(state: TOrderButtonState) {
        this.orderButton.disabled = state === cardActions.disabled;
        this.orderButton.textContent = cardActions[state];
    }
}
