(function (Routes, RouteMatch, NotMatchingError) {
    "use strict";

    /**
     * Route matching a literal string
     *
     * The route matches only if the target matches the literal exactly. Internally the  literal is converted into the
     * regular expression '^(literal)$'.
     *
     * @class Literal
     * @namespace Router.Routes
     * @extends Router.Routes.Regex
     * @param {String} literal The literal to match
     * @param {Object} [defaults] Parameters applied as defaults when matching
     * @constructor
     */
    Routes.Segment = function (route, defaults) {

        var matchToName = [];

        var self = this;

        var routeRegExp;

        var parse = function (tokens) {
            var stack = [];
            while(tokens.length > 0 )
            {
                var currentToken = tokens[0];
                if (':' === currentToken) {
                    tokens.shift();
                    stack.push({
                        type: 'variable',
                        name: consume(tokens, /[a-zA-Z0-9]+/)
                    });
                } else if ('[' === currentToken) {
                    tokens.shift();
                    stack.push({
                        type: 'optional',
                        items: parse(tokens)
                    });
                } else if (']' === currentToken) {
                    tokens.shift();
                    return stack;
                } else {
                    stack.push({
                        type: 'literal',
                        name: consume(tokens, /[^\[\]:]/)
                    });
                }
            }
            return stack;
        };

        var consume = function (tokens, regex) {
            var consumed = '';
            var terminate = false;
            while(tokens.length > 0 && !terminate)
            {
                var currentToken = tokens[0];
                if (!regex.test(currentToken)) {
                    terminate = true;
                    continue;
                }
                tokens.shift();
                consumed += currentToken;
            }
            return consumed;
        };
        var stackToRegex = function (stack) {
            var reg = '';
            for (var i = 0; i < stack.length; i++) {
                var current = stack[i];
                if ('variable' === current.type) {
                    reg += '([\\w\\d]+)';
                    matchToName.push(current.name);
                }
                if ('literal' == current.type) {
                    reg += current.name;
                }
                if ('optional' == current.type) {
                    reg += '(?:' + stackToRegex(current.items) + ')?';
                }
            }
            return reg;
        };

        /**
         * Check if the route does match the given string
         *
         * @method doesMatch
         * @param {String} url
         * @returns {Boolean}
         */
        self.doesMatch = function (url) {
            return !!url.match(routeRegExp);
        };

        /**
         * Match the route and return a numerical ordered array
         *
         * Throws a {{#crossLink "Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method rawMatch
         * @protected
         * @param {String} url
         * @returns {Object}
         */
        self.rawMatch = function (url) {
            var result = routeRegExp.exec(url),
                fragments = {};

            routeRegExp.lastIndex = 0;
            if (!result) {
                throw new NotMatchingError(self, url);
            }
            for (var i = 1; i < result.length; i++) {
                if (undefined !== result[i]) {
                    fragments[matchToName[i-1]] = result[i];
                }
            }
            return fragments;
        };

        /**
         * Match the route for the given string and return the RouteMatch
         *
         * Throws a {{#crossLink "Router.NotMatchingError"}}{{/crossLink}} error it route does not match.
         *
         * @method match
         * @param {String} url
         * @returns {Router.RouteMatch}
         */
        self.match = function (url) {
            return new RouteMatch(
                _.defaults(
                    self.rawMatch(url),
                    defaults
                )
            );
        };

        routeRegExp = new RegExp('^' + stackToRegex(parse(route.split(''))) + '$');
    };

    function SegmentSurrogateConstructor() {};
    SegmentSurrogateConstructor.prototype = Routes.Regex.prototype;
    Routes.Segment.prototype = new SegmentSurrogateConstructor();
    Routes.Segment.prototype.constructor = Routes.Segment;
}(Router.Routes, Router.RouteMatch, Router.NotMatchingError));
