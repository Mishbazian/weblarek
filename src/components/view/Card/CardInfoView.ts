import { ICardInfo } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { CardView } from "./CardView";

export abstract class CardInfoView<
    T extends ICardInfo,
> extends CardView<ICardInfo> {
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

    set category(value: ICardInfo["category"]) {
        this.categoryElement.textContent = value;
        for (const key in categoryMap) {
            const mapValue: string =
                categoryMap[key as keyof typeof categoryMap];
            this.categoryElement.classList.toggle(mapValue, key === value);
        }
    }
    set image({ url, alt }: ICardInfo["image"]) {
        this.setImage(this.imageElement, url, alt);
    }

    render(data: Partial<T>) {
        return super.render(data);
    }
}
