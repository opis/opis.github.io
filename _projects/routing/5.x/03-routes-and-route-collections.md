---
layout: project
permalink: routing/5.x/routes-and-route-collections
title: Routes and route collections
description: Learn about routes and route collections and how they work together
---
# Routes and route collections

1. [Introduction](#introduction)
2. [Properties](#properties)
3. [References](#references)
4. [Binding](#binding)
5. [Regex constraints](#regex-constraints)
6. [Route collections](#route-collections)

## Introduction

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

## Properties

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

Individual properties can be accessed by using the `get` method. The method allows you to specify a default value that 
will be returned if the specified property doesn't exist. You can always check if a property was set, by using 
the `has` method.

```php
$prop1 = $route->get('prop1');
$propX = $route->get('propX', 'x');

if($route->has('prop2')){
    var_dump($route->get('prop2'));
}
```

## References

The callback passed to the route's constructor can reference variables, such as 
[segment values](routing-101#tags-and-segments), by simply adding arguments named exactly the same as 
the variables you want to reference. The variables might be referenced in any order you want.

```php
use Opis\Routing\Route;

/*
Presuming that the routed path is "/user/123",
then the route's callback will return "123".
*/
$route1 = new Route('/user/{id}', function($id){
    return $id;
});

/*
If the routed path is "/user/123/foo", then the returned value will be "123foo";
*/
$route2 = new Route('/user/{id}/{name}', function($name, $id){
    return $id . $name;
});
```

Providing an implicit value for an optional segment is done by calling the `implicit` method on the route instance.

```php
use Opis\Routing\Route;

/*
If the routed path is "/user/foo", then the route's callback will return "foo".
Otherwise, if the last segment is missing and the routed path is "/user", 
then the returned value will be "bar".
*/
$route = (new Route('/user/{name?}', function($name){
    return $name;
}))
->implicit('name', 'bar');
```

The `implicit` method can be also used to create new variables that are not defined in the route's pattern.
This newly created variables can also be referenced in route's callback.

```php
use Opis\Routing\Route;

/*
If the routed path is "/user/foo", then the route's callback will return "foobar".
*/
$route = (new Route('/user/{name}', function($name, $id){
    return  $name . $id;
}))
->implicit('id', 'bar');
```

## Bindings

Another way of creating variables is by using the `bind` method. The method takes as arguments the 
variable's name and a callback that will return the variable's value. The newly resulted variable can also
be referenced by the route's callback.

```php
use Opis\Routing\Route;

/*
No matter what the routed path is, the returned value will allways be 'bar';
*/
$route = (new Route('/user/{name}', function($name){
    return $name;
}))
->bind('name', function(){
    return 'bar';
});
```

The callback value of a binding, just like the route’s one, is able to reference variables, 
therefore a binding can be used to overwrite a variable’s value.

```php
use Opis\Routing\Route;

/*
If the routed path is "/user/foo", then the returned value will be "FOO";
*/
$route = (new Route('/user/{name}', function($name){
    return $name;
}))
->bind('name', function($name){
    return strtoupper($name);
});
```

## Regex constraints

Providing a regex expression for a placeholder is done by using the `placeholder` method.

```php
use Opis\Routing\Route;

/*
This route will match only paths that ends with a segment composed of digits.
Ex: "/some/123" will be matched, while "/some/a123" will not be matched.
*/
$route = (new Route('/some/{foo}', function($foo){
    return $foo;
}))
->placeholder('foo', '[0-9]+');
```

Alternatively, you can use the `where` method, which is just an alias for the `placeholder` method.

```php
$route = (new Route('/some/{foo}', function($foo){
    return $foo;
}))
->where('foo', '[0-9]+');
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
