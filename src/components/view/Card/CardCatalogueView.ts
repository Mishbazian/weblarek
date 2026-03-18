import { ICardInfo } from "../../../types";
import { CardExtView } from "./CardExtView";

export class CardCatalogueView extends CardExtView<never> {
    private showPreviewElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.showPreviewElement = this.container;
        this.showPreviewElement.addEventListener("click", () => {
            //todo
        });
    }
}
