---
layout: project
permalink: config/1.6/storage-collections
title: Storage collections
description: Learn how to create and use storage collections
redirect_from: /config/storage-collections.html
---
# Storage collections

Storage collections allows you to group multiple config storage implementations into a single collection. 
The collection is fully serializable, allowing you to save the state of the collection at any time.

Creating a new storage collection is simply done by creating a new instance of `Opis\Config\StorageCollection` class.

```php
use Opis\Config\StorageCollection;

$collection = new StorageCollection();
```

Adding a storage implementation to the collection is done by using the `add` method. 
The method takes three arguments: a string, representing the name of the implementation, 
an anonymous function callback, and optionally a boolean value that specify if this is the default storage of 
this collection (by default is `false`).

The anonymous callback function, passed to the add method, must return an object that implements the 
`Opis\Config\StorageInterface` interface. 
The returned configuration storage will be further used to build an `Opis\Config\Config` instance.

```php
//Adding a new implementation
$collection->add('memory', function(){
    return new \Opis\Config\Storage\Memory();
});

//Adding another implementation and set it as the default storage implementation
$collection->add('file', function(){
    return new \Opis\Config\Storage\File('/path/to/config/folder');
}, true);
```

Retrieving an implementation is done bay calling the `get` method with a string argument representing 
the name of the implementation. If the name is omitted, then the default implementation will be returned. 
If no implementation was explicitly designated as the default implementation, then the first implementation added 
to the collection will be designated as the default implementation for this collection.

```php
//Write to memory storage
$collection->get('memory')->write('http.port', 80);

//Write to the default (file) storage
$collection->get()->write('http.port', 80);
```

The same thing can be achieved by simply invoking the collection object instance.

```php
//Write to memory storage
$collection('memory')->write('http.port', 80);

//Write to the default (file) storage
$collection()->write('http.port', 80);
```

Checking if an implementation exist, is done by using the `has` method.

```php
if($collection->has('memory'))
{
    $collection->get('memory')->write('http.port', 80);
}
```

Changing or setting the default implementation is done by calling the `setDefault` method and passing as an argument 
to the method a string representing the implementation name.

```php
$collection->setDefault('memory');
```

Removing an implementation is done by calling the `remove` method and passing as an argument a 
string representing the implementation name.

```php
$collection->remove('file');
```
