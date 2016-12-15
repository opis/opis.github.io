---
layout: project
permalink: view/4.1/views
title: Defining views
description: Learn how to define views
redirect_from: /view/views.html
---
# Defining views

1. [Registering views](#registering-views)
2. [Priorities](#priorities)
3. [Parameters](#parameters)
4. [Special implicit values](#special-implicit-values)
5. [Filters](#filters)

## Registering views

Views are registered on an instance of a `Opis\View\ViewRouter` class with the help of the `handle` method. 
The method takes as arguments the view's name and a callback value. The callback must return the path were the content 
of the view resides.

```php
use Opis\View\ViewRouter;

$view = new ViewRouter();

$view->handle('foo', function(){
    return  '/path/to/view.php';
});
```


## Priorities

Each defined view has an associated priority, which by default is `0` (zero). The priorities are meant to be used as a 
mechanism that allows you to overwrite existing views by simply adding new views that have higher priorities assigned.

Specifying a views's priority is done by passing a number representing the priority, 
as the third argument to the `handle` method.

```php
$view->handle('foo', function(){
    return  '/path/to/view.php';
}, 1);
```

## Parameters

A view's name can also be divided into segments separated by `.` signs. 
View names and view name's segments can be transformed into parameters by enclosing them with curly braces. 
The parameters can be used by the view's callback, by simply referencing them into the callback's arguments list.

```php
$view->handle('{foo}', function($foo){
    return  '/path/to/' . $foo . '.php';
});

$view->handle('foo.{bar}', function($bar){
    return  '/path/to/' . $bar . '.php';
});
```

Of course, you can define as many parameters as you need.

```php
$view->handle('foo.{bar}.baz.{qux}', function($bar, $qux){
    //
});
```

#### Optional parameters

Specifying that a parameter is optional can be done by adding a `?` mark after the parameter name.

```php
$view->handle('foo.{bar?}', function($bar = 'baz'){
    return  '/path/to/' . $bar . '.php';
});
```

#### Implicit values

You can set an implicit value for a parameter by using the `implicit` method.

```php
$view->handle('foo.{bar?}', function($bar){
    return  '/path/to/' . $bar . '.php';
})
->implicit('bar', 'baz');
```

#### Regex constraints

You can add regex constraints to parameters by using the `where` method. 
The method takes as arguments the parameter name and a regular expression defining 
how the parameter should be constrained.

```php
$view->handle('foo.{bar}', function($bar){
    return  '/path/to/' . $bar . '.php';
})
->where('bar', '[a-z][a-z0-9]+');
```

## Special implicit values

There are two special implicit values: `self` and `path`. The `self` implicit's value is the current route instance 
and `path` implicit's value is the current path object containing the view's name. 
The `$path` object is an instance of the `Opis\Routing\Path` class.

```php
$view->handle('foo', function($self, $path){
    // ..
});
```

## Filters

You can add a filter to a view by passing a callback value to the `filter` method. 
The callback must return either `true` or `false`.

```php
$view->handle('foo.{bar}', function($bar){
    return  '/path/to/' . $bar . '.php';
})
->filter(function($bar){
    return file_exist('/path/to/' . $bar . '.php');
});
```
