---
layout: project
permalink: view/4.1/render
title: Rendering views
description: Learn how to render views
redirect_from: /view/render.html
---
# Rendering views

1. [The basics](#the-basics)
2. [The view placeholder](#the-placeholder)
3. [The ViewableInterface interface](#the-interface)

## The basics

Views are rendered with the help of the `render` method, called on a `ViewRouter` instance. 
The method takes as an argument an object implementing the `Opis\View\ViewableInterface` interface.

The library's default implementation of the `Opis\View\ViewableInterfac`e interface is the `Opis\View\View` class. 
The class takes as arguments the name of the view you want to render and optionally an array of placeholders.

```php
use Opis\View\View;
use Opis\View\ViewRouter;

$view = new ViewRouter();

$view->handle('foo', function(){
    return  '/path/to/foo.php';
});

echo $view->render(new View('foo', ['text' => 'Hello world!']));
```

Assuming that the content of the `/path/to/foo.php` is defined like below ...

```php
<h1>
    <?php echo $title; ?>
</h1>
```

... the rendered content will be

```html
<h1>
    Hello world!
</h1>
```

Another way of rendering a view is with the help of the `renderView` method. 
This method takes as arguments the name of the view and optionally an array of placeholders.

```php
echo $view->renderView('foo', ['text' => 'Hello world!']);
```

## The *view* placeholder
{:#the-placeholder}

Beside the user provided placeholders, the `ViewRouter` inject itself in the array of placeholders on the view key.

```php
<h1>
    <?php echo $title; ?>
</h1>
<div>
    <?php echo $view->renderView('page.content'); ?>
</div>
```

Changing this behaviour can be accomplished by passing false as the third argument to the `ViewRouter`'s constructor.

```php
$view = new ViewRouter(null, null, false);
```

If you want to keep this behavior and only change the placeholder's name, the pass the placeholder's name as the 
fourth argument to the `ViewRouter`'s constructor.

```php
$view = new ViewRouter(null, null, true, 'otherKey');
```

## The *ViewableInterface* interface
{:#the-interface}

Making an instance of a class being renderable is done by implementing the `Opis\View\ViewableInterface`
interface on that class.

```php
interface ViewableInterface
{
    public function viewName();
    
    public function viewArguments();
}
```

The interface has only two methods that needs to be implemented. 
The `viewName` method must return the name of the view, and the `viewArguments` must return an array of placeholders.

```php
use Opis\View\ViewableInterface

class User extends Model implements ViewableInterface
{
    
    public function viewName()
    {
        return 'profile';
    }
    
    public function viewArguments()
    {
        return array(
            'name' => $this->name,
            'age' => $this->age,
        );
    }
}

// ...

$user = User::find(1);
echo $view->render($user); // Render user's profile
```
