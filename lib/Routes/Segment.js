(function (Routes, RouteMatch, NotMatchingError) {
    "use strict";

    /**
     * Route matching a segmented string
     *
     * The routes matches only if the target matches segment exactly.
     *
     * @class Segment
     * @namespace Router.Routes
     * @extends Router.Routes.Regex
     * @param {String} segment The segment to match
     * @param {Object} [defaults] Parameters applied as defaults when matching
     * @constructor
     */
    Routes.Segment = function (segment, defaults) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {Router.Routes.Regex}
         */
        var self = this,

        /**
         * Array containing the name of the RegExp matching positions
         *
         * @property matchToName
         * @private
         * @type {String[]}
         */
            matchToName = [],

        /**
         * Consume tokens from the stack as long as the RegExp matches
         *
         * The first token not matching is not shifted from the stack.
         *
         * @method consume
         * @private
         * @param {String[]} tokens The token-Stack
         * @param {RegExp} regex The RegExp to match
         * @return {String} The concatenated string consumed
         */
            consume = function (tokens, regex) {
                var consumed = '',
                    terminate = false,
                    currentToken;
                while (tokens.length > 0 && !terminate) {
                    currentToken = tokens[0];
                    if (!regex.test(currentToken)) {
                        terminate = true;
                        continue;
                    }
                    tokens.shift();
                    consumed += currentToken;
                }
                return consumed;
            },

        /**
         * Convert a token-Stack into an AST
         *
         * @method tokenToStack
         * @private
         * @private  {String[]} tokens The token-Stack
         * @return {Object} The AST built from the stack
         */
            tokenToStack = function (tokens) {
                var stack = [],
                    currentToken;
                while (tokens.length > 0) {
                    currentToken = tokens[0];
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
                            items: tokenToStack(tokens)
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
            },

        /**
         * Convert an AST into a RegExp
         *
         * @method stackToRegex
         * @private
         * @param {Object} stack The AST to convert
         * @return {RegExp} The converted RegExp
         */
            stackToRegex = function (stack) {
                var regExp = '';
                for (var i = 0; i < stack.length; i++) {
                    var current = stack[i];
                    if ('variable' === current.type) {
                        regExp += '([\\w\\d]+)';
                        matchToName.push(current.name);
                    }
                    if ('literal' == current.type) {
                        regExp += current.name;
                    }
                    if ('optional' == current.type) {
                        regExp += '(?:' + stackToRegex(current.items) + ')?';
                    }
                }
                return regExp;
            },

        /**
         * The RegExp determined from the segment of the constructor
         *
         * @property routeRegExp
         * @private
         * @type {RegExp}
         */
            routeRegExp = new RegExp('^' + stackToRegex(tokenToStack(segment.split(''))) + '$');

        /**
         * Check if the segment does match the given string
         *
         * @method doesMatch
         * @param {String} url
         * @returns {Boolean}
         */
        self.doesMatch = function (url) {
            return !!url.match(routeRegExp);
        };

        /**
         * Match the segment and return a object with keys being the variable names (if matched successfully)
         *
         * Throws a {{#crossLink "Router.NotMatchingError"}}{{/crossLink}} error it segment does not match.
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
         * Match the segment for the given string and return the RouteMatch
         *
         * Throws a {{#crossLink "Router.NotMatchingError"}}{{/crossLink}} error it segment does not match.
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
                ),
                self
            );
        };
    };

    function SegmentSurrogateConstructor() {};
    SegmentSurrogateConstructor.prototype = Routes.Regex.prototype;
    Routes.Segment.prototype = new SegmentSurrogateConstructor();
    Routes.Segment.prototype.constructor = Routes.Segment;
}(Router.Routes, Router.RouteMatch, Router.NotMatchingError));
