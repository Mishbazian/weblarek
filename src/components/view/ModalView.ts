import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

/**
 * Модальное окно. Расширяет Component элементом для внутреннего контента и кнопкой закрытия. Передает событие клика на кнопку закрытия в брокер событий.
 */
export class ModalView extends Component<IModal> {
    private closeButton: HTMLButtonElement;
    private contentContainer: HTMLElement;
    /**
     * @constructor создает экземпляр Модального кна
     * @param events - интерфейс брокера событий
     * @param container - контейнер модального окна
     */
    constructor(
        private events: IEvents,
        container: HTMLElement,
    ) {
        super(container as HTMLElement);
        this.closeButton = ensureElement<HTMLButtonElement>(
            ".modal__close",
            this.container,
        );
        this.contentContainer = ensureElement<HTMLElement>(".modal__content");
        this.container.addEventListener("click", (e) => {
            if (e.target === e.currentTarget || e.target === this.closeButton) {
                this.events.emit("modal:close");
            }
        });
    }
    // установить содержимое модального окна
    set content(item: HTMLElement) {
        this.contentContainer.replaceChildren(item);
    }
    set open(value: boolean) {
        this.container.classList.toggle("modal_active", value);}
}
