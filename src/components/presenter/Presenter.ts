import {
    IProduct,
    IProductApi,
    IView,
    TBuyerData,
    TCardActions,
    TCardProduct,
    TCartData,
    IModels,
    TOrderButtonState,
    TOrderPayment,
} from "../../types";
import { CDN_URL, paymentTypeMap } from "../../utils/constants";
import { getKeyByValue, objectToString } from "../../utils/utils";

import { IEvents } from "../base/Events";

enum EModalState {
    "close",
    "cart",
    "preview",
    "form_order",
    "form_contacts",
    "order_success",
}

export class Presenter {
    private currentModal: EModalState = EModalState.close;
    constructor(
        private emitter: IEvents,
        private api: IProductApi,
        private model: IModels,
        private view: IView,
    ) {
        emitter.on<IProduct[]>("model:catalogue:update", (data) =>
            this.renderGallery(data),
        );
        emitter.on<IProduct>("card:select", (item) => {
            this.model.catalogue.setSelectedProduct(item);
        });
        emitter.on<IProduct>("model:catalogue:select", (product) =>
            this.showCardPreview(product),
        );
        emitter.on<IProduct>("card:action", (product) => {
            if (this.model.cart.hasProduct(product.id)) {
                this.model.cart.removeProduct(product);
            } else {
                this.model.cart.addProduct(product);
            }
            emitter.trigger("model:cart:update");
            //this.modalClose();
        });
        emitter.on<TCartData>("model:cart:update", (cartData) => {
            this.view.header.render({ counter: cartData.count });
            this.renderCart(cartData);
            if (this.currentModal === EModalState.preview) {
                this.modalClose();
            }
        });
        emitter.on<IProduct>("cart:remove", (product) => {
            this.model.cart.removeProduct(product);
        });
        emitter.on(/modal\:close|order\:complete/, () => this.modalClose());
        emitter.on("cart:show", () => {
            this.showModal(this.view.cart.render(), EModalState.cart);
        });
        emitter.on("order:create", () => {
            this.showModal(
                this.view.formOrder.render(),
                EModalState.form_order,
            );
        });
        emitter.on<FormData>(/^form:(\w*):change$/, (formData) =>{
            console.log("chhhhhhaaaaaaaaange")
            this.updateBuyer(formData)}
        );
        emitter.on<TBuyerData>("model:buyer:update", (buyerData) => {
            console.log("aaaa--yeeee")
            if (this.currentModal === EModalState.form_order) {
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
            } else if (this.currentModal === EModalState.form_contacts) {
                const error = objectToString(buyerData.errors, " ");
                this.view.formContacts.render({
                    error,
                    isSubmitDisabled: error.length > 0,
                });
            }
        });
        emitter.on("form:order:submit", () => {
            this.showModal(
                this.view.formContacts.render(),
                EModalState.form_contacts,
            );
        });
        emitter.on("form:contacts:submit", async () => {
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
                this.view.formOrder.render({ reset: true });
                this.view.formContacts.render({ reset: true });
                const orderSuccess = this.view.orderSuccess.render({
                    total: `Списано ${response.total} синапсов`,
                });
                this.showModal(orderSuccess, EModalState.order_success);
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
            data.payment = getKeyByValue(data.payment, paymentTypeMap);
            
        }
        this.model.buyer.setData(data);
    }
    private renderGallery(data: IProduct[]): void {
        const cardList: HTMLElement[] = data.map((item) => {
            const card = this.view.cardFactory.createCardCatalogue(
                this.setClickAction("card:select", item),
            );
            return card.render(this.productToCard(item));
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
        this.showModal(
            card.render({ ...this.productToCard(product), state }),
            EModalState.preview,
        );
    }
    private showModal(content: HTMLElement, currentModal: EModalState) {
        this.view.modal.render({ content: content, open: true });
        this.currentModal = currentModal;
    }

    private renderCart(cartData: TCartData): HTMLElement {
        const products = cartData.products.map((item, index) => {
            const card = this.view.cardFactory.createCardCart(
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
        this.currentModal = EModalState.close;
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
