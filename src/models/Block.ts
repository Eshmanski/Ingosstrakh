
export type BlockOptions = {
    el?: HTMLElement;
    text: string;
    height: string;
    color: string;
}

export default class Block {
    blockEl: HTMLElement;
    private _isMounted = false;

    constructor({ el, text, height, color }: BlockOptions) {
        this.blockEl = el ?? document.createElement('div');
        this.blockEl.textContent = text;
        this.blockEl.style.height = height;
        this.blockEl.style.width = '100%';
        this.blockEl.style.backgroundColor = color;
        this.blockEl.classList.add('block');
        this.blockEl.dataset.type = 'block';

        this._isMounted = Boolean(el);
    }

    get isMounted() {
        return this._isMounted; 
    }

    mount(parent: HTMLElement, nextEl?: Block) {
        if (this._isMounted) return;

        if (nextEl && nextEl.isMounted) {
            parent.insertBefore(this.blockEl, nextEl.blockEl);
        } else parent.appendChild(this.blockEl);
        
        this._isMounted = true;
    }

    remove() {
        if (!this._isMounted) return;

        this.blockEl.remove();
        this._isMounted = false;
    }

    static checkNode(el: HTMLElement) {
        console.log(el)
        return el.dataset.type === 'block';
    }
}