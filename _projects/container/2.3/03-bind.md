---
layout: project
permalink: container/2.3/bind
title: Binding types
description: Learn how to bind abstract types to concrete types 
redirect_from: /container/bind.html
---
# Binding types

Binding an abstract type to a concrete type is done using the `bind` method. 
The `bind` method takes two arguments: a string representing the abstract type and 
another string representing the concrete type.

```php
use Opis\Container\Container;

interface GreetingInterface
{
    public function greet();
}

class Greeting implements GreetingInterface
{
    public function greet()
    {
        return 'Greetings man in white!';
    }
}

$container = new Container();
$container->bind('GreetingInterface', 'Greeting');

echo $container('GreetingInterface')->greet(); //> Greetings man in white!
```

If the second argument is omitted, the type passed as the first argument will be both abstract and concrete type.

```php
$container->bind('SomeType');
//same as
$container->bind('SomeType', 'SomeType');
```

Alternatively, you can pass as the second argument to the `bind` method, an anonymous callback function 
that will be used to resolve the abstract type. The callback will receive as arguments the container's 
instance and an array of values that can be further used as arguments to instantiate the concrete type. 

```php
use Opis\Container\Container;

interface GreetingInterface
{
    public function greet();
}

class Greeting implements GreetingInterface
{
    protected $greetingText;
    
    public function __construct($text)
    {
        $this->greetingText = $text;
    }
    
    public function greet()
    {
        return $this->greetingText;
    }
}

$container = new Container();
$container->bind('GreetingInterface', function($container, $args){
    
    if(!isset($args[0]))
    {
        $args[0] = 'Greetings man in white!';
    }
    
    return new Greeting($args[0]);
});

echo $container('GreetingInterface')->greet(); //> Greetings man in white!
echo $container('GreetingInterface', array('Hello World!'))->greet(); //> Hello World!
```

Once an abstract type was bound to a concrete type, it will be automatically resolved every time we use the container 
to instantiate a another type that have that abstract type as a dependency.

```php
class Stewie
{
    protected $greetings;
    
    public function __construct(GreetingInterface $greetings)
    {
        $this->greetings = $greetings;
    }
    
    public function talk()
    {
        return $this->greetings->greet();
    }
}

echo $container('Stewie')->talk(); //> Greetings man in white!
```

### Singletons

Occasionally is desirable that some types to be resolved once, and the same object to be returned on subsequent calls 
into the container. To achieve this behavior, simply bind the abstract type using the `singleton` method. 
This method takes same arguments as the `bind` method.

```php
use Opis\Container\Container;

class Counter
{
    protected $count = 0;
    
    public function increment()
    {
        return $this->count++;
    }
}

$container = new Container();

$container->singleton('Counter');

echo $container('Counter')->increment() //> 0;
echo $container('Counter')->increment() //> 1;
echo $container('Counter')->increment() //> 2;
```

### Setters

After a specified type was resolved, the container allows you to manipulate the resulted object by defining 
one or more setters. Defining a setter is done by calling the `setter` method and passing an anonymous function 
callback as an argument to the method. The callback has two arguments: the instance of the resolved type and 
the instance of the container.

```php
use Opis\Container\Container;

interface GreetingInterface
{
    public function greet();
}

class Greeting implements GreetingInterface
{
    protected $text;
    
    public function greet()
    {
        return $this->text;
    }
    
    public function setText($value)
    {
        $this->text = $value;
    }
}

$container = new Container();
$container->bind('GreetingInterface', 'Greeting')
          ->setter(function($instance, $container){
                $instance->setText('Greetings man in white!');
          });
          
echo $container('GreetingInterface')->greet(); //> Greetings man in white!
```
