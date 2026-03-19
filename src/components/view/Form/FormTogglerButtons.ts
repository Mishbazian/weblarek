import {
    createElement,
    ensureAllElements,
    SelectorCollection,
} from "../../../utils/utils";
import { IFormToggler } from "./FormOrderView";

export class FormTogglerButtons implements IFormToggler{
    controls: HTMLButtonElement[];
    input: HTMLInputElement;

    constructor(
        private container: HTMLElement,
        selector: SelectorCollection<HTMLButtonElement>,
        inputName: string,
    ) {
        this.controls = ensureAllElements(selector, this.container);
        this.input = createElement<HTMLInputElement>("input", {
            name: inputName,
            type: "hidden",
            value: "",
        });
        this.container.appendChild(this.input);
        this.container.addEventListener("click", (e) => {
            if (
                e.target instanceof HTMLButtonElement &&
                this.controls.includes(e.target)
            ) {
                this.input.value = e.target.name;
                this.container.dispatchEvent(new Event("change"));
            }
        });
    }

    set activeButton(value: string) {
        this.controls.forEach((button) =>
            button.classList.toggle("button_alt-active", value === button.name),
        );
        this.input.value = value;
    }
}
