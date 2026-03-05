import { IProduct } from "../../types";

export class Cart {
    products: IProduct[] = [];

    getProducts(): IProduct[] {
        return this.products;
    }

    addProduct(product: IProduct): void {
        if (!this.products.includes(product) && product.price) {
            this.products.push(product);
        }
    }

    removeProduct(id: string): void {
        const removeIndex = this.products.findIndex((item) => item.id === id);
        this.products.splice(removeIndex, 1);
    }

    clearProducts(): void {
        this.products.splice(0);
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
}
