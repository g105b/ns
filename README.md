# ns

JavaScript namespace tool

[![Travis-CI][shield-travis-ci]][travis-ci]
[![Bower][shield-bower]][bower]

## Features

ns provides two simple but useful features:

### 1. Easy namespacing with automatic nested initialisation:

```js
// Assigns the function to window.MyApp.Security.authenticate.
// NOTE: window.MyApp may not be initialised yet.
ns("MyApp.Security.authenticate", function(username, password) { /* .. */ } );

// Assigns the object to window.MyApp.Security.credentials.
// NOTE: Existing assignments within the namespace are kept.
ns("MyApp.Security.credentials", {username: "g105b", password: "s3cr3t123"});

// Shorthand nested namespaces for less typing:
var sec = MyApp.Security;
// Pass the credentials to the authentication function:
sec.authenticate(sec.credentials.username, sec.credentials.password);
```

### 2. Simple document-ready callback for modern browsers:

```js
// Show the alert when the DOMContentReady event fires:
go(function() { alert("DOM is loaded!"); });

// Assign your namespaced function to load on DOMContentReady:
go(MyApp.UI.init);

// Assign multiple namespaced functions one after another, like this:
go(MyApp.UI.enhance);
go(MyApp.Forms.validate);
go(function() { console.log("DOM loaded!"); });

// Or assign them as an array:
go([
    MyApp.UI.enhance,
    MyApp.Forms.validate,
    function() {
        console.log("DOM loaded!");
    },
]);

// Each time you add something to the go() queue, the callback function
// that iterates through the queue is returned (so you can also trigger
// it manually if required).
var callback = go(MyApp.UI.init);
// callback() will trigger on DOMContentReady automatically, but call it
// manually here too if you need (e.g. in tests or not in a browser context).
callback();
```

## Testing

Tests are written using [tape][tape-github] and can be run using [Node][node-website] like this:

```
npm install tape
node test/test-case.js
```

[tape-github]: https://github.com/substack/tape
[node-website]: https://nodejs.org

[shield-travis-ci]: https://img.shields.io/travis/g105b/ns.svg?style=flat-square
[shield-bower]: https://img.shields.io/bower/v/ns.svg?style=flat-square

[travis-ci]: https://travis-ci.org/g105b/ns
[bower]: http://bower.io/search/?q=ns
