(function (Router, Error) {
    "use strict";

    /**
     * Error class thrown if a route does not match
     *
     * @class NotMatchingError
     * @namespace InnoAccel.Router
     * @extends Error
     * @param {InnoAccel.Router.Regex|InnoAccel.Router.SimpleRouteList} route The route or list not matching
     * @param {String} url The URL not matching the route
     * @constructor
     */
    Router.NotMatchingError = function (route, url) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {InnoAccel.Router.Regex}
         */
        var self = this;

        /**
         * Get the route not matching
         *
         * @method getRoute
         * @returns {InnoAccel.Router.Regex|InnoAccel.Router.SimpleRouteList}
         */
        self.getRoute = function () {
            return route;
        };

        /**
         * Get the URL not matching the route
         *
         * @method getURL
         * @returns {String}
         */
        self.getURL = function () {
            return url;
        };

        self.message = 'Route is not matching ' + url;
    };

    function ErrorSurrogateConstructor() {}
    ErrorSurrogateConstructor.prototype = Error.prototype;
    Router.NotMatchingError.prototype = new ErrorSurrogateConstructor();
    Router.NotMatchingError.prototype.constructor = Router.NotMatchingError;
}(InnoAccel.Router, Error));
