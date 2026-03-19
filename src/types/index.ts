export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods,
    ): Promise<T>;
}

export type TPayment = "cash" | "online" | "";

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
export interface ICardProduct {
    id: string;
    title: string;
    price: string;
    category: string;
    image: {
        url: string;
        alt?: string;
    };
    description: string;
}

export type TCardBase = Pick<ICardProduct, "title" | "price">
export type TCardExt = Pick<ICardProduct, "image" | "category">

export type TCardInfo = Pick<ICardProduct, "description">
export type TCardCart = TCardBase & {
    index: number;
}
export type TControlState = { text: string; disabled: boolean }
export type TCardPreview = TCardInfo & {
    orderButtonState: TControlState;
}

export type TFormStatus = {
    isSubmitDisabled: boolean;
    error: string;
}


export type TOrderPayment = "cash" | "card" | "";

export type TFormPayment = {
    payment: TOrderPayment;
};
