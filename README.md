Router package for Meteor
==============
This package provides a a set of routes for the Meteor Framework.

A router matches a string, typically the URL, and returns a set of `matches` (MatchResult) that can be used to determine the further execution flow.

There is no single router in this package. Every route is a router itself. Routes can be combined for a more complex route(r).
# API
## Routes
Every route defines two methods: `doesMatch` and `match`. All routes do match the complete string.

### constructor (, defaults)
As a first argument every route takes a route specific argument. The second argument is the same for all routes. Here you can specify default values that are applied to the MatchResult. The defaults are always applied. You can specify values that would never be set by the
route itself (e.g. functions).

### doesMatch (url)
Check if the route does match the given string.

**Arguments**
url *{String}* - The url to match
**Return**
*{Boolean}* - If the string matches the route

### match (url)
Match the url for the given route and return the result as a RouteMatch object

**Arguments**
url *{String}* -The url to match
**Return**
*{RouteMatch}* - The matching result
**Throws**
*{NotMatchingError}* - If the url does not match the route


## Available Routes
There are four types of routes available. They all share the API specified above
### Literal
The route matches only if the target matches the literal exactly. Internally the  literal is converted into the regular expression `^(literal)$`.
Usage: `new Router.Routes.Literal('/foo');`
### Regex
Route matching a regular expression. Throws an Error if route is not a RegExp.
Usage: `new Router.Routes.Regex(/([\w]+)/);`
The RouteMatch contains the matched values as numbers. I.e. the first match is stored as key '0';
### Segment
Route matching a segmented string. You can specify variables and optional components.

Variables are denoted by a colon, followed by alpha-numeric characters.
- Optional variables are can be surrounded by brackets.
- A variable matches alpha-numeric characters.
- Example: ':controller' matches 'someString'. The result is a RouteMatch object with param 'controller' = 'someString'.

Literals
- Every non-alpha-numeric character can be used as a literal.
- Alpha-numeric not in a variable are treated as literals.
- Literals are not part of the RouteMatch object.
- Example: 'ddd/' matches 'ddd/'. ':variable/' matches 'content/'. The RouteMatch object has 'variable' = 'content' set.

Chaining and stacking
- Variables and literals can be stacked or chained
- This applies to optional components as well
- Optional components can be skipped and later variables still be populated
- Example: ':variable[/:variable2][/variable3]/literal' would match
    - 'content/literal'
    - 'content/var2/literal'
    - 'content/var2/var3/literal'

Usage: `new Router.Routes.Segment(':variable[/:optional]');`

### SimpleRouteList
All previous routes could only match one route. The `SimpleRouteList` doesn't do any matching itself but takes a set of routes and matches all of them.

If multiple routes would match, the first one is selected. This route does not take the `defaults` argument at the constructor.

Usage:
```
new Router.SimpleRouteList([
    new Router.Routes.Literal('/foo'),
    new Router.Routes.Literal('/bar')
]);
```

## RouteMatch
If a route matched successfully it returns a RouteMatch object. This object provides access to all variables (parameters) matched in the route.

### setParam (key, value)
Set a parameter ob the object.
**Arguments**
key *{String}* - Name of the parameter to set
value *{mixed}* - Value of the parameter

### getParam (key, fallback)
Get the value of `key` or `fallback` is `key` is not set.
**Arguments**
key *{String}* - Name of the parameter to get
fallback *{mixed}* - Default value to return if key is not set
**Return**
*{mixed}* - Value of key

### getParams(fallbacks)
Get all values of the object with the fallbacks applied.

**Arguments**
fallbacks *{mixed}* - Default values to return
**Return**
*{mixed[]}* - Key-Value pairs

### getRoute()
Get the route that produced this route match
**Return**
*{Route object}* - The route 

## NotMatchingError
This error is thrown if a route is asked to match but is actually not matching.

# Examples
A basic example can be found in the `./examples` directory

# License
The MIT License (MIT)

Copyright (c) 2013 Fritz Gerneth

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
