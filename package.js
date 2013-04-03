Package.describe({
    summary: 'Package providing routes and route-sets for matching'
});

Package.on_use(function (api, where) {
    api.use(['underscore', 'deps'], 'client');

    api.add_files([
        'lib/namespace.js',
        'lib/NotMatchingError.js',
        'lib/RouteMatch.js',
        'lib/SimpleRouteList.js',
        'lib/Routes/Regex.js'
    ], ['client', 'server']);
});

Package.on_test(function (api) {
    api.use(['ia-router-core', 'underscore', 'deps', 'tinytest']);

    api.add_files([
        'tests/NotMatchingErrorTest.js',
        'tests/RouteMatchTest.js',
        'tests/SimpleRouteListTest.js',
        'tests/Routes/RegexTest.js'
    ], ['client', 'server']);
});
