(function (Router, NotMatchingError, _) {
    "use strict";

    /**
     * @class SimpleRouteList
     * @namespace Router
     * @param {Router.RouteMatch[]} routes The set of routes to match for
     * @constructor
     */
    Router.SimpleRouteList = function (routes) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {Router.SimpleRouteList}
         */
        var self = this;

        /**
         * Add a route to end the list
         *
         * @method addRoute
         * @param {Router.Routes.Regex} route
         * @chainable
         * @returns {Router.SimpleRouteList}
         */
        self.addRoute = function (route) {
            routes.push(route);
            return self;
        };

        /**
         * Get all routes of this list
         *
         * @method getRoutes
         * @returns {Router.Routes.Regex[]}
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
         * Throws a {{#crossLink "Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method match
         * @param {String} url
         * @returns {Router.RouteMatch}
         */
        self.match = function (url) {
            var route = _.find(routes, function (route) { return route.doesMatch(url)});
            if (!route) {
                throw new NotMatchingError(self, url);
            }
            return route.match(url);
        };
    };
}(Router, Router.NotMatchingError, _));
