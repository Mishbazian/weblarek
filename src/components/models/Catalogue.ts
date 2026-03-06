import { IProduct } from "../../types";

export class Catalogue {
    private products: IProduct[] = [];
    private selectedProduct?: IProduct;

    getProducts(): IProduct[] {
        return this.products;
    }

    getSelectedProduct(): IProduct {
        if (!this.selectedProduct) {
            throw new Error("Catalogue: selectedProduct is undefined");
        }
        return this.selectedProduct;
    }

    getProductById(id: string): IProduct {
        const product: IProduct | undefined = this.products.find((item) => item.id === id);
        if (!product) {
            throw new Error("Catalogue: wrong product id");
        }
        return product;
    }

    setProducts(productsList: IProduct[]) {
        this.products = [...productsList];
    }
    setSelectedProduct(id: string) {
        const product: IProduct = this.getProductById(id);
        this.selectedProduct = product;
    }
}
