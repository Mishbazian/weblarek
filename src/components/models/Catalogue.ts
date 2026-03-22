import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalogue {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;
    constructor(private events: IEvents) {}

    getProducts(): IProduct[] {
        return this.products;
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }

    getProductById(id: IProduct["id"]): IProduct | undefined {
        return this.products.find((item) => item.id === id);
    }

    setProducts(productsList: IProduct[]) {
        this.products = [...productsList];
        this.events.emit("model:catalogue:update", this.getProducts());
    }

    setSelectedProduct(product: IProduct) {
        this.selectedProduct = product;
        this.events.emit(
            "model:catalogue:select",
            this.getSelectedProduct() as IProduct,
        );
    }
}
