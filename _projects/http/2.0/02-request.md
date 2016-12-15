---
layout: project
permalink: http/2.0/request
title: Handling requests
description: Learn how to handle HTTP requests
redirect_from: /http/request.html
---
# Handling requests

1. [Introduction](#introduction)
2. [Retrieving data](#retrieving-data)
3. [HTTP methods](#http-methods)
4. [Request related information](#request-related-information)

## Introduction

Handling HTTP requests is done with the help of the `Opis\Http\Request` class. 
The constructor of the class receives multiple arguments, each of them corresponding to one of the PHP's global 
variable that contains information about the request.

```php
use Opis\Http\Request;

$request = new Request($_GET, $_POST, $_COOKIE, $_FILES, $_SERVER);
```

A shortcut to instantiate a new `Request` object would be to use the static `fromGlobals` method.

```php
use Opis\Http\Request;

$request = Request::fromGlobals();
```

## Retrieving data

#### Query parameters

Retrieving query parameters is done with the help of the `get` method.

```php
# /page?foo=bar
echo $request->get('foo'); //> bar
```

You can specify a default value that will be returned if the requested entry doesn't exist.

```php
# /page?foo=bar
echo $request->get('bar', 'baz'); //> baz
```

Retrieving all query parameters is done by calling the method without arguments.

```php
$query = $request->get();
```

#### POST requests

Retrieving data sended with a `POST` request is done with the help of the `post` method.

```php
echo $request->post('foo');
```

You can specify a default value that will be returned if the requested entry doesn't exist.

```php
echo $request->post('foo', 'bar');
```

Retrieving all values is done by calling the method without arguments.

```php
$post = $request->post();
```

#### Other type of requests

Retrieving data sended with `PUT`, `DELETE` or `PATCH` request is done with the help of the `data` method. 
This method can also be used to retrive data for `POST` requests.

```php
echo $request->data('foo');
```

As in the case of `get` and `post` methods, you can specify a default value that will be returned if the 
requested entry doesn't exist.

```php
echo $request->data('foo', 'bar');
```

Retrieving all values is done by calling the method without arguments.

```php
$data = $request->data();
```

#### Raw body

Getting the raw body of an HTTP request is done by using the `body` method.

```php
echo $request->body();
```

#### Headers

You can use the `header` method to retrieve a specific header and you can specify a 
default value that will be returned if the requested entry doesn't exist.

```php
echo $request->header('content-type');
echo $request->header('referer', 'http://www.example.com');
```

#### Server

Obtaining server information is done by using the `server` method.

```php
echo $request->server('REQUEST_METHOD');
```

You can provide a default value that will be returned if the specified entry is not found.

```php
echo $request->server('REQUEST_METHOD', 'GET');
```

Retrieving all server related info is done by calling the method without arguments.

```php
$info = $request->server('REQUEST_METHOD');
```

#### Cookies

Retrievenig cookies is done with the help of the `cookie` method.

```php
echo $request->cookie('foo');
```

You can provide a default value that will be returned if the specified cookie is not found.

```php
echo $request->cookie('foo', 'bar');
```

You can get all cookies by calling the method without arguments.

```php
$cookies = $request->cookie();
```

### Files

Retrieving information about uploaded files is done with the help of the `file` method.

```php
$doc = $request->file('document');
```

You can retrieve a list with all files by calling the method without arguments.

```php
$files = $request->file();
```

## HTTP methods

While **Opis HTTP** library has support for all HTTP methods, the HTML specification allows only the GET and the POST 
methods to be used by web forms.

However, you can simulate other request methods by using in your form a hidden input field, named `_method`, 
that contains the name of the HTTP methods you want to use. The form's method must also be setted to `post`.

```html
<form method="post">
    ...
    <input type="hidden" name="_method" value="put">
</form>
```

## Request related information

Beside the methods used to retrieve request data, you can obtain other request related information by using 
a set of methods provided by the `Request` class. 

| Method  | Description |
|---------|-------------|
|`$request->method();`{:.language-php .nobg}|Returns the method used to make the request (`GET`, `POST`, `PUT`, `DELETE`, etc.)|
|`$request->realMethod();`{:.language-php .nobg}|Returns the real method that was used to make the request|
|`$request->isAjax();`{:.language-php .nobg}|Checks if the request was made using AJAX|
|`$request->isSecure();`{:.language-php .nobg}|Checks if the request was made using an HTTP secure connection|
|`$request->schema();`{:.language-php .nobg}|Returns the schema used for the request. This can be either `http` or `https`|
|`$request->host();`{:.language-php .nobg}|Returns the host targeted by the request|
|`$request->port();`{:.language-php .nobg}|Returns the port on which the request was made|
|`$request->path();`{:.language-php .nobg}|Returns the request's path|
|`$request->httpHost();`{:.language-php .nobg}|Returns the request's host and port. If the request was made on a standard port only the host is returned.|
|`$request->schemeAndHttpHost();`{:.language-php .nobg}|Returns the request's host, port and scheme. If the request was made on a standard port, only the host and the scheme are returned.|
|`$request->url();`{:.language-php .nobg}|Returns the request's full url|
|`$request->basePath();`{:.language-php .nobg}|Returns the request's base path|
|`$request->baseUrl();`{:.language-php .nobg}|Returns the request's base URL|
|`$request->requestUri();`{:.language-php .nobg}|Returns the URI of the request|
|`$request->queryString();`{:.language-php .nobg}|Returns the request's query string|
|`$request->scriptName();`{:.language-php .nobg}|Returns the name of the current script being executed|
|`$request->clientIps();`{:.language-php .nobg}|Returns an array containing user's IP addresses|
|`$request->ip();`{:.language-php .nobg}|Returns the user's IP address|
|`$request->username();`{:.language-php .nobg}|Returns the basic HTTP authentication username or `null`|
|`$request->path();`{:.language-php .nobg}|Returns the basic HTTP authentication password or `null`|
|`$request->referer(); //SIC`{:.language-php .nobg}|Returns the refferer URL if any|
|`$request->response();`{:.language-php .nobg}|Returns an instance of the `Opis\Http\Response` class|
{:.table .table-bordered .box-highlight}