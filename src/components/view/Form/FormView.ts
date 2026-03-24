import { TFormStatus } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

/**
 * Базовый класс для отображения форм. Расширяет Component. Эмитирует браузерные события change и submit с данными формы через полученный в конструкторе интерфейс брокера сообщений и выводит сообщения об ошибках.
 */
export abstract class FormView<T> extends Component<TFormStatus & T> {
    protected form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    /**
     * @constructor создает экземпляр формы
     * @param {HTMLElement} container - контейнер содержащий форму
     * @param {TFormActions} actions -  объект, содержащий коллбэк-функции для обработки событий.
     */
    constructor(private events: IEvents, container: HTMLElement) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>(
            '[type="submit"]',
            this.container,
        );
        this.errorsElement = ensureElement(".form__errors", this.container);
        this.form = this.container as HTMLFormElement;

        this.form.addEventListener("change", () => {
            events.emit('form:${this.form.name}:change', new FormData(this.form))
        });

          this.form.addEventListener("submit", (e) => {
              e.preventDefault();
              this.events.emit(`form:${this.form.name}:submit`, new FormData(this.form));
    })}

    set isSubmitDisabled(value: boolean) {
        this.submitButton.disabled = value;
    }

    set errors(message: string) {
        this.errorsElement.textContent = message;
    }
}
