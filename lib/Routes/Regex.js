(function (Routes, RouteMatch, NotMatchingError, _) {
    "use strict";

    /**
     * Route matching a regular expression
     *
     * Throws an Error if route is not a RegExp.
     *
     * @class Regex
     * @namespace InnoAccel.Router
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
         * @type {InnoAccel.Router.Regex}
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
            return !!url.match(route);
        };

        /**
         * Match the route and return a numerical ordered array
         *
         * Throws a {{#crossLink "InnoAccel.Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method rawMatch
         * @protected
         * @param {String} url
         * @returns {String[]}
         */
        self.rawMatch = function (url) {
            var result = route.exec(url),
                fragments = [];

            route.lastIndex = 0;
            if (!result) {
                throw new NotMatchingError(self, url);
            }
            for (var i = 1; i < result.length; i++) {
                fragments.push(result[i]);
            }
            return fragments;
        };

        /**
         * Match the route for the given string and return the RouteMatch
         *
         * Throws a {{#crossLink "InnoAccel.Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method match
         * @param {String} url
         * @returns {Router.RouteMatch}
         */
        self.match = function (url) {
            var matches = self.rawMatch(url);
            return new RouteMatch(
                _.defaults(
                    _.object(
                        _.range(matches.length),
                        matches
                    ),
                    defaults
                ),
                self
            );
        };

        if (!(route instanceof RegExp)) {
            throw new Error('route must be an regex');
        }
    };
}(InnoAccel.Router, InnoAccel.Router.RouteMatch, InnoAccel.Router.NotMatchingError, _));
