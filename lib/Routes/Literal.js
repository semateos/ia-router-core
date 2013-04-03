(function (Routes) {
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
    Routes.Literal = function (literal, defaults) {
        Routes.Regex.call(this, new RegExp('^(' + literal + ')$'), defaults);
    };

    function LiteralSurrogateConstructor() {};
    LiteralSurrogateConstructor.prototype = Routes.Regex.prototype;
    Routes.Literal.prototype = new LiteralSurrogateConstructor();
    Routes.Literal.prototype.constructor = Routes.Literal;
}(Router.Routes));
