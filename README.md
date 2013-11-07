Logbook.js
==========

Save console.log, console.error and thrown exceptions to localStorage for later use in debugging of customer's sites.

Description
-----------

Logbook.js automatically saves any `console.log` or `console.error` calls as well as any exceptions thrown as a logbook to a LocalStorage object. This way when you're debugging what went wrong for a user, you can easily access the logbook to see what actions the user was doing, or what exceptions were thrown. Here's an example logbook:

```
console.log @ Thu Nov 07 2013 13:51:13 GMT+0200 (EET): Flash installed

initialized @ Thu Nov 07 2013 13:51:24 GMT+0200 (EET): 
console.log @ Thu Nov 07 2013 13:51:24 GMT+0200 (EET): 3
console.log @ Thu Nov 07 2013 13:51:25 GMT+0200 (EET): State now allow_camera_hint
console.log @ Thu Nov 07 2013 13:51:25 GMT+0200 (EET): Flash installed
console.error @ Thu Nov 07 2013 13:52:36 GMT+0200 (EET): BLAAAA

initialized @ Thu Nov 07 2013 13:53:17 GMT+0200 (EET): 
console.log @ Thu Nov 07 2013 13:53:17 GMT+0200 (EET): 3
console.log @ Thu Nov 07 2013 13:53:18 GMT+0200 (EET): State now allow_camera_hint
console.log @ Thu Nov 07 2013 13:53:18 GMT+0200 (EET): Flash installed
exception @ Thu Nov 07 2013 13:53:35 GMT+0200 (EET): http://localhost:3000/assets/application.js?body=1 (45): Uncaught ReferenceError: windows is not defined
console.log @ Thu Nov 07 2013 13:54:05 GMT+0200 (EET): State now showcase
console.log @ Thu Nov 07 2013 13:54:05 GMT+0200 (EET): Selecting , 
console.log @ Thu Nov 07 2013 13:54:05 GMT+0200 (EET): Done selecting , 
initialized @ Thu Nov 07 2013 13:54:16 GMT+0200 (EET): 
exception @ Thu Nov 07 2013 13:55:53 GMT+0200 (EET): http://localhost:3000/assets/application.js?body=1 (45): Uncaught ReferenceError: myObject is not defined

initialized @ Thu Nov 07 2013 13:56:35 GMT+0200 (EET): http://localhost:3000/photos
```

Every line has an action (e.g. `console.log`), a timestamp, and a message. The message is whatever was passed as parameters. When Logbook is first initialized on a page, it logs an `Initialized` message. When exceptions are thrown, the action is `exception` and the message includes the file URL, line, and exception message.

Usage
=====

Initialization
--------------

Run Logbook like this:

```javascript
var logbook = new Logbook()
```

You can pass these options:

* `passThrough`: boolean (default true). Set wether you want the default console.log, .error or exception handler to be called as well. If false, nothing will be logged to the console anymore, good for running in production.
* `initMessage`: string (default blank). Set whatever message you'd like to be logged first as the "initialized" line. A handy use is putting the currently URL here, so you know what page the user was on.
* `maxSize`: integer (default 50000). LocalStorage has a maximum size depending on the browser, but mostly between 2.5MB and 5MB. If you want to keep the log under a certain size because you need LocalStorage for different things as well, set this to however long you want it to get, maximum. Any old lines will be removed until the logbook is less than this size.
* `name`: string (default 'logbook'): The name of the LocalStorage object.

For example:

```javascript
var logbook = new Logbook({maxSize: 10000, initMessage: window.location, passThrough: false});
```

Writing
=======

```javascript
console.log("A log message", 1, 2, 3)
console.error("An error")
logbook.log("Custom Action", "this is a custom action", "any params work")
```

Reading
=======

To read the logbook back out, use `logbook.logbook()`. An example use case is to fill a hidden input on a feedback form with this information.

```javascript
document.getElementById("logbook-field").value = logbook.logbook()
```

Author
======

[David Verhasselt](http://davidverhasselt.com) - david@crowdway.com
