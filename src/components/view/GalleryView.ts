import { Component } from "../base/Component";

interface IGallery {
    catalogue: HTMLElement[];
}
export class GalleryView extends Component<IGallery> {
    private catalogueElement;

    constructor(container: HTMLElement) {
        super(container);
        this.catalogueElement = this.container;
    }

    protected set catalogue(items: HTMLElement[]) {
        this.catalogueElement.replaceChildren();

        items.forEach((item) => {
            ;
            this.catalogueElement.append(item);
        });
    }
}
