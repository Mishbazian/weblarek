import { ProductApi } from "./components/api/ProductApi";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Catalogue } from "./components/models/Catalogue";
import { Presenter } from "./components/presenter/Presenter";
import { CardCartView } from "./components/view/Card/CardCartView";
import { CardCatalogueView } from "./components/view/Card/CardCatalogueView";
import { CardFactory } from "./components/view/Card/CardFactory";
import { CardPreviewView } from "./components/view/Card/CardPreviewView";
import { CartView } from "./components/view/Cart/CartView";
import { FormContactsView } from "./components/view/Form/FormContactsView";
import { FormOrderView } from "./components/view/Form/FormOrderView";
import { GalleryView } from "./components/view/Gallery/GalleryView";
import { HeaderView } from "./components/view/Header/HeaderView";
import { ModalView } from "./components/view/Modal/ModalView";
import { OrderSuccessView } from "./components/view/Order/OrderSuccessView";
import "./scss/styles.scss";
import { ICardFactory, IModels, IView } from "./types";

import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";


const api = new ProductApi(new Api(API_URL));
const emitter = new EventEmitter();
//инстансы моделей
const models: IModels = {
    catalogue: new Catalogue(emitter),
    cart: new Cart(emitter),
    buyer: new Buyer(emitter),
};

//инстансы представлений
const gallery = new GalleryView(ensureElement(".gallery"));
const modal = new ModalView(ensureElement(".modal"), emitter);
const header = new HeaderView(ensureElement(".header"), emitter);
const cardPreview = new CardPreviewView(cloneTemplate("#card-preview"), emitter)
const formOrder = new FormOrderView(cloneTemplate("#order"), emitter);
const formContacts = new FormContactsView(cloneTemplate("#contacts"), emitter);

const cart = new CartView(cloneTemplate("#basket"), emitter);
const orderSuccess = new OrderSuccessView(cloneTemplate("#success"), emitter);
const cardFactory: ICardFactory = new CardFactory(
    CardCartView,
    CardCatalogueView,
);

const view: IView = {
    header,
    modal,
    gallery,
    cardPreview,
    cart,
    formOrder,
    formContacts,
    orderSuccess,
    cardFactory,
};
// Инстанс Презентера
const presenter = new Presenter(emitter, api, models, view);

//Запуск приложения
presenter.init();
