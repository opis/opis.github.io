---
layout: project
permalink: routing/5.x/routing-101
title: Opis Routing 101
description: Learn how Opis Routing works
---
# Opis Routing 101

1. [Introduction](#introduction)
2. [Routes and route collections](#routes-and-route-collections)
3. [The compiler](#the-compiler)

## Introduction

**Opis Routing** offers a collection of classes that

## Routes and route collections

A *route* is one of the most fundamental concepts of the **Opis Routing** framework and 
it's represented with the help of the `Opis\Routing\Route` class. 
The class' constructor takes as arguments a pattern, a callback, and optionally a name.

```php
use Opis\Routing\Route;

$route = new Route('/some/{path}', function(){
    return 'bar';
}, 'foo');
``` 

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

## The compiler
 
The compiler is represented by an instance of the `Opis\Routing\Compiler` class. It has the important role of
compiling a route's pattern into a regular expression that will be further used to 
match routes contained by the route collection against a given path.

The compiler takes as an argument an optional configuration array, that tells how the compiler will behave.
If no configuration is provided, then the following configuration will be assumed:

```php
use Opis\Routing\Compiler as C;

$compiler = new C([
    C::CAPTURE_MODE => C::STANDARD_MODE, // CAPTURE_LEFT|CAPTURE_TRAIL|OPT_SEPARATOR_TRAIL
    C::START_TAG => '{',
    C::END_TAG => '}',
    C::TAG_SEPARATOR => '/',
    C::OPTIONAL_TAG => '?',
    C::WILDCARD => '[^/]+', // '[^'.preg_quote($separator, $delimiter).']+'
]);
```

