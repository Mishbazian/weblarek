import { TCardBase } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

/**
 * Базовый класс для всех карточек товара.
Наследует класс Component c интерфейсом ICardBase в переменной.
Принимает в собственную переменную `T` тип данных, расширяющий данные принимаемые методом `remder()` родительского компонента.
 @param { HTMLElement } container  - принимает ссылку на DOM элемент за отображение, которого он отвечает.
 */
export abstract class CardView<T> extends Component<TCardBase & T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    /**
     * @constructor Создает экземпляр CardView.
     * @param {HTMLElement} container - DOM-элемент, содержащий структуру карточки.
     */
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

    // установить заголовок
    set title(value: string) {
        this.titleElement.textContent = value;
    }
    // установить цену
    set price(value: string) {
        this.priceElement.textContent = value;
    }
}
