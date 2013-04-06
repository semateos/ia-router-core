(function (Tinytest, RegexRoute) {
    "use strict";

    Tinytest.add('ia-router-core - RegexRoute - constructor argument must be regex', function (test) {
        var exceptionCaught = false;
        try {
            new RegexRoute('notARegex');
        } catch (error) {
            exceptionCaught = true;
        }
        test.isTrue(exceptionCaught);
    });

    Tinytest.add('ia-router-core - RegexRoute - doesMatch true if regex matches', function (test) {
        var route = new RegexRoute(/test/g);
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - RegexRoute - doesMatch false if regex does not match', function (test) {
        var route = new RegexRoute(/test/g);
        test.isFalse(route.doesMatch('notMatching'));
    });

    Tinytest.add('ia-router-core - RegexRoute - match returns RouteMatch with matched parameters', function (test) {
        var route = new RegexRoute(/(\w+)\/(\d)/g),
            result = route.match('name/5');
        test.equal(result.getParams(), {0: 'name', 1: '5'});
    });

    Tinytest.add('ia-router-core - RegexRoute - match throws exception if not matching', function (test) {
        var route = new RegexRoute(/(\d)/g),
            exceptionCaught = false;
        try {
            route.match('notMatching');
        } catch (error) {
            exceptionCaught = true;
        }
        test.isTrue(exceptionCaught);
    });

    Tinytest.add('ia-router-core - RegexRoute - match applies defaults to RouteMatch', function (test) {
        var route = new RegexRoute(/(\/matched)/g, {template: 'test'}),
            result = route.match('/matched');
        test.equal(result.getParam('template'), 'test');
    });

    Tinytest.add('ia-router-core - RegexRoute - can re-run regex with g-flag', function (test) {
        var route = new RegexRoute(/(\/matched)/g),
            firstResult = route.match('/matched'),
            // this would throw an exception otherwise
            secondResult = route.match('/matched');
    });
} (Tinytest, Router.Routes.Regex));
