(function (Router, NotMatchingError, _) {
    "use strict";

    /**
     * @class SimpleRouteList
     * @namespace InnoAccel.Router
     * @param {InnoAccel.Router.RouteMatch[]} routes The set of routes to match for
     * @constructor
     */
    Router.SimpleRouteList = function (routes) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {InnoAccel.Router.SimpleRouteList}
         */
        var self = this;

        /**
         * Add a route to end the list
         *
         * @method addRoute
         * @param {InnoAccel.Router.Regex} route
         * @chainable
         * @returns {InnoAccel.Router.SimpleRouteList}
         */
        self.addRoute = function (route) {
            routes.push(route);
            return self;
        };

        /**
         * Get all routes of this list
         *
         * @method getRoutes
         * @returns {InnoAccel.Router.Regex[]}
         */
        self.getRoutes = function () {
            return routes;
        };

        /**
         * Check if any route of the list does match
         *
         * @method doesMatch
         * @param {String} url The url to match against
         * @returns {boolean}
         */
        self.doesMatch = function (url) {
            return !_.isUndefined(
                _.find(routes, function (route) {
                    return route.doesMatch(url);
                })
            );
        };

        /**
         * Match the first route of the list and return the RouteMatch
         *
         * Throws a {{#crossLink "InnoAccel.Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method match
         * @param {String} url
         * @returns {InnoAccel.Router.RouteMatch}
         */
        self.match = function (url) {
            var route = _.find(routes, function (route) { return route.doesMatch(url)});
            if (!route) {
                throw new NotMatchingError(self, url);
            }
            return route.match(url);
        };
    };
}(InnoAccel.Router, InnoAccel.Router.NotMatchingError, _));
