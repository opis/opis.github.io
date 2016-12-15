---
layout: project
permalink: session/2.4/index
html_title: Opis Session
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Session
version: 2.4.0
lib: opis/session
canonical: /session/3.1/index
---
# Session manager
 
**Opis Session** is a session manager library with support for multiple backend storages that provides developers with 
an API which allows them to handle session related information in a standardised way.

The currently supported storages are: Database, File, Mongo and Redis. 

## License
**Opis Session** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Database] ^2.1.1 (for Database storage)
* [Predis 1.0.*] (for Redis storage)

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
[Opis Database]: /database "Opis Database"
[Predis]: https://github.com/nrk/predis "Predis"