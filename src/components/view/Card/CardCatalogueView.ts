import { TCardActions } from "../../../types";
import { CardExtView } from "./CardExtView";
/**
 * Карточка товара в каталоге. Добавляет родительскому классу генерацию событий.
 */
export class CardCatalogueView extends CardExtView<void> {
    /**
     * @constructor создает экземпляр карточки и устанавливает обработчик события клика.
     * @param {HTMLElement} container - DOM элемент, содержащий структуру карточки
     * @param {object} actions - объект, содержащий коллбэк-функцию для обработки событий.
     */
    constructor(container: HTMLElement, actions: TCardActions) {
        super(container);
        this.container.addEventListener('click', actions.onClick)
    }
}
