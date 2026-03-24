import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";

export class FormContactsView extends FormView<void> {
    constructor(events: IEvents, container: HTMLElement ) {
        super(events, container);
    }
}