import { TFormPayment } from "../../../types";
import { FormTogglerButtons } from "./FormTogglerButtons";
import { FormView } from "./FormView";


export interface IFormToggler {
    controls: HTMLButtonElement[];
    input: HTMLInputElement;
    set activeButton(value: string);
}

export class FormOrderView extends FormView<TFormPayment> {
    private paymentToggler: IFormToggler;
    constructor(container: HTMLElement) {
        super(container);
        this.paymentToggler = new FormTogglerButtons(
            container,
            ".button_alt",
            "payment",
        );
    }

    set payment(value: string) {
        this.paymentToggler.activeButton = value;
    }
}