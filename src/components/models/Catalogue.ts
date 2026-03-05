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

    getProductById(id: string) {
        
        return this.products.find((item) => item.id === id);
    }

    setProducts(productsList: IProduct[]) {
        this.products = [...productsList];
    }
    setSelectedProduct(id: string) {
        const product = this.getProductById(id);
        if (!product) {
            throw new Error("Catalogue: Wrong product id");
        }
        this.selectedProduct = product;
    }
}
