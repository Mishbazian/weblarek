import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";

export class FormContactsView extends FormView<void> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
    }
}
