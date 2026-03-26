import { IEvents } from "../components/base/Events";

/** Методы запросов к API */
export type ApiPostMethods = "POST" | "PUT" | "DELETE";
/** Интерфейс базового API */
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods,
    ): Promise<T>;
}

/**Вид оплаты в модели Buyer - набор предопределенных значений для выбора пользователем*/
export type TPayment = "cash" | "online" | "";
/**Вид оплаты в представлении FormOrderView */
export type TOrderPayment = "cash" | "card" | "";
/**Объект для приведения типов платежей в модели Buyer и в форме FormOrderView*/
export type TPaymentMap = Record<TPayment, TOrderPayment>;

/**определяет набор полей отдельного Товара в модели Catalogue.*/
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
/** Данные, отправляемые моделью Cart с событием model:cart:update */
export type TCartData = {
    products: IProduct[]; // массив товаров корзины
    price: number; // общая цена товаров в корзине
    count?: number; // количество товаров в корзине
};

/** Данные покупателя */
export interface IBuyer {
    payment: TPayment; // вид оплаты
    email: string;
    phone: string;
    address: string;
}
/**Тип объекта с правилами валидации полей объекта с типом полученным в T (напр. модели Buyer), требует соответствия ключей ключам T */
export type TValidationRules<T> = {
    [key in keyof T]: {
        validateFn: () => boolean;
        message: string;
    };
};
/**Тип данных объекта, содержащего сообщения об ошибках, принимает в T другой объект, ключи которого требуется продублировать  */
export type TValidationErrorMessages<T> = {
    [key in keyof T]: string;
};
/** Тип данных высылаемых моделью Buyer вместе с событием */
export type TBuyerData = {
    data: IBuyer;
    errors: Partial<TValidationErrorMessages<IBuyer>>;
};

/** Тип данных получаемых при запросе каталога продуктов */
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

/**Базовый тип данных товара приведенный к виду необходимому в карточках*/
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

/**Тип, расширяющий данные карточки товара для корзине.*/
export type TCardCartExt = {
    index: number;
};

/**Возможные значения состояния кнопки заказа в карточке*/
export type TOrderButtonState = "add" | "remove" | "disabled";
/**Тип данных объекта, устанавливающего соответствие состояния кнопки заказа и текста в ней*/
export type TCardStates = Record<TOrderButtonState, string>;

/**Тип данных для расширения данных карточки превью товара */
export type TCardFull = Pick<TCardProduct, "description"> & {
        state: TOrderButtonState;

};
/**Производные типы данных карточек, содержащие полный набор для отдельного компонента, включая данные родительского класса */
/**Производный тип данных карточки товара для каталога, содержащий полный набор, включая данные родительского класса */
export type TCardCatalogueView = TCardBaseInfo & TCardExtInfo;
/**Производный тип данных карточки товара для превью, содержащий полный набор, включая данные родительского класса */
export type TCardPreviewView = TCardBaseInfo & TCardExtInfo & TCardFull;
/**Производный тип данных карточки товара для корзины, содержащий полный набор, включая данные родительского класса */
export type TCardCartView = TCardBaseInfo & TCardCartExt;

/**Тип данных необходимых для render в CartView*/
export type TCart = {
    products: HTMLElement[]; // массив элементов карточек товара
    cartPrice: string; // итоговая стоимость всей корзины
    isCanOrder: boolean; // доступность покупки
};

//Типы для событий
/**Перечень алиасов для стандартных событий браузера*/
export type TStandardEvents = "onClick" | "onChange" | "onSubmit";

/**Тип данных - функция обработчик стандартного события браузера*/
export type TEventHandle = (event: Event) => void;

/**Тип объекта с набором обработчиков стандартных событий с литералом в ключе*/
export type TActions = Record<TStandardEvents, TEventHandle>;

/**Тип объекта с обработчикaми события для карточки*/
export type TCardActions = Pick<TActions, "onClick">;

/**Тип данных для рендера модального окна*/
export type TModal = {
    content: HTMLElement; //содержимое модального окна
    open: boolean; // модальное окно открыть да/нет
};

//Типы для форм
/** Объект данных принмаемых в render() FormView*/
export type TFormStatus = {
    isSubmitDisabled: boolean; // - отключить кнопку submit да/нет
    error: string; // - сообщение об ошибках формы
    reset: boolean; // - сбросить форму да/нет
};

/** Объект данных о типе платежа в форме */
export type TFormPayment = {
    payment: TOrderPayment;
};

/** Производный тип объединяющий все данные принимаемые FormOrder, включая типы от класса родителя */
export type TFormOrder = TFormStatus & TFormPayment;

/** Интерфейс кнопочного переключателя для формы */
export interface IFormToggler {
    controls: HTMLButtonElement[]; // список кнопок переключателя
    input: HTMLInputElement; // скрытый инпут
    set activeButton(value: string); // установить активную кнопку
}

/** ТИп данных для render в OrderSuccessView */
export type TOrderSuccess = {
    total: string; // Сообщение об итоговой сумме списания
};

/** Типы данных и интерфейсы требуемые Презентеру */

/** Интерфейс модели каталога требуемый Презентеру */
export interface ICatalogueModel {
    setProducts(productsList: IProduct[]): void;
    setSelectedProduct(product: IProduct): void;
    getSelectedProduct(): IProduct | null;
}

/**Интерфейс модели корзины требуемый Презентеру */
export interface ICartModel {
    getProducts(): IProduct[];
    addProduct(product: IProduct): void;
    removeProduct(product: IProduct): void;
    clearProducts(): void;
    getFullCost(): number;
    getProdctsCount(): number;
    hasProduct(id: string): boolean;
}
/** Интерфейс модели данных покупателя требуемый Презентеру */
export interface IBuyerModel {
    setData(fields: Partial<IBuyer>): void;
    getData(): IBuyer;
    clearData(): void;
    validateData(): Partial<TValidationErrorMessages<IBuyer>>;
}

/**Общий интерфейс требуемый Презентеру от слоя Модель */
export interface IModels {
    catalogue: ICatalogueModel;
    cart: ICartModel;
    buyer: IBuyerModel;
}

/**Дженерик интерфейс инстанса компонента Представления */
export interface IComponent<T> {
    render(data?: Partial<T>): HTMLElement;
}
/**Интерфейс Фабрики карточек */
export interface ICardFactory {
    createCardCatalogue: (
        actions: TCardActions,
    ) => IComponent<TCardCatalogueView>;
    createCardCart: (actions: TCardActions) => IComponent<TCardCartView>;
}
/**Интерфейс требуемый Презентеру от слоя Представления */
export interface IView {
    gallery: IComponent<TGallery>;
    modal: IComponent<TModal>;
    header: IComponent<THeader>;
    cardPreview: IComponent<TCardPreviewView>;
    cart: IComponent<TCart>;
    formOrder: IComponent<TFormOrder>;
    formContacts: IComponent<TFormStatus>;
    orderSuccess: IComponent<TOrderSuccess>;
    cardFactory: ICardFactory;
}
/** Интерфейс Апи требуемый Презентеру для обмена с сервером */
export interface IProductApi {
    getProducts(): Promise<IProduct[]>;
    postOrder(
        items: IProduct["id"][],
        total: number,
        buyer: IBuyer,
    ): Promise<IOrderResponse>;
}

//Интерфейсы конструкторов
/**Дженерик интерфейс конструктора компонента, принимающего коллбэк с эмиттером */
export interface IComponentWithEventCallbackParamConstructor<
    T,
    V extends Partial<TActions> | undefined,
> {
    new (container: HTMLElement, actions: V): IComponent<T>;
}
/**Дженерик интерфейс конструктора компонента, принимающего брокер событий */
export interface IComponentWithEmitterParamConstructor<T> {
    new (events: IEvents, container: HTMLElement): IComponent<T>;
}
/**Интерфейс конструктора карточек для корзины */
export type TCardCartConstructor = IComponentWithEventCallbackParamConstructor<
    TCardCartView,
    TCardActions
>;
/**Интерфейс конструктора карточек для превью */
export type TCardPreviewConstructor =
    IComponentWithEventCallbackParamConstructor<
        TCardPreviewView,
        TCardActions | undefined
    >;
/**Интерфейс конструктора карточек для каталога */
export type TCardCatalogueConstructor =
    IComponentWithEventCallbackParamConstructor<TCardCartView, TCardActions>;

export type THeaderConstructor = IComponentWithEmitterParamConstructor<THeader>;
export type TGalleryConstructor =
    IComponentWithEmitterParamConstructor<TGallery>;
export type TModalConstructor = IComponentWithEmitterParamConstructor<TModal>;
export type TCartConstructor = IComponentWithEmitterParamConstructor<TCart>;
export type TFormOrderConstructor =
    IComponentWithEmitterParamConstructor<TFormOrder>;
