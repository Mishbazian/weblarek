import {
    IBuyer,
    IOrderResponse,
    IProduct,
    TBuyerData,
    TCardActions,
    TCardCartView,
    TCardCatalogueView,
    TCardPreview,
    TCardProduct,
    TCart,
    TCartData,
    TFormOrder,
    TFormStatus,
    TGallery,
    THeader,
    TModal,
    TOrderButtonState,
    TOrderPayment,
    TOrderSuccess,
    TValidationErrorMessages,
} from "../../types";
import { CDN_URL, paymentTypeMap } from "../../utils/constants";
import { cloneTemplate, objectToString } from "../../utils/utils";

import { IEvents } from "../base/Events";
import { CardCartView } from "../view/Card/CardCartView";

interface ICatalogueModel {
    getProducts(): IProduct[];
    getSelectedProduct(): IProduct | null;
    getProductById(id: IProduct["id"]): IProduct | undefined;
    setProducts(productsList: IProduct[]): void;
    setSelectedProduct(product: IProduct): void;
}
interface ICartModel {
    getProducts(): IProduct[];
    addProduct(product: IProduct): void;
    removeProduct(product: IProduct): void;
    clearProducts(): void;
    getFullCost(): number;
    getProdctsCount(): number;
    hasProduct(id: string): boolean;
}

interface IBuyerModel {
    setData(fields: Partial<IBuyer>): void;
    getData(): IBuyer;
    clearData(): void;
    validateData(): Partial<TValidationErrorMessages<IBuyer>>;
}
type TModels = {
    catalogue: ICatalogueModel;
    cart: ICartModel;
    buyer: IBuyerModel;
};
export interface IComponent<T> {
    render(data?: Partial<T>): HTMLElement;
}

export type TView = {
    gallery: IComponent<TGallery>;
    modal: IComponent<TModal>;
    header: IComponent<THeader>;
    cart: IComponent<TCart>;
    formOrder: IComponent<TFormOrder>;
    formContacts: IComponent<TFormStatus>;
    orderSuccess: IComponent<TOrderSuccess>;
    cardFactory: ICardFactory;
};

export interface ICardFactory {
    createCardCatalogue: (
        actions: TCardActions,
    ) => IComponent<TCardCatalogueView>;
    createCardCart: (actions: TCardActions) => IComponent<TCardCartView>;
    createCardPreview: (actions?: TCardActions) => IComponent<TCardPreview>;
}

interface IProductApi {
    getProducts(): Promise<IProduct[]>;
    postOrder(
        items: IProduct["id"][],
        total: number,
        buyer: IBuyer,
    ): Promise<IOrderResponse>;
}
enum ECurrentModal {
    "close",
    "cart",
    "preview",
    "form:order",
    "form:contacts",
    "order:success",
}
export class Presenter {
    private currentModal: ECurrentModal = ECurrentModal.close;
    constructor(
        private emitter: IEvents,
        private api: IProductApi,
        private model: TModels,
        private view: TView,
    ) {
        this.emitter.on<IProduct[]>("model:catalogue:update", (data) =>
            this.renderGallery(data),
        );
        this.emitter.on<IProduct>("card:select", (item) => {
            this.model.catalogue.setSelectedProduct(item);
        });
        this.emitter.on<IProduct>("model:catalogue:select", (product) =>
            this.showCardPreview(product),
        );
        this.emitter.on<IProduct>("card:action", (product) => {
            if (this.model.cart.hasProduct(product.id)) {
                this.model.cart.removeProduct(product);
            } else {
                this.model.cart.addProduct(product);
            }
            this.modalClose();
        });
        this.emitter.on<TCartData>("model:cart:update", (cartData) => {
            this.view.header.render({ counter: cartData.count });
            this.renderCart(cartData);
            if (this.currentModal === ECurrentModal.preview) {
                this.modalClose();
            }
        });
        this.emitter.on<IProduct>("cart:remove", (product) => {
            this.model.cart.removeProduct(product);
        });
        this.emitter.on(/modal\:close|order\:complete/, () =>
            this.modalClose(),
        );
        this.emitter.on("cart:show", () => {
            this.view.modal.render({
                content: this.view.cart.render(),
                open: true,
            });
            this.currentModal = ECurrentModal.cart;
        });
        this.emitter.on("order:create", () => {
            this.view.modal.render({ content: this.view.formOrder.render() });
            this.currentModal = ECurrentModal["form:order"];
        });
        this.emitter.on<FormData>(/^form:(\w*):change$/, (formData) =>
            this.updateBuyer(formData),
        );
        this.emitter.on<TBuyerData>("model:buyer:update", (buyerData) => {
            if (this.currentModal === ECurrentModal["form:order"]) {
                const payment: TOrderPayment =
                    paymentTypeMap[buyerData.data.payment];
                const error = objectToString(
                    buyerData.errors,
                    " ",
                    "payment",
                    "address",
                );
                this.view.formOrder.render({
                    payment,
                    error,
                    isSubmitDisabled: error.length > 0,
                });
            } else if (this.currentModal === ECurrentModal["form:contacts"]) {
                const error = objectToString(
                    buyerData.errors,
                    " ",
                    "email",
                    "phone",
                );
                this.view.formContacts.render({
                    error,
                    isSubmitDisabled: error.length > 0,
                });
            }
        });
        this.emitter.on("form:order:submit", () => {
            this.view.modal.render({
                content: this.view.formContacts.render({
                    isSubmitDisabled: true,
                }),
            });
            this.currentModal = ECurrentModal["form:contacts"];
        });
        this.emitter.on("form:contacts:submit", async () => {
            const response: Awaited<ReturnType<typeof this.api.postOrder>> =
                await this.api.postOrder(
                    this.model.cart.getProducts().map((item) => {
                        return item.id;
                    }),
                    this.model.cart.getFullCost(),
                    this.model.buyer.getData(),
                );
            if (response) {
                this.model.cart.clearProducts();
                this.model.buyer.clearData();
                const orderSuccess = this.view.orderSuccess.render({
                    total: `Списано ${response.total} синапсов`,
                });
                this.view.modal.render({ content: orderSuccess });
            }
        });
    }
    async updateCatalogue() {
        const productsList = await this.api.getProducts();
        this.model.catalogue.setProducts(productsList);
    }
    private updateBuyer(formData: FormData): void {
        const data = Object.fromEntries(formData);
        if (typeof data.payment === "string") {
            //@todo чтото здесь не так
            data.payment = Object.fromEntries(
                Object.entries(paymentTypeMap).map(([key, value]) => {
                    return [value, key];
                }),
            )[data.payment];
        }
        this.model.buyer.setData(data);
    }
    private renderGallery(data: IProduct[]): void {
        const cardList: HTMLElement[] = [];

        data.forEach((item) => {
            const card = this.view.cardFactory.createCardCatalogue(
                this.setClickAction("card:select", item),
            );
            cardList.push(card.render(this.productToCard(item)));
        });

        this.view.gallery.render({ catalogue: cardList });
    }

    private showCardPreview(product: IProduct): void {
        const state: TOrderButtonState =
            product.price === null
                ? "disabled"
                : this.model.cart.hasProduct(product.id)
                  ? "remove"
                  : "add";
        const card = this.view.cardFactory.createCardPreview(
            state !== "disabled"
                ? this.setClickAction("card:action", product)
                : undefined,
        );
        const content = card.render({ ...this.productToCard(product), state });
        this.view.modal.render({ content, open: true });
        this.currentModal = ECurrentModal.preview;
    }

    private renderCart(cartData: TCartData): HTMLElement {
        const products = cartData.products.map((item, index) => {
            const card = new CardCartView(
                cloneTemplate("#card-basket"),
                this.setClickAction("cart:remove", item),
            );

            return card.render({
                ...this.productToCard(item),
                index: index + 1,
            });
        });
        const cartPrice = `${cartData.price} синапсов`;
        const isCanOrder = products.length > 0;
        return this.view.cart.render({ products, cartPrice, isCanOrder });
    }

    private modalClose(): void {
        this.view.modal.render({ open: false });
        this.currentModal = ECurrentModal.close;
    }

    /**
     * Конструирует коллбэк для события клика
     * @param eventName
     * @param item
     * @returns {function}
     */
    private setClickAction(eventName: string, item: IProduct): TCardActions {
        return {
            onClick: () => {
                this.emitter.emit(`${eventName}`, item);
                console.log(eventName);
            },
        };
    }
    /**
     * Приводит IProduct к виду принимаемому карточками
     * @param {IProduct} product - объект данных продукта в том виде, в котором хранится в модели данных
     * @returns {ICardProduct} - объект данных продукта в том виде, в котором принимается карточками для отображения
     */
    private productToCard(product: IProduct): TCardProduct {
        return {
            title: product.title,
            price: product.price ? `${product.price} синапсов` : "бесценно",
            category: product.category,
            image: { url: CDN_URL + product.image },
            description: product.description,
        };
    }
}
