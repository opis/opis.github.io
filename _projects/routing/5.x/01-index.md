---
layout: project
permalink: routing/5.x/index
html_title: Opis Routing
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Routing
version: 5.0.0
lib: opis/routing
redirect_from: /routing/index.html
---
# Routing framework
 
**Opis Routing** is a framework for building various routing components. 
In contrast to other routing libraries, it may handle anything that 
follows a pattern and is not limited only to HTTP request.

This library was conceived to be embedded by other libraries that need routing capabilities and not as a standalone 
library; although the usage of this library as a standalone library is not discouraged. 

## License
**Opis Routing** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 7.0.0 or higher
* [Opis Closure] ^3.0.0

## Installation

**Opis Routing** is available on [Packagist] and can be installed using [Composer]. 

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
[Opis Closure]: /closure  "Opis Closure ^3.0.0" 
{:data-toggle="tooltip"}
