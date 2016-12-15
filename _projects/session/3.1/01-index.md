---
layout: project
permalink: session/3.1/index
html_title: Opis Session
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Session
version: 3.1.0
lib: opis/session
redirect_from: /session/index.html
---
# Session manager
 
**Opis Session** is a session manager library with support for multiple backend storages that provides developers with 
an API which allows them to handle session related information in a standardised way.

The currently supported storages are: File, Mongo and native storage. 

**Important!**{:.important}
You can install additional storage adapters, for SQL databases and Redis, by using the optional [Opis Storages] package.
{:.well .text-primary}

## License
**Opis Session** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher

## Installation

**Opis Session** is available on [Packagist] and can be installed using [Composer]. 

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
[Opis Storages]: https://github.com/opis/storages "Opis Storages"