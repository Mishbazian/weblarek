import { ICardFactory, IComponent, TCardActions, TCardCartConstructor, TCardCartView, TCardCatalogueConstructor, TCardCatalogueView, TCardPreviewConstructor, TCardPreviewView } from "../../../types";
import { VIEW_SELECTORS } from "../../../utils/constants";
import { cloneTemplate } from "../../../utils/utils";
import { CardCartView } from "./CardCartView";
import { CardPreviewView } from "./CardPreviewView";
const settings = VIEW_SELECTORS.CARD
export class CardFactory implements ICardFactory {
    constructor(        
        private cardCart: TCardCartConstructor = CardCartView,
        private cardPreview: TCardPreviewConstructor = CardPreviewView,
        private cardCatalogue: TCardCatalogueConstructor = CardPreviewView,
    ) {}

    createCardCart(actions: TCardActions): IComponent<TCardCartView> {
        return new this.cardCart(cloneTemplate(settings.CART), actions);
    }
    createCardPreview(actions?: TCardActions): IComponent<TCardPreviewView> {
        return new this.cardPreview(cloneTemplate(settings.PREVIEW), actions);
    }
    createCardCatalogue(actions: TCardActions): IComponent<TCardCatalogueView> {
        return new this.cardCatalogue(cloneTemplate(settings.CATALOGUE), actions);
    }
}
