import { TFormStatus } from "../../../types";
import {
    ensureElement,
} from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class FormView<T> extends Component<TFormStatus & T> {
    protected form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>(
            '[type="submit"]',
            this.container,
        );
        this.errorsElement = ensureElement(".form__errors", this.container);
        this.form = this.container as HTMLFormElement;

        this.form.addEventListener("change", () => {
            const formData = new FormData(this.form);
            console.log("change");
            for (const [name, value] of formData.entries()) {
                console.log(name, value);
            }
        });

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("submit");
            const formData = new FormData(this.form);
            for (const [name, value] of formData.entries()) {
                console.log(name, value);
            }
        });
    }
    set isSubmitDisabled(value: boolean) {
        this.submitButton.disabled = value;
    }

    set errors(message: string) {
        this.errorsElement.textContent = message;
    }
}











