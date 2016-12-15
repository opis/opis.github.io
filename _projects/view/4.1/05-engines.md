---
layout: project
permalink: view/4.1/engines
title: Template engines
description: Learn about template engines
redirect_from: /view/engines.html
---
# Template engines

1. [Introduction](#introduction)
2. [Registering a template engine](#register)
3. [Priorities](#priorities)

## Introduction

With **Opis View** you are able to use multiple template engines simultaneously. 
By default, the library is shipped only with a single PHP template engine, implemented in `Opis\View\PHPEngine` class.

All template engines must implement the `Opis\View\EngineInterface` as it was stated [here][template-engine]. 

## Registering a template engine
{:#register}

Registering a new template engine is straightforward.

```php
use Opis\View\ViewRouter;

$view = new ViewRouter();

$view->engineResolver()->register(function(){
    return new TwigEngine();
})
->handle(function($path){
    return preg_match('/.*\.twig$/', $path);
});
```

The callback passed to the `register` method must be an instance of `Closure` and it will be used as a factory. 
Therefore the callback must return an instance of a class that implements the `Opis\View\EngineInterface` interface.

The callback passed to the `handle` method must also be an instance of `Closure` and it will be used as a filter. 
The callback receives as an argument the view's resolved path and must return either `true` or `false`, 
depending if it can handle the path or not.

## Priorities

Each registered engine has an associated priority, which by default is `0`(zero). 
An engine registered with a higher priority will be checked to see if it can handle a path before an engine 
registered with a lower priority.

You can set the priority for a registered engine by passing a number as the second argument to the register method.

```php
use Opis\View\ViewRouter;

$view = new ViewRouter();

$view->engineResolver()->register(function(){
    return new TwigEngine();
}, 1) // Higher priority
->handle(function($path){
    return preg_match('/.*\.twig$/', $path);
});
```

[template-engine]: components#the-template-engine "Template engine"
