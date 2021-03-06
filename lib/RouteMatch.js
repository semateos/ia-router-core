(function (Router, _) {
    "use strict";

    /**
     * Object containing the parameters of a matching route.
     *
     * @class RouteMatch
     * @namespace InnoAccel.Router
     * @param {Object} params Key-Value pair of parameters gained from the matching route
     * @param {InnoAccel.Router.Regex} route Route that produced this route match
     * @constructor
     */
    Router.RouteMatch = function (params, route) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {RouteMatch}
         */
        var self = this;

        /**
         * Set the value of a parameter
         *
         * @method setParam
         * @param {String} name
         * @param {String} value
         */
        self.setParam = function (name, value) {
            params[name] = value;
        };

        /**
         * Get the value of a parameter
         *
         * @method getParam
         * @param {String} name Name of the parameter
         * @param {String} fallback Value to use if parameter is not set
         * @returns {String|undefined} Value of the parameter
         */
        self.getParam = function (name, fallback) {
            return params[name] || fallback;
        };

        /**
         * Get all parameters of this match
         *
         * @method getParams
         * @param {Object} fallbacks Parameters to apply as defaults to the result
         * @returns {Object} Key-Value object with name of the parameter and it's value
         */
        self.getParams = function (fallbacks) {
            return _.defaults(params, fallbacks);
        };

        /**
         * Get the route having produced this match
         *
         * @method getRoute
         * @returns {InnoAccel.Router.Regex} The route
         */
        self.getRoute = function () {
            return route;
        };
    };
}(InnoAccel.Router, _));
