import {
    IProduct,
    IProductApi,
    IView,
    TCardActions,
    TCardProduct,
    TCartData,
    IModels,
    TOrderButtonState,
    TFormContacts,
    TFormOrder,
    IBuyer,
    TPayment,
    TFormData,
    TValidationErrorMessages,
} from "../../types";
import { CDN_URL, paymentTypeMap } from "../../utils/constants";
import { getKeyByValue } from "../../utils/utils";

import { IEvents } from "../base/Events";

export class Presenter {
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
        emitter.on<IProduct>("model:catalogue:select", (product) => {
            this.renderPreview(product);
        });
        emitter.on<IProduct>("card:action", () => {
            this.toggleSelectedProductInCart();
            this.modalClose();
        });
        emitter.on<TCartData>("model:cart:update", (cartData) => {
            this.view.header.render({ counter: cartData.count });
            this.renderCart(cartData);
        });
        emitter.on<IProduct>("cart:remove", (product) => {
            this.model.cart.removeProduct(product);
        });
        emitter.on(/modal\:close|order\:complete/, () => this.modalClose());
        emitter.on("cart:show", () => this.showModal(this.view.cart.render()));
        emitter.on("order:create", () =>
            this.showModal(this.view.formOrder.render({ error: "" })),
        );
        emitter.on<Partial<TFormContacts & TFormOrder>>(
            /^form:(\w*):change$/,
            (data) => this.updateBuyer(data),
        );
        emitter.on<Partial<IBuyer>>("model:buyer:update", (data) => {
            const formData: Partial<TFormData> = Object.fromEntries(
                Object.entries(data).map(([key, value]) => {
                    if (key === "payment") {
                        return ["payment", paymentTypeMap[value as TPayment]];
                    }
                    return [key, value];
                }),
            );

            const errObj: Partial<TValidationErrorMessages<IBuyer>> =
                this.model.buyer.validateData();

            if (
                Object.hasOwn(formData, "payment") ||
                Object.hasOwn(formData, "address")
            ) {
                const orderErr: string = [errObj.payment, errObj.address]
                    .filter(Boolean)
                    .join(" ");
                this.view.formOrder.render({
                    ...formData,
                    error: orderErr,
                    isSubmitDisabled: orderErr.length > 0,
                });
            }
            if (
                Object.hasOwn(formData, "email") ||
                Object.hasOwn(formData, "phone")
            ) {
                const contactsErr: string = [errObj.email, errObj.phone]
                    .filter(Boolean)
                    .join(" ");

                this.view.formContacts.render({
                    ...formData,
                    error: contactsErr,
                    isSubmitDisabled: contactsErr.length > 0,
                });
            }
        });
        emitter.on("form:order:submit", () => {
            this.showModal(this.view.formContacts.render({ error: "" }));
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
                const orderSuccess = this.view.orderSuccess.render({
                    total: `Списано ${response.total} синапсов`,
                });
                this.showModal(orderSuccess);
                this.model.cart.clearProducts();
                this.model.buyer.clearData();
            }
        });
    }
    async updateCatalogue(): Promise<void> {
        const productsList = await this.api.getProducts();
        this.model.catalogue.setProducts(productsList);
    }

    /** to Buy or not to Buy */
    private toggleSelectedProductInCart(): void {
        const currentProduct: IProduct | null =
            this.model.catalogue.getSelectedProduct();
        if (currentProduct) {
            if (this.model.cart.hasProduct(currentProduct.id)) {
                this.model.cart.removeProduct(currentProduct);
            } else {
                this.model.cart.addProduct(currentProduct);
            }
        }
    }
    private updateBuyer(data: Partial<TFormContacts & TFormOrder>): void {
        const buyerData: Partial<IBuyer> = Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                if (key === "payment") {
                    return ["payment", getKeyByValue(value, paymentTypeMap)];
                }
                return [key, value];
            }),
        );
        this.model.buyer.setData(buyerData);
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

    private renderPreview(product: IProduct): void {
        const state: TOrderButtonState =
            product.price === null
                ? "disabled"
                : this.model.cart.hasProduct(product.id)
                  ? "remove"
                  : "add";

        this.showModal(
            this.view.cardPreview.render({
                ...this.productToCard(product),
                state,
            }),
        );
    }
    private showModal(content: HTMLElement) {
        this.view.modal.render({ content: content, open: true });
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
