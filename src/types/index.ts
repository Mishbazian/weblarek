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
/** Данные, отправляемые моделью с событием model:cart:update */
export type TCartData = {
    products: IProduct[]; // массив товаров корзины
    price: number; // общая цена товаров в корзине
    count?: number; // количество товаров в корзине
}

/** Данные покупателя */
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
/**Данные высылаемые моделью Buyer вместе с событием */
export type TBuyerData = {
    data: IBuyer;
    errors: Partial<TValidationErrorMessages<IBuyer>>;
}

export interface IProductResponse {
    total: number;
    items: IProduct[];
}
/** Заказ к отправке на серввер */
export interface IOrder extends IBuyer {
    total: number; // - итоговая стоимость товаров в заказе
    items: IProduct["id"][]; // - массив с id товаров в заказзе
}
/**Ответ на успешный запрос заказа */
export interface IOrderResponse {
    id: string; // id заказа
    total: number; // - итоговая стоимость товаров в заказе
}

/**Тип данных для render в шапке сайта*/
export type THeader = {
    counter: number; // количество товаров в корзине
};

/**Тип данных для render компонента галереи*/
export type TGallery = {
    catalogue: HTMLElement[]; // массив элементов контента
};

/**Базовый тип данных продукта для приведения к виду необходимому в карточках*/
export type TCardProduct = {
    title: string;
    price: string;
    category: string;
    image: {
        url: string;
        alt?: string;
    };
    description: string;
};

/**Тип с минимальным набором данных для карточки товара*/
export type TCardBaseInfo = Pick<TCardProduct, "title" | "price">;

/**Тип данных для установки в карточку товара изображения и категории*/
export type TCardExtInfo = Pick<TCardProduct, "image" | "category">;

/**Тип данных для расширения данных карточки товара в корзине.*/
export type TCardCartExt = {
    index: number;
};

/**Возможные значения состояния кнопки заказа в карточке*/
export type TOrderButtonState = "add" | "remove" | "disabled";
/**Тип данных для установки соответствия состояния кнопки и текста*/
export type TCardStates = Record<TOrderButtonState, string>;

/**Тип данных для расширения данных карточки превью товара */
export type TCardFull = Pick<TCardProduct, "description"> & {
    state: TOrderButtonState;

};
//Все типы данных карточек собранные в один
export type TCardCatalogueView = TCardBaseInfo & TCardExtInfo
export type TCardPreview = TCardBaseInfo & TCardExtInfo & TCardFull
export type TCardCartView = TCardBaseInfo & TCardCartExt



/**Тип данных необходимый для render в CartView*/
export type TCart = {
    products: HTMLElement[]; // массив элементов карточек товара
    cartPrice: string; // итоговая стоимость всей корзины
    isCanOrder: boolean; // доступность покупки
};

//Типы для событий
/**Перечень алиасов для стандартных событий браузера*/
export type TStandardEvents = "onClick" | "onChange" | "onSubmit";

/**Тип функции обработчика стандартного события браузера*/
export type TEventHandle = (event: Event) => void;

/**Тип объекта с набором обработчиков стандартных событий с литералом в ключе*/
export type TActions = Record<TStandardEvents, TEventHandle>;

/**Тип объекта с обработчикaми события для карточки*/
export type TCardActions = Pick<TActions, "onClick">;

/**Тип объекта с обработчикaми события для корзины*/
export type TCartActions = Pick<TActions, "onClick">;

/**Тип объекта с обработчикaми событий для формы*/
export type TFormActions = Pick<TActions, "onChange" | "onSubmit">;
/**Тип объекта с обработчикaми события для окна успешного заказа*/
export type TOrderSuccessActions = Pick<TActions, "onClick">;
/**Тип данных для рендера модального окна*/
export type TModal = {
    content: HTMLElement; //содержимое модального окна
    open: boolean; // модальное окно открыть да/нет
};

//Типы для форм
export type TFormStatus = {
    isSubmitDisabled: boolean;
    error: string;
};

export type TOrderPayment = "cash" | "card" | "";

export type TFormPayment = {
    payment: TOrderPayment;
};
/**Приведение типов платежей в модели и в форме */
export type TPaymentMap = Record<TPayment, TOrderPayment>

export type TFormOrder = TFormStatus & TFormPayment

export type TOrderSuccess = {
    total: string;
};
