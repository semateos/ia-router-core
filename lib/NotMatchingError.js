(function (Router, Error) {
    "use strict";

    /**
     * Error class thrown if a route does not match
     *
     * @class NotMatchingError
     * @namespace Router
     * @extends Error
     * @param {Router.Routes.Regex|Router.SimpleRouteList} route The route or list not matching
     * @param {String} url The URL not matching the route
     * @constructor
     */
    Router.NotMatchingError = function (route, url) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {Router.Routes.Regex}
         */
        var self = this;

        /**
         * Get the route not matching
         *
         * @method getRoute
         * @returns {Router.Routes.Regex|Router.SimpleRouteList}
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
}(Router, Error));
