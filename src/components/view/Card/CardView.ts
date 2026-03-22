import { TCardActions, TCardBase } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

/**
 * Базовый класс для всех карточек товара.
Наследует класс Component c интерфейсом ICardBase в переменной.
Принимает в собственную переменную `T` тип данных, расширяющий данные принимаемые методом `remder()` родительского компонента. Генерирует событие, через полученную в конструкторе коллбэк-функцию при клике на установленный элемент.
* @template T - тип дополнительных данных карточки, объединяемый с TCardBase.
 */
export abstract class CardView<T> extends Component<TCardBase & T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    /**
     * @constructor Создает экземпляр CardView и устанавливает обработчик события на click.
     * @param {HTMLElement} container - DOM-элемент, содержащий структуру 
     * карточки.
     * @param {HTMLElement} mainActionElement - элемент, который должен вызывать событие при клике
     * @param {object?} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    protected constructor(
        container: HTMLElement,
        mainActionElement: HTMLElement,
        actions?: TCardActions,
    ) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>(
            ".card__title",
            this.container,
        );
        this.priceElement = ensureElement<HTMLElement>(
            ".card__price",
            this.container,
        );

        if (actions)
            mainActionElement.addEventListener("click", actions.onClick);
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
