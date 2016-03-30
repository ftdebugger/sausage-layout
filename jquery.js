import {SausageLayout} from './index';

export class jQuerySausageLayout extends SausageLayout {

    /**
     * @param {{$container: (jQuery|cheerio)}} options
     */
    constructor(options) {
        super(options);
        
        this.$container = options.$container;
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
    resize(containerWidth) {
        super.resize(containerWidth);

        var $children = this.$container.children();

        for (var index = 0; index < $children.length; index++) {
            this.appendElement($children.eq(index));
        }

        this._resizeContainer();
    }

    /**
     * @param {jQuery|cheerio} $element
     * @private
     */
    _appendElement($element) {
        let {width, height} = $element.data();
        let {top, left} = this.append({
            width: Number(width),
            height: Number(height)
        });

        $element.css({
            left: left + 'px',
            top: top + 'px'
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
    }

}