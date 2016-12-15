---
layout: project
permalink: container/2.3/index
html_title: Opis Container
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Container
version: 2.3.3
lib: opis/container
redirect_from: /container/index.html
---
# Dependency injection container

**Opis Container** is a library that provides a fully serializable dependency injection container. 
The **Opis Container** library can be used to deliver a more reusable, testable and maintainable code, while increasing 
the speed of development. 

## License
**Opis Cache** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Closure] ^2.0.0

## Installation

**Opis Container** is available on [Packagist] and can be installed using [Composer]. 

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
