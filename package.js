Package.describe({
    summary: 'Package providing routes and route-sets for matching'
});

Package.on_use(function (api, where) {
    api.use('underscore', ['client', 'server']);

    api.add_files([
        'lib/namespace.js',
        'lib/NotMatchingError.js',
        'lib/RouteMatch.js',
        'lib/SimpleRouteList.js',
        'lib/Routes/Regex.js',
        'lib/Routes/Literal.js',
        'lib/Routes/Segment.js'
    ], ['client', 'server']);

    api.export("InnoAccel");
});

Package.on_test(function (api) {
    api.use(['ia-router-core', 'tinytest'], ['client', 'server']);

    api.add_files([
        'tests/NotMatchingErrorTest.js',
        'tests/RouteMatchTest.js',
        'tests/SimpleRouteListTest.js',
        'tests/Routes/RegexTest.js',
        'tests/Routes/LiteralTest.js',
        'tests/Routes/SegmentTest.js'
    ], ['client', 'server']);
});
