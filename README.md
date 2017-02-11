#httpstatus-searchlet

[![Greenkeeper badge](https://badges.greenkeeper.io/MakeNowJust/httpstatus-searchlet.svg)](https://greenkeeper.io/)

httpstatus-searchlet - Display HTTP status code information on your browser
(inspire https://metacpan.org/pod/distribution/App-httpstatus/httpstatus)

##Usage

  1. copy `httpstatus.min.js`.
  2. open `chrome://settings/searchEngines` on Chrome.
  3. add new search engine.
  4. search engine's keyword is `httpstatus`.
  5. paste to search engine's URL.
  6. you type `Ctrl-l` and input `httpstatus` to display all httpstatus.

##Function

`? ...` means search bar.

###Look up 4xx status

```
? httpstatus 4
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Request Entity Too Large
414 Request-URI Too Large
415 Unsupported Media Type
416 Request Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
422 Unprocessable Entity
423 Locked
424 Failed Dependency
425 No code
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
449 Retry with
```

###Look up 40x status

```
? httpstatus 40
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
```

###Show status message

```
? httpstatus 500
Internal Server Error
```

```
? httpstatus 403
Forbidden
```

###Grep status messages

```
? httpstatus Bad
400 Bad Request
502 Bad Gateway
```

###Display all status and messages

```
? httpstatus
100 Continue
101 Switching Protocols
...
```

##License

this scripts licensed under the Apache-2.0

##Author

Tsuyusato Kitsune (@make_now_just) <make.just.on@gmail.com>
