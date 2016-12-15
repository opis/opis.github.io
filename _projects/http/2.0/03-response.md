---
layout: project
permalink: http/2.0/response
title: Sending responses
description: Learn how to send HTTP responses
redirect_from: /http/response.html
---
# Sending responses

1. [Introduction](#introduction)
2. [Response content](#response-content)
3. [Response headers](#response-headers)
4. [Cookies](#cookies)
5. [Sending the response](#sending-the-response)

## Introduction

Responding to an HTTP request is done by creating a new instance of the `Opis\Http\Response` 
class by passing as an argument to the constructor of the class, an instance of the `Opis\Http\Request` class, 
representing the current HTTP request.

```php
use Opis\Http\Request;
use Opis\Http\Response;

$request = Request::fromGlobals();
$response = new Response($request);
```

Another way of obtaining a `Response` object is by using the `response` method on a `Request` object.

```php
use Opis\Http\Request;

$request = Request::fromGlobals();
$response = $request->response();
```

## Response content

Setting the content of the response is done with the help of the `body` method. 
The method accepts as an argument a string or an object that implements the magic method `__toString`.

```php
$response->body($content);
```

Setting the content type of the response can be done by using the `contentType` method.

```php
$response->contentType('text/html');
```

You can also specify a charset for the content type by passing a second argument to the `contentType` method, 
or by using the `charset` method.

```php
$response->contentType('text/html', 'utf-8');
//..
$response->charset('utf-8');
```

Getting the content that was previously set is done by using the `getBody` method.

```php
$content = $response->getBody();
```

You can also pass as an argument to the `body` method an anonymous function and print yourself the content of the response. 
The anonymous function will receive as arguments a `Request` and a `Response` object.

```php
use Opis\Http\Request;
use Opis\Http\Response;

$response->body(function(Request $request, Response $response){
    echo "Content";
});
```

If you want to take the entire control over how a response is send back to the client, you can pass as an argument for 
the `body` method an object implementing the `Opis\Http\HttpResponseInterface` interface.

```php
namespace Opis\Http;

interface HttpResponseInterface
{
    public function handle(Request $request, Response $response);
}
```

## Response headers

Setting a response header is done by using the `header` method. T
he method takes as an argument the header's name and the header's value.

```php
$response->header('X-Foo', 'bar');
```

You can set multiple headers at once by using the `headers` method.

```php
$response->headers(array(
    'X-Foo' => 'bar',
    'X-Bar' => 'baz',
));
```

Clearing headers is done by using the `clearHeaders` method.

```php
$response->clearHeaders();
```

Sending the response headers is done by using the `sendHeaders` method.

```php
$response->sendHeaders();
```

## Cookies

Setting a cookie is done with the help of the `cookie` method. 
The method takes as arguments the name of the cookie, the cookie's value, an optional value that specify when the cookie 
should expire and an optional array of settings.

```php
//Set a cookie `foo` containing a value `bar` that will expire when browser is closed.
$response->cookie('foo', 'bar');
// Set a cookie that will expire in an hour
$response->cookie('foo', 'bar', 3600);
// Setting cookie options
$response->cookie('foo', 'bar', 3600, array(
    'path' => '/baz/', 
    'domain' => 'exmaple.com',
    'secure' => false,
    'httponly' => false,
));
```

You can delete a cookie by using the `deleteCookie` method. 
The method takes as arguments the cookie name and an optional array of cookie options.

```php
// Delete a cookie `foo` 
$response->deleteCookie('foo');
// Delete a cookie `foo` that was setted using these options
$response->deleteCookie('foo', array(
    'path' => '/baz/', 
    'domain' => 'exmaple.com',
    'secure' => false,
    'httponly' => false,
));
```

Clearing all cookies is done by using the `clearCookies` method.

```php
$response->clearCookies();
```

## Sending the response

Sending the response is done with the help of the `send` method. 
The method will take care of sending all the headers and all the cookies that were set, along with the specified content.

```php
use Opis\Http\Request;

$request = Request::fromGlobals();
$response = $request->response();

$response->body('Hello world!');
$response->contentType('text/html');
$response->send();
```

You can specify a status code for a response by using the `status` method.

```php
use Opis\Http\Request;

$request = Request::fromGlobals();
$response = $request->response();

$response->body('Page not found');
$response->status(404);
$response->contentType('text/html');
$response->send();
```

Sending a redirect response is done with the help of the `redirect` method.

```php
use Opis\Http\Request;

$request = Request::fromGlobals();
$response = $request->response();

$response->redirect('/other/path');
```

You can also specify a redirect code (default is `302`).

```php
$response->redirect('/other/path', 301);
```
