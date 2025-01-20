import Block from "./Block";

const COLOR_ARR = ['#cccccc', '#aaaaaa', '#999999', '#666666', '#444444'];

export default class Container {
    displayCounts: number = 5;
    containerEl: HTMLElement = document.createElement('div');
    
    private blocks: Block[] = [];
    private emptyBlock: Block;

    constructor(containerEl: HTMLElement) {
        this.containerEl = containerEl;
        this.emptyBlock = new Block({
            text: 'Контейнер пуст',
            height: '100%',
            color: 'transparent'
        })

        this.fixStyles();
        this.registerChildrenNodes();

        this.render();
    }

    get heightStr() {
        return `calc(100% / ${this.displayCounts})`
    }

    get nextColor() {
        return COLOR_ARR[this.blocks.length % COLOR_ARR.length]
    }

    addBlock() {
        const block = new Block({ 
            text: String(this.blocks.length), 
            height: this.heightStr,
            color: this.nextColor
        });

        this.blocks.push(block);

        this.render();
    }

    removeBlock() {
        this.blocks.pop()?.remove();

        this.render();
    }

    render() {
        const index = Math.max(this.blocks.length - this.displayCounts, 0);

        if (this.blocks.length === 0) {
            this.emptyBlock.mount(this.containerEl);
        } else {
            this.emptyBlock.remove();
            this.blocks[index - 1]?.remove();

            for (let i = index; i < this.blocks.length; i++) {
                this.blocks[i].mount(this.containerEl, this.blocks[i + 1]);
            }
        }
    }

    private registerChildrenNodes() {
        console.log(this.containerEl);
        Array.from(this.containerEl.childNodes).forEach(node => {
            if (node instanceof HTMLElement && Block.checkNode(node)) {
                const block = new Block({
                    el: node,
                    text: node.textContent ?? '',
                    height: this.heightStr,
                    color: this.nextColor
                });

                this.blocks.push(block);
            } else node.remove();
        });

    }

    private fixStyles() {
        this.containerEl.style.height = '100%';
        this.containerEl.style.width = '100%';
    }
}