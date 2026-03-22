import { TFormActions, TFormPayment } from "../../../types";
import { FormTogglerButtons } from "./FormTogglerButtons";
import { FormView } from "./FormView";

/**
 * интерфейс для кнопочного переключателя формы
 */
export interface IFormToggler {
    controls: HTMLButtonElement[]; // список кнопок переключателя
    input: HTMLInputElement; // скрытый инпут
    set activeButton(value: string); // установить активную кнопку
}

/**
 * форма выбора способа оплаты и адреса доставки (наследует `FormView<TFormPayment>`). Использует `FormTogglerButtons` через композицию.
 */
export class FormOrderView extends FormView<TFormPayment> {
    private paymentToggler: IFormToggler;
    /**
     * @constructor создает экземпляяр формы
     * @param {HTMLElement} container - ссылка на DOM элемент содержащий форму
     * @param {object} actions - объект с коллбэк-функциями для обработки событий формы
     */
    constructor(container: HTMLElement, actions: TFormActions) {
        super(container, actions);
        this.paymentToggler = new FormTogglerButtons(
            container,
            ".button_alt", // селектор кнопок переключателя
            "payment", // имя данных в форме
            "button_alt-active", // имя класса активной кнопки
        );
    }

    set payment(value: string) {
        this.paymentToggler.activeButton = value;
    }
}
