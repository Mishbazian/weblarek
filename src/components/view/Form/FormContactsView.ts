import { TFormContacts } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";
/**
 * Форма контакты. 
 */
export class FormContactsView extends FormView<TFormContacts> {
    private phoneInput: HTMLInputElement;
    private emailInput: HTMLInputElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.form)
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
    }
    set phone(value: string){
        this.phoneInput.value = value
    }
    set email(value: string){
        this.emailInput.value = value
    }
}
