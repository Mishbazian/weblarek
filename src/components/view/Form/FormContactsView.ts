import { TFormActions } from "../../../types";
import { FormView } from "./FormView";

export class FormContactView extends FormView<void> {
    constructor(container: HTMLElement, actions: TFormActions) {
        super(container, actions);
    }
}