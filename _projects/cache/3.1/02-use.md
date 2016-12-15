---
layout: project
permalink: cache/3.1/use
title: Using the library
description: Learn how to use the library
redirect_from: /cache/use.html
---
# Using the library

Working with cached content is done by using the `Opis\Cache\Cache` class. 
The constructor of this class takes as an argument an instance of the the 
`Opis\Cache\StorageInterface`, representing the backend storage where you 
will write and read from. 

```php
use Opis\Cache\Cache;
use Opis\Cache\Storage\Memory as CacheStorage;

$cache = new Cache(new CacheStorage());
```

All content is stored using key-value pairs and storing a value is done by 
calling the `write` method. The method takes as a first argument a string, 
representing the key, and as a second argument the value you want to be stored. 
The method returns `true` if the content was cached successfully and `false` otherwise. 

```php
$cache->write('hello', 'Hello World!');
```

Optionally, you can specify how long will be the cached content available, 
by passing a third argument to the `write` method, representing the amount 
of time expressed in seconds. By default the cached content is available 
for an undetermined period. 

```php
//The content will expire after 1 hour
$cache->write('hello', 'Hello World!', 3600);
```

Retrieving content from cache is done by calling the `read` method with 
a string argument representing the key that was used to store the content. 
If no content is available, or if the cached content has expired, the method
returns `false`. 

```php
echo $cache->read('hello'); //> Hello World!
```

Checking if some content was stored under a certain key is done by calling 
the `has` method and passing as an argument a string representing the key's 
name you want to check. This method returns `false` if nothing was stored 
under the specified key or if the content expired and `true` otherwise. 

```php
if($cache->has('read'))
{
    echo $cache->read('hello'); //> Hello World!
}
```

The `load` method returns the data stored under the specified key, or if 
nothing was stored under that key, it will store and return the result obtained 
by calling the given closure with a string argument representing the specified key. 

```php
$content = $cache->load('hello', function($key){
    return 'Hello Wolrd!';
});
```

Optionally, you can specify how long will be available the content obtained 
when the given closure was called, by passing a third argument to the `load` method, 
representing the amount of time expressed in seconds. 

```php
$content = $cache->load('hello', function($key){
    return 'Hello Wolrd!';
}, 3600);
```

Deleting content that was stored under a certain key is done by calling the 
`delete` method. This method returns `true` on success and `false` otherwise. 

```php
$cache->delete('hello');
```

You can delete all cached content by calling the `clear` method. 
The method returns `true` on success and `false` otherwise. 

```php
$cache->clear();
```