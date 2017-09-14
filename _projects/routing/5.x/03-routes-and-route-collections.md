---
layout: project
permalink: routing/5.x/routes-and-route-collections
title: Routes and route collections
description: Learn about routes and route collections and how they work together
---
# Routes and route collections

1. [Routes](#routes)
2. [Route collections](#route-collections)

## Routes

A *route* is one of the most fundamental concepts of the **Opis Routing** framework and 
it's represented with the help of the `Opis\Routing\Route` class. 
The class' constructor takes as arguments a pattern, a callback, and optionally a name.

```php
use Opis\Routing\Route;

$route = new Route('/some/{path}', function(){
    return 'bar';
}, 'foo');
``` 

The arguments passed to the class' constructor method can be retrieved using the 
`getName`, `getPattern` and the `getAction` methods.

```php
$name = $route->getName();
$pattern = $route->getPattern();
$callback = $route->getAction();
```

### Working with properties

Setting an arbitrary property on a route instance is done by calling a method that have the same name as the 
property you want to set. Another way of settings properties is by using the `set` method.
You can retrieve all properties of a route by calling the `getProperties` method.

```php
use Opis\Routing\Route;

$route = new Route('/some/{path}', function(){
    return 'bar';
}, 'foo');

$route->prop1('a')->prop2('b', 'c')->set('prop3', 'd');

print_r($route->getProperties());

// Outputs
/*
Array
(
    [prop1] => a
    [prop2] => Array
        (
            [0] => b
            [1] => c
        )

    [prop3] => d
)
*/
``` 

Getting values from individual properties is done with the help of `get` method. The method
allows you to specify a default value that will be returned if the specified property doesn't exist.
You can always check if a property was set using the `has` method.

```php
$prop1 = $route->get('prop1');
$propX = $route->get('propX', 'x');

if($route->has('prop2')){
    var_dump($route->get('prop2'));
}
```

## Route collections

All routes must be stored into a collection represented by the `Opis\Routing\RouteCollection` class.
The constructor of the class takes as an optional argument an instance of a [compiler](#the-compiler).
If no object is provided to the constructor, a default compiler instance will be used.

```php
use Opis\Routing\Route;
use Opis\Routing\RouteCollection;

$collection = new RouteCollection();

$route = new Route('/some/{path}', function(){
    return 'bar';
}, 'foo');

$collection->addRoute($route);
```

Both routes and route collections objects are serializable, meaning that they can be stored and
therefore cached.