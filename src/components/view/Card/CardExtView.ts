import { TCardExt } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

/**
 * .Абстрактный класс для карточки товара с дополнительными полями (категория, изображение) Расширяет CardView.
 * @template T - тип дополнительных данных карточки, объединяемый с TCardExt.
 */
export abstract class CardExtView<T> extends CardView<TCardExt & T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    /**
     * @constructor Создает экземпляр CardExtView.
     * @param {HTMLElement} container - DOM-элемент, содержащий структуру карточки.
     */
    constructor(container: HTMLElement) {
        super(container);
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
    set image({ url, alt }: TCardExt["image"]) {
        this.setImage(this.imageElement, url, alt);
    }
}
