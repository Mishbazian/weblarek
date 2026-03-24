import { IEvents } from "../../base/Events";
import { FormView } from "./FormView";

export class FormContactView extends FormView<void> {
    constructor(events: IEvents, container: HTMLElement ) {
        super(events, container);
    }
}