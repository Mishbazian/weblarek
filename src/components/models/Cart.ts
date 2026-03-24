import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    products: IProduct[] = [];
    constructor(private events: IEvents) {}

    getProducts(): IProduct[] {
        return this.products;
    }

    addProduct(product: IProduct): void {
        if (!this.hasProduct(product.id) && product.price) {
            this.products.push(product);
            this.notify();
        }
    }

    removeProduct(product: IProduct): void {
        this.products = this.products.filter((item) => item.id !== product.id);
        this.notify();
    }

    clearProducts(): void {
        this.products.splice(0);
        this.notify();
    }

    getFullCost(): number {
        return this.products.reduce((acc, item) => {
            if (item.price) {
                acc += item.price;
            }
            return acc;
        }, 0);
    }

    getProdctsCount(): number {
        return this.products.length;
    }

    hasProduct(id: string): boolean {
        return this.products.some((item) => item.id === id);
    }

    private notify() {
        this.events.emit("model:cart:update", {
            products: this.getProducts(),
            price: this.getFullCost(),
            count: this.getProdctsCount(),
        });
    }
}
