import { TActions } from "../types";

export function pascalToKebab(value: string): string {
    return value.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function isSelector(x: any): x is string {
    return typeof x === "string" && x.length > 1;
}

export function isEmpty(value: any): boolean {
    return value === null || value === undefined;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(
    selectorElement: SelectorCollection<T>,
    context: HTMLElement = document as unknown as HTMLElement,
): T[] {
    if (isSelector(selectorElement)) {
        return Array.from(context.querySelectorAll(selectorElement)) as T[];
    }
    if (selectorElement instanceof NodeList) {
        return Array.from(selectorElement) as T[];
    }
    if (Array.isArray(selectorElement)) {
        return selectorElement;
    }
    throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(
    selectorElement: SelectorElement<T>,
    context?: HTMLElement,
): T {
    if (isSelector(selectorElement)) {
        const elements = ensureAllElements<T>(selectorElement, context);
        if (elements.length > 1) {
            console.warn(
                `selector ${selectorElement} return more then one element`,
            );
        }
        if (elements.length === 0) {
            throw new Error(`selector ${selectorElement} return nothing`);
        }
        return elements.pop() as T;
    }
    if (selectorElement instanceof HTMLElement) {
        return selectorElement as T;
    }
    throw new Error("Unknown selector element");
}

export function cloneTemplate<T extends HTMLElement>(
    query: string | HTMLTemplateElement,
): T {
    const template = ensureElement(query) as HTMLTemplateElement;
    if (!template.content.firstElementChild) {
        throw new Error(`Template ${query} has no content`);
    }
    return template.content.firstElementChild.cloneNode(true) as T;
}

export function bem(
    block: string,
    element?: string,
    modifier?: string,
): { name: string; class: string } {
    let name = block;
    if (element) name += `__${element}`;
    if (modifier) name += `_${modifier}`;
    return {
        name,
        class: `.${name}`,
    };
}

export function getObjectProperties(
    obj: object,
    filter?: (name: string, prop: PropertyDescriptor) => boolean,
): string[] {
    return Object.entries(
        Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj)),
    )
        .filter(([name, prop]: [string, PropertyDescriptor]) =>
            filter ? filter(name, prop) : name !== "constructor",
        )
        .map(([name]) => name);
}

/**
 * Устанавливает dataset атрибуты элемента
 */
export function setElementData<T extends Record<string, unknown> | object>(
    el: HTMLElement,
    data: T,
) {
    for (const key in data) {
        el.dataset[key] = String(data[key]);
    }
}

/**
 * Получает типизированные данные из dataset атрибутов элемента
 */
export function getElementData<T extends Record<string, unknown>>(
    el: HTMLElement,
    scheme: Record<string, Function>,
): T {
    const data: Partial<T> = {};
    for (const key in el.dataset) {
        data[key as keyof T] = scheme[key](el.dataset[key]);
    }
    return data as T;
}

/**
 * Проверка на простой объект
 */
export function isPlainObject(obj: unknown): obj is object {
    const prototype = Object.getPrototypeOf(obj);
    return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
    return typeof v === "boolean";
}

/**
 * Фабрика DOM-элементов в простейшей реализации
 * здесь не учтено много факторов
 * в интернет можно найти более полные реализации
 */
export function createElement<T extends HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    props?: Partial<Record<keyof T, string | boolean | object>>,
    children?: HTMLElement | HTMLElement[],
): T {
    const element = document.createElement(tagName) as T;
    if (props) {
        for (const key in props) {
            const value = props[key];
            if (isPlainObject(value) && key === "dataset") {
                setElementData(element, value);
            } else {
                // @ts-expect-error fix indexing later
                element[key] = isBoolean(value) ? value : String(value);
            }
        }
    }
    if (children) {
        for (const child of Array.isArray(children) ? children : [children]) {
            element.append(child);
        }
    }
    return element;
}

export function isFilledString(value: string): boolean {
    return value.trim().length > 0;
}
/**
 * Устанавливает подписки и обработчики на события из объекта events на контейнер. Понимает прямые названия события типа `click` и производные с префиксом `on`, например `onClick`
 * @param {HTMLElement} container - элемент, события которого отслеживать
 * @param {object} events - объект вида {onClick: handle}
 * @returns {Array} - массив объектов с параметрами готовыми для подстановки в функцию удаления слушателей.
 */
export function addHandledEventListeners(
    container: HTMLElement,
    events: Partial<TActions>,
): object[] {
    const listeners: object[] = [];
    Object.entries(events).forEach(([key, callback]) => {
        const eventName: string = key.replace(/^on/, "").toLowerCase();
        const listenerCb = (e: Event) => {
            if (eventName === "submit") {
                e.preventDefault();
            }
            callback(e);
        };
        container.addEventListener(eventName, listenerCb);
        listeners.push({ eventName: eventName, handler: listenerCb });
    });
    return listeners;
}

/**Фильтрует простой объект по ключам и возвращает строку. можно задать разделитель */
export function objectToString<T extends Record<string, string | number>>(
    obj: T,
    separator: string = "",
    ...filter: (keyof T)[]
): string {
    const arr: (keyof T)[] =
        filter.length > 0
            ? Object.keys(obj).filter((key) => filter.includes(key))
            : Object.keys(obj);

    return arr
        .map((key) => {
            return obj[key].toString();
        })
        .join(separator);
}
