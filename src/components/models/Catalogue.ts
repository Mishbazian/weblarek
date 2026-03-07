import { IProduct } from "../../types";

export class Catalogue {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

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
    }
    
    setSelectedProduct(product: IProduct) {
        this.selectedProduct = product;
    }
}
