import { ProductApi } from "./components/api/ProductApi";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Catalogue } from "./components/models/Catalogue";
import {
    ICardFactory,
    IComponent,
    Presenter,
    TView,
} from "./components/presenter/Presenter";
import { CardCartView } from "./components/view/Card/CardCartView";
import { CardCatalogueView } from "./components/view/Card/CardCatalogueView";
import { CardPreviewView } from "./components/view/Card/CardPreviewView";
import { CartView } from "./components/view/CartView";
import { FormContactsView } from "./components/view/Form/FormContactsView";
import { FormOrderView } from "./components/view/Form/FormOrderView";
import { GalleryView } from "./components/view/GalleryView";

import { HeaderView } from "./components/view/HeaderView";
import { ModalView } from "./components/view/ModalView";
import { OrderSuccessView } from "./components/view/OrderSuccessView";
import "./scss/styles.scss";
import { TCardActions, TCardCatalogueView } from "./types";

import { API_URL } from "./utils/constants";
import { cloneTemplate } from "./utils/utils";

//Инстансы классов
const api = new ProductApi(new Api(API_URL));
const emitter = new EventEmitter();
//инстансы моделей
const models = {
    catalogue: new Catalogue(emitter),
    cart: new Cart(emitter),
    buyer: new Buyer(emitter),
};

//инстансы представлений
const gallery = new GalleryView(
    document.querySelector(".gallery") as HTMLElement,
);
const modal = new ModalView(
    emitter,
    document.querySelector(".modal") as HTMLElement,
);
const header = new HeaderView(
    emitter,
    document.querySelector(".header") as HTMLElement,
);

const formOrder = new FormOrderView(emitter, cloneTemplate("#order"));
const formContacts = new FormContactsView(emitter, cloneTemplate("#contacts"));
const cart = new CartView(emitter, cloneTemplate("#basket"));
const orderSuccess = new OrderSuccessView(emitter, cloneTemplate("#success"));

const createCardCatalogue = (
    actions: TCardActions,
): IComponent<TCardCatalogueView> => {
    return new CardCatalogueView(cloneTemplate("#card-catalog"), actions);
};
const createCardPreview = (actions?: TCardActions) => {
    return new CardPreviewView(cloneTemplate("#card-preview"), actions);
};
const createCardCart = (actions: TCardActions) => {
    return new CardCartView(cloneTemplate("#card-basket"), actions);
};

const cardFactory: ICardFactory = {
    createCardCatalogue,
    createCardCart,
    createCardPreview,
};

const view: TView = {
    header,
    modal,
    gallery,
    cart,
    formOrder,
    formContacts,
    orderSuccess,
    cardFactory,
};

const presenter = new Presenter(emitter, api, models, view);

//Обновление данных с сервера и наполнение каталога
await presenter.updateCatalogue();
