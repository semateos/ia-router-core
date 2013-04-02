(function (Tinytest, SimpleRouteList) {
    "use strict";

    var Route = function (doesMatch) {
        this.match = function (url) {
            return {
                isMatching: doesMatch
            };
        };
        this.doesMatch = function (url) {
            return doesMatch;
        };
    };

    Tinytest.add('SimpleRouteList: returns routes of construction', function (test) {
        var routes = [new Route(false)],
            collection = new SimpleRouteList(routes);
        test.equal(routes, collection.getRoutes());
    });

    Tinytest.add('SimpleRouteList: no match on empty list', function (test) {
        var collection = new SimpleRouteList([]);
        test.isFalse(collection.doesMatch('x'));
    });

    Tinytest.add('SimpleRouteList: doesMatch false on no matching routes', function (test) {
        var collection = new SimpleRouteList([new Route(false)]);
        test.isFalse(collection.doesMatch('x'));
    });

    Tinytest.add('SimpleRouteList: doesMatch true on matching route', function (test) {
        var collection = new SimpleRouteList([new Route(false), new Route(true)]);
        test.isTrue(collection.doesMatch('x'));
    });

    Tinytest.add('SimpleRouteList: match returns first matching route\'s RouteMatch', function (test) {
        var notMatchingRoute = new Route(false),
            matchingRoute = new Route(true),
            collection = new SimpleRouteList([notMatchingRoute, matchingRoute]);
        test.equal({isMatching:true}, collection.match('x'));
    });

    Tinytest.add('SimpleRouteList: match throws exception on no matching route', function (test) {
        var collection = new SimpleRouteList([]),
            exceptionCaught = false;
        try {
            collection.match('x');
        } catch (error) {
            exceptionCaught = true;
        }
        test.isTrue(exceptionCaught);
    });
} (Tinytest, Router.SimpleRouteList));
