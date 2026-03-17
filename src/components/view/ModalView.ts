import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
    content: HTMLElement;
}

export class ModalView extends Component<IModal> {
    private closeButton: HTMLButtonElement;
    private contentContainer: HTMLElement;
    constructor(container: HTMLElement) {
        super(container as HTMLElement);
        this.closeButton = ensureElement<HTMLButtonElement>(
            ".modal__close",
            this.container,
        );
        this.contentContainer = ensureElement<HTMLElement>(".modal__content");
    }

    set content(item: HTMLElement) {
        this.contentContainer.replaceChildren(item);
    }
    private handleClick(e: Event) {
        if (e.target === e.currentTarget || e.target === this.closeButton)
            this.close();
    }
    open() {
        this.container.classList.add("modal_active");
        this.container.addEventListener("click", (e) => this.handleClick(e));
    }
    close() {
        this.container.classList.remove("modal_active");
        this.container.removeEventListener("click", (e) => this.handleClick(e));
    }
}
