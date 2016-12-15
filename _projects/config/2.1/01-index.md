---
layout: project
permalink: config/2.1/index
html_title: Opis Config
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Config
version: 2.1.2
lib: opis/config
redirect_from: /config/index.html
---
# Configuration manager
 
**Opis Config** is a configuration management library, with support for multiple backend storages, 
that provides developers an API which allows them to work with configurations in a standardised way, 
no matter where the configurations are stored.

The supported backend storages are: File, JSON, Mongo, MongoArray, PHPFile, Memory, DualStorage. 

**Important!**{:.important}
You can install additional storage adapters, for SQL databases, by using the optional [Opis Storages] package.
{:.well .text-primary}

## License
**Opis Config** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Closure] ^2.0.0

## Installation

**Opis Config** is available on [Packagist] and can be installed using [Composer]. 

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
[Opis Closure]: /closure  "Opis Closure ^2.0.0" 
{:data-toggle="tooltip"}
[Opis Storages]: https://github.com/opis/storages "Opis Storages"