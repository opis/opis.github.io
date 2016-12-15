---
layout: project
permalink: http-routing/4.0/index
html_title: Opis HTTP Routing
html_subtitle: www.opis.io
title: About
description: Getting started with Opis HTTP Routing
version: 4.0.2
lib: opis/http-routing
redirect_from: /http-routing/index.html
---
# HTTP Routing library
 
**Opis HTTP Routing** is a library that can be used to route all types of HTTP request, 
providing a full range of features, like path filters, domain filters, user defined filters, access filters, 
custom error handlers for `404 Not found` and `403 Forbidden` HTTP errors and much more. 

## License
**Opis HTTP Routing** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Routing] ^4.1.0

## Installation

**Opis HTTP Routing** is available on [Packagist] and can be installed using [Composer]. 

```json
{
    "require": {
        "{{page.lib}}": "^{{page.version}}"
    }
}
```

If you are unable to use [Composer] you can download the [.tar.gz] or the [.zip]
archive file, extract the content of the archive and include de `autoload.php` file into your project. 

```php
require_once 'path/to/{{page.lib}}-{{page.version}}/autoload.php';
```

[apache_license]: http://www.apache.org/licenses/LICENSE-2.0 "Project license" 
{:rel="nofollow" target="_blank"}
[Packagist]: https://packagist.org/packages/{{page.lib}} "Packagist" 
{:rel="nofollow" target="_blank"}
[Composer]: http://getcomposer.org "Composer" 
{:rel="nofollow" target="_blank"}
[.tar.gz]: https://github.com/{{page.lib}}/archive/{{page.version}}.tar.gz "{{page.version}}" 
{:data-toggle="tooltip"}
[.zip]: https://github.com/{{page.lib}}/archive/{{page.version}}.zip "{{page.version}}" 
{:data-toggle="tooltip"}
[Opis Routing]: /routing  "Opis Routing ^4.1.0" 
{:data-toggle="tooltip"}
