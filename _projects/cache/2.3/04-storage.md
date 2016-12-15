---
layout: project
permalink: cache/2.3/storage
title: Add new storages
description: Learn how to add support for new storages
canonical: /cache/3.1/storage
---
# Add new storages

Creating a new storage type is simply a matter of declaring a new class 
that implements the `Opis\Cache\StorageInterface` interface.

The interface has five methods that need to be implemented in order to have 
a fully functional cache storage. 

```php
namespace Opis\Cache;

interface StorageInterface
{
    public function read($key);
    
    public function write($key, $value, $ttl = 0);
    
    public function delete($key);
    
    public function has($key);
    
    public function clear();
  
}
```

#### The *write* method     
{: #the-write-method }

This methods takes two arguments representing a key-value pair and optionally 
a third argument representing the amount of time(expressed in seconds) remained until the cache expires. 
If `0 (zero)` is passed as a third argument, the cache will never expire. 
This method must return true if the value was successfully stored at the specified key or false otherwise.

#### The *read* method      
{: #the-read-method }    

This method takes a single argument representing the key used to store the cached content. 
If there is no associated content with the specified key, the method must return `false`. 
If there is content associated with the specified key, then the content must be first removed 
from cache, after which the method must return `false`. 
Otherwise the method returns the content stored at the specified key.

#### The *has* method       
{: #the-has-method }

This method takes a single argument representing the key that needs to be checked. 
If there is no cache content associated with the specified key, or if the cache content has expired, 
then the method must return `false`. Otherwise this method returns `true`.

#### The *delete* method    
{: #the-delete-method }
This method takes a single argument representing the key that needs to be deleted. 
If there is no content associated with this key or if the content could not be deleted, 
then this method must return `false`. Otherwise this method returns `true`.

#### The *clear* method     
{: #the-clear-method }
This method takes no arguments. When this method is called, all cached content stored by 
the current storage must be deleted. 
If the deletion succeed, then this method returns `true` otherwise it returns `false`. 