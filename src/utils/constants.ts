import { TCardStates, TPaymentMap } from "../types";

/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/**
 *@constant Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};


/**
 * @constant константа соответствия состояний кнопки покупки товара
 */
export const cardActions: TCardStates = {
    add: "Купить",
    remove: "Удалить из корзины",
    disabled: "Недоступно",
};

/**
 *@constant Константа приведения типа платежа в представлении(ключ) и в модели данных(значение)
 */
export const paymentTypeMap: TPaymentMap = {
  "cash": "cash",
  "online": "card",
  "": ""
}

// Селекторы 

export const VIEW_SELECTORS = {
  CARD: {
    CATALOGUE: "#card-catalog",
    CART: "#card-basket",
    PREVIEW: '#card-preview'
  }
}


