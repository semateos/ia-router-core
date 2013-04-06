(function (Tinytest, LiteralRoute) {
    "use strict";

    Tinytest.add('ia-router-core - LiteralRoute - doesMatch true on exact match', function (test) {
        var route = new LiteralRoute('test');
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - LiteralRoute - doesMatch false on no exact match', function (test) {
        var route = new LiteralRoute('test');
        test.isFalse(route.doesMatch('test12'));
    });

    Tinytest.add('ia-router-core - LiteralRoute - match result contains literal at key 0', function (test) {
        var route = new LiteralRoute('test');
        test.equal(route.match('test').getParam(0), 'test');
    });

    Tinytest.add('ia-router-core - LiteralRoute - match throws exception if not matching', function (test) {
        var route = new LiteralRoute('test'),
            exceptionCaught = false;
        try {
            route.match('notMatching');
        } catch (error) {
            exceptionCaught = true;
        }
        test.isTrue(exceptionCaught);
    });

    Tinytest.add('ia-router-core - LiteralRoute - match applies defaults to RouteMatch', function (test) {
        var route = new LiteralRoute('test', {template: 'test'}),
            result = route.match('test');
        test.equal(result.getParam('template'), 'test');
    });
} (Tinytest, Router.Routes.Literal));
