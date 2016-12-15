---
layout: project
permalink: events/4.1/index
html_title: Opis Events
html_subtitle: www.opis.io
title: About
description: Getting started with Opis Events
version: 4.1.1
lib: opis/events
redirect_from: /events/index.html
---
# Events library
 
**Opis Events** is a library that can be used for dispatching and intercepting events. 
This library is builded on top of the [Opis Routing] library and provides a full range of features 
like filters and events' priorities. 

## License
**Opis Events** is licensed under the [Apache License, Version 2.0][apache_license].

## Requirements
* PHP 5.3.0 or higher
* [Opis Routing] ^4.1.0

## Installation

**Opis Events** is available on [Packagist] and can be installed using [Composer]. 

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
