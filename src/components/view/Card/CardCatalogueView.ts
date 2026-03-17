import { ICardInfo } from "../../../types";
import { cloneTemplate } from "../../../utils/utils";
import { CardInfoView } from "./CardInfoView";


export class CardCatalogueView extends CardInfoView<ICardInfo> {
    private showPreviewElement: HTMLElement;
    constructor() {
        const cardContainer = cloneTemplate("#card-catalog");
        super(cardContainer);
        this.showPreviewElement = this.container;
        this.showPreviewElement.addEventListener("click", () => {
            //todo 
        });
    }
}
