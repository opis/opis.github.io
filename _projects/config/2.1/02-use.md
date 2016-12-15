---
layout: project
permalink: config/2.1/use
title: Using the library
description: Learn how to use the library
redirect_from: /config/use.html
---
# Using the library

Creating and manipulating configurations is done by simply creating a new instance of the `Opis\Config\Config` class. 
The constructor of this class takes as an argument an object that implements the `Opis\Cache\StorageInterface` interface.

```php
use Opis\Config\Config;
use Opis\Config\Storage\Memory as ConfigStorage;

$config = new Config(new ConfigStorage());
```

All configurations are stored using key-value pairs and storing a value is done by calling the `write` method. 
The method takes as a first argument a string, representing the key, and as a second argument the value you want 
to be stored. The method returns `true` if the content was stored successfully and `false` otherwise. 

**Important**{:.important}
You can only store strings values, numbers, boolean values, array values and the null value. 
The array values may contain only the aforementioned value types. 
{:.well .text-primary}

```php
$config->write('mysql', array(
    'database' => 'MyDatabase',
    'user' => 'root',
    'password' => 'pass',
));
```

You can also add in-depth values or override existing ones by using "dot notation".

```php
$config->write('mysql.database', 'OtherDatabase');
$config->write('mysql.host', 'localhost');
$config->write('postgre.dsn', 'pgsql:host=localhost;port=5432;dbname=mydatabase');
```

Retrieving a stored value is done by calling the `read` method and passing as an argument the key 
used to store that value. You can use the "dot notation" to retrieve an in-depth stored value.

```php
$database = $config->read('mysql.database');
```

You can specify a default value to be returned, if the specified key doesn't exist, by passing as the second argument 
to the `read` method the value you want to be returned. 
By default, if no value was stored under the specified key, `null` is returned.

```php
$port = $config->read('mysql.port', 3306);
```

Use the has method if you want to check if there is a value stored under a certain key.

```php
if($config->has('mysql.host'))
{
    //do something
}
```

Removing a value stored under a certain key is done by calling the `delete` method. 
The method takes as an argument the key name.

```php
$config->delete('mysql.host');
$config->delete('postgre');
```
