import { TFormOrder } from "../../../types";
import {
    createElement,
    ensureAllElements,
    ensureElement,
} from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";

/**
 * форма выбора способа оплаты и адреса доставки (наследует `FormView<TFormPayment>`). Использует `FormTogglerButtons` через композицию.
 */
export class FormOrderView extends FormView<TFormOrder> {
    private paymentControls: HTMLButtonElement[];
    private paymentInput: HTMLInputElement;
    private addressInput: HTMLInputElement;
    /**
     * @constructor создает экземпляяр формы
     * @param {HTMLElement} container - ссылка на DOM элемент содержащий форму
     * @param {object} actions - объект с коллбэк-функциями для обработки событий формы
     */
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.paymentControls = ensureAllElements<HTMLButtonElement>(".button_alt", this.container);
        this.paymentInput = createElement<HTMLInputElement>("input", {
            name: "payment",
            type: "hidden",
            value: "",
        });
        this.form.appendChild(this.paymentInput);
        this.form.addEventListener("click", (e) => {
            if (
                e.target instanceof HTMLButtonElement &&
                this.paymentControls.includes(e.target)
            ) {
                this.paymentInput.value = e.target.name;
                this.container.dispatchEvent(new Event("input"));
            }
        });
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            this.form,
        ) as HTMLInputElement;
    }

    set payment(value: string) {

        this.paymentControls.forEach((button) =>{
            console.log('сначала', button.name, value, button.className)
            button.classList.toggle(
                "button_alt-active",
                value === button.name,
            )
        }
        );
        this.paymentInput.value = value;
    }
    set address(value: string) {
        this.addressInput.value = value;
    }
}
