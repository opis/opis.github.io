---
layout: project
permalink: view/4.1/components
title: The components
description: Learn about Opis View's components
redirect_from: /view/components.html
---
# The components

1. [The router][router]
2. [The engine resolver][engine-resolver]
3. [The template engine][template-engine]
4. [The routes][routes]

## The router

The router is the central component of the **Opis View** library. 
It is represented by the `Opis\View\ViewRoute`r class and it's responsible for almost the whole rendering process. 
The router's responsibilities are to resolve routes to paths, to find an appropriate template engine 
(with the help of the [engine resolver][engine-resolver]) that can handle the resolved path properly, 
and finally to ask the template engine to build the view by giving it the resolved path and an array of placeholders. 


## The engine resolver

The engine resolver is represented by the `Opis\View\EngineResolver` class and its main responsibility is to find the 
adequate [template engine][template-engine] that can handle a given path. 
The engine resolver also allows users to register their own [template engines][template-engine].


## The template engine

The template engine is responsible for building the view and returning the content. 
A template engine is represented by any class that implements the `Opis\View\EngineInterface`.

```php
interface EngineInterface
{
    function build($path, array $data = array());
}
```

The interface have only one method that needs to be implemented. The `build` method receive as arguments the 
view's path and an array of placeholders and returns the generated content. 


## The routes

A route is responsible for defining a view's name and for associating a valid path with that name. 
The routes can also define name constraints and filters and they are stored in a route collection inside the router. 
When the router is asked to render a view, it will cycle through the route collection trying to find a route 
that matches the given name of the view. Once such a route is found, the route is resolved and the resulting path will 
be used by the router in the next steps of the rendering process. 
 

[router]: #the-router "The router"
[engine-resolver]: #the-engine-resolver "Engine resolver"
[template-engine]: #the-template-engine "Template engine"
[routes]: #the-routes "The routes"