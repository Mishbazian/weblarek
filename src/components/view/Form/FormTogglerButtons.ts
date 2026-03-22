import {
    createElement,
    ensureAllElements,
    SelectorCollection,
} from "../../../utils/utils";
import { IFormToggler } from "./FormOrderView";

/**
 * Вспомогательный класс для использования кнопок в качестве переключателя. * Создает скрытый инпут. в который по клику на кнопке передает в инпут значение `name` кнопки и генерирует событие `change` для централизованной обработки. Позволяет установить класс для отображения активной кнопки(самостоятельное переключение класса по клику исключено).
 */
export class FormTogglerButtons implements IFormToggler {
    controls: HTMLButtonElement[];
    input: HTMLInputElement;
    /**
     * @constructor создает экземпляр переключателя
     * @param {HTMLElement} container - родительский контейнер для всех кнопок переключателя
     * @param {string} selector - селектор для поиска кнопок (должен быть одинаковым для всех кнопок)
     * @param {string} inputName  - имя скрытого инпута, устанавливается в `input.name` для корректного сбора FormDate.
     * @param {string} activeButtonClassName - имя класса для активной кнопки
     */
    constructor(
        private container: HTMLElement,
        selector: SelectorCollection<HTMLButtonElement>,
        inputName: string,
        private readonly activeButtonClassName: string,
    ) {
        this.controls = ensureAllElements(selector, this.container);
        this.input = createElement<HTMLInputElement>("input", {
            name: inputName,
            type: "hidden",
            value: "",
        });
        this.container.appendChild(this.input);
        this.container.addEventListener("click", (e) => {
            if (
                e.target instanceof HTMLButtonElement &&
                this.controls.includes(e.target)
            ) {
                this.input.value = e.target.name;
                this.container.dispatchEvent(new Event("change"));
            }
        });
    }

    set activeButton(name: string) {
        this.controls.forEach((button) =>
            button.classList.toggle(
                this.activeButtonClassName,
                name === button.name,
            ),
        );
        this.input.value = name;
    }
}
