export class SausageLayout {

    /**
     * @param {number} minWidth
     * @param {number} maxWidth
     * @param {number} width
     * @param {number} [gutter]
     * @param {number} [gutterX]
     * @param {number} [gutterY]
     * @param {number} [maxColumns]
     */
    constructor({minWidth, maxWidth, gutterX, gutterY, width, gutter = 0, maxColumns = Infinity}) {
        this.minWidth = minWidth || width;
        this.maxWidth = maxWidth || width;

        this.gutterX = gutterX || gutter;
        this.gutterY = gutterY || gutter;

        this.maxColumns = maxColumns;
    }

    /**
     * @param {number} containerWidth
     */
    resize(containerWidth) {
        let maxCount = Math.floor((containerWidth + this.gutterX) / (this.maxWidth + this.gutterX));

        if (maxCount > this.maxColumns) {
            maxCount = this.maxColumns;
        }

        let maxWidth = maxCount * (this.maxWidth + this.gutterX) - this.gutterX;

        if (this.maxWidth === this.minWidth) {
            containerWidth = maxWidth
        } else {
            if (maxWidth < containerWidth) {
                maxCount++;
            }
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

        for (let i = 0; i < this.columns; i++) {
            this.heights.push(0);
        }

        this.containerWidth = containerWidth;
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

        left = this.getLeft(columnIndex);
        top = columnHeight;

        this.heights[columnIndex] += height + this.gutterY;

        return {left, top, width, height, columnIndex};
    }

    /**
     * @returns {number}
     */
    getLayoutHeight() {
        return Math.max.apply(Math, this.heights);
    }

    /**
     * @param {number} columnIndex
     * @returns {number}
     */
    getLeft(columnIndex) {
        return (this.width + this.gutterX) * columnIndex;
    }

}
