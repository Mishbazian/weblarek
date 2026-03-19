import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export type TOrderSuccess = {
    total: string;
};
export class OrderSuccessView extends Component<TOrderSuccess> {
    private totalElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.totalElement = ensureElement(
            ".order-success__description",
            this.container,
        );
        this.container.addEventListener("click", (e) => {
            if (
                e.target instanceof HTMLButtonElement &&
                e.target.classList.contains("order-success__close")
            ) {
                console.log("success close")
                //todo
            }
        });
    }
    set total(value: string) {
        this.totalElement.textContent = `Списано ${value}`;
    }
}
