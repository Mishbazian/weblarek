import { TCardActions, TCardExtInfo, TCardProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

/**
 * Абстрактный класс для карточки товара с дополнительными полями (категория, изображение).
Расширяет CardView возможностью установки категории и изображения товара.
Дженерик, принимает T - тип дополнительных данных карточки для метода render().
 */
export abstract class CardExtView<T> extends CardView<TCardExtInfo & T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    /**
     * @constructor Создает экземпляр CardExtView.
     * @param {HTMLElement} container - DOM-элемент, содержащий структуру карточки.
     * @param {HTMLElement} mainActionElement - элемент, который должен вызывать событие при клике
     * @param {object?} actions - объект, содержащий коллбэк-функции для обработки событий.
     */
    constructor(
        container: HTMLElement,
        mainActionElement: HTMLElement,
        actions?: TCardActions,
    ) {
        super(container, mainActionElement, actions);
        this.categoryElement = ensureElement(".card__category", this.container);
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            this.container,
        );
    }

    /**
     * Устанавливает категорию карточки.
     * Обновляет текстовое содержимое элемента категории и переключает CSS-класс элемента в соответствии с categoryMap.
     * @param {string} value - название категории.
     */
    set category(value: string) {
        this.categoryElement.textContent = value;
        for (const key in categoryMap) {
            const mapValue: string =
                categoryMap[key as keyof typeof categoryMap];
            this.categoryElement.classList.toggle(mapValue, key === value);
        }
    }
    /**
     * Устанавливает изображение карточки.
     * Делегирует установку изображения методу setImage родительского класса.
     * @param {Object} image - объект с данными изображения.
     * @param {string} image.url - URL изображения.
     * @param {string} image.alt - альтернативный текст.
     */
    set image({ url, alt }: TCardProduct["image"]) {
        this.setImage(this.imageElement, url, alt);
    }
}
