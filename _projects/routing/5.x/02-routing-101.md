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

#### The compiler
 
The constructor of the class takes as an optional argument a compiler represented
by an instance of the `Opis\Routing\Compiler` class. The compiler has the important role of
compiling a route's pattern into a regular expression that will be further used to 
match a route contained by the collection against a given path.
If no object is provided, a default compiler instance will be used.