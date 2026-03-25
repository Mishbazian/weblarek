import { ICardFactory, IComponent, TCardActions, TCardCartConstructor, TCardCatalogueConstructor, TCardCatalogueView, TCardPreviewConstructor } from "../../../types";
import { cloneTemplate } from "../../../utils/utils";

export class CardFactory implements ICardFactory {
    constructor(
        private cardCart: TCardCartConstructor,
        private cardPreview: TCardPreviewConstructor,
        private cardCatalogue: TCardCatalogueConstructor,
    ) {}

    createCardCart(actions: TCardActions) {
        return new this.cardCart(cloneTemplate("#card-basket"), actions);
    }
    createCardPreview(actions?: TCardActions) {
        return new this.cardPreview(cloneTemplate("#card-preview"), actions);
    }
    createCardCatalogue(actions: TCardActions): IComponent<TCardCatalogueView> {
        return new this.cardCatalogue(cloneTemplate("#card-catalog"), actions);
    }
}
