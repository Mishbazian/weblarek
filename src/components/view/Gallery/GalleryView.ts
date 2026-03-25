import { TGallery } from "../../../types";
import { Component } from "../../base/Component";


/**
 * контейнер для карточек каталога.
 */
export class GalleryView extends Component<TGallery> {
    private catalogueElement;

    constructor(container: HTMLElement) {
        super(container);
        this.catalogueElement = this.container;
    }

    set catalogue(items: HTMLElement[]) {
        this.catalogueElement.replaceChildren();

        items.forEach((item) => {
            ;
            this.catalogueElement.append(item);
        });
    }
}
