export class SausageLayout {

    /**
     * @param {number} minWidth
     * @param {number} maxWidth
     * @param {number} [gutter]
     * @param {number} [gutterX]
     * @param {number} [gutterY]
     */
    constructor({minWidth, maxWidth, gutterX, gutterY, gutter = 0}) {
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.gutterX = gutterX || gutter;
        this.gutterY = gutterY || gutter;
    }

    /**
     * @param {number} containerWidth
     */
    resize(containerWidth) {
        let maxCount = Math.floor((containerWidth + this.gutterX) / (this.maxWidth + this.gutterX)),
            maxWidth = maxCount * (this.maxWidth + this.gutterX) - this.gutterX;

        if (maxWidth < containerWidth) {
            maxCount++;
        }

        if (maxCount <= 0) {
            this.columns = 1;
        } else {
            this.columns = maxCount;
        }

        let rawWidth = containerWidth - this.gutterX * (this.columns - 1),
            width = rawWidth / this.columns;

        if (width < this.minWidth) {
            this.width = this.minWidth;
        } else {
            this.width = width;
        }

        this.heights = [];

        for (var i = 0; i < this.columns; i++) {
            this.heights.push(0);
        }
    }

    /**
     * @param {number} width
     * @param {number} height
     *
     * @returns {{left: number, top: number}}
     */
    append({width = this.width, height}) {
        let columnIndex = this.heights.indexOf(Math.min.apply(Math, this.heights)),
            columnHeight = this.heights[columnIndex],
            left, top;

        if (width !== this.width) {
            height = this.width * height / width;
            width = this.width;
        }

        left = (this.width + this.gutterX) * columnIndex;
        top = columnHeight;

        this.heights[columnIndex] += height + this.gutterY;

        return {left, top, width, height};
    }

}
