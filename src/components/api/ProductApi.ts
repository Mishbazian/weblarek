import { IApi, IBuyer, IOrder, IOrderResponse, IProduct, IProductResponse } from "../../types";

export class ProductApi {
    private api: IApi;
    private readonly productsUri: string = "/product";
    private readonly orderUri: string = "/order";

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> {
        const resp: IProductResponse = await this.api.get(this.productsUri);
        if(!resp.items) { return []}
        return resp.items
    }

    async postOrder(
        items: IProduct["id"][],
        total: number,
        buyer: IBuyer,
    ): Promise<IOrderResponse> {
        const data: IOrder = Object.assign(
            {
                items,
                total,
            },
            buyer,
        );
        return await this.api.post(this.orderUri, data)
    }
}
