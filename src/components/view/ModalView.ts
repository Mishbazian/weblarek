import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
    content: HTMLElement;
}

export class ModalView extends Component<IModal> {
    private closeBtn: HTMLButtonElement;
    private contentContainer: HTMLElement;
    constructor() {
        const container: HTMLElement | null =
            document.querySelector("#modal-container");
        super(container as HTMLElement);
        this.closeBtn = ensureElement<HTMLButtonElement>(
            ".modal__close",
            this.container,
        );
        this.contentContainer = ensureElement<HTMLElement>(".modal__content");
    }

    set content(item: HTMLElement) {
        this.contentContainer.replaceChildren(item);
    }
    private handleClick(e: Event) {
        console.log(e.target);
        if (e.target === e.currentTarget || e.target === this.closeBtn)
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
