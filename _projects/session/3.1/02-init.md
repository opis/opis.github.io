---
layout: project
permalink: session/3.1/init
title: Initiating a session
description: Learn how to initiate a session
redirect_from: /session/init.html
---
# Initiating a session
 
Initiating a sessions is done by creating a new instance of the `Opis\Session\Session` class. 
The constructor of this class takes two optional arguments: an instance of `SessionHandlerInterface`, representing the 
session storage, and an array containing configuration options.

```php
use Opis\Session\Session;
use Opis\Session\Storage\File;

$session = new Session(new File('/path/to/session/folder'), array('name' => 'my_session'));
```

You can instantiate a session using the default configuration options, by omitting the second argument.

```php
use Opis\Session\Session;
use Opis\Session\Storage\File;

$session = new Session(new File('/path/to/session/folder'));
```

The available configuration options are:

* `name` → The session name. The default value is `opis`.
* `flashslot` → The name of the key where flash data will be saved. The default value is `opis:flashdata`.
* `lifetime` → Lifetime of the session cookie, defined in seconds. The default value is retrieved 
from `php.ini (session.cookie_lifetime)`
* `domain` → Cookie's domain. To make cookies visible on all subdomains then the domain must be prefixed with a dot. 
The default value is retrieved from `php.ini (session.cookie_domain)`
* `path` → Path on the domain where the cookie will work. Use a single slash (`/`) for all paths on the domain. 
The default value is retrieved from `php.ini (session.cookie_path)`
* `secure` → If true cookie will only be sent over secure connections. 
The default value is retrieved from `php.ini (session.cookie_secure)`
* `httponly` → If set to true then PHP will attempt to send the `httponly` flag when setting the session cookie. T
he default value is retrieved from `php.ini (session.cookie_httponly)`

To use the PHP's default session storage along with the default configurations, 
simply create an instance of the `Opis\Session\Sessio`n class without passing arguments to the constructor.

```php
use Opis\Session\Session;

$session = new Session();
```

If you want to use the PHP's default session storage, but you also want to setup some configurations, 
then pass null as the first argument to the constructor.

```php
use Opis\Session\Session;

$session = new Session(null, array('name' => 'my_session'));
```
