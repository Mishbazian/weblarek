import { TFormOrder } from "../../../types";
import {
    ensureAllElements,
    ensureElement,
} from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";

/**
 * форма выбора способа оплаты и адреса доставки (наследует `FormView<TFormPayment>`).
 */
export class FormOrderView extends FormView<TFormOrder> {
    private paymentControls: HTMLButtonElement[];
    private addressInput: HTMLInputElement;
    /**
     * @constructor создает экземпляр формы
     * @param {HTMLElement} container - ссылка на DOM элемент содержащий форму
     * @param {IEvents} events - интерфейс брокера соощений
     */
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.paymentControls = ensureAllElements<HTMLButtonElement>(
            ".button_alt",
            this.container,
        );
        this.paymentControls.forEach((button) => {
            button.addEventListener("click", () => {
                events.emit("form:order:change", { payment: button.name });
            });
        });
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            this.form,
        ) as HTMLInputElement;
    }

    set payment(value: string) {
        this.paymentControls.forEach((button) => {
            button.classList.toggle("button_alt-active", value === button.name);
        });
    }
    set address(value: string) {
        this.addressInput.value = value;
    }
}
