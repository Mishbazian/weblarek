
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
/**
 * Данные покупателя
 */
export interface IBuyer {
    payment: TPayment; // вид оплаты
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
/**
 * 
 */
export interface IOrder extends IBuyer {
    total: number; // - итоговая стоимость товаров в заказе
    items: IProduct["id"][]; // - массив с id товаров в заказзе
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IHeader {
    counter: number;
}

/**
 * Базовый тип данных продукта для приведения к виду необходимому в карточках */ 
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

/**
 * Тип - Объект с минимальным набором данных для карточки товара
 */
export type TCardBase = Pick<ICardProduct, "title" | "price">;
/**
 * Тип данных для установки в карточку товара изображения и категории
 */
export type TCardExt = Pick<ICardProduct, "image" | "category">;
export type TCardInfo = Pick<ICardProduct, "description">;
/**
 * Тип данных расширяющий базовые данные картоки товара порядковым номером в корзине. Для карточки в корзине.
 */
export type TCardCart = TCardBase & {
    index: number;
};

//Возможные значения состояния кнопки заказа в карточке
export type TOrderButtonState = "add" | "remove" | "disabled";
/**
 * Тип данных необходимый для render в CardPreviw
 */
export type TCardPreview = TCardInfo & {
    state: TOrderButtonState;
};
//Тип данных для установки соответствия состояния кнопки и текста
export type TCardStates = Record<TOrderButtonState, string>




//Типы для событий
/**
 * Перечень алиасов для стандартных событий браузера
 */
export type TStandardEvents = "onClick" | "onChange" | "onSubmit";

/**
 * Тип функции обработчика стандартного события браузера
 */
export type TEventHandle = (event: Event) => void;

/**
 * Тип объекта с набором обработчиков стандартных событий с литералом в ключе
 */
export type TActions = Record<TStandardEvents, TEventHandle>;

/**
 * Тип объекта с обработчиком события "onClick"
 */
export type TCardActions = Pick<TActions, "onClick">;

export type TFormActions = Pick<TActions, "onChange" | "onSubmit">
/**
 * Тип данных для рендера модального окна
 */
export interface IModal {
    content: HTMLElement; //содержимое модального окна
    open: boolean; // модальное окноЖ открыть да/нет
}

//Типы для форм
export type TFormStatus = {
    isSubmitDisabled: boolean;
    error: string;
};

export type TOrderPayment = "cash" | "card" | "";

export type TFormPayment = {
    payment: TOrderPayment;
};


