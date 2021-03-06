import { Logging, LogLevel } from '../../../core';
import { ResourceService } from '../../service';
/**
 * SVG resource class for CSS class.
 */
var SvgResource = (function () {
    /**
     * Initializes a new instance of the SvgResource class.
     *
     * @param svg the svg object generated by gulp-svg-code.
     */
    function SvgResource(svg) {
        this.svg = svg;
        this.svgInlineResource = new SvgInlineResource(this.svg);
    }
    /**
     * Build svg resources from SVG object, and register the resource service.
     *
     * @param resourceService the resource service.
     * @param svg the svg object generated by gulp-svg-code.
     */
    SvgResource.buildRegister = function (resourceService, svg) {
        // register SVG resources to resource service.
        resourceService.register(ResourceService.svgType, new SvgResource(svg));
        resourceService.register(ResourceService.svgInlineType, new SvgInlineResource(svg));
    };
    /**
     * Find SVG string by id.
     *
     * @param id the identification of SVG. (id must be lower case)
     */
    SvgResource.prototype.find = function (id) {
        var result = this.svgInlineResource.findIndex(id);
        if (!result) {
            return null;
        }
        var segments = result.name.split('/');
        return 'svg-' + segments.join('--');
    };
    return SvgResource;
}());
export { SvgResource };
/**
 * SVG inline resource class for ram SVG insertion.
 */
var SvgInlineResource = (function () {
    /**
     * Initializes a new instance of the SvgInlineResource class.
     *
     * @param svg the svg object generated by gulp-svg-code.
     */
    function SvgInlineResource(svg) {
        this.svg = svg;
        this.lowerSvg = this.createLowercaseIndexing(this.svg);
    }
    /**
     * Find SVG string by id.
     *
     * @param id the identification of SVG. (id must be lower case)
     * @return string the Svg resource string.
     */
    SvgInlineResource.prototype.find = function (id) {
        var result = this.lowerSvg[id];
        if (!result) {
            Logging.log({
                level: LogLevel.Warning,
                message: "Unable to find SVG resource for " + id,
                params: {
                    id: id
                },
                source: 'SvgInlineResource'
            });
            return null;
        }
        return result.value;
    };
    /**
     * Find index data.
     *
     * @param id the identification of SVG.
     * @return SvgIndexedData the indexed data.
     */
    SvgInlineResource.prototype.findIndex = function (id) {
        return this.lowerSvg[id];
    };
    /**
     * Create lower case property version.
     *
     * @param svg the original svg data.
     * @return any the lower case version of svg.
     */
    SvgInlineResource.prototype.createLowercaseIndexing = function (svg) {
        var _this = this;
        var newSvg = {};
        var nextCollection = [{ target: svg, path: '' }];
        while (nextCollection.length > 0) {
            var collection = nextCollection;
            nextCollection = [];
            var _loop_1 = function (current) {
                MsftSme.forEachKey(current.target, function (key, value) {
                    var path = _this.nextPath(current.path, key);
                    if (value && typeof value === 'object') {
                        // add to next level traverse.
                        nextCollection.push({ target: value, path: path });
                    }
                    else {
                        // register to the collection.
                        var lower = path.toLowerCase();
                        newSvg[lower] = {
                            name: path,
                            lower: lower,
                            value: value
                        };
                    }
                });
            };
            for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
                var current = collection_1[_i];
                _loop_1(current);
            }
        }
        return newSvg;
    };
    SvgInlineResource.prototype.nextPath = function (path, key) {
        return path === '' ? key : path + '/' + key;
    };
    return SvgInlineResource;
}());
export { SvgInlineResource };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGlyZWN0aXZlcy9zdmcvc3ZnLXJlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYWhEOztHQUVHO0FBQ0g7SUFlSTs7OztPQUlHO0lBQ0gscUJBQW9CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBbkJEOzs7OztPQUtHO0lBQ1cseUJBQWEsR0FBM0IsVUFBNEIsZUFBZ0MsRUFBRSxHQUFRO1FBQ2xFLDhDQUE4QztRQUM5QyxlQUFlLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RSxlQUFlLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFXRDs7OztPQUlHO0lBQ0ksMEJBQUksR0FBWCxVQUFZLEVBQVU7UUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FB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