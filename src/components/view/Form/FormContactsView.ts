import { TFormActions } from "../../../types";
import { FormView } from "./FormView";

export class FormContactView extends FormView<never> {
    constructor(container: HTMLElement, actions: TFormActions) {
        super(container, actions);
    }
}