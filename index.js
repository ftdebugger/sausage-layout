export class SausageLayout {

    /**
     * @param {number} minWidth
     * @param {number} maxWidth
     * @param {number} gutter
     */
    constructor({minWidth, maxWidth, gutter = 0}) {
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.gutter = gutter;
    }

    /**
     * @param {number} containerWidth
     */
    resize(containerWidth) {
        let maxCount = Math.floor((containerWidth + this.gutter) / (this.maxWidth + this.gutter)),
            maxWidth = maxCount * (this.maxWidth + this.gutter) - this.gutter;

        if (maxWidth < containerWidth) {
            maxCount++;
        }

        if (maxCount <= 0) {
            this.columns = 1;
        } else {
            this.columns = maxCount;
        }

        let rawWidth = containerWidth - this.gutter * (this.columns - 1),
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

        left = (this.width + this.gutter) * columnIndex;
        top = columnHeight;

        this.heights[columnIndex] += height;

        return {left, top, width, height};
    }

}