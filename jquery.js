import {SausageLayout} from './index';

let uniqueId = 0;

export class jQuerySausageLayout extends SausageLayout {

    /**
     * @param {{$container: (jQuery|cheerio), $widthContainer: (jQuery|cheerio)}} options
     */
    constructor(options) {
        super(options);

        this.$container = options.$container;
        this.$widthContainer = options.$widthContainer || options.$container;
        this.destroyers = [];
    }

    /**
     * @param {jQuery|cheerio} $element
     */
    appendElement($element) {
        this._appendElement($element);
        this._resizeContainer();
    }

    /**
     * @param {number} containerWidth
     */
    resize(containerWidth = this.$widthContainer.width()) {
        super.resize(containerWidth);

        let $children = this.$container.children();

        for (let index = 0; index < $children.length; index++) {
            $children.css('width', this.width + 'px');
            $children.css('height', '');
        }

        for (let index = 0; index < $children.length; index++) {
            this.appendElement($children.eq(index));
        }

        this._resizeContainer();
    }

    /**
     * Watch for container
     *
     * @param $container
     */
    watch($container) {
        let eventName = 'resize.sausage' + uniqueId++;

        $container.on(eventName, () => {
            this.resize();
        });

        this.destroyers.push(() => {
            $container.off(eventName);
        });

        this.resize();
    }

    /**
     * Destroy listeners
     */
    destroy() {
        this.destroyers.forEach(fn => fn());
    }

    /**
     * @param {jQuery|cheerio} $element
     * @private
     */
    _appendElement($element) {
        let {width, height} = $element.data();

        if (!height && !width) {
            height = $element.height();
            width = $element.width();
        }

        let geometry = this.append({
            width: width ? Number(width) : undefined,
            height: height ? Number(height) : undefined
        });

        $element.css({
            left: geometry.left + 'px',
            top: geometry.top + 'px',
            width: geometry.width + 'px'
        });
    }

    /**
     * Change height of container
     *
     * @private
     */
    _resizeContainer() {
        let maxHeight = Math.max.apply(Math, this.heights);
        this.$container.css('height', maxHeight + 'px');

        if (this.$widthContainer !== this.$container) {
            this.$container.css('width', this.containerWidth + 'px');
        }
    }

}
