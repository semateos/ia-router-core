(function (Tinytest, SegmentRoute) {
    "use strict";

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch variable', function (test) {
        var route = new SegmentRoute(':variable');
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component present', function (test) {
        var route = new SegmentRoute('[:variable]');
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component not present', function (test) {
        var route = new SegmentRoute('[:variable]');
        test.isTrue(route.doesMatch(''));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch literals', function (test) {
        var route = new SegmentRoute('literal');
        test.isTrue(route.doesMatch('literal'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch literals false if not exact', function (test) {
        var route = new SegmentRoute('literal');
        test.isFalse(route.doesMatch('literal2'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component stacked 1/2', function (test) {
        var route = new SegmentRoute('[:variable[/:variable2]]');
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component stacked 2/2', function (test) {
        var route = new SegmentRoute('[:variable[/:variable2]]');
        test.isTrue(route.doesMatch('test/test2'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component chained 1/2', function (test) {
        var route = new SegmentRoute('[:variable][/:variable2]');
        test.isTrue(route.doesMatch('test'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch optional component chained 2/2', function (test) {
        var route = new SegmentRoute('[:variable][/:variable2]');
        test.isTrue(route.doesMatch('test/test2'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch combinations 1/3', function (test) {
        var route = new SegmentRoute(':required/[:variable-][/:variable2]');
        test.isTrue(route.doesMatch('test/test2-'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch combinations 2/3', function (test) {
        var route = new SegmentRoute(':required/[:variable-][/:variable2]');
        test.isTrue(route.doesMatch('test//d'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - doesMatch combinations 3/3', function (test) {
        var route = new SegmentRoute(':required/[:variable-][/:variable2]');
        test.isTrue(route.doesMatch('test/x-/d'));
    });

    Tinytest.add('ia-router-core - SegmentRoute - match variable returns named parameter', function (test) {
        var route = new SegmentRoute(':variable', {});
        test.equal(route.match('test').getParam('variable'), 'test');
    });

    Tinytest.add('ia-router-core - SegmentRoute - match variable returns optional defined parameter', function (test) {
        var route = new SegmentRoute('[:variable]', {});
        test.equal(route.match('test').getParam('variable'), 'test');
    });

    Tinytest.add('ia-router-core - SegmentRoute - match variable returns optional undefined parameter', function (test) {
        var route = new SegmentRoute('[:variable]', {});
        test.equal(route.match('').getParam('variable'), undefined);
    });

    Tinytest.add('ia-router-core - SegmentRoute - match variable can skip optional parameters', function (test) {
        var route = new SegmentRoute('[:variable]/:variable2', {});
        test.equal(route.match('/test').getParam('variable2'), 'test');
    });

    Tinytest.add('ia-router-core - SegmentRoute - match throws error if not matching', function (test) {
        var route = new SegmentRoute(':variable', {}),
            exceptionCaught = false;
        try {
            route.match('-');
        } catch (error) {
            exceptionCaught = true;
        }
        test.isTrue(exceptionCaught);
    });

    Tinytest.add('ia-router-core - SegmentRoute - can re-run match', function (test) {
        var route = new SegmentRoute(':variable', {});
        route.match('t');
        route.match('t');
    });

    Tinytest.add('ia-router-core - SegmentRoute - match applies defaults', function (test) {
        var route = new SegmentRoute(':action', {controller: 'testController'});
        test.equal(route.match('testAction').getParams(), {action: 'testAction', controller: 'testController'});
    });

    Tinytest.add('ia-router-core - SegmentRoute - match defaults to not overwrite', function (test) {
        var route = new SegmentRoute(':action', {action: 'indexAction'});
        test.equal(route.match('testAction').getParams(), {action: 'testAction'});
    });

    Tinytest.add('ia-router-core - SegmentRoute - match defaults for optional parameters', function (test) {
        var route = new SegmentRoute(':controller[/:action]', {action: 'indexAction'});
        test.equal(route.match('testController').getParams(), {controller: 'testController', action: 'indexAction'});
    });

    Tinytest.add('ia-router-core - SegmentRoute - match contains route', function (test) {
        var route = new SegmentRoute(':action'),
            result = route.match('matched');
        test.equal(result.getRoute(), route);
    });

} (Tinytest, InnoAccel.Router.Segment));
