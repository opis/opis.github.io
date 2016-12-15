---
layout: project
permalink: cache/2.3/index
html_title: Opis Cache
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Cache
version: 2.3.1
lib: opis/cache
canonical: /cache/3.1/index
---
# Caching library

**Opis Cache** is a caching library with support for multiple backend storages that provides developers 
an API which allows them to deal with cached content in a standardised way, no matter where that content is stored.
Also, the **Opis Cache**'s simple and effective architecture ensures that support for new backend storages can be easily 
achieved by simply implementing an interface. 

The currently supported storages are: APC, APCU, File, Memory, Memcache, Memcached, MongoDB, 
Proxy, WinCache, XCache, ZendCache and ZendMemory. 

## License
**Opis Cache** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Closure] ^2.0.0
* [Opis Database] ^2.1.1 (for Database storage)
* [Predis] 1.0.* (for Redis storage)

## Installation

**Opis Cache** is available on [Packagist] and can be installed using [Composer]. 

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
[Opis Database]: /database  "Opis Database ^2.1.1" 
{:data-toggle="tooltip"}
[Predis]: https://github.com/nrk/predis "Predis 1.0.*" 
{:rel="nofollow" data-toggle="tooltip"}