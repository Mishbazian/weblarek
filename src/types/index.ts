export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods,
    ): Promise<T>;
}

export type TPayment = "Cash" | "Online" | "";

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TValidationRules<T> = {
    [key in keyof T]: {
        validateFn: () => boolean;
        message: string;
    };
};

export type TValidationErrorMessages<T> = {
    [key in keyof T]: string;
};

export interface IProductResponse {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: IProduct["id"][];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IHeader {
    counter: number;
}


export interface ICardBase {
    title: string;
    price: string;
}

export interface ICardInfo extends ICardBase {
    category: string;
    image: {
        url: string;
        alt?: string;
    }
}

export interface ICardCatalogue extends ICardInfo {

}

export interface ICardCart extends ICardBase {
    index: number;
}

export interface ICardPreview extends ICardInfo {
    descrition: string;
}

export interface ICardProduct extends ICardPreview {
    id: string
}

