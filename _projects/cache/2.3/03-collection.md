---
layout: project
permalink: cache/2.3/collection
title: Storage collection
description: Learn how to create and use storage collections
redirect_from: /cache/collection.html
---
# Storage collection

Storage collections allows you to group multiple cache storage implementations 
into a single collection. The collection is fully serializable, allowing you save
the state of the collection at any time.

Creating a new collection is simply done by creating a new instance of 
`Opis\Cache\StorageCollection` class. 

```php
use Opis\Cache\SorageCollection

$collection = new StorageCollection();
```

Adding a cache storage implementation to the collection is done by calling the 
`add` method. The method takes three arguments: a string, representing the name 
of the implementation, an anonymous function, callback and optionally a boolean 
value that specify if this is the default implementation of this collection 
(by default is `false`).

The anonymous callback function must return an instance of `Opis\Cache\StorageInterface`
that will be further used to build an `Opis\Cache\Cache` instance. 

```php
//Adding a new implementation
$collection->add('memory', function(){
    return new \Opis\Cache\Storage\Memory();
});

//Adding another implementation and set it as the default cache implementation
$collection->add('file', function(){
    return new \Opis\Cache\Storage\File('/path/to/cache/folder');
}, true);
```

Retrieving an implementation is done bay calling the `get` method with a string argument 
representing the name of the implementation. If the argument is omitted, then the default 
implementation will be returned. If no implementation was explicitly designated as the default 
implementation, then the first implementation added to the collection will be designated as the 
default implementation for this collection. 

```php
//Write to memory cache
$collection->get('memory')->write('hello', 'Hello world');

//Write to the default (file) cache
$collection->get()->write('hello', 'Hello world');
```

Checking if an implementation exist, is done by using the `has` method. 

```php
if($collection->has('memory'))
{
    $collection->get('memory')->write('hello', 'Hello World!');
}
```

Changing or setting the default implementation is done by calling the 
`setDefault` method and passing as an argument to the method a string 
representing the implementation name. 

```php
$collection->setDefault('memory');
```

Removing an implementation is done by calling the `remove` method and passing 
as an argument a string representing the implementation name. 

```php
$collection->remove('file');
```

