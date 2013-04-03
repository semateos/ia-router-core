if (Meteor.isClient) {

    Handlebars.registerHelper('template', function() {
        var name = Session.get('currentPage');

        if (Template[name])
            return new Handlebars.SafeString(Template[name]());
    });

    var router = new Router.SimpleRouteList([
            new Router.Routes.Regex(/foo/g, {template: 'foo-template'}),
            new Router.Routes.Regex(/bar/g, {template: 'bar-template'}),
            new Router.Routes.Regex(/missing/g)
        ]);


    Template['hello'].events({
        'click .foo': function (event) { Session.set('url', 'foo'); },
        'click .bar': function (event) { Session.set('url', 'bar'); },
        'click .404': function (event) { Session.set('url', 'invalid'); },
        'click .missing': function (event) { Session.set('url', 'missing') }
    });

    Meteor.startup(function() {
        Deps.autorun(function() {
            var currentUrl = Session.get('url'),
                template = null;
            if (router.doesMatch(currentUrl)) {
                template = router.match(currentUrl).getParam('template', 'missing');
            } else {
                template = '404';
            }
            Session.set('currentPage', template);
        });
    });
}
