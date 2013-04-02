(function (Routes, RouteMatch, _) {
    "use strict";

    /**
     * Route matching a regular expression
     *
     * Throws an Error if route is not a RegExp.
     *
     * @class Regex
     * @namespace Router.Routes
     * @param {RegExp} route The regular expression to match
     * @param {Object} [defaults] Parameters applied as defaults when matching
     * @constructor
     */
    Routes.Regex = function (route, defaults) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {Router.Routes.Regex}
         */
        var self = this;

        /**
         * Check if the route does match the given string
         *
         * @method doesMatch
         * @param {String} url
         * @returns {Boolean}
         */
        self.doesMatch = function (url) {
            return route.test(url);
        };

        /**
         * Match the route and return a numerical ordered array
         *
         * @method rawMatch
         * @protected
         * @param {String} url
         * @returns {String[]}
         */
        self.rawMatch = function (url) {
            var result = route.exec(url),
                fragments = [];
            for (var i = 1; i < result.length; i++) {
                fragments.push(result[i]);
            }
            return fragments;
        };

        /**
         * Match the route for the given string and return the RouteMatch
         *
         * Throws an Error if the route does not match.
         *
         * @method match
         * @param {String} url
         * @returns {Router.RouteMatch}
         */
        self.match = function (url) {
            var matches = self.rawMatch(url);
            if (matches.length == 0) {
                throw new Error('Route does not match ' + url);
            }

            return new RouteMatch(
                _.defaults(
                    _.object(
                        _.range(matches.length),
                        matches
                    ),
                    defaults
                )
            );
        };

        if (!(route instanceof RegExp)) {
            throw new Error('route must be an regex');
        }
    };
}(Router.Routes, Router.RouteMatch, _));
