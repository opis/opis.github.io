---
layout: project
permalink: container/2.3/container
title: The container
description: Learn how the DIC works
redirect_from: /container/container.html
---
# The container

Creating a dependency injection container is done by simply creating a new instance of the `Opis\Container\Container` class. 
The constructor of this class takes no arguments.

```php
use Opis\Container\Container;

$container = new Container();
```

Resolving a type is done by calling the `make` method or by invoking the container instance and passing as 
an argument a string, representing the type you want to resolve.

```php
// calling the 'make' method
$instance = $container->make('Some\Namespace\SampleClass');

// invoking the container
$instance = $container('Some\Namespace\SampleClass');
```

Optionally, you can pass as the second argument to the `make` method(or when you invoke the container) 
an array of values that will be passed as arguments when the specified type will be resolved. 

```php
class User
{
    protected $name;
    protected $number;
    
    public function __construct($name)
    {
        $this->name = $name;
    }
    
    public function name()
    {
        return $this->name;
    }
    
    public function phoneNumber()
    {
        return $this->number;
    }
    
    public function setPhoneNumber($number)
    {
        $this->number = $number;
    }
}

// calling the 'make' method
$user = $container->make('User', array('John Doe'));

// or you can directly invoke the container
$user = $container('User', array('John Doe'));

echo $user->name(); //> John Doe
```

### Aliasing names

The container allows you to define alias names for types by calling the `alias` method. 
The method takes as arguments the class or the interface name and the alias name for that type.

```php
$container->alias('Some\Very\Long\Namespace\ClassName', 'ShorterTypeName');
$instance = $container->make('ShorterTypeName');
echo get_class($instance); //> Some\Very\Long\Namespace\ClassName

$container->alias('ShorterTypeName', 'Stn');
$instance = $container->make('Stn');
echo get_class($instance); //> Some\Very\Long\Na
```
