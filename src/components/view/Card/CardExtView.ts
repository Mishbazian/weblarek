import { TCardExt } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

export abstract class CardExtView<T> extends CardView<TCardExt & T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);
        this.categoryElement = ensureElement(".card__category", this.container);
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            this.container,
        );
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        for (const key in categoryMap) {
            const mapValue: string =
                categoryMap[key as keyof typeof categoryMap];
            this.categoryElement.classList.toggle(mapValue, key === value);
        }
    }
    set image({ url, alt }: TCardExt["image"]) {
        this.setImage(this.imageElement, url, alt);
    }
}
