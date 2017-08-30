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
4. [The routing context](#the-routing-context)
5. [The dispatcher](#the-dispatcher)
6. [Filters and filter collections](#filters-and-filter-collections)
7. [The router](#the-router)

## Introduction

The first step in building a routing system is to decide over the structure of the paths you want to handle and
find a pattern for that structure. 

```php
// File path pattern
$a = '/a/b/c';

// Host name pattern
$b = 'subdomain.example.com';

// Custom pattern
$c = 'a, b, c';
```

Once you have established the structure of your paths and found a pattern, is time to move forward and create a compiler 
that can understand a given pattern and transform it into a regex rule that can be matched against an arbitrary path.

The compiler is represented by an instance of `Opis\Routing\Compiler` class and takes as an argument 
a configuration array which tells what kind of patterns the compiler will understand and how it will handle them.

All recognizable patterns must have a separator mark that acts as a delimiter and splits a pattern into segments.
For a file path pattern that delimiter is the `/` sign while for a host name pattern the delimiter is the
`.` sign. In the case of the custom pattern presented above, the separator mark is `, `(comma followed by space).



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

## The routing context

The routing context is an instance of `Opis\Routing\Context` and it is responsible for storing the path that needs
to be matched as well as other information that it's necessary during the routing process. This class can be extended
in order to provide custom routing context.

## The dispatcher

The dispatcher is the most critical component of the **Opis Routing** framework. It's main task is to
control and dictate every single step that it's involved into the routing process. Every dispatcher must
be represented by the instance of a class that implements the `Opis\Routing\IDispatcher` interface.
A default implementation is provided by the `Opis\Routing\Dispatcher` class.

## Filter and filter collections

Filters are instances of classes that are implementing the `Opis\Routing\IFilter` interface and are used
to eliminate routes that don't match certain criteria from the routing process.
Every filter must be stored into a filter collection represented by an instance of `Opis\Routing\FilterCollection` class.

## The router

The router's role is to put up all pieces together and to provide an entry point for the routing process.
The router is represented by the `Opis\Routing\Router` class. The constructor of this class takes as parameters
a route collection and optionally a dispatcher, a filter collection and an array of special values. The entry point
is represented by the `route` method which accepts as an argument an instance of a routing context.
