---
layout: project
permalink: session/3.1/manage
title: Session management
description: Learn how to manage sessions
redirect_from: /session/manage.html
---
# Session management

Adding data to a session is done by calling the `set` method.

```php
$session->set('name', 'John Doe');
```

Retrieving data from session is done using the `get` method.

```php
$session->get('name');
```

You can also tell the method to return a custom value if the specified key does not exist. 
The default return value for nonexistent keys is `null`.

```php
$session->get('age', 18);
```

You can also retrieve an item from session by using the `load` method. 
This method takes two arguments: a string representing the session key and an anonymous function callback. 
If no value was stored under the specified key, the the value returned by the callback is stored under that key and then returned.

```php
$session->load('age', function($key){
    return 18;
});
```

You can check if a value was stored under a certain key by calling the `has` method.

```php
$session->has('name');
```

Deleting data from session is done using the `delete` method.

```php
$session->delete('name');
```

Removing all session data is done using the `clear` method.

```php
$session->clear();
```

## Flash data

Flash data are values stored into session that expires after the next request. 
Accessing the flash storage is done using the `flash` method.

Setting flash data is done by accessing the flash storage and calling the `set` method.

```php
$session->flash()->set('key', 'value');
```

Retrieving data from flash session is done by accessing the flash storage and calling the `get` method.

```php
$session->flash()->get('key');
```

You can also tell the method to return a custom value if the specified key does not exist. 
The default return value for nonexistent keys is `null`.

```php
$session->flash()->get('key', 'Some default value');
```

You can also retrieve data from flash session by accessing the flash storage and using the `load` method. 
This method takes two arguments: a string representing the session key and an anonymous function callback. 
If no value was stored under the specified key, the the value returned by the callback is stored under 
that key and then returned.

```php
$session->flash()->load('key', function($key){
    return 'Some default value';
});
```

Checking if some flash data key exists is done by accessing the flash storage and using the `has` method.

```php
$session->flash()->has('key');
```

Deleting data from flash session is done by accessing the flash storage and using the `delete` method.

```php
$session->flash()->delete('key');
```

You can clear all flash data by accesing the flash storage and calling the `clear` method.

```php
$session->flash()->clear();
```

This method optionally accepts an array as argument, representing the new flash data.

```php
$session->flash()->clear(array(
    'newKey' => 'New value',
));
```

You can extend the life of the flash data by calling the `reflash` method or by accessing the flash storage 
and calling the `reflash` method.

```php
$session->reflash();
//or
$session->flash()->reflash();
```

Extending the life of flash data that are stored under certain keys is done by passing an array containing the key 
names to the methods presented above.

```php
$session->reflash(array('user', 'age'));
//or
$session->flash()->reflash(array('user', 'age'));
```

You can retrieve an array with all stored flash data by accessing the flash storage and calling the `toArray` method.

```php
$session->flash()->toArray();
```

# Session security

Retrieving the session ID is done by calling the `id` method.

```php
$session->id();
```

Regenerating the session ID can be done by using the `regenerate` method.

```php
$session->regenerate();
```

If you want to regenerate the session ID and also keep all data associated with the old session ID, 
you must pass `true` as an argument to the `regenerate` method.

```php
$session->regenerate(true);
```

Destroing a session is done using the `destroy` method.

```php
$session->destroy();
```
