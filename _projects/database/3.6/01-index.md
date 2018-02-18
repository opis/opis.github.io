---
layout: project
permalink: database/3.6/index
chapter: Getting started
html_title: Opis Database
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Database
lib: opis/database
version: 3.6.8
canonical: /database/4.x
redirect_from: /database/index.html
---
# Database abstraction layer

**Opis Database** is a library that provides an abstraction layer over several database systems, 
offering a standard way of handling database records, and thus, making the differences between various 
SQL dialects irrelevant for the developers.

The library has support for the following database types: MySQL, PostgreSQL, Microsoft SQL, SQLite, 
Firebird, IBM DB2, Oracle, NuoDB. 

## License
**Opis Database** is licensed under [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* PDO

## Installation

**Opis Database** is available on [Packagist] and can be installed using [Composer]. 

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
{:ref="nofollow" target="_blank"}
[.tar.gz]: https://github.com/{{page.lib}}/archive/{{page.version}}.tar.gz "{{page.version}}" 
{:data-toggle="tooltip"}
[.zip]: https://github.com/{{page.lib}}/archive/{{page.version}}.zip "{{page.version}}" 
{:data-toggle="tooltip"}
