import {
    ICardConstructor,
    ICardFactory,
    IComponent,
    TCardActions,
    TCardCartView,
    TCardCatalogueView,
} from "../../../types";
import { VIEW_SELECTORS } from "../../../utils/constants";
import { cloneTemplate } from "../../../utils/utils";
import { CardCartView } from "./CardCartView";
import { CardCatalogueView } from "./CardCatalogueView";
const settings = VIEW_SELECTORS.CARD;

/**
 * Фабрика карточек. предоставляет методы для создания карточек с уже закешированными контейнерами. Остается только подставить коллбеки
 */
export class CardFactory implements ICardFactory {
    /**
     *
     * @param cardCart - конструктор класса карточек для корзины
     * @param cardCatalogue - конструктор класса карточек для каталога
     */
    constructor(
        private cardCart: ICardConstructor<TCardCartView> = CardCartView,
        private cardCatalogue: ICardConstructor<TCardCatalogueView> = CardCatalogueView,
    ) {}

    createCardCart(actions: TCardActions): IComponent<TCardCartView> {
        return new this.cardCart(cloneTemplate(settings.CART), actions);
    }
    createCardCatalogue(actions: TCardActions): IComponent<TCardCatalogueView> {
        return new this.cardCatalogue(
            cloneTemplate(settings.CATALOGUE),
            actions,
        );
    }
}

